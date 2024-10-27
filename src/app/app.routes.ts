import { Routes } from '@angular/router';
import { VehiclesTableComponent } from './features/Vehicle/vehicles-table/vehicles-table.component';
import { LoginComponent } from './features/Login/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: VehiclesTableComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección a home como ruta principal
    { path: '**', redirectTo: '/home' } // Redirección a home para rutas no encontradas
  ];
