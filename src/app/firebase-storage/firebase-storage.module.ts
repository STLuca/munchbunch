import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    AngularFireStorageModule
  ],
  declarations: [UploadComponent],
  exports: [
    UploadComponent
  ]
})
export class FirebaseStorageModule { }
