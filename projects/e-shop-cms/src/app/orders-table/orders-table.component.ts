import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { OrdersState } from '@cmsApp/shared/state/orders/orders.state';

/**
 *  component for presenting orders in a table
 */

@Component({
  selector: 'four-orders-table',
  templateUrl: './orders-table.component.html'
})
export class OrdersTableComponent {

  @Select(OrdersState.orders)
  public orders$: Observable<FrontendOrder[]>;
}
