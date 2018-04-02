import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';
import { RouterModule, Routes } from '@angular/router';
import { LoginView } from './login-view/login.view';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from '../material.module';

export const AUTH_ROUTES: Routes = [
  { path: 'auth/login', component: LoginView },
];

@NgModule({
  imports: [
    AngularFireAuthModule,
    MaterialModule,

    NgxsModule.forFeature([
      AuthState,
    ]),

    RouterModule.forChild(AUTH_ROUTES),
  ],
  declarations: [
    LoginView,
  ]
})
export class AuthModule {}
