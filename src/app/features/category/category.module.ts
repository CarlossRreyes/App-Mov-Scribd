import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IonicModule } from '@ionic/angular';
import { CategoryPage } from './pages/category/category.page';


@NgModule({
  declarations: [
    CategoryPage
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    IonicModule
  ]
})
export class CategoryModule { }
