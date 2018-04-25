import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '../../../shared/google-maps/google-maps.module';
import { GoogleMapsComponent } from './google-maps/google-maps.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule
    // AgmCoreModule.forRoot({
    //  apiKey: 'AIzaSyDDDO3CTIGq6JMLmFYNhdapDzcl5Qua0i0'
    // })
  ],
  declarations: [
    GoogleMapsComponent
  ],
  exports: [
    GoogleMapsComponent
  ]
})
export class GoogleMapsFormModule { }
