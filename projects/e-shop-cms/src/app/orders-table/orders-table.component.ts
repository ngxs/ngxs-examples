import { Component, Input } from '@angular/core';

import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';

/**
 *  component for presenting orders in a table
 */

@Component({
  selector: 'four-orders-table',
  templateUrl: './orders-table.component.html'
})
export class OrdersTableComponent {
  @Input() orders: FrontendOrder[];
}
