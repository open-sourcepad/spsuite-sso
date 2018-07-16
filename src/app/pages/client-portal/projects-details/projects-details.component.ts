import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.pug',
  styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent implements OnInit {

  timezone = {
    manila: null,
    eastern: null,
  };
  projectInfo = {
    name: "Bedrock",
    start_date: moment('2018-01-01').format('MMMM D, YYYY'),
    live_date: moment('2018-09-19').format('MMMM D, YYYY'),    
    team: [
      {
        role: "PM",
        name: "Mil Pugeda"
      },
      {
        role: "Dev",
        name: "Mark Aventura"
      },
      {
        role: "Dev",
        name: "Erik Moreno"
      },
      {
        role: "Dev",
        name: "Jonas Arguelles"
      },
      {
        role: "Dev",
        name: "PR Manabat"
      },
      {
        role: "QA",
        name: "Herald Dela Cruz"
      },
      {
        role: "Client",
        name: "Blair"
      },
    ],
    features: [
      {
        name: "Home",
        completion: "30"
      },
      {
        name: "Epic 1",
        completion: "20"
      },
      {
        name: "Epic 2",
        completion: "20"
      },
      {
        name: "Epic 3",
        completion: "10"
      },
      {
        name: "Epic 4",
        completion: "10"
      },
      {
        name: "Epic 5",
        completion: "10"
      },
    ]
  };

  constructor() { }

  ngOnInit() {
    setInterval( () => { 
      this.timezone['manila'] = moment().zone("+08:00").format('hh:mm:ss a');
      this.timezone['eastern'] = moment().zone("-04:00").format('hh:mm:ss a');
    }, 1000);
  }

}
