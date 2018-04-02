import { Router } from '@angular/router';

import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { take, tap } from 'rxjs/operators';

import {
  CheckSession,
  LoginWithFacebook,
  LoginWithGoogle,
  LoginFailed,
  LoginRedirect,
  LoginSuccess,
  LoginWithEmailAndPassword,
  Logout,
  LogoutSuccess,
} from './auth.actions';
import { AuthStateModel, User } from './auth.model';


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null
  }
})
export class AuthState {

  constructor(private store: Store, private auth: AngularFireAuth, private router: Router) {
    console.log('SecurityStateModel');
  }

  /**
   * Selectors
   */
  @Selector()
  static getUser(state: AuthStateModel) {
    console.log('getUser', state);
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  onInit() {
    this.store.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(sc: StateContext<AuthStateModel>) {
    return this.auth.authState.pipe(
      take(1),
      tap((user: User) => {
        if (user) {
          console.log(`CheckSession: ${user.displayName} is logged in`);
          sc.dispatch(new LoginSuccess(user));
          return;
        }
        console.log('CheckSession: no user found');
      })
    );
  }

  @Action(LoginWithGoogle)
  loginWithGoogle(sc: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        sc.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithFacebook)
  loginWithFacebook(sc: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.auth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        sc.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(sc: StateContext<AuthStateModel>, action: LoginWithEmailAndPassword) {
    this.auth.auth.signInWithEmailAndPassword(action.email, action.password).then(
      (user: User) => {
        sc.dispatch(new LoginSuccess(user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(Logout)
  logout(sc: StateContext<AuthStateModel>) {
    this.auth.auth.signOut().then(
      () => {
        sc.dispatch(new LogoutSuccess());
      });
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess() {
    console.log('onLoginSuccess, navigating to /dashboard');
    this.router.navigateByUrl('/dashboard');
  }

  @Action(LoginRedirect)
  onLoginRedirect() {
    console.log('onLoginRedirect, navigating to /auth/login');
    this.router.navigateByUrl('/auth/login');
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(sc: StateContext<AuthStateModel>, event: LoginSuccess) {
    console.log('setUserStateOnSuccess');
    sc.setState({
      user: event.user
    });
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure(sc: StateContext<AuthStateModel>) {
    sc.setState({
      user: undefined
    });
    sc.dispatch(new LoginRedirect());
  }

}
