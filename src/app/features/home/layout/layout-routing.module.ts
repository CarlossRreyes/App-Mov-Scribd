import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'repository',
        loadChildren:  () => import('../../repository/repository.module').then(m => m.RepositoryModule)
      },
      {
        path: 'category',
        loadChildren:  () => import('../../category/category.module').then(m => m.CategoryModule )
      },
      {
        path: 'user',
        loadChildren:  () => import('../../user/user.module').then(m => m.UserModule )
      },
      {
        path: '',
        redirectTo: '/home/tab/repository',
        pathMatch: 'full'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
