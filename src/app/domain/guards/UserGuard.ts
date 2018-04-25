import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, switchMap } from 'rxjs/operators';
import { SARead } from '../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { authenticated } from '../../firebase-auth/store/auth.reducer';
import { User } from '../data/models/user.model';
import { selectRoutedUser } from '../data/store';
import { UserView } from '../data/view/user.view';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
      private store: Store<any>
    ) {}

    getFromStoreOrAPI(userID: string): Observable<UserView> {
        return this.store
          .select(selectRoutedUser)
          .do((user: UserView) => {
            if (!user) {
              // this.serverAdapter.read('users', userID).subscribe(action => this.store.dispatch(action));
              this.store.dispatch(new SARead<User>({resourceName: 'users', id: userID}));
            }
          })
          .filter((user: UserView) => !!user)
          .take(1);
      }

    canActivate(state: ActivatedRouteSnapshot): Observable<boolean> {
      return this.getFromStoreOrAPI(state.paramMap.get('userID'))
        .pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
        );
    }
}
