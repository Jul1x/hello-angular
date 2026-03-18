/**
 * main.ts - PUNTO DE ENTRADA DE LA APLICACIÓN 🚀
 *
 * Este es el PRIMER archivo que se ejecuta cuando alguien abre tu página web.
 * Su trabajo es arrancar ("bootstrap") Angular con el componente principal (AppComponent)
 * y la configuración global (appConfig) que incluye Firebase, las rutas, etc.
 *
 * Piensa en este archivo como encender el motor de un carro:
 * - AppComponent = el volante (lo que el usuario ve y controla)
 * - appConfig    = el motor (Firebase, rutas, servicios internos)
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));