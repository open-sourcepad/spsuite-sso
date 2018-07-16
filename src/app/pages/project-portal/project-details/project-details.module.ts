import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './project-details.routing';
import { ProjectDetailsComponent } from './project-details.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SharedModule } from '../../shared/shared.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    LoadingBarModule,
    SharedModule,
    routing,
    MomentModule
  ],
  declarations: [
    ProjectDetailsComponent
  ]
})

export class ProjectDetailsModule {}