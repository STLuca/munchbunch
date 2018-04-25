import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { GoogleMapsModule } from '../../../shared/google-maps/google-maps.module';
import { SharedModule } from '../../../shared/shared.module';
import { CommentFormsModule } from '../../forms/comment-forms/comment-forms.module';
import { DeleteFormsModule } from '../../forms/delete-forms/delete-forms.module';
import { GoogleMapsFormModule } from '../../forms/google-maps-form/google-maps-form.module';
import { MenuFormsModule } from '../../forms/menu-forms/menu-forms.module';
import { RestaurantFormsModule } from '../../forms/restaurant-forms/restaurant-forms.module';
import { CommentComponentsModule } from '../comment-components/comment-components.module';
import { MenuComponentsModule } from '../menu-components/menu-components.module';
import { DiningAtContainerComponent } from './dining-at-container/dining-at-container.component';
import { DiningAtViewComponent } from './dining-at-view/dining-at-view.component';
import { RestaurantCardContainerComponent } from './restaurant-card-container/restaurant-card-container.component';
import { RestaurantCardViewComponent } from './restaurant-card-view/restaurant-card-view.component';
import { RestaurantDashboardViewComponent } from './restaurant-dashboard-view/restaurant-dashboard-view.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedModule,
    MenuFormsModule,
    GoogleMapsModule,
    MenuComponentsModule,
    CommentComponentsModule,
    CommentFormsModule,
    RestaurantFormsModule,
    DeleteFormsModule
  ],
  declarations: [
    RestaurantCardViewComponent,
    RestaurantDashboardViewComponent,
    RestaurantDashboardComponent,
    RestaurantCardContainerComponent,
    DiningAtViewComponent,
    DiningAtContainerComponent
  ],
  exports: [
    RestaurantDashboardComponent,
    RestaurantCardContainerComponent,
    DiningAtContainerComponent
  ]
})
export class RestaurantComponentsModule { }
