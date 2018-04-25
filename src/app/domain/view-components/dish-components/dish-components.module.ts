import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { CommentFormsModule } from '../../forms/comment-forms/comment-forms.module';
import { DeleteFormsModule } from '../../forms/delete-forms/delete-forms.module';
import { DishFormsModule } from '../../forms/dish-forms/dish-forms.module';
import { ViewComponentsFormsModule } from '../../forms/viewComponentsForms.module';
import { CommentComponentsModule } from '../comment-components/comment-components.module';
import { DishContainerComponent } from './dish-container/dish-container.component';
import { DishViewWithReviewsComponent } from './dish-view-with-reviews/dish-view-with-reviews.component';
import { DishViewComponent } from './dish-view/dish-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedModule,
    ViewComponentsFormsModule,
    CommentComponentsModule,
    CommentFormsModule,
    DishFormsModule,
    DeleteFormsModule
  ],
  declarations: [
    DishViewComponent,
    DishContainerComponent,
    DishViewWithReviewsComponent
  ],
  exports: [
    DishContainerComponent
  ]
})
export class DishComponentsModule { }
