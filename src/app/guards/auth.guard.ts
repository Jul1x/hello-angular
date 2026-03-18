/**
 * auth.guard.ts - GUARDIA DE SEGURIDAD DE RUTAS PROTEGIDAS 🔒
 *
 * Este archivo funciona como un "guardia de seguridad" en la puerta del panel de admin.
 * Cada vez que alguien intenta acceder a /admin/dashboard, Angular primero ejecuta este código
 * para verificar si el visitante tiene "pase" (es decir, si está logueado).
 *
 * ¿Qué pasa internamente?
 * 1. Angular intercepta la navegación a /admin/dashboard
 * 2. Ejecuta esta función (authGuard) antes de cargar la página
 * 3. Consulta al AuthService: "¿Hay un usuario logueado?"
 * 4. Si SÍ → Deja pasar (return true) y muestra el dashboard
 * 5. Si NO → Redirige automáticamente a /admin/login (return false)
 *
 * Este guard se asigna en app.routes.ts con: canActivate: [authGuard]
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService); // Obtener referencia al servicio de autenticación
  const router = inject(Router);           // Obtener referencia al sistema de navegación

  return authService.user$.pipe(
    take(1),        // Solo toma el PRIMER valor del observable (no se queda escuchando infinito)
    map(user => {
      if (user) {
        return true;  // ✅ Usuario autenticado: dejar pasar
      } else {
        router.navigate(['/admin/login']); // ❌ No autenticado: redirigir al login
        return false;
      }
    })
  );
};
