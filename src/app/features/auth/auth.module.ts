import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { IonicModule } from '@ionic/angular';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AuthModule { }
