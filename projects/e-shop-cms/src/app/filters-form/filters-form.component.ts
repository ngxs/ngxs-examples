import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { itemsOnPageOptions } from '@cmsApp/shared/constants/items-on-page-select-options.const';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { defaultItemsOnPage } from '@cmsApp/shared/constants/default-items-on-page.const';
import { orderStatusOptions } from '@cmsApp/shared/constants/order-status-select-options.const';
import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';
/**
 *  component with order filter form
 */

@Component({
  selector: 'four-filters-form',
  templateUrl: './filters-form.component.html'
})
export class FiltersFormComponent implements OnInit {

  public currentPage = 0;
  public filterForm: FormGroup;
  public orderStatuses = orderStatusOptions;
  public resultsOnPage = itemsOnPageOptions;

  private defaultFilterValue: OrdersFilterForm = {
    itemsOnPage: defaultItemsOnPage,
    minValue: null,
    maxValue: null,
    orderStatus: OrderStatuses.new,
  };

  @Output() searchEvent = new EventEmitter<OrdersFilterForm>();

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.filterFormInit();
  }

  public onReset(): void {
    this.filterForm.patchValue(this.defaultFilterValue);
  }

  public onSubmit(): void {
    const formValue = this.filterForm.value as OrdersFilterForm;
    this.searchEvent.emit(this.parseFormValueToFilter(formValue));
  }

  private parseFormValueToFilter(formValue: OrdersFilterForm): OrdersFilterForm {
    return {
      itemsOnPage: Number(formValue.itemsOnPage),
      maxValue: Number(formValue.maxValue),
      minValue: Number(formValue.minValue),
      orderStatus: formValue.orderStatus
    } as OrdersFilterForm;
  }

  private filterFormInit(): void {
    this.filterForm = this.fb.group(this.defaultFilterValue);
  }
}
