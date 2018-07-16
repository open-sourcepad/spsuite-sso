import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './project-portal.routing';
import { ProjectPortalComponent } from './project-portal.component';
// import { AddProjectComponent } from '../shared/add-project';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module'; 
import { ToastaModule } from 'ngx-toasta';
// import { ProjectDetailsComponent } from './project-details/project-details.component';

const MODULE_COMPONENTS = [
  // ProjectDetailsComponent
  // AddProjectComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    routing,
    ToastaModule.forRoot(),
  ],
  declarations: [
    ProjectPortalComponent,
    ...MODULE_COMPONENTS
  ],
})

export class ProjectPortalModule {}
