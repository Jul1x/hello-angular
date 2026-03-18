/**
 * app.config.ts - CONFIGURACIÓN CENTRAL DE LA APLICACIÓN ⚙️
 *
 * Aquí se "enchufan" todos los servicios externos que usa nuestra app.
 * Cada línea de "provide..." es como conectar un cable de corriente:
 *
 * - provideRouter(routes)     → Activa la navegación entre páginas (Inicio, Productos, Info, Admin)
 * - provideFirebaseApp(...)   → Conecta nuestra app al proyecto de Firebase (la nube de Google)
 * - provideAuth(...)          → Activa el sistema de login/logout para administradores
 * - provideFirestore(...)     → Activa la base de datos en la NUBE donde viven los productos
 *
 * 🔑 IMPORTANTE: La configuración de Firebase (apiKey, projectId, etc.) viene del archivo
 * environment.ts, que contiene las "credenciales" de conexión a los servidores de Google.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),                                              // Sistema de navegación entre páginas
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Conexión a Firebase (Google Cloud)
    provideAuth(() => getAuth()),                                        // Sistema de autenticación (login admin)
    provideFirestore(() => getFirestore())                                // Base de datos en la nube (Firestore)
  ]
};
