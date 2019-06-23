import { combineLatest, Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { FrontendOrder } from '@cmsApp/shared/models/order-frontend/frontend-order.model';
import { GetOrders, ScrollResults } from '@cmsApp/shared/state/orders/orders.actions';
import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';
import { OrdersState } from '@cmsApp/shared/state/orders/orders.state';
import { ScrollDirection } from '@cmsApp/shared/enums/scroll-direction.enum';
import { SetFilter } from '@cmsApp/shared/state/orders/orders.actions';

/**
 *  main app component
 */

@Component({
  selector: 'four-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(OrdersState.filteredOrders)
  public filteredOrders$: Observable<FrontendOrder[]>;

  @Select(OrdersState.currentPage)
  public currentPage$: Observable<number>;

  @Select(OrdersState.itemsOnPage)
  public itemsOnPage$: Observable<number>;

  /** filter visibility switch */
  public filterIsVisible: boolean;
  /** flag passed to pagination */
  public canScrollResultsForward = false;
  /** flag passed to pagination */
  public canScrollResultsBack = false;
  /** items passed to the display table component */
  public orders: FrontendOrder[];
  private filterSubscription: Subscription;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.subscribeToOrderFilterChanges();
  }

  public ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  /** scroll a page forward or back */
  public onSinglePageScroll($event: ScrollDirection): void {
    this.scrollPageToStart();
    this.store.dispatch(new ScrollResults($event));
  }

  /** update filter and request results */
  public onSearchEvent($event: OrdersFilterForm): void {
    this.scrollPageToStart();
    this.store.dispatch(new SetFilter($event));
    this.store.dispatch(GetOrders);
  }

  /** listen to the header, which emits filter visibility */
  public toggleFilterDisplay($event: boolean): void {
    this.filterIsVisible = $event;
  }

  /** go to top */
  private scrollPageToStart(): void {
    window.scrollTo(0, 0);
  }

  /** update the state of buttons and results on store changes */
  private subscribeToOrderFilterChanges(): void {
    this.filterSubscription = combineLatest(this.filteredOrders$, this.currentPage$, this.itemsOnPage$).subscribe(([orders, currentPage, itemsOnPage]) => {
      this.canScrollResultsBack = currentPage > 1;
      this.canScrollResultsForward = orders ? currentPage * itemsOnPage < orders.length : false;

      if (orders) {
        this.orders = orders.slice((currentPage - 1) * itemsOnPage, currentPage * itemsOnPage);
      }
    });
  }
}
