import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { FirestoreServer } from '../ngrx/util/FirestoreServer';
import { createDatabase, Table } from '../ngrx/util/NgrxDatabase';
import { NgrxServerWrapperImp } from '../ngrx/util/NgrxDatastore';
import { ServerAdapterEffects } from '../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.effects';
import { AlertsModule } from './alerts/alerts.module';
import { appRoutes, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { DomainModule } from './domain/domain.module';
import { RestaurantFormsModule } from './domain/forms/restaurant-forms/restaurant-forms.module';
import { ViewComponentsFormsModule } from './domain/forms/viewComponentsForms.module';
import { AuthGuard } from './domain/guards/AuthGuard';
import { RestaurantGuard } from './domain/guards/restaurantGuard';
import { UserGuard } from './domain/guards/UserGuard';
import { ViewComponentsModule } from './domain/view-components/view-components.module';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';
import { AuthEffects } from './firebase-auth/store/auth.effect';
import { HelpguideModule } from './helpguide/helpguide.module';
import { FilteredPaginationComponent } from './shared/filtered-pagination/filtered-pagination.component';
import { OrderedPaginationComponent } from './shared/ordered-pagination/ordered-pagination.component';
import { PaginatedComponentComponent } from './shared/paginated-component/paginated-component.component';
import { SharedModule } from './shared/shared.module';
import { SharedFormsModule } from './shared/sharedForms/forms.module';
import { OrderingFormComponent } from './shared/sharedForms/ordering-form/ordering-form.component';
import { QueryFilterFormComponent } from './shared/sharedForms/query-filter-form/query-filter-form.component';
import { MyOrdersEffects } from './store/clientState/orders/orders.effects';
import { QueryStateEffects } from './store/clientState/QueryState/queryState.effects';
import { RestaurantSearchEffects } from './store/clientState/restaurantSearch/restaurantSearch.effects';
import { paginationStateReducer, reducers } from './store/index';
import { CustomSerializer } from './store/router/router';
import { RouterEffects } from './store/router/router.effects';

const databaseData: Array<Table<any>> = [
  {tableName: 'users'},
  {tableName: 'comments'},
  {tableName: 'orders'},
  {tableName: 'restaurants'},
  {tableName: 'menus'},
  {tableName: 'dishes'},
  {tableName: 'dishComments'},
  {tableName: 'restaurantComments'},
  {tableName: 'purchases'}
];

const databaseReducer = createDatabase(databaseData);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MyOrdersEffects, AuthEffects, RouterEffects, RestaurantSearchEffects, QueryStateEffects, ServerAdapterEffects]),
    StoreModule.forFeature('database', databaseReducer),
    StoreModule.forFeature('paginationQueryState', paginationStateReducer),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    DomainModule,
    FirebaseAuthModule,
    CustomMaterialModule,
    AlertsModule,
    ViewComponentsModule,
    SharedModule,
    HelpguideModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer},
    FirestoreServer,
    NgrxServerWrapperImp
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
