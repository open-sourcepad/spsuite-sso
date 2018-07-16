import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectPortalData } from '../../../data';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../../../services/api';

@Component({
  templateUrl: './project-details.pug',
  styleUrls: ['../project-portal.scss']
})

export class ProjectDetailsComponent implements OnInit {

  public projModal = new BehaviorSubject<any>({modal: false});

  @Input() project;
  projects: any;
  currentProject: any;
  overallProgress: number;
  stories: any;

  constructor(
    private data: ProjectPortalData,
    private route: ActivatedRoute,
    private projDetail: ProjectService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (value) => {
        this.projectDetails(value.slug);
        this.getStories(value.slug);
      }
    )
    this.overallProgress = this.currentProject.completed

  }

  getStories(slug) {
    this.projDetail.stories(slug)
      .subscribe(
        res => {
          console.log('asdsds', res);
          this.stories = res['data'];
        }
      );
  }

  projectDetails(slug) {
    this.currentProject = 
    this.projDetail.get(slug)
      .subscribe(
        res => {
          console.log(res);
          this.currentProject = res['data']['attributes'];
          console.log(this.currentProject);
        }
      );
  }

  edit() {
    this.projModal.next({modal: true, currentProject: this.currentProject})
  }

}
