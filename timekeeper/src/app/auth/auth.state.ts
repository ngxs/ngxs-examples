import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

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
export class AuthState implements NgxsOnInit {

  constructor(private store: Store, private afAuth: AngularFireAuth, private ref: ApplicationRef) {}

  /**
   * Selectors
   */
  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(sc: StateContext<AuthStateModel>) {
    sc.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(sc: StateContext<AuthStateModel>) {
    return this.afAuth.authState.pipe(
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
    return this.afAuth.auth.signInWithPopup(provider).then(
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
    return this.afAuth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        sc.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(sc: StateContext<AuthStateModel>, action: LoginWithEmailAndPassword) {
    return this.afAuth.auth.signInWithEmailAndPassword(action.email, action.password).then(
      (user: User) => {
        sc.dispatch(new LoginSuccess(user));
      })
      .catch(error => {
        sc.dispatch(new LoginFailed(error));
      });
  }

  @Action(Logout)
  logout(sc: StateContext<AuthStateModel>) {
    return this.afAuth.auth.signOut().then(
      () => {
        sc.dispatch(new LogoutSuccess());
      });
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess(sc: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to /dashboard');
    sc.dispatch(new Navigate(['/dashboard']));
    this.ref.tick();
  }

  @Action(LoginRedirect)
  onLoginRedirect(sc: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /auth/login');
    sc.dispatch(new Navigate(['/auth/login']));
    this.ref.tick();
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
