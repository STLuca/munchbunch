import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FirebaseStorageModule } from '../firebase-storage/firebase-storage.module';


import { AuthGuard } from './guards/AuthGuard';
import { RestaurantGuard } from './guards/restaurantGuard';
import { UserGuard } from './guards/UserGuard';
import { ViewComponentsModule } from './view-components/view-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FirebaseStorageModule,
    // StoreModule.forFeature('clientDatabase', clientDBReducers),
    // EffectsModule.forFeature([
    //  RestaurantEffects, UserEffects, MenuEffects, DishEffects, OrderEffects
    // ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDDO3CTIGq6JMLmFYNhdapDzcl5Qua0i0'
    }),
    RouterModule,
    ViewComponentsModule,
  ],
  declarations: [],
  exports: [
    ViewComponentsModule
  ],
  entryComponents: [
  ],
  providers: [
    AuthGuard,
    UserGuard,
    RestaurantGuard
  ]
})
export class DomainModule { }
