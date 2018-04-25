import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CustomQueryComponent } from './custom-query/custom-query.component';
import { FilteredPaginationComponent } from './filtered-pagination/filtered-pagination.component';
import { NgrxPaginationComponent } from './ngrx-pagination/ngrx-pagination.component';
import { OrderedPaginationComponent } from './ordered-pagination/ordered-pagination.component';
import { PaginatedComponentComponent } from './paginated-component/paginated-component.component';
import { SharedFormsModule } from './sharedForms/forms.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    SharedFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CustomQueryComponent,
    FilteredPaginationComponent,
    OrderedPaginationComponent,
    PaginatedComponentComponent,
    NgrxPaginationComponent
  ],
  exports: [
    CustomQueryComponent,
    NgrxPaginationComponent
  ]
})
export class SharedModule { }

