import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { YourModuleComponent } from './your-module.component';

import { YourPageComponent } from './your-page/your-page.component';


export const routes: Routes = [
  {
    path: '',
    component: YourModuleComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'your-page',
        component: YourPageComponent
      },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

