import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ClientPortalComponent } from './client-portal.component';


export const routes: Routes = [
  { path: 'projects',
    component: ClientPortalComponent,
    children: [
    { path: '', component: ProjectsComponent },
    { path: ':id', component: ProjectsDetailsComponent }
  ]},
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
