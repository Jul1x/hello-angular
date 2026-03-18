/**
 * auth.service.ts - SERVICIO DE AUTENTICACIÓN (Login/Logout del Admin) 🔐
 *
 * Este servicio se encarga de la seguridad del panel de administración.
 * Utiliza Firebase Authentication para verificar si un usuario es válido.
 *
 * ¿Cómo funciona Firebase Auth?
 * 1. El admin escribe su email y contraseña en el formulario de login.
 * 2. Nosotros NO verificamos la contraseña aquí. La enviamos a los servidores de Google.
 * 3. Google compara contra los usuarios registrados en Firebase Console.
 * 4. Si coincide, Google nos devuelve un "token" (como un pase VIP digital).
 * 5. Ese token se guarda automáticamente en el navegador del admin.
 *
 * Métodos disponibles:
 * - login(email, password)  → Envía credenciales a Google para verificar
 * - logout()                → Elimina el token del navegador (cierra sesión)
 * - isLoggedIn              → Devuelve true/false si hay un admin conectado
 * - user$                   → Observable que otros componentes pueden "escuchar" para saber si hay sesión
 */
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación sin necesidad de importarlo en cada componente
})
export class AuthService {
  // BehaviorSubject: variable especial que AVISA a todos los que la estén "escuchando" cuando cambia
  private userSubject = new BehaviorSubject<User | null>(null);

  // Observable público: permite que otros archivos (como el Guard) "se suscriban" para saber si hay sesión
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    // onAuthStateChanged: Detector automático de Firebase que vigila si el usuario inicia/cierra sesión
    // Se ejecuta cada vez que el estado de autenticación cambia
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Avisa a todos los "observadores" del nuevo estado
    });
  }

  // Propiedad que retorna true si hay un admin logueado, false si no
  get isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  // Envía email y contraseña a Firebase para verificar (si falla, lanza un error)
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Cierra la sesión del admin y borra el token del navegador
  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
