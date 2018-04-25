import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { FirebaseStorageModule } from '../../../firebase-storage/firebase-storage.module';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { DishFormViewComponent } from './dish-form-view/dish-form-view.component';
import { UpdateDishFormComponent } from './update-dish-form/update-dish-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FirebaseStorageModule
  ],
  declarations: [
    DishFormViewComponent,
    AddDishFormComponent,
    UpdateDishFormComponent
  ],
  exports: [
    AddDishFormComponent,
    UpdateDishFormComponent
  ]
})
export class DishFormsModule { }
