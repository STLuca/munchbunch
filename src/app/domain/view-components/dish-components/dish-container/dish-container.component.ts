import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { namedAction } from '../../../../../ngrx/reducers/FilteredReducer';
import { NgrxServerWrapperImp } from '../../../../../ngrx/util/NgrxDatastore';
import { SACreate, SADelete } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { uid } from '../../../../firebase-auth/store/auth.reducer';
import { QueryData } from '../../../../shared/ngrx-pagination/ngrx-pagination.component';
import { selectCurrentDishCommentViews } from '../../../../store';
import { AddOrder } from '../../../../store/clientState/orders/orders.action';
import { SetData } from '../../../../store/clientState/QueryState/queryState.reducer';
import { Comment } from '../../../data/models/comment.model';
import { Dish } from '../../../data/models/dish.model';
import { validDishes as selectValidDishes } from '../../../data/store';
import { CommentView } from '../../../data/view/comment.view';
import { DishView } from '../../../data/view/dish.view';

@Component({
  selector: 'app-dish-container',
  templateUrl: './dish-container.component.html',
  styleUrls: ['./dish-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishContainerComponent implements OnInit {

  @Input() dish: DishView;
  @Input() menuID: string;
  uid: Observable<string>;
  comments: Observable<CommentView[]>;
  orderable: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {
      this.uid = this.store.select(uid);
      this.comments = this.store.select(selectCurrentDishCommentViews);

    }

  ngOnInit() {
    this.orderable = this.store.pipe(
        select(selectValidDishes),
        map(validDishes => validDishes.includes(this.dish.id)));
  }

  addOrder(dishID: string) {
    this.store.dispatch(new AddOrder({dishID}));
  }

  showReviews(template) {
    this.dialog.open(template);
  }

  createComment(comment: Comment) {
    this.store.dispatch(new SACreate<Comment>({resourceName: 'dishComments', id: comment.id, entity: comment}));
  }

  newQueryData(data: {resourceName: string, data: QueryData<any>}) {
    this.store.dispatch(namedAction('dishComments', new SetData({resourcename: 'dishComments', data: data.data})));
  }

  editDish(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  deleteDish(template: TemplateRef<any>) {
    const ref = this.dialog.open(template);
    ref.afterClosed()
      .filter(dishID => dishID != null)
      .map(dishID => new SADelete<Dish>({resourceName: 'dishes', id: dishID}))
      .subscribe(action => this.store.dispatch(action));
  }
}
