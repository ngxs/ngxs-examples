import { Component, OnInit } from '@angular/core';

import { GetOrders } from '@cmsApp/shared/state/orders/orders.actions';
import { GetDictionaries } from '@cmsApp/shared/state/dictionary/dictionary.actions';

import { Store } from '@ngxs/store';



/**
 *  main app component
 */

@Component({
  selector: 'four-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** filter visibility switch */
  public filterIsVisible: boolean;

  constructor(private store: Store) { }

  public ngOnInit(): void { }


  /** listen to the header, which emits filter visibility */
  public toggleFilterDisplay($event: boolean): void {
    this.filterIsVisible = $event;
  }
}
