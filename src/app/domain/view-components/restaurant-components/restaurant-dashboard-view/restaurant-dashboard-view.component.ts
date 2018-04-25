import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Ordering, QueryFilter } from '../../../../../ngrx/util/BasicServer';
import { Comment } from '../../../data/models/comment.model';
import { CommentView } from '../../../data/view/comment.view';
import { emptyRestaurant, RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-restaurant-dashboard-view',
  templateUrl: './restaurant-dashboard-view.component.html',
  styleUrls: ['./restaurant-dashboard-view.component.css', './restaurant-dashboard-view.component.scss-theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantDashboardViewComponent implements OnInit {

  @Input() restaurant: RestaurantView;
  @Input() uid: string;
  @Input() comments: CommentView[] = [];
  @Input() owner: boolean;

  @Output() createComment = new EventEmitter<Comment>();
  @Output() newQuery = new EventEmitter<any>();
  @Output() addMenu = new EventEmitter<TemplateRef<any>>();
  @Output() dineAt = new EventEmitter<any>();

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
      value: this.restaurant.id
    };
  }
}
