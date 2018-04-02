import { User } from './auth.model';

// Actions
export class CheckSession {
  static type = '[Auth] CheckSession';
}
export class LoginWithGoogle {
  static type = '[Auth] LoginWithGoogle';
}
export class LoginWithFacebook {
  static type = '[Auth] LoginWithFacebook';
}
export class LoginWithEmailAndPassword {
  static type = '[Auth] LoginWithEmailAndPassword';
  constructor(public email: string, public password: string) {}
}
export class Logout {
  static type = '[Auth] Logout';
}
export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public user: User) {}
}
export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}

