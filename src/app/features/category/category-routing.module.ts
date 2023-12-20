import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPage } from './pages/category/category.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule  )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
