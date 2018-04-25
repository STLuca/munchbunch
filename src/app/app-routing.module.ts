import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './domain/guards/AuthGuard';
import { RestaurantGuard } from './domain/guards/restaurantGuard';
import { UserGuard } from './domain/guards/UserGuard';
import { HomeComponent } from './domain/view-components/misc/home/home.component';
import {
  BasketOrdersContainerComponent
} from './domain/view-components/order-components/basket-orders-container/basket-orders-container.component';
import { MyCurrentOrdersComponent } from './domain/view-components/order-components/my-current-orders/my-current-orders.component';
import { RestaurantOrdersComponent } from './domain/view-components/order-components/restaurant-orders/restaurant-orders.component';
import {
  RestaurantDashboardComponent
} from './domain/view-components/restaurant-components/restaurant-dashboard/restaurant-dashboard.component';
import { UserDashboardComponent } from './domain/view-components/user-components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './firebase-auth/login/login.component';
import { HelpSidenavComponent } from './helpguide/help-sidenav/help-sidenav.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user/:userID', component: UserDashboardComponent, canActivate: [UserGuard]},
    { path: 'restaurant/:restaurantID', component: RestaurantDashboardComponent , canActivate: [RestaurantGuard]},
    { path: 'basket', component: BasketOrdersContainerComponent },
    { path: 'login', component: LoginComponent},
    { path: 'restaurant/:restaurantID/orders', component: RestaurantOrdersComponent, canActivate: [AuthGuard]},
    { path: 'help', component: HelpSidenavComponent}
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        // { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ],
    providers: [

    ]
  })
  export class AppRoutingModule {}
