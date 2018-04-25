import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { PurchaseContainerComponent } from './purchase-container/purchase-container.component';
import { PurchaseViewComponent } from './purchase-view/purchase-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    PurchaseViewComponent,
    PurchaseContainerComponent
  ],
  exports: [
    PurchaseContainerComponent
  ]
})
export class PurchaseComponentsModule { }
