import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { DialogEffects } from './DialogStore/Dialog.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([DialogEffects]),
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatListModule
  ],
  exports: [
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatListModule
  ]
})
export class CustomMaterialModule { }
