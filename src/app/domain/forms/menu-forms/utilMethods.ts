import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuView } from '../../data/view/menu.view';


const emptyMenu: MenuView = {
    id: '',
    name: '',
    description: '',
    dishes: []
};

export function createMenuFormGroup(fb: FormBuilder, menu ?: MenuView): FormGroup {
    const m = menu ? menu : emptyMenu;

    return fb.group({
        name: [m.name, Validators.required],
        description: [m.description, Validators.required]
    });
}

export function menuFormToModel(form: any, id: string, restaurantID: string) {
    return {
        ...form,
        id,
        restaurantId: restaurantID
    };
}
