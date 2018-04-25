import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { RestaurantComponentsModule } from '../restaurant-components/restaurant-components.module';
import { BasketOrdersContainerComponent } from './basket-orders-container/basket-orders-container.component';
import { BasketOrdersViewComponent } from './basket-orders-view/basket-orders-view.component';
import { MyCurrentOrdersComponent } from './my-current-orders/my-current-orders.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RestaurantComponentsModule
  ],
  declarations: [
    MyCurrentOrdersComponent,
    BasketOrdersContainerComponent,
    OrderViewComponent,
    OrdersTableComponent,
    RestaurantOrdersComponent,
    BasketOrdersViewComponent
  ],
  exports: [
    MyCurrentOrdersComponent,
    BasketOrdersContainerComponent,
    OrderViewComponent,
    RestaurantOrdersComponent
  ]
})
export class OrderComponentsModule { }
