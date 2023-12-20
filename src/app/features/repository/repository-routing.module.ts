import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoryPage } from './pages/repository/repository.page';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import( './pages/repository/repository.module' ).then( m => m.RepositoryPageModule )
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
