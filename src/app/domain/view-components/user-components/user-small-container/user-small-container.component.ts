import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SADelete } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { Logout } from '../../../../firebase-auth/store/auth.action';
import { Go } from '../../../../store/router/router.actions';
import { selectLoggedInUser, selectRoutedUser } from '../../../data/store';
import { UserView } from '../../../data/view/user.view';

@Component({
  selector: 'app-user-small-container',
  templateUrl: './user-small-container.component.html',
  styleUrls: ['./user-small-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSmallContainerComponent {

  loggedInUser: Observable<UserView>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {
    this.loggedInUser = this.store.select(selectLoggedInUser);
   }


  logout() {
    this.store.dispatch(new Logout());
  }

  login() {
    this.store.dispatch(new Go({path: ['/login']}));
  }

  navigateToUser(userId: string) {
    this.store.dispatch(new Go({path: ['/user', userId]}));
  }

  editAccount(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  deleteAccount(template: TemplateRef<any>) {
    const ref = this.dialog.open(template);
    ref.afterClosed()
      .map(userID => new SADelete({resourceName: 'users', id: userID}))
      .subscribe(action => this.store.dispatch(action));
  }

}
