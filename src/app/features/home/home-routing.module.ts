import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  {
    path: 'tab',
    component: TabsComponent,
    children: [
      {
        path: 'repository',
        loadChildren:  () => import('../repository/repository.module').then(m => m.RepositoryModule)
      },
      {
        path: 'category',
        loadChildren:  () => import('../category/category.module').then(m => m.CategoryModule )
      },
      {
        path: 'user',
        loadChildren:  () => import('../user/user.module').then(m => m.UserModule )
      },
      {
        path: '',
        redirectTo: 'repository',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tab',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
