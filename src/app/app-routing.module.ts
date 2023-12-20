import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignInGuard } from './core/guards/sign-in.guard';

const routes: Routes = [
  {
    path: 'home',    
    loadChildren: () => import('./features/home/home.module').then( m => m.HomeModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'auth',    
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule),
    canActivate: [ SignInGuard ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
