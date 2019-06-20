import { OrderItemDTO } from './order-item-dto.model';

/** order model dto */
export interface OrderDTO {
    /** unique id */
    id: number;
    /** order date */
    date: string;
    /** order status */
    status: string;
    /** id of the customer who placeed the order */
    customerId: number;
    /** array of products from the order */
    products: OrderItemDTO[];
}
