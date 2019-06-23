import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  /** determines if scroll forward button is blocked */
  @Input() canScrollForward = false;
  /** determines if scroll back button is blocked */
  @Input() canScrollBack = false;

  /** pass scroll direction to parent component */
  @Output() scrollEvent = new EventEmitter<ScrollDirection>();

  public scrollOnePage(direction: ScrollDirection): void {
    this.scrollEvent.emit(direction);
  }
}
