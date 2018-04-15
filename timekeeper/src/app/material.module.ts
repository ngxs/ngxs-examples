import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MATERIAL_SANITY_CHECKS, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

const SHARED_MODULES = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
];

@NgModule({
  imports: SHARED_MODULES,
  providers: [
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
  ],
  exports: SHARED_MODULES
})
export class MaterialModule { }
