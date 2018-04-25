import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/core/src/render3';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { zip } from 'rxjs/observable/zip';
import { filter, map } from 'rxjs/operators';
import { namedAction } from '../../../../../ngrx/reducers/FilteredReducer';
import { SACreate, SAReadAllChildren } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { mySchema } from '../../../../../ngrx/util/schema';
import { DialogOpen } from '../../../../custom-material/DialogStore/Dialog.actions';
import { uid } from '../../../../firebase-auth/store/auth.reducer';
import { QueryData } from '../../../../shared/ngrx-pagination/ngrx-pagination.component';
import { selectCurrentRestaurantCommentViews } from '../../../../store';
import { SetRestaurant, SetTable } from '../../../../store/clientState/orders/orders.action';
import { SetData } from '../../../../store/clientState/QueryState/queryState.reducer';
import { getRouterState } from '../../../../store/router/router';
import { Comment } from '../../../data/models/comment.model';
import { selectLoggedInUsersRestaurantsIds, selectRoutedRestaurant } from '../../../data/store';
import { CommentView } from '../../../data/view/comment.view';
import { RestaurantView } from '../../../data/view/restaurant.view';
import { SelectTableDialogComponent } from '../../../forms/select-table-dialog/select-table-dialog.component';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantDashboardComponent {

  restaurantView: Observable<RestaurantView>;
  comments: Observable<CommentView[]>;
  uid: Observable<string>;
  owner: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {
    this.restaurantView = this.store.select(selectRoutedRestaurant);
    this.store.select(getRouterState)
          .pipe(
            filter(route => route.state.params.restaurantID),
            map(route => new SAReadAllChildren({
              resourceName: 'restaurants',
              id: route.state.params.restaurantID,
              schema: mySchema}))
          ).subscribe(action => this.store.dispatch(action));
    this.uid = this.store.select(uid);
    this.comments = this.store.select(selectCurrentRestaurantCommentViews);
    this.owner = zip(this.restaurantView, this.uid).pipe(map(data => data[0].owner === data[1]));
  }

  createComment(comment: Comment) {
    this.store.dispatch(new SACreate<Comment>({resourceName: 'restaurantComments', id: comment.id, entity: comment}));
  }

  newQueryData(data: {resourceName: string, data: QueryData<any>}) {
    this.store.dispatch(namedAction('restaurantComments', new SetData({resourcename: 'restaurantComments', data: data.data})));
  }

  createMenu(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  dineAt(restaurantID) {
    const closedFunction = (tableID: any) =>
      tableID === '' ? Observable.of() : from([new SetRestaurant({restaurantID}), new SetTable({table : tableID})]);
    this.store.dispatch(new DialogOpen({template: SelectTableDialogComponent, afterClosed: closedFunction}));
  }
}
