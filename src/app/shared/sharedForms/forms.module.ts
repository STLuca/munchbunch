import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { FormArrayComponent } from './form-array/form-array.component';
import { OrderingFormComponent } from './ordering-form/ordering-form.component';
import { QueryFilterFormComponent } from './query-filter-form/query-filter-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  declarations: [
    FormArrayComponent,
    OrderingFormComponent,
    QueryFilterFormComponent
  ],
  exports: [
    FormArrayComponent,
    OrderingFormComponent,
    QueryFilterFormComponent
  ]
})
export class SharedFormsModule { }
