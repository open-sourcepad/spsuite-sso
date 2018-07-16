import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.pug',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  @Input('projectInfo') projectInfo;

  constructor() { }

  ngOnInit() {
  }

}
