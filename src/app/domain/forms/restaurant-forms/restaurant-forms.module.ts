import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { FirebaseStorageModule } from '../../../firebase-storage/firebase-storage.module';
import { GoogleMapsFormModule } from '../google-maps-form/google-maps-form.module';
import { ViewComponentsFormsModule } from '../viewComponentsForms.module';
import { AddRestaurantFormComponent } from './add-restaurant-form/add-restaurant-form.component';
import { RestaurantFormViewComponent } from './restaurant-form-view/restaurant-form-view.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FirebaseStorageModule,
    ViewComponentsFormsModule,
    GoogleMapsFormModule
  ],
  declarations: [
    RestaurantFormViewComponent,
    AddRestaurantFormComponent,
    UpdateRestaurantComponent
  ],
  exports: [
    AddRestaurantFormComponent,
    UpdateRestaurantComponent
  ]
})
export class RestaurantFormsModule { }

