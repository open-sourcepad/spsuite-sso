import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/api/user.service';
import { CommendationService } from '../../services/api/commendation.service';
import { CompanyEventService } from '../../services/api/company_event.service';
import { EmployeeEventService } from '../../services/api/employee_event.service';
import { EventTypeService } from '../../services/api/event_type.service';
import { NgbdDatepickerRange } from '../daterangepicker/datepicker-range';
import { SwalService } from '../../services/utils/swal.service';

@Component({
  templateUrl: './dashboard.pug',
  styleUrls: ['./dashboard.scss']
})

export class DashboardComponent implements OnInit {

  userList: Array<{}>;
  citForm: FormGroup;
  leaveForm: FormGroup;
  timeInEST: string;
  localTime: string;
  modalActive: any;
  minDate: any;
  leaveBalance: any;
  
  commendations: Array<{}>;
  companyEvents: Array<{}>;
  employeeEvents: Array<{}>;
  eventTypes: Array<{}>;
  
  //hard code userID for now. this should come from localstorage when SSO is working.
  userID: string;

  constructor(
    private userService: UserService,
    private CommendationService: CommendationService,
    private CompanyEventService: CompanyEventService,
    private EmployeeEventService: EmployeeEventService,
    private EventTypeService: EventTypeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private swalService: SwalService

  ) {
    this.userID = "827eb377-00df-4e36-ac4c-6bd6851aee4b";
    this.citForm = this.fb.group({
      type: ['cit'],
      to: [],
      message: ['', Validators.required ]
    });
    var today = new Date();
    // {year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}
    this.leaveForm = this.fb.group({
      type: ['Vacation Leave'],
      fromDate: [],
      toDate: [],
      reason: ['', Validators.required ]
    });
  }

  selectDate(event) {
    this.leaveForm.get('toDate').setValue(event.toDate)
    this.leaveForm.get('fromDate').setValue(event.fromDate)
  }

  ngOnInit() {

    var today = new Date();
    this.commendations = [];
    this.companyEvents = [];
    this.employeeEvents = [];
    this.eventTypes = [];
    this.getTime();
    this.getCommendations();
    this.getCompanyEvents(today.getFullYear(), today.getMonth()+1);
    this.getEmployeeEvents();
    this.getEventTypes();
    this.getLeaveCount();
  }

  getLeaveCount() {
    this.userService.getLeaveCount({id: this.userID}).subscribe(resp => {
      this.leaveBalance = resp.data.attributes.leave_count;
    }, err => {
      const response = err.json()
    })
  }

  getEventTypes() {
    this.EventTypeService.getEmployeeEventTypes().subscribe(resp => {
      this.eventTypes = resp;
    }, err => {
      const response = err.json()
    })
  }

  getCompanyEvents(year, month) {
    this.CompanyEventService.query({month: month, year: year}).subscribe(resp => {
      this.companyEvents = resp;
      console.log(this.companyEvents);
    }, err => {
      const response = err.json()
    })
  }

  getEmployeeEvents() {
    this.EmployeeEventService.today({}).subscribe(resp => {
      this.employeeEvents = resp;
      console.log(this.employeeEvents);
    }, err => {
      const response = err.json()
    })
  }

  getCommendations() {
    this.CommendationService.query({}).subscribe(resp => {
      this.commendations = resp.data
    }, err => {
      const response = err.json()
    })
  }

