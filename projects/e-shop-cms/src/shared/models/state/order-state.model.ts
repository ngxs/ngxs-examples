import { OrderDTO } from '@cmsApp/shared/models/dto/order-dto.model';
import { OrdersFilterForm } from '../orders-filter.model';

/** the store for frontend orders representation */
export interface OrdersStateModel {
    filterForm: OrdersFilterForm;
    orders: OrderDTO[];
}
