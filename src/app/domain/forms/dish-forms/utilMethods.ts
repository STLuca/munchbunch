import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../data/models/dish.model';
import { DishView } from '../../data/view/dish.view';

const emptyDish: DishView = {
    id: '',
    name: '',
    price: null,
    picture: '',
    description: '',
    comments: []
};

export function createDishFormGroup(fb: FormBuilder, dish ?: DishView): FormGroup {
    const d = dish ? dish : emptyDish;

    return fb.group({
        name: [d.name, Validators.required],
        price: [d.price, Validators.required],
        picture: [d.picture, Validators.required],
        description: [d.description, Validators.required],
    });
}

export function dishFormToModel(form: any, id: string, menuId: string): Dish {
    return {
        ...form,
        id,
        menuID: menuId
    };
}
