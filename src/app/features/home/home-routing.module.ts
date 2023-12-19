import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';

const routes: Routes = [
  {
    path: "",
    redirectTo: "tab",
    pathMatch: "full"
  },

  {
    path: 'tab',
    loadChildren: () => import('../home/layout/layout.module').then( m => m.LayoutPageModule )
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
