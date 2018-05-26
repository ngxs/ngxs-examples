import { Component, ViewEncapsulation } from '@angular/core';
import { Actions, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppView {

  @Select(AuthState.getInitialized)
  initialized$: Observable<boolean>;

}
