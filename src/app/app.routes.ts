import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';
import { ProductosComponent } from './productos/productos';
import { InformacionComponent } from './informacion/informacion';
import { AdminLoginComponent } from './admin-login/admin-login';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'inicio' }
];
