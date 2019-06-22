import { Component, EventEmitter, Output } from '@angular/core';

import { ScrollDirection } from '@cmsApp/shared/enums/scroll-direction.enum';

/**
 *  pagination component
 */

@Component({
  selector: 'four-orders-pagination',
  templateUrl: './orders-pagination.component.html'
})
export class OrdersPaginationComponent {

  public scrollDirection = ScrollDirection;

  /** pass scroll direction to parent component */
  @Output() scrollEvent = new EventEmitter<ScrollDirection>();

  public scrollOnePage(direction: ScrollDirection): void {
    this.scrollEvent.emit(direction);
  }
}
