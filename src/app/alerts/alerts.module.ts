import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store/';
import { AlertsViewComponent } from './alerts-view/alerts-view.component';
import { AlertEffects } from './store/alerts/alerts.effects';
import { alertReducer } from './store/alerts/alerts.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('alertsState', alertReducer),
    EffectsModule.forFeature([AlertEffects])
  ],
  declarations: [
    AlertsViewComponent
  ],
  exports: [
    AlertsViewComponent
  ]
})
export class AlertsModule { }
