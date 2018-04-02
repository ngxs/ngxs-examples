import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState, Logout, User } from '../../../auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent {

  constructor(private store: Store) {}

  @Select(AuthState.getUser)
  public user$: Observable<User>;

  logout() {
    this.store.dispatch(new Logout());
  }

}
