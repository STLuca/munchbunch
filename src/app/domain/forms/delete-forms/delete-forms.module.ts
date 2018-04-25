import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    DeleteDialogComponent
  ],
  exports: [
    DeleteDialogComponent
  ]
})
export class DeleteFormsModule { }
