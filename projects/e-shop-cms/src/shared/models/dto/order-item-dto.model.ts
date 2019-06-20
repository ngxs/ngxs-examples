/** order item dto */
export interface OrderItemDTO {
    /** unique product id from dictionary */
    productId: number;
    /** number of items ordered */
    quantity: number;
    /** price of the item when the order was placed */
    itemPrice: number;
}
