import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '/' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false });