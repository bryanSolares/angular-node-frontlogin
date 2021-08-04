import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const appRoutes: Routes = [
  { path: 'login', loadChildren: () => import('@pages/auth/login/login.module').then(m => m.LoginModule), canActivate: [CheckLoginGuard] },
  { path: 'admin', loadChildren: () => import('@pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'not-found', loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '', loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
