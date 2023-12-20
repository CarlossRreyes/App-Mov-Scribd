import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPage } from './pages/user/user.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
