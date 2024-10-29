import { Routes } from '@angular/router';
import { VehiclesTableComponent } from './features/Vehicle/Components/vehicles-table/vehicles-table.component';
import { LoginComponent } from './features/Login/Components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: VehiclesTableComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección a home como ruta principal
    { path: '**', redirectTo: '/login' } // Redirección a home para rutas no encontradas
  ];
