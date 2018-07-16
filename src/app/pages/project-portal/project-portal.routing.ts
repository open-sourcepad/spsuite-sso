import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProjectPortalComponent } from './project-portal.component';
import { AuthGuard } from '../../services/route-guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: ProjectPortalComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: '' },
      {
        path: ':slug',
        loadChildren: './project-details/project-details.module#ProjectDetailsModule'
      },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

