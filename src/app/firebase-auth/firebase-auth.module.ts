import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects/';
import { StoreModule } from '@ngrx/store';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthEffects } from './store/auth.effect';
import { authReducer } from './store/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    /// StoreModule.forFeature('auth', authReducer),
    // EffectsModule.forFeature([AuthEffects])
  ],
  declarations:
  [
    LoginComponent,
    LogoutComponent
  ],
  exports:
  [
    LoginComponent,
    LogoutComponent
  ]
})
export class FirebaseAuthModule { }
