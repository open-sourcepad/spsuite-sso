import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SessionService } from '../services/api/session';
import { EmailValidator } from '../validators';
import { environment } from '../../environments/environment'
import { LocalStorage } from '../services/util'

declare const gapi: any;

@Component({
  selector: 'app-login',
  host: {
    '[style.height]': "'100%'",
    '[style.display]': "'block'"
  },
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: SocialUser;
  showForm = false;
  form: FormGroup;
  // private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorage,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      // 'display_name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'department': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'position': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'mobile_number': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'skype': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'office_location': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'start_date': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'age': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'tin_number': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'sss_number': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'address': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'person_to_notify': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'person_to_notify_mobile': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'is_active': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'us_phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // 'birthday': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // this.localStorage.clear();
    // debugger
    // this.authService.signOut();
    this.activeRoute.queryParams.subscribe(routeParams => {

      this.authService.authState.subscribe((user) => {
        if(user!=null){
          if(routeParams.do == "sign-out"){
            this.signOut(routeParams);
          }else if(routeParams.do == "sign-in"){
            this.user = user;
            this.session.authenticateSsoToken({token:user.authToken}).subscribe(
              res => {
                console.log("login is updated")
                this.session.setSession(res.user);
                debugger
                window.location.href = `${routeParams.url}?sso=${res.user.sso_token}&email=${res.user.email}`
              },
              err => {
              }
            );
          }
        }

      });

      if(routeParams.do != null){
        if(routeParams.do == "sign-out"){
          this.processLogout(routeParams)
        }else if(routeParams.do == "sign-in"){
          this.processLogin(routeParams)
        }
      }else{
        // this.processLogin(routeParams)
      }

    });
  }

  processLogin(routeParams){
    let currentUser:any = this.session.getCurrentUser();

    if(currentUser!=null){

      if(routeParams.url != null){
        this.session.checkSession().subscribe((res) => {
          console.log("login is updated")
          this.session.setSession(res.user);
          this.redirectUser(routeParams, res.user)
          if (res.user.is_verified) {
            this.redirectUser(routeParams, res.user)
          } else {
            console.log("show form")
          }
       });
      }
    }
  }

  processLogout(routeParams){
    this.session.signout();
  }

  redirectUser(routeParams, user=null) {
    debugger
    if(user!=null){
      window.location.href = `${routeParams.url}?sso=${user.sso_token}&email=${user.email}`
    }else{
      window.location.href = `${routeParams.url}`
    }
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(routeParams): void {
    this.authService.signOut();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect()
    this.session.clearSession();
    this.user = null;
    this.redirectUser(routeParams);
  }
}
