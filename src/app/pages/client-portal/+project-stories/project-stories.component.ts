import { Component, OnInit } from '@angular/core';
import { CpService } from '../../../services/api/cp.service';

@Component({
  selector: 'app-project-stories',
  templateUrl: './project-stories.component.pug',
  styleUrls: ['./project-stories.component.scss']
})
export class ProjectStoriesComponent implements OnInit {

  projectStories = {
    count: 3,
    delivered: [
      {
        id: '#158719442',
        link: 'https://www.pivotaltracker.com/story/show/158719442',
        title: 'As a user, I shall be able to select a project and see client portal'
      },
      {
        id: '#158719414',
        link: 'https://www.pivotaltracker.com/story/show/158719414',
        title: 'As a user, I shall be able to see list of projects I own'
      },
      {
        id: '#158719447',
        link: 'https://www.pivotaltracker.com/story/show/158719447',
        title: 'As a user, I shall be able to see Stream Hours section'
      }
    ]
  };

  constructor(private cpService: CpService) { }

  ngOnInit() {
    this.projectStories = this.cpService.getDeliveredStories()
  }

}
