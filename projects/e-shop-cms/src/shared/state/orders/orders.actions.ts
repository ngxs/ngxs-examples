import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';

/** get orders from api */
export class GetOrders {
    static readonly type = '[Orders] Get Orders';
}

export class SetFilter {
    static readonly type = '[Orders] Set Filter';
    constructor(public filter: OrdersFilterForm) { }
}