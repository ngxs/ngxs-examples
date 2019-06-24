import { FilterFormState } from './form-state.model';
import { OrderDTO } from '@cmsApp/shared/models/dto/order-dto.model';
import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';

/** the store for frontend orders representation */
export interface OrdersStateModel {
    orderFilter: OrdersFilterForm;
    filterFormState: FilterFormState;
    orders: OrderDTO[];
}
