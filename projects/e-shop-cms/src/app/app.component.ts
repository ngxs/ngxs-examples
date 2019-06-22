import { Component, OnInit } from '@angular/core';

import { GetOrders } from '@cmsApp/shared/state/orders/orders.actions';
import { GetDictionaries } from '@cmsApp/shared/state/dictionary/dictionary.actions';

import { Store } from '@ngxs/store';
import { ScrollDirection } from '@cmsApp/shared/enums/scroll-direction.enum';



/**
 *  main app component
 */

@Component({
  selector: 'four-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  /** filter visibility switch */
  public filterIsVisible: boolean;

  constructor(private store: Store) { }

  public ngOnInit(): void { }

  public onSinglePageScroll($event): void {
    console.log('scroll event detected');
    console.log($event)
  }

  /** listen to the header, which emits filter visibility */
  public toggleFilterDisplay($event: boolean): void {
    this.filterIsVisible = $event;
  }
}
