import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { AccountGuideComponent } from './account-guide/account-guide.component';
import { BasketGuideComponent } from './basket-guide/basket-guide.component';
import { OrdersGuideComponent } from './orders-guide/orders-guide.component';
import { RestaurantGuideComponent } from './restaurant-guide/restaurant-guide.component';
import { SearchGuideComponent } from './search-guide/search-guide.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    AccountGuideComponent,
    UserGuideComponent,
    RestaurantGuideComponent,
    BasketGuideComponent,
    OrdersGuideComponent,
    SearchGuideComponent
  ],
  exports: [
    AccountGuideComponent,
    UserGuideComponent,
    RestaurantGuideComponent,
    BasketGuideComponent,
    OrdersGuideComponent,
    SearchGuideComponent
  ]
})
export class GuidesModule { }
