import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgrxServerWrapperImp } from '../../../../../ngrx/util/NgrxDatastore';
import { SACreate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Restaurant } from '../../../data/models/restaurant.model';
import { createRestaurantFormGroup, restaurantFormToModel } from '../utilMethods';


@Component({
  selector: 'app-add-restaurant-form',
  templateUrl: './add-restaurant-form.component.html',
  styleUrls: ['./add-restaurant-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRestaurantFormComponent {

  @Input() uid: string;

  restaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public serverAdapter: NgrxServerWrapperImp,
    public store: Store<any>
  ) {
    this.restaurantForm = createRestaurantFormGroup(fb);
   }

  submit(val: any) {
    const restaurant: Restaurant = restaurantFormToModel(val, this.serverAdapter.createId(), this.uid);
    this.store.dispatch(new SACreate<Restaurant>({resourceName: 'restaurants', id: restaurant.id, entity: restaurant}));
    this.store.dispatch(new DialogClose());
  }

}
