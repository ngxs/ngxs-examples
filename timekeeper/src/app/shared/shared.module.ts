import { NgModule } from '@angular/core';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { MaterialModule } from '../material.module';

const SHARED_COMPONENTS = [
  AppToolbarComponent,
];

@NgModule({
  imports: [
    MaterialModule,
  ],
  declarations: SHARED_COMPONENTS,
  exports: [
    ...SHARED_COMPONENTS,
  ]
})
export class SharedModule { }
