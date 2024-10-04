import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () =>
      import('../app/components/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () =>import('../app/components/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    
  },
  {
    path: '**',
    redirectTo: 'home',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
