import { tap } from 'rxjs/operators';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

import { DictionaryState } from '../dictionary/dictionary.state';
import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { FrontendOrderItem } from '@cmsApp/shared/models/order-frontend/frontend-order-items.model';
import { GetOrders } from './orders.actions';
import { OrdersStateModel } from '@cmsApp/shared/models/state/order-state.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { ShopApiService } from '@cmsApp/services/shop-api.service';

/** default state */
const defaultOrdersState = (): OrdersStateModel => {
    return {
        orders: undefined
    } as OrdersStateModel;
};

@State<OrdersStateModel>({
    name: 'ordersState',
    defaults: defaultOrdersState()
})

export class OrdersState implements NgxsOnInit {

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
        });
    }
    constructor(private apiService: ShopApiService) { }

    public ngxsOnInit({ dispatch }: StateContext<OrdersStateModel>): void {
        dispatch(GetOrders);
    }

    /** get the list of orders from api
     *  and convert it to frontend orders model
     */
    @Action(GetOrders)
    getOrders({ patchState }: StateContext<OrdersStateModel>) {
        return this.apiService.getOrders().pipe(tap(orders => patchState({ orders })));
    }
}
