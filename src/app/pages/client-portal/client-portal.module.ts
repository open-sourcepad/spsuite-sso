import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ProjectOverviewComponent } from './+project-overview/project-overview.component';
import { ClientPortalComponent } from './client-portal.component';
import { routing } from './client-portal.routes';
import { ProjectStoriesComponent } from './+project-stories/project-stories.component';
import { ProjectChartComponent } from './+project-chart/project-chart.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ProjectsComponent, ProjectsDetailsComponent, ProjectOverviewComponent, ClientPortalComponent, ProjectStoriesComponent, ProjectChartComponent]
})
export class ClientPortalModule {}
