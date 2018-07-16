import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utils/http.service';
import { BaseService } from './base.service';


const ENDPOINT = `${APP_CONFIG['api_base']}api/employee_events`;

@Injectable()
export class EmployeeEventService extends BaseService {

  constructor(
    public http: HttpService
  ) {
    super(http, ENDPOINT);
  }

  today(payload: any): any {
    return this.http.get(`${this.apiEndpoint}/today`);
  }

}
