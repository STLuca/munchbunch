import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommentFormComponent
  ],
  exports: [
    CommentFormComponent
  ]
})
export class CommentFormsModule { }
