import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CommentView } from '../../../data/view/comment.view';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentViewComponent  {

  @Input() comment: CommentView;
  @Input() owner: boolean;
  @Output() deleteComment = new EventEmitter<TemplateRef<any>>();

}
