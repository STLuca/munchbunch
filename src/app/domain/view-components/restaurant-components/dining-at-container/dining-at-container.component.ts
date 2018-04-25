import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectDiningAtTable } from '../../../../store/clientState/orders/orders.selectors';
import { Go } from '../../../../store/router/router.actions';
import { selectDiningAtRestaurantView } from '../../../data/store';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-dining-at-container',
  templateUrl: './dining-at-container.component.html',
  styleUrls: ['./dining-at-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiningAtContainerComponent {

  restaurant: Observable<RestaurantView>;
  table: Observable<string>;

  constructor(
    private store: Store<any>
  ) {
    this.restaurant = this.store.select(selectDiningAtRestaurantView);
    this.table = this.store.select(selectDiningAtTable);
   }

  navigateToRestaurant(restaurantID: string) {
    this.store.dispatch(new Go({path: ['/restaurant', restaurantID]}));
  }

}
