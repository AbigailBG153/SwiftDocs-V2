import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';
const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Redirige al login al iniciar la página
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Redirige al login al iniciar la página
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }  // Manejo de rutas no encontradas, redirige a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
