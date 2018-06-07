import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DemoComponent } from './demo/demo.component'

export const ROUTES: Routes = [
  { path: 'demo', component: DemoComponent },
  { path: '**', redirectTo: '/' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false });