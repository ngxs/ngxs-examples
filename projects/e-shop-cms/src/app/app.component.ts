import { Component, OnInit } from '@angular/core';

import { GetOrders } from '@cmsApp/shared/state/orders/orders.actions';
import { GetDictionaries } from '@cmsApp/shared/state/dictionary/dictionary.actions';

import { Store } from '@ngxs/store';
import { ScrollDirection } from '@cmsApp/shared/enums/scroll-direction.enum';
import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';

import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { OrdersState } from '@cmsApp/shared/state/orders/orders.state';
import { SetFilter } from '@cmsApp/shared/state/orders/orders.actions';

/**
 *  main app component
 */

@Component({
  selector: 'four-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @Select(OrdersState.orders)
  public orders$: Observable<FrontendOrder[]>;

  /** filter visibility switch */
  public filterIsVisible: boolean;

  constructor(private store: Store) { }

  public ngOnInit(): void { }

  public onSinglePageScroll($event: ScrollDirection): void {
    console.log($event);
  }

  public onSearchEvent($event: OrdersFilterForm): void {
    this.store.dispatch(GetOrders).subscribe(console.log);
    console.log($event);
    this.store.dispatch(new SetFilter($event))
  }

  /** listen to the header, which emits filter visibility */
  public toggleFilterDisplay($event: boolean): void {
    this.filterIsVisible = $event;
  }
}
