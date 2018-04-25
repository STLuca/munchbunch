import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { NgrxServerWrapperImp } from '../../../../../ngrx/util/NgrxDatastore';
import { SADelete } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { uid as selectUid } from '../../../../firebase-auth/store/auth.reducer';
import { Comment } from '../../../data/models/comment.model';
import { CommentView } from '../../../data/view/comment.view';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentContainerComponent implements OnInit {

  @Input() comment: CommentView;
  @Input() resource: 'dishComments' | 'restaurantComments';
  commentOwner: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.commentOwner = this.store.select(selectUid).map(uid => uid === this.comment.user.id);
  }

  deleteComment(templateRef: TemplateRef<any>) {
    const ref = this.dialog.open(templateRef);
    ref.afterClosed()
      .pipe(
        filter(commentId => !!commentId),
        map(commentId => new SADelete<Comment>({resourceName: this.resource, id: commentId}))
      ).subscribe(action => this.store.dispatch(action));
  }

}
