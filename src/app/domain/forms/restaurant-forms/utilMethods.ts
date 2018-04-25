import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from '../../data/models/restaurant.model';
import { RestaurantView } from '../../data/view/restaurant.view';

const emptyRestaurant: RestaurantView = {
    id: '',
    name: '',
    type: '',
    description: '',
    picture: '',
    location: null,
    owner: '',
    menus: [],
    comments: []
  };

  export function createRestaurantFormGroup(fb: FormBuilder, restaurant ?: RestaurantView): FormGroup {
    // let r = restaurant ? restaurant : emptyRestaurant;
    const r = restaurant ? restaurant : emptyRestaurant;

    return fb.group({
        name: [r.name, Validators.required],
        type: [r.type, Validators.required],
        description: [r.description, Validators.required],
        picture: [r.picture, Validators.required],
        location: [r.location, Validators.required]
    });

  }

  export function restaurantFormToModel(data: any, id: string, owner: string): Restaurant {
    return {
        ...data,
        id,
        owner
    };
  }
