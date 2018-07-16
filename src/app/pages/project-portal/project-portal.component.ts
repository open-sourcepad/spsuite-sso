import { Component, OnInit } from '@angular/core';
import { ProjectPortalData } from '../../data';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProjectService, CommendationService, UserService } from '../../services/api';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Component({
  templateUrl: './project-portal.pug',
  styleUrls: ['./project-portal.scss']
})

export class ProjectPortalComponent implements OnInit {

  public projModal = new BehaviorSubject<any>({modal: false});

  projects: any;
  showAddProjectModal: boolean = false;
  archivedLabel:any = 'Archived Projects';

  constructor(
    private router: Router,
    private toastaService:ToastaService, 
    private toastaConfig: ToastaConfig,
    private data: ProjectPortalData,
    private projectService: ProjectService,
    private userService: UserService,
    private commendationService: CommendationService
  ) {
    this.toastaConfig.theme = 'material';
    this.toastaConfig.position = 'top-right';
  }

  ngOnInit() {
    this.getProjects();

    // this.commendationService.create({ "resource": { "to_employee_id": "eb7436b7-4b8f-4d5a-b51a-3e0ac07f5bc6", "message": "This is from postman", "is_cit": false } })
    //   .subscribe(
    //     res => {
    //       console.log('sdsds', res);
    //     }
    //   );
  }

  getProjects() {
    this.userService.projects()
      .subscribe(
        res => {
          this.projects = res['data'];
        }
      );
  }

  getArchivedProjects() {
    this.projectService.query({})
      .subscribe(
        res => {
          this.projects = res['data'];
        }
      );
  }

  toggleProjectTypes(event: any) {
    if (event.target.checked) {
      this.getProjects();
      this.archivedLabel = 'Active Projects'
    } else {
      this.getArchivedProjects();
      // this.projects = this.data.projects;
      this.archivedLabel = 'Archived Projects'
    }
  }

  addProject() {
    this.projModal.next({modal: true})
    //this.showAddProjectModal = !this.showAddProjectModal;
  }

  submitProject(values) {
    let payload = { resource: values };
    this.projectService.create(payload)
      .subscribe(
        res => {
          this.projModal.next({modal: false});
          var toastOptions:ToastOptions = {
            
              title: "Success",
              msg: "Project Added",
              showClose: true,
              timeout: 5000,
              onAdd: (toast:ToastData) => {
                  console.log('Toast ' + toast.id + ' has been added!');
              },
              onRemove: function(toast:ToastData) {
                  console.log('Toast ' + toast.id + ' has been removed!');
              }
          };
          this.toastaService.success(toastOptions);
          this.router.navigate(['/project-portal', res['data']['id']])
        }
      )
  }

}
