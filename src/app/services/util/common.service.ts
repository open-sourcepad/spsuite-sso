import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class CommonService {

  extractData(response: Response) {
    const body = response.json();
    return body || { };
  }

  handleError (error: Response | any) {
    return Observable.throw(error);
  }

}
