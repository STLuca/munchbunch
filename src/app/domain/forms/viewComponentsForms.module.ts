import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../custom-material/custom-material.module';
import { FirebaseStorageModule } from '../../firebase-storage/firebase-storage.module';
import { ViewComponentsModule } from '../view-components/view-components.module';
import { SelectTableDialogComponent } from './select-table-dialog/select-table-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FirebaseStorageModule
  ],
  declarations: [
    SelectTableDialogComponent,
  ],
  exports: [
    SelectTableDialogComponent,
  ],
  entryComponents: [
    SelectTableDialogComponent
  ]
})
export class ViewComponentsFormsModule { }
