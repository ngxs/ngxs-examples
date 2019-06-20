import { Component, Output, EventEmitter, OnInit } from '@angular/core';

/**
 *  top menu of the application
 */

@Component({
  selector: 'four-application-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.css']
})
export class ApplicationHeaderComponent implements OnInit {

  /** filter visibility status */
  private isFilterVisible = false;
  @Output() public filterVisibilityChange = new EventEmitter<boolean>();

  ngOnInit() {
    /** emit the initial filter status */
    this.toggleFilterDisplay();
  }

  /** toggle filter status and pass it to parent */
  public toggleFilterDisplay(): void {
    this.isFilterVisible = !this.isFilterVisible;
    this.filterVisibilityChange.emit(this.isFilterVisible);
  }
}
