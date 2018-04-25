import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Ordering, QueryFilter } from '../../../../../ngrx/util/BasicServer';
import { Order } from '../../../data/models/order.model';
import { Purchase } from '../../../data/models/purchase.model';
import { selectRoutedUser } from '../../../data/store';
import { OrderView } from '../../../data/view/order.view';
import { UserView } from '../../../data/view/user.view';

@Component({
  selector: 'app-user-dashboard-view',
  templateUrl: './user-dashboard-view.component.html',
  styleUrls: ['./user-dashboard-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardViewComponent implements OnInit {

  @Input() user: UserView;
  @Input() uid: string;
  @Input() purchases: Purchase[];

  @Output() navigateToRestaurant: EventEmitter<string> = new EventEmitter<string>();
  @Output() newRestaurant: EventEmitter<TemplateRef<any>> = new EventEmitter<TemplateRef<any>>();
  @Output() newQuery = new EventEmitter<any>();

  pagedStartOrder: Ordering<Purchase>;
  pagedConstantFilter: QueryFilter<Purchase>;

  constructor() {}

  ngOnInit() {
    this.pagedStartOrder = {
      field: 'finish',
      direction: 'desc'
    };
    this.pagedConstantFilter = {
      field: 'userID',
      comparison: '==',
      value: this.user.id
    };
  }

}
