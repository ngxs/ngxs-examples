import { Injectable } from '@angular/core';

import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { FrontendOrderItem } from '@cmsApp/shared/models/order-frontend/frontend-order-items.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { OrderItemDTO } from '@cmsApp/shared/models/dto/order-item-dto.model';
import { OrderDTO } from '@cmsApp/shared/models/dto/order-dto.model';
import { CustomerDTO } from '@cmsApp/shared/models/dto/customer-dto.model';

/**
 *  api service for retrievong data from server
 */

@Injectable({
    providedIn: 'root'
})
export class DtoFrontendConverterService {

    public convertOrderDtoToFrontendItem(product: OrderItemDTO, dictionaryState: DictionaryStateModel): FrontendOrderItem {
        const orderedProduct = dictionaryState.products.find(item => item.productId === product.productId);
        const orderSubtotal = product.quantity * product.itemPrice;
        return {
            price: product.itemPrice,
            product: orderedProduct.productName,
            quantity: product.quantity,
            subtotal: orderSubtotal
        };
    }

    public convertToFrontendOrder(order: OrderDTO, orderCustomer: CustomerDTO, orderProducts: FrontendOrderItem[]): FrontendOrder {
        return {
            id: order.id,
            customer: `${orderCustomer.firstName} ${orderCustomer.lastName}`,
            date: order.date,
            details: orderProducts,
            status: order.status as OrderStatuses,
            total: orderProducts.reduce((total, item) => total += item.subtotal, 0)
        };
    }
}
