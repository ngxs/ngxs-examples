import { tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CustomerDTO } from '@cmsApp/shared/models/dto/customer-dto.model';
import { DictionaryState } from '@cmsApp/shared/state/dictionary/dictionary.state';
import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { displayAllStatuses } from '@cmsApp/shared/constants/display-all-statuses-select-option.const';
import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { FrontendOrderItem } from '@cmsApp/shared/models/order-frontend/frontend-order-items.model';
import { GetOrders, ScrollResults, SetFilter } from './orders.actions';
import { OrderDTO } from '@cmsApp/shared/models/dto/order-dto.model';
import { OrderItemDTO } from '@cmsApp/shared/models/dto/order-item-dto.model';
import { OrdersStateModel } from '@cmsApp/shared/models/state/order-state.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { ShopApiService } from '@cmsApp/services/shop-api.service';
import { FilterFormState } from '@cmsApp/shared/models/state/form-state.model';
import { Injectable } from '@angular/core';

/**
 *  this state is responsible for storing orders
 *  and serving them according to the filter provided
 */

/** default state */
const defaultOrdersState = (): OrdersStateModel => {
    return {
        orderFilter: undefined,
        filterFormState: <FilterFormState>{
            model: undefined,
            dirty: false,
            status: undefined,
            errors: undefined
        },
        orders: undefined,
    };
};

@State<OrdersStateModel>({
    name: 'ordersState',
    defaults: defaultOrdersState()
})
@Injectable()
export class OrdersState {

    @Selector()
    static currentPage(state: OrdersStateModel): number {
        return state.orderFilter.page;
    }

    @Selector()
    static itemsOnPage(state: OrdersStateModel): number {
        return state.orderFilter.itemsOnPage;
    }

    /** here goes the heavy lifting of parsing dictionaries
     *  and creating the model required for the view
     */
    @Selector([DictionaryState])
    static filteredOrders(state: OrdersStateModel, dictionaryState: DictionaryStateModel): FrontendOrder[] {
        return state.orders.map(order => {
            const orderCustomer = dictionaryState.customers.find(customer => customer.id === order.customerId);
            const orderProducts = order.products.map(product => {
                const productInDictionary = dictionaryState.products.find(item => item.productId === product.productId);
                const orderSubtotal = product.quantity * product.itemPrice;
                return <FrontendOrderItem>{
                    price: product.itemPrice,
                    product: productInDictionary.productName,
                    quantity: product.quantity,
                    subtotal: orderSubtotal
                };
            }
            );
            return <FrontendOrder>{
                id: order.id,
                customer: `${orderCustomer.firstName} ${orderCustomer.lastName}`,
                date: order.date,
                details: orderProducts,
                status: order.status as OrderStatuses,
                total: orderProducts.reduce((total, item) => total += item.subtotal, 0)
            };
        })
            .filter(item => state.orderFilter.maxValue > 0 ? state.orderFilter.maxValue >= item.total : true)
            .filter(item => state.orderFilter.minValue > 0 ? state.orderFilter.minValue <= item.total : true)
            .filter(item => (state.orderFilter.orderStatus as string) !== displayAllStatuses ? state.orderFilter.orderStatus === item.status : true);
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
    setFilter({ patchState }: StateContext<OrdersStateModel>, { orderFilter }: SetFilter) {
        patchState({
            orderFilter
        });
    }

    @Action(ScrollResults)
    scrollResults({ patchState, getState }: StateContext<OrdersStateModel>, { direction }: ScrollResults) {
        const currentFilter = getState().orderFilter;
        patchState({
            orderFilter: { ...currentFilter, page: currentFilter.page + direction }
        });
    }
}
