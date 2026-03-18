/**
 * app.routes.ts - MAPA DE NAVEGACIÓN DE LA APLICACIÓN 🗺️
 *
 * Este archivo define TODAS las páginas que existen en la app y a qué componente
 * (archivo .ts) corresponde cada una. Angular usa estas rutas para saber qué mostrar
 * dependiendo de la URL que el usuario escribe o navega.
 *
 * Rutas públicas (cualquiera las puede ver):
 *   /inicio        → Página de bienvenida con el Hero y las características
 *   /productos     → Catálogo de productos con carrito de compras y WhatsApp
 *   /informacion   → Página de contacto con formulario de EmailJS
 *
 * Rutas privadas (solo administradores):
 *   /admin/login     → Formulario de inicio de sesión para el admin
 *   /admin/dashboard → Panel CRUD de productos (protegido con authGuard)
 *
 * El "canActivate: [authGuard]" en el dashboard es el CANDADO 🔒 que impide
 * que personas no autorizadas entren al panel. Si no estás logueado, te redirige al login.
 */
import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';
import { ProductosComponent } from './productos/productos';
import { InformacionComponent } from './informacion/informacion';
import { AdminLoginComponent } from './admin-login/admin-login';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },                              // URL vacía → redirige a /inicio
  { path: 'inicio', component: InicioComponent },                                     // Página principal
  { path: 'productos', component: ProductosComponent },                                // Catálogo y carrito
  { path: 'informacion', component: InformacionComponent },                            // Contacto
  { path: 'admin/login', component: AdminLoginComponent },                             // Login del administrador
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] }, // Panel protegido
  { path: '**', redirectTo: 'inicio' }                                                 // Cualquier otra URL → inicio
];
