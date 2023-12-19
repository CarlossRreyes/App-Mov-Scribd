import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserPage } from './pages/user/user.page';
import { CreateUpdateDocumentComponent } from './components/create-update-document/create-update-document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [
    UserPage,
    CreateUpdateDocumentComponent
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
