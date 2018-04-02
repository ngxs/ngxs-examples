import { NgModule } from '@angular/core';

import { DashboardView } from './dashboard.view';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardView },
];

@NgModule({
  imports: [
    SharedModule,

    RouterModule.forChild(DASHBOARD_ROUTES),
  ],
  declarations: [
    DashboardView
  ]
})
export class DashboardModule { }
