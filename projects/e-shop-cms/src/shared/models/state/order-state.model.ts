import { OrderDTO } from '@cmsApp/shared/models/dto/order-dto.model';

/** the store for frontend orders representation */
export interface OrdersStateModel {
    orders: OrderDTO[];
}
