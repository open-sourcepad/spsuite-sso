import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProjectDetailsComponent } from './project-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ProjectDetailsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);