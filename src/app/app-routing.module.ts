import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home/index', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'home', loadChildren: () => import('src/app/components/home/home.module').then(m => m.HomeModule)},
  { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] }
  /*
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] }*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
