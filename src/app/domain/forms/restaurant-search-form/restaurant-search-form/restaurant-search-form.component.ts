import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SetFilter, SetRadius } from '../../../../store/clientState/restaurantSearch/restaurantSearch.action';

@Component({
  selector: 'app-restaurant-search-form',
  templateUrl: './restaurant-search-form.component.html',
  styleUrls: ['./restaurant-search-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantSearchFormComponent {


  constructor(
    private store: Store<any>
  ) {}

  change(radius: number) {
    this.store.dispatch(new SetRadius({radius}));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new SetFilter({filter}));
  }

}
