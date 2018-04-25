import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { RestaurantSearchContainerComponent } from './restaurant-search-container/restaurant-search-container.component';
import { RestaurantSearchFormComponent } from './restaurant-search-form/restaurant-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    RestaurantSearchFormComponent,
    RestaurantSearchContainerComponent
  ],
  exports: [
    RestaurantSearchFormComponent
  ]
})
export class RestaurantSearchFormModule { }
