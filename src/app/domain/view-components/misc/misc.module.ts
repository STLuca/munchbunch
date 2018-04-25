import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { FirebaseAuthModule } from '../../../firebase-auth/firebase-auth.module';
import { GoogleMapsModule } from '../../../shared/google-maps/google-maps.module';
import { RestaurantSearchFormModule } from '../../forms/restaurant-search-form/restaurant-search-form.module';
import { RestaurantComponentsModule } from '../restaurant-components/restaurant-components.module';
import { UserComponentsModule } from '../user-components/user-components.module';
import { BasketComponent } from './basket/basket.component';
import { FrameComponent } from './frame/frame.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantSearchContainerComponent } from './restaurant-search-container/restaurant-search-container.component';
import { RestaurantSearchViewComponent } from './restaurant-search-view/restaurant-search-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    GoogleMapsModule,
    RestaurantComponentsModule,
    RestaurantSearchFormModule,
    FirebaseAuthModule,
    UserComponentsModule
  ],
  declarations: [
    BasketComponent,
    RestaurantSearchViewComponent,
    RestaurantSearchContainerComponent,
    HomeComponent,
    HeaderComponent,
    FrameComponent
  ],
  exports: [
    BasketComponent,
    HomeComponent,
    FrameComponent
  ]
})
export class MiscModule { }
