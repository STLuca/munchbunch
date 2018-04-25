import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { namedAction } from '../../../../../ngrx/reducers/FilteredReducer';
import { SAReadAllChildren } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { mySchema, TableName } from '../../../../../ngrx/util/schema';
import { uid } from '../../../../firebase-auth/store/auth.reducer';
import { selectCurrentPurchaseViews } from '../../../../store';
import { QueryData, SetData } from '../../../../store/clientState/QueryState/queryState.reducer';
import { getRouterState } from '../../../../store/router/router';
import { Go } from '../../../../store/router/router.actions';
import { Purchase } from '../../../data/models/purchase.model';
import { selectRoutedUser, selectRoutedUserID } from '../../../data/store';
import { OrderView } from '../../../data/view/order.view';
import { UserView } from '../../../data/view/user.view';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit {

  userView: Observable<UserView>;
  uid: Observable<string>;
  purchases: Observable<Purchase[]>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
) {
    this.userView = store.select(selectRoutedUser);
    this.store.select(getRouterState)
          .pipe(
            filter(route => route.state.params.userID),
            map(route => new SAReadAllChildren({resourceName: 'users', id: route.state.params.userID, schema: mySchema}))
          ).subscribe(action => this.store.dispatch(action));
    this.uid = this.store.select(uid);
    this.purchases = this.store.select(selectCurrentPurchaseViews);
   }

  ngOnInit() {
  }

  navigate(restaurantID: string) {
    this.store.dispatch(new Go({
      path: ['restaurant',  restaurantID]
    }));
  }

  createRestaurant(template: TemplateRef<any>) {
    this.dialog.open(template, {width: '500px'});
  }

  newQueryData(data: {resourceName: TableName, data: QueryData<any>}) {
    this.store.dispatch(namedAction('purchases', new SetData({resourcename: 'purchases', data: data.data})));
  }

}
