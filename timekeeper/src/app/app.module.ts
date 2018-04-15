import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { AuthModule } from './auth';

import { AppView } from './app.view';

@NgModule({
  declarations: [
    AppView
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,

    AngularFireModule.initializeApp(environment.firebase),

    NgxsModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),

    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    // NgxsLoggerPluginModule.forRoot({
    //   collapsed: true,
    //   logger: console
    // }),

    AuthModule,
    AppRoutingModule
  ],
  bootstrap: [AppView]
})
export class AppModule { }
