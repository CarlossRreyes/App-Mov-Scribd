import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { ViewDocumentsByCategoryComponent } from './view-documents-by-category/view-documents-by-category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule
  ],
  declarations: [
    CategoryPage,
    ViewDocumentsByCategoryComponent
  ]
})
export class CategoryPageModule {}
