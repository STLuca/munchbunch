import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { GuidesModule } from './guides/guides.module';
import { HelpSidenavComponent } from './help-sidenav/help-sidenav.component';
import { LinkViewComponent } from './link-view/link-view.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    GuidesModule
  ],
  declarations: [
    HelpSidenavComponent,
    LinkViewComponent
  ]
})
export class HelpguideModule { }
