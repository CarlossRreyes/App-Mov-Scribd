import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { CreateUpdatesDocumentsComponent } from './components/create-updates-documents/create-updates-documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HomeModule } from 'src/app/features/home/home.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HomeModule
  ],
  declarations: [
    UserPage,
    CreateUpdatesDocumentsComponent
  
  ]
})
export class UserPageModule {}
