/** order item for frontend presentation */
export interface FrontendOrderItem {
    /** price of the item */
    price: number;
    /** name of the product */
    product: string;
    /** quantity */
    quantity: number;
    /** price of all products of this type in the order */
    subtotal: number;
}
