import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utils/http.service';
import { BaseService } from './base.service';


const ENDPOINT = `${APP_CONFIG['api_base']}api/commendations`;

@Injectable()
export class CommendationService extends BaseService {

  constructor(
    public http: HttpService
  ) {
    super(http, ENDPOINT);
  }

}
