import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SADelete } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { uid } from '../../../../firebase-auth/store/auth.reducer';
import { Go } from '../../../../store/router/router.actions';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-restaurant-card-container',
  templateUrl: './restaurant-card-container.component.html',
  styleUrls: ['./restaurant-card-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardContainerComponent implements OnInit {

  @Input() restaurant: RestaurantView;
  @Input() distance ?: number;
  uid: Observable<string>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {
    this.uid = this.store.select(uid);
  }

  ngOnInit() {
  }

  navigateToRestaurant(restaurantId: string) {
    this.store.dispatch(new Go({path: ['/restaurant', restaurantId]}));
  }

  navigateToRestaurantOrders(restaurantId: string) {
    this.store.dispatch(new Go({path: ['/restaurant', restaurantId, 'orders']}));
  }

  editRestaurant(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  deleteRestaurant(template: TemplateRef<any>) {
    const ref = this.dialog.open(template);
    ref.afterClosed()
      .pipe(
        map(restaurantID => new SADelete({resourceName: 'restaurants', id: restaurantID}))
      ).subscribe(action => this.store.dispatch(action));
  }
}
