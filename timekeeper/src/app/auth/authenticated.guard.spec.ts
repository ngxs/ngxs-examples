import { TestBed, async, inject } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { AuthenticatedGuard } from './authenticated.guard';
import { AuthModule } from '.';


describe('AuthenticatedGuard', () => {

  let guard: AuthenticatedGuard;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.get(AuthenticatedGuard)
  });

  it('should guard against unauthenticated users', inject([AuthenticatedGuard], (guard: AuthenticatedGuard) => {
    guard.canActivate().subscribe(canActivate => expect(canActivate).toBeFalsy());
  }));
});
