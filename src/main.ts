import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';  // <-- importando desde dentro de app

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});