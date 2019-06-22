import { tap, filter } from 'rxjs/operators';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { DictionaryState } from '../dictionary/dictionary.state';
import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { FrontendOrderItem } from '@cmsApp/shared/models/order-frontend/frontend-order-items.model';
import { GetOrders, SetFilter } from './orders.actions';
import { OrdersStateModel } from '@cmsApp/shared/models/state/order-state.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { ShopApiService } from '@cmsApp/services/shop-api.service';
import { displayAllStatuses } from '@cmsApp/shared/constants/display-all-statuses-select-option.const';

/** default state */
const defaultOrdersState = (): OrdersStateModel => {
    return {
        filterForm: undefined,
        orders: undefined
    } as OrdersStateModel;
};

@State<OrdersStateModel>({
    name: 'ordersState',
    defaults: defaultOrdersState()
})

export class OrdersState {

    @Selector([DictionaryState])
    static orders(state: OrdersStateModel, dictionaryState: DictionaryStateModel): FrontendOrder[] {
        return state.orders.map(order => {
            const orderCustomer = dictionaryState.customers.find(customer => customer.id === order.customerId);
            let orderTotal = 0;
            const orderProducts: FrontendOrderItem[] = [];

            order.products.forEach(product => {
                const orderedProduct = dictionaryState.products.find(item => item.productId === product.productId);
                const orderSubtotal = product.quantity * product.itemPrice;
                orderTotal += orderSubtotal;
                orderProducts.push({
                    price: product.itemPrice,
                    product: orderedProduct.productName,
                    quantity: product.quantity,
                    subtotal: orderSubtotal
                });
            });

            return {
                id: order.id,
                customer: `${orderCustomer.firstName} ${orderCustomer.lastName}`,
                date: order.date,
                details: orderProducts,
                status: order.status as OrderStatuses,
                total: orderTotal
            } as FrontendOrder;
        })
            .filter(item => state.filterForm.maxValue > 0 ? state.filterForm.maxValue >= item.total : true)
            .filter(item => state.filterForm.minValue > 0 ? state.filterForm.minValue <= item.total : true)
            .filter(item => (state.filterForm.orderStatus as string) !== displayAllStatuses ? state.filterForm.orderStatus === item.status : true);
    }
    constructor(private apiService: ShopApiService) { }

    /** get the list of orders from api
     *  and convert it to frontend orders model
     */
    @Action(GetOrders)
    getOrders({ getState, patchState }: StateContext<OrdersStateModel>) {
        const state = getState();
        if (state.orders && state.orders.length) {
            return;
        }
        return this.apiService.getOrders()
            .pipe(tap(orders => patchState({ orders })));
    }

    @Action(SetFilter)
    setFilter({ patchState }: StateContext<OrdersStateModel>, { filter }: SetFilter) {
        patchState({
            filterForm: filter
        });
    }
}
