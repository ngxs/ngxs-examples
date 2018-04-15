import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginWithGoogle } from '../auth.actions';

@Component({
  selector: 'app-login-view',
  templateUrl: './login.view.html',
  styleUrls: ['./login.view.scss'],
})
export class LoginView {

  constructor(private store: Store) {
  }

  loginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }
}
