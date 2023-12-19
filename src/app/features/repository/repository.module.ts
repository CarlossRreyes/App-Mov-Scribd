import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { IonicModule } from '@ionic/angular';
import { RepositoryPage } from './pages/repository/repository.page';



@NgModule({
  declarations: [
    RepositoryPage
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    IonicModule
  ]
})
export class RepositoryModule { }
