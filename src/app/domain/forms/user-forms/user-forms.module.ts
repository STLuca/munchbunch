import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { FirebaseStorageModule } from '../../../firebase-storage/firebase-storage.module';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { UserFormViewComponent } from './user-form-view/user-form-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FirebaseStorageModule
  ],
  declarations: [
    UserFormViewComponent,
    AddUserFormComponent,
    UpdateUserFormComponent
  ],
  exports: [
    UpdateUserFormComponent
  ]
})
export class UserFormsModule { }
