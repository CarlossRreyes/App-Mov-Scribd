import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserPage } from './pages/user/user.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class UserModule { }
