import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utils/http.service';
import { BaseService } from './base.service';

const ENDPOINT = `${APP_CONFIG['api_url']}/api/projects`;


@Injectable()
export class ProjectService extends BaseService {

  constructor(
    public http: HttpService
  ) {
    super(http, ENDPOINT);
  }

  stories(uuid) {
    return this.http.get(`${this.apiEndpoint}/${uuid}/stories`);
  }

}
