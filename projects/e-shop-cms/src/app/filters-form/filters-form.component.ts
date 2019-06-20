import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

/**
 *  component with order filter form
 */

@Component({
  selector: 'four-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.css']
})
export class FiltersFormComponent implements OnInit {
  name = new FormControl('');

  constructor(private fb: FormBuilder) { }

  public filterForm: FormGroup;

  ngOnInit() {
    this.filterFormInit();
  }

  private filterFormInit(): void {
    this.filterForm = this.fb.group({
      type: '',
      name: ''
    });
  }
}
