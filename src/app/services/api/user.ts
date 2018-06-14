import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private apiEndpoint = `${environment.api_url}/api/users`;

  constructor(private http: HttpService) {}

  update(userId: number, payload: Object): any {
    return this.http.patch(`${this.apiEndpoint}/${userId}`, { user: payload });
  }

}
