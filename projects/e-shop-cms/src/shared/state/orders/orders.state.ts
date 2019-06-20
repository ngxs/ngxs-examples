import { tap } from 'rxjs/operators';
import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';

import { OrdersStateModel } from '@cmsApp/shared/models/state/order-state.model';
import { ShopApiService } from '@cmsApp/services/shop-api.service';
import { FrontendOrder } from '@cmsApp/shared/models/frontend/frontend-order.model';
import { FrontendOrderItem } from '@cmsApp/shared/models/frontend/frontend-order-items.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { DictionaryState } from '../dictionary/dictionary.state';
import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { GetOrders } from './orders.actions';

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

    ngxsOnInit({ dispatch }: StateContext<OrdersStateModel>) {
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
