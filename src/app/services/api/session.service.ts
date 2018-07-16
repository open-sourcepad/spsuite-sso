import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utils/http.service';
import { CommonService } from '../utils/common.service';
import { LocalStorage } from '../utils/local-storage.service';
import { Subject }    from 'rxjs';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { User } from '../../models';


@Injectable()
export class SessionService {
  private apiEndpoint = `${environment.api_url}/api`;
  public ssoEndpoint = `${APP_CONFIG["api_url"]}/api`;
  public currentUser = new BehaviorSubject<User>(new User());

  user:any = null;
  UserSource = new Subject<any>();
  // Observable user streams
  user$ = this.UserSource.asObservable();

    constructor(
      public storage: LocalStorage,
      public commonService: CommonService,
      public router: Router,
      public http: HttpService) {}

  authenticate(payload: any): any {
    return this.http.post(`${this.apiEndpoint}`, payload , true);
  }


  authenticateSsoToken(payload: any){
    return this.http.post(`${this.apiEndpoint}/sso`, payload , true);
  }

  checkSession(id): any {
    return this.http.get(`${this.apiEndpoint}/sso/${id}`);
  }

  setSession(user: any): void {
    this.UserSource.next(user);
    this.storage.set('currentUser', JSON.stringify(user));
    this.user =  this.getCurrentUser();
  }

  signout(): void {
    this.clearSession();
    this.UserSource.next(null);
    // this.http.delete(this.apiEndpoint).subscribe();
  }

  getCurrentUser(): any {
    return this.storage.getObject('currentUser');
  }

  clearSession(): void {
    this.storage.clear();
    this.router.navigate(['/']);
  }

  userSignedIn(): boolean {
    return !!this.storage.get('accessToken');
  }

  isValid(): boolean {
    return !!this.getCurrentUser();
  }

  verifySsoToken(payload: any){
    return this.http.post(`${this.ssoEndpoint}/sso/validate_token`, payload , true);
  }

  refreshSsoToken(){
    return this.http.get(`${this.ssoEndpoint}/sso/show`);
  }

  initUser() {
    let user = this.currentUser.getValue();
    if (!user.email) {
      this.currentUser.next(this.getCurrentUser());
    }
  }
}
