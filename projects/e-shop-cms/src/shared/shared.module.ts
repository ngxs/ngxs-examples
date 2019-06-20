import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [NgxsFormPluginModule, ReactiveFormsModule]
})
export class SharedModule { }
