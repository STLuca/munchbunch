import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { FirebaseAuthModule } from '../../../firebase-auth/firebase-auth.module';
import { SharedModule } from '../../../shared/shared.module';
import { RestaurantFormsModule } from '../../forms/restaurant-forms/restaurant-forms.module';
import { UserFormsModule } from '../../forms/user-forms/user-forms.module';
import { OrderComponentsModule } from '../order-components/order-components.module';
import { PurchaseComponentsModule } from '../purchase-components/purchase-components.module';
import { RestaurantComponentsModule } from '../restaurant-components/restaurant-components.module';
import { UserDashboardViewComponent } from './user-dashboard-view/user-dashboard-view.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserSmallContainerComponent } from './user-small-container/user-small-container.component';
import { UserSmallViewComponent } from './user-small-view/user-small-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RestaurantFormsModule,
    RestaurantComponentsModule,
    UserFormsModule,
    SharedModule,
    OrderComponentsModule,
    PurchaseComponentsModule,
    FirebaseAuthModule
  ],
  declarations: [
    UserDashboardViewComponent,
    UserDashboardComponent,
    UserSmallViewComponent,
    UserSmallContainerComponent
  ],
  exports: [
    UserDashboardComponent,
    UserSmallContainerComponent
  ]
})
export class UserComponentsModule { }
