import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ProjectDetailsData } from '../../../data'
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/api';

@Component({
  selector: 'add-project',
  templateUrl: './add-project.pug',
  styleUrls: ['../../project-portal/project-portal.scss']
})

export class AddProjectComponent implements OnInit {
  @ViewChild('content') content: ElementRef
  @ViewChild('add_member') add_member: ElementRef
  currentProject: any;
  modalRef;
  employeeModalRef;
  assignedUsers = [];
  form: FormGroup
  @Input() projModal;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  users = [];

  constructor(
    private route: ActivatedRoute,
    private projectDetailsData: ProjectDetailsData,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'pivotal_tracker_id': [''],
      'project_type': ['client', Validators.compose([Validators.required])],
      'is_active': ['true', Validators.compose([Validators.required])],
      'start_date': ['', Validators.compose([Validators.required])],
      'go_live_date': [''],
      'user_ids': [[]],
    })

  }

  ngOnInit() {
    this.projModal.subscribe((data: any) => {
      if (data["currentProject"]) {
        this.currentProject = data["currentProject"];
        this.populateProjectDetails();
      }
      if (data["modal"]) {
        this.modalRef  = this.modalService.open(this.content, { size: 'lg'} );
      } else if (!!this.modalRef && !data["modal"]) {
        this.modalRef.close();
      }
    });
    // this.userService.query({ limit: 50 })
    //   .subscribe(
    //     res => {
    //       // console.log('test', res);
    //       this.users = res['data'];
    //     }
    //   )
  }

  populateProjectDetails() {
    this.form.controls['name'].setValue(this.currentProject['name']);
    this.form.controls['pivotal_tracker_id'].setValue(this.currentProject['pivotal_tracker_id']);
    this.form.controls['project_type'].setValue(this.currentProject['project_type']);
    this.form.controls['is_active'].setValue(this.currentProject['is_active']);
    this.form.controls['start_date'].setValue(this.currentProject['start_date']);
    this.form.controls['go_live_date'].setValue(this.currentProject['go_live_date']);
  }

  onSubmit(values) {
    this.submit.emit(values);
  }

  handleClose() {
    this.projModal.next({modal: false})
  }

  employeeDirectory() {
    this.employeeModalRef = this.modalService.open(this.add_member, { size: 'sm'})
  }

  employeeModalClose() {
    this.employeeModalRef.close();
  }

  addMembers() {
    let newUsers = [];

    this.users.forEach(item => {
      if (item.checked) {
        this.assignedUsers.push(item);
        newUsers.push(item.id);
      }
    });

    console.log(newUsers);
    this.form.get('user_ids').setValue(newUsers);
    this.employeeModalClose();
  }

  sampleUsers() {
    return [
      {
          "id": "ec41f3e0-57a0-4d5e-b860-db90bb7afb3a",
          "type": "user",
          "attributes": {
              "email": "karlp@sourcepad.com",
              "display_name": "Karl P",
              "name": "Karl Henreich E. Potenciano",
              "department": "Websales",
              "position": "Web Developer",
              "office_location": "Ortigas",
              "mobile_number": "639952366854",
              "skype": "karlp_sp",
              "person_to_notify": "Ma. Griselda Potenciano",
              "person_to_notify_mobile": "9052053026",
              "start_date": "2016-06-01T00:00:00.000Z",
              "is_verified": false,
              "birthday": "1995-05-02T00:00:00.000Z",
              "address": "1951 C Honradez Ext. Sampaloc, Manila",
              "id_number": 2016060100,
              "tin_number": "325-055-153-000",
              "sss_number": "34-5235983-0",
              "leave_count": 19.95,
              "proximity_card_number": null,
              "age": 23,
              "termination_date": null,
              "role": null
          }
      }
    ]
  }
}
