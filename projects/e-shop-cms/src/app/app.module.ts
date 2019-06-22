import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '@cmsApp/services/in-memory-data.service';
import { SharedModule } from '@cmsApp/shared/shared.module';
import { stateList } from '@cmsApp/shared/state/state-list';
import { AppComponent } from './app.component';
import { ApplicationHeaderComponent } from './application-header/application-header.component';
import { FiltersFormComponent } from './filters-form/filters-form.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrdersPaginationComponent } from './orders-pagination/orders-pagination.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  declarations: [
    AppComponent,
    FiltersFormComponent,
    ApplicationHeaderComponent,
    OrdersTableComponent,
    OrdersPaginationComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,

    /**
     *  The HttpClientInMemoryWebApiModule module intercepts HTTP requests
     *  and returns simulated server responses.
     *  Remove it when a real server is ready to receive requests.
     */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgxsModule.forRoot([...stateList]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
