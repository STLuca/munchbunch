import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SAUpdate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { User } from '../../../data/models/user.model';
import { UserView } from '../../../data/view/user.view';
import { createUserFormGroup, userFormToModel } from '../utilMethods';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserFormComponent implements OnInit {

  @Input() user: UserView;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.userForm = createUserFormGroup(this.fb, this.user);
  }

  submit(val: any) {
    const user: User = userFormToModel(val, this.user.id);
    this.store.dispatch(new SAUpdate<User>({resourceName: 'users', id: this.user.id, updatedEntity: user}));
    this.store.dispatch(new DialogClose());
  }

}
