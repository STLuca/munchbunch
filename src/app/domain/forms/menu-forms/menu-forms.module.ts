import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { AddMenuFormComponent } from './add-menu-form/add-menu-form.component';
import { MenuFormViewComponent } from './menu-form-view/menu-form-view.component';
import { UpdateMenuFormComponent } from './update-menu-form/update-menu-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  declarations: [
    MenuFormViewComponent,
    AddMenuFormComponent,
    UpdateMenuFormComponent
  ],
  exports: [
    AddMenuFormComponent,
    UpdateMenuFormComponent
  ]})
export class MenuFormsModule { }
