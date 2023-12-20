import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/sign-in/sign-in.page';


const routes: Routes = [
  // {
  //   path: 'sign-in',
  //   component: SignInPage
  // },
  // {
  //   path: '**',
  //   redirectTo: '/auth/sign-in'
  // },

  {
    path: '',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule )
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
