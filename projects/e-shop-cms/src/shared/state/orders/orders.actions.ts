import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';
import { ScrollDirection } from '@cmsApp/shared/enums/scroll-direction.enum';

/** get orders from api */
export class GetOrders {
    static readonly type = '[Orders] Get Orders';
}
/** create a filter for search results */
export class SetFilter {
    static readonly type = '[Orders] Set Filter';
    constructor(public orderFilter: OrdersFilterForm) { }
}
/** scroll results to and fro */
export class ScrollResults {
    static readonly type = '[Orders] Scroll Results';
    constructor(public direction: ScrollDirection) { }
}
