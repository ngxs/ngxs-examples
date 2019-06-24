import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { FrontendOrderItem } from './frontend-order-items.model';

/** interface for presenting order on frontend */
export interface FrontendOrder {
    /** unique order id */
    id: number;
    /** customer */
    customer: string;
    /** date */
    date: string;
    /** order details */
    details: FrontendOrderItem[];
    /** order status */
    status: OrderStatuses;
    /** total sum */
    total: number;
}
