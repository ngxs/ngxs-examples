import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { defaultItemsOnPage } from '@cmsApp/shared/constants/default-items-on-page.const';
/**
 *  component with order filter form
 */

@Component({
  selector: 'four-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.css']
})
export class FiltersFormComponent implements OnInit {

  public currentPage = 0;
  public orderStatuses = Object.values(OrderStatuses);
  public resultsOnPage = [defaultItemsOnPage, 20, 50];

  constructor(private fb: FormBuilder) { }

  public filterForm: FormGroup;

  public ngOnInit(): void {
    this.filterFormInit();
    this.filterForm.valueChanges.subscribe(console.log);
    console.log(this.filterForm);
  }

  public onSubmit(): void {
    console.log('form submitted');
  }

  private filterFormInit(): void {
    this.filterForm = this.fb.group({
      itemsOnPage: defaultItemsOnPage,
      minValue: '',
      maxValue: '',
      status: OrderStatuses.new,
    });
  }
}
