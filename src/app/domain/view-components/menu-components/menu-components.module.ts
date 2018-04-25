import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../../../custom-material/custom-material.module';
import { DishFormsModule } from '../../forms/dish-forms/dish-forms.module';
import { MenuFormsModule } from '../../forms/menu-forms/menu-forms.module';
import { ViewComponentsFormsModule } from '../../forms/viewComponentsForms.module';
import { DishComponentsModule } from '../dish-components/dish-components.module';
import { MenuContainerComponent } from './menu-container/menu-container.component';
import { MenuListViewComponent } from './menu-list-view/menu-list-view.component';
import { MenuViewComponent } from './menu-view/menu-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    DishFormsModule,
    MenuFormsModule,
    DishComponentsModule
  ],
  declarations: [
    MenuContainerComponent,
    MenuListViewComponent,
    MenuViewComponent
  ],
  exports: [
    MenuContainerComponent,
    MenuListViewComponent
  ]
})
export class MenuComponentsModule { }
