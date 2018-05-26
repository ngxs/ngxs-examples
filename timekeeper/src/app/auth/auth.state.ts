import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
    initialized: false,
    user: null,
  }
})
export class AuthState implements NgxsOnInit {

  constructor(private store: Store, private afAuth: AngularFireAuth) {}

  /**
   * Selectors
   */
  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.authState.pipe(
      take(1),
      tap((user: User) => {
        ctx.patchState({ initialized: true });
        if (user) {
          console.log(`CheckSession: ${user.displayName} is logged in`);
          ctx.dispatch(new LoginSuccess(user));
          return;
        }
        console.log('CheckSession: no user found');
      })
    );
  }

  @Action(LoginWithGoogle)
  loginWithGoogle(ctx: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithFacebook)
  loginWithFacebook(ctx: StateContext<AuthStateModel>) {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(
      (response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(ctx: StateContext<AuthStateModel>, action: LoginWithEmailAndPassword) {
    return this.afAuth.auth.signInWithEmailAndPassword(action.email, action.password).then(
      (user: User) => {
        ctx.dispatch(new LoginSuccess(user));
      })
      .catch(error => {
        ctx.dispatch(new LoginFailed(error));
      });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.auth.signOut().then(
      () => {
        ctx.dispatch(new LogoutSuccess());
      });
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to /dashboard');
    ctx.dispatch(new Navigate(['/dashboard']));
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /auth/login');
    ctx.dispatch(new Navigate(['/auth/login']));
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    ctx.patchState({
      user: event.user
    });
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: undefined
    });
    ctx.dispatch(new LoginRedirect());
  }

}
