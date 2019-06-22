import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';

export interface OrdersFilterForm {
    minValue?: number;
    maxValue?: number;
    orderStatus?: OrderStatuses;
    itemsOnPage: number;
}
