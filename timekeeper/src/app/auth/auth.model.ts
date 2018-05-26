import { UserInfo } from 'firebase/app';

export type User = UserInfo;

export interface AuthStateModel {
  initialized: boolean;
  user?: UserInfo;
}
