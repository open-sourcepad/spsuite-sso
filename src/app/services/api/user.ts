import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private apiEndpoint = `${environment.api_url}/api/users`;

  constructor(private http: HttpService) {}

  verify(payload: Object): any {
    return this.http.patch(`${this.apiEndpoint}/verify`, { user: payload });
  }

}
