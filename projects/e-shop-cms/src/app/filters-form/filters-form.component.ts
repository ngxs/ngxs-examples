import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { defaultItemsOnPage } from '@cmsApp/shared/constants/default-items-on-page.const';
import { itemsOnPageOptions } from '@cmsApp/shared/constants/items-on-page-select-options.const';
import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { orderStatusOptions } from '@cmsApp/shared/constants/order-status-select-options.const';

/**
 *  component with order filter form
 */

@Component({
  selector: 'four-filters-form',
  templateUrl: './filters-form.component.html'
})
export class FiltersFormComponent implements OnInit {

  public filterForm: FormGroup;
  /** dropdown options for the status select */
  public orderStatuses = orderStatusOptions;
  /** dropdown options for the results on page select */
  public resultsOnPage = itemsOnPageOptions;

  /** a filter object is passed to the parent when the form is submitted */
  @Output() searchEvent = new EventEmitter<OrdersFilterForm>();

  /** default filter value for the form's init/resets */
  private defaultFilterValue: OrdersFilterForm = {
    itemsOnPage: defaultItemsOnPage,
    maxValue: null,
    minValue: null,
    orderStatus: OrderStatuses.new,
    page: 1
  };

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

  private filterFormInit(): void {
    this.filterForm = this.fb.group(this.defaultFilterValue, { validators: this.minMaxInputValidator.bind(this) });
  }

  /** make sure the min value never exceeds the max */
  private minMaxInputValidator(control: AbstractControl): ValidationErrors | null {
    const minValue = control.get('minValue').value;
    const maxValue = control.get('maxValue').value;

    if (maxValue > minValue || minValue === null && maxValue === null) {
      return null;
    }

    return { minMaxError: true };
  }

  /** create a filter object from the submitted form values */
  private parseFormValueToFilter(formValue: OrdersFilterForm): OrdersFilterForm {
    return {
      itemsOnPage: Number(formValue.itemsOnPage),
      maxValue: Number(formValue.maxValue),
      minValue: Number(formValue.minValue),
      orderStatus: formValue.orderStatus,
      page: formValue.page
    };
  }
}
