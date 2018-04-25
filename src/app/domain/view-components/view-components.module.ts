import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { SharedModule } from '../../shared/shared.module';
import { DomainModule } from '../domain.module';
import { DishFormsModule } from '../forms/dish-forms/dish-forms.module';
import { MenuFormsModule } from '../forms/menu-forms/menu-forms.module';
import { RestaurantFormsModule } from '../forms/restaurant-forms/restaurant-forms.module';
import { ViewComponentsFormsModule } from '../forms/viewComponentsForms.module';
import { CommentComponentsModule } from './comment-components/comment-components.module';
import { DishComponentsModule } from './dish-components/dish-components.module';
import { MenuComponentsModule } from './menu-components/menu-components.module';
import { MiscModule } from './misc/misc.module';
import { OrderComponentsModule } from './order-components/order-components.module';
import { PurchaseComponentsModule } from './purchase-components/purchase-components.module';
import { RestaurantComponentsModule } from './restaurant-components/restaurant-components.module';
import { UserComponentsModule } from './user-components/user-components.module';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDDO3CTIGq6JMLmFYNhdapDzcl5Qua0i0'
    }),
    CustomMaterialModule,
    SharedModule,

    DishComponentsModule,
    MenuComponentsModule,
    RestaurantComponentsModule,
    UserComponentsModule,
    CommentComponentsModule,
    OrderComponentsModule,
    MiscModule,
    PurchaseComponentsModule
  ],
  declarations: [
  ],
  exports: [

    DishComponentsModule,
    MenuComponentsModule,
    RestaurantComponentsModule,
    UserComponentsModule,
    CommentComponentsModule,
    OrderComponentsModule,
    MiscModule,
    PurchaseComponentsModule
  ]
})
export class ViewComponentsModule { }
