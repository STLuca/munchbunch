import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { DeleteFormsModule } from '../../forms/delete-forms/delete-forms.module';
import { CommentContainerComponent } from './comment-container/comment-container.component';
import { CommentViewComponent } from './comment-view/comment-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    DeleteFormsModule
  ],
  declarations: [
    CommentViewComponent,
    CommentContainerComponent
  ],
  exports: [
    CommentContainerComponent
  ]
})
export class CommentComponentsModule { }
