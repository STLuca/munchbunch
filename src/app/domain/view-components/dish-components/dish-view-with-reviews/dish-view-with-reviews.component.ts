import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ordering, QueryFilter } from '../../../../../ngrx/util/BasicServer';
import { Comment } from '../../../data/models/comment.model';
import { DishView } from '../../../data/view/dish.view';

@Component({
  selector: 'app-dish-view-with-reviews',
  templateUrl: './dish-view-with-reviews.component.html',
  styleUrls: ['./dish-view-with-reviews.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishViewWithReviewsComponent implements OnInit {

  @Input() dishView: DishView;
  @Input() uid: string;
  @Input() comments: Comment[];
  @Input() orderable: boolean;
  @Output() createComment = new EventEmitter<Comment>();
  @Output() newQuery = new EventEmitter<any>();
  @Output() addOrder = new EventEmitter();

  pagedStartOrder: Ordering<Comment>;
  pagedConstantFilter: QueryFilter<Comment>;

  constructor() { }

  ngOnInit() {
    this.pagedStartOrder = {
      field: 'timestamp',
      direction: 'desc'
    };
    this.pagedConstantFilter = {
      field: 'commenteeID',
      comparison: '==',
      value: this.dishView.id
    };
  }


}
