import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';

/** filter form values model */
export interface OrdersFilterForm {
    itemsOnPage: number;
    maxValue?: number;
    minValue?: number;
    orderStatus?: OrderStatuses;
    page: number;
}
