import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddAlert } from '../../../../alerts/store/alerts/alerts.action';
import { SetLocation } from '../../../../store/clientState/restaurantSearch/restaurantSearch.action';
import { selectCurentLocation, selectRestaurantSearchResults } from '../../../data/store';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-restaurant-search-container',
  templateUrl: './restaurant-search-container.component.html',
  styleUrls: ['./restaurant-search-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantSearchContainerComponent implements OnInit {

  currentLocation: Observable<{lat: number, lng: number}>;
  restaurants: Observable<Array<{restaurant: RestaurantView, distance: number}>>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {
    this.currentLocation = this.store.select(selectCurentLocation);
    this.restaurants = this.store.select(selectRestaurantSearchResults);
   }

  ngOnInit() {
  }

  updateLocation(newLocation: {lat: number, lng: number}) {
    this.store.dispatch(new SetLocation({location: newLocation}));
  }

  selectRestaurant(template: TemplateRef<any>) {
    this.dialog.open(template, {
      width: '375px'
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => this.store.dispatch(new SetLocation({location: {lat: location.coords.latitude, lng: location.coords.longitude}})),
        (error) => this.store.dispatch(new AddAlert({alert: error.message}))
      );
    }


  }

}
