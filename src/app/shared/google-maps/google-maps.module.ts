import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDDO3CTIGq6JMLmFYNhdapDzcl5Qua0i0'
    })
  ],
  declarations: [],
  exports: [
    AgmCoreModule
  ]
})
export class GoogleMapsModule { }
