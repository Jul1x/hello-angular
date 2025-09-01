import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';
import { ProductosComponent } from './productos/productos';
import { InformacionComponent } from './informacion/informacion';
import { ContactoComponent } from './contacto/contacto';
import { AppComponent } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: 'inicio' }
];
