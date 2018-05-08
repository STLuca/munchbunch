import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SetFilter, SetRadius } from '../../../../store/clientState/restaurantSearch/restaurantSearch.action';
import { selectSearchState } from '../../../../store/clientState/restaurantSearch/restaurantSearch.reducer';
@Component({
  selector: 'app-restaurant-search-form',
  templateUrl: './restaurant-search-form.component.html',
  styleUrls: ['./restaurant-search-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantSearchFormComponent {

  currentRadius: Observable<number>;

  constructor(
    private store: Store<any>
  ) {
    this.currentRadius = this.store.select(selectSearchState).pipe(
      map(searchState => searchState.radius)
    );
  }

  change(radius: number) {
    this.store.dispatch(new SetRadius({radius}));
  }

  updateFilter(filter: string) {
    this.store.dispatch(new SetFilter({filter}));
  }

}
