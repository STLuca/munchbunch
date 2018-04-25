import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { SAUpdate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Restaurant } from '../../../data/models/restaurant.model';
import { RestaurantView } from '../../../data/view/restaurant.view';
import { createRestaurantFormGroup, restaurantFormToModel } from '../utilMethods';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateRestaurantComponent implements OnInit {

  @Input() uid: string;
  @Input() restaurant: RestaurantView;

  restaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.restaurantForm = createRestaurantFormGroup(this.fb, this.restaurant);
  }

  submit(val: any) {
    const restaurant: Restaurant = restaurantFormToModel(val, this.restaurant.id, this.uid);
    this.store.dispatch(new SAUpdate<Restaurant>({resourceName: 'restaurants', id: restaurant.id, updatedEntity: restaurant}));
    this.store.dispatch(new DialogClose());
  }

}
