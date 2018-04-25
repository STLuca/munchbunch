import { FormBuilder, FormGroup } from '@angular/forms';
import { UserView } from '../../data/view/user.view';

const emptyUser: UserView = {
    id: '',
    name: '',
    pictureUrl: '',
    restaurants: [],
    orders: []
};

export function createUserFormGroup(fb: FormBuilder, user ?: UserView): FormGroup {
    const u = user ? user : emptyUser;

    return fb.group({
        name: [u.name],
        pictureUrl: [u.pictureUrl]
    });
}

export function userFormToModel(form: any, id: string) {
    return {
        ...form,
        id
    };
}
