import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-restaurant-search-view',
  templateUrl: './restaurant-search-view.component.html',
  styleUrls: ['./restaurant-search-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantSearchViewComponent {

  @Input() location: {lat: number, lng: number};
  @Input() restaurants: Array<{restaurant: RestaurantView, distance: number}>;

  @Output() updateLocation = new EventEmitter<{lat: number, lng: number}>();
  @Output() selectRestaurant = new EventEmitter<TemplateRef<any>>();
  @Output() getMyLocation = new EventEmitter();

}