  submitLeave(form){ 
    this.leaveForm.get('reason').markAsTouched();
    var today = new Date();
    if (this.leaveForm.valid) {
      if (!form.fromDate) {
        this.swalService.errorMessage('Oops!', 'Please select a date.');
      }
      else if (new Date(form.fromDate.year.toString()+"-"+form.fromDate.month.toString()+"-"+form.fromDate.day.toString()) < new Date(today.getFullYear()+"-"+(today.getMonth()+1).toString()+"-"+today.getDate())) {
        this.swalService.errorMessage('Oops!', 'From date cannot be less than date today.');
      }
      else if (!form.toDate) {
        form.toDate = form.fromDate
        var params = {
          event : {
            "event_type_id": form.type.data.id,
            "is_active": true,
            "date_start": form.fromDate.month.toString()+"/"+form.fromDate.day.toString()+"/"+form.fromDate.year.toString(),
            "date_end": form.fromDate.month.toString()+"/"+form.fromDate.day.toString()+"/"+form.fromDate.year.toString()
          }
        }
        this.EmployeeEventService.create(params).subscribe(resp => {
          this.swalService.successMessage('Done!', 'Successfully added employee event.');
          this.modalActive.close();
          this.getEmployeeEvents();
        }, err => {
          const response = err.json()
        });
      }
      else {
        var params = {
          event: {
            "event_type_id": form.type.data.id,
            "is_active": true,
            "date_start": form.fromDate.month.toString()+"/"+form.fromDate.day.toString()+"/"+form.fromDate.year.toString(),
            "date_end": form.fromDate.month.toString()+"/"+form.fromDate.day.toString()+"/"+form.fromDate.year.toString()
          }
        }
        this.EmployeeEventService.create(params).subscribe(resp => {
          this.swalService.successMessage('Done!', 'Successfully added employee event.');
          this.modalActive.close();
          this.getEmployeeEvents();
        }, err => {
          const response = err.json()
        });
      } 
    }
    else {
      this.swalService.errorMessage('Oops!', 'Reason is required.');
    }
  }

  submitCIT(form) {
    
    this.citForm.get('message').markAsTouched();
    if (this.citForm.valid) {
      var params = {
          "to_employee_id": form.to.id,
          "message": form.message,
          "is_cit": form.type == 'cit' ? true : false
      }

      this.CommendationService.create({resource: params}).subscribe(resp => {
        this.swalService.successMessage('Done!', 'Successfully added shout-out/CIT.');
        this.commendations.unshift({
          attributes: {
            from_employee: resp.data.attributes.from_employee,
            to_employee: resp.data.attributes.to_employee,
            is_cit: resp.data.attributes.is_cit,
            message: resp.data.attributes.message,
            date: resp.data.attributes.date
        }});
        this.modalActive.close();
      }, err => {
        const response = err.json()
      })
    }
    else {
      this.swalService.errorMessage('Oops!', 'Message is required.');
    }
  }

  openModal(content, type) {
    if (type == 'cit') {
      this.citForm.reset();
      this.userService.query({}).subscribe(resp => {
        this.userList = resp.data
        this.citForm.get('to').setValue(this.userList[0])
        this.citForm.get('type').setValue('cit')
      }, err => {
        const response = err.json()
      })
    }
    else {
      this.leaveForm.reset();
      this.leaveForm.get('type').setValue(this.eventTypes[0])
    }
    
    this.modalActive = this.modalService.open(content, {
      backdropClass: 'no-backdrop',
      windowClass: 'suite-modal',
      centered: true,
    });
    
  }

  

  getTime() {
    var today = new Date();
    this.timeInEST = today.toLocaleString('us-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'America/New_York' });
    this.localTime = today.toLocaleString('us-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Shanghai" });

    var func = this;
    var t = setTimeout(function () {
      func.getTime();
    }, 1000);
  }

  getEventText(event) {
      if(event.event_name == 'Work From Home') {
        return 'is on working from home'
      }
      if(event.event_name == 'Sick Leave') {
        return 'is on sick leave'
      }
      if(event.event_name == 'Vacation Leave') {
        return 'is on vacation leave'
      }
      if(event.event_name == 'Work on Holiday') {
        return 'is working on a holiday'
      }
      if(event.event_name == 'Half Day VL') {
        return 'is on a half-day VL'
      }
      if(event.event_name == 'Half Day SL') {
        return 'is on a half-day SL'
      }
  }
}
