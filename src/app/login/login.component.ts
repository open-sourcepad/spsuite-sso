import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SessionService, UserService } from '../services/api';
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
  currentUser: any = null;
  showForm = false;
  form: FormGroup;
  routeParams: any;
  isSubmitting:boolean =  false;
  birthdayMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,/\d/, /\d/];
  // private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorage,
    private userService: UserService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'department': [ {value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'position': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'mobile_number': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'us_phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'skype': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'office_location': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'birthday': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'age': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'start_date': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'id_number': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'proximity_card_number': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'tin_number': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'sss_number': [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(4)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'person_to_notify': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'person_to_notify_mobile': ['', Validators.compose([Validators.required, Validators.minLength(4)])],

    });
   }
  ngOnInit() {
    this.currentUser = this.session.getCurrentUser();
  }

  ngAfterViewInit(){
    // this.localStorage.clear();
    // debugger
    // this.authService.signOut();
    this.activeRoute.queryParams.subscribe(routeParams => {
      this.routeParams = routeParams;

      this.authService.authState.subscribe((user) => {
        if(user!=null){
          if(routeParams.do == "sign-out"){
            this.signOut(routeParams);
          }else{

            this.user = user;
            this.session.authenticateSsoToken({token:user.authToken}).subscribe(
              res => {
                console.log("login is updated")
                this.session.setSession(res.user);
                this.form.patchValue(res.user);

                if (res.user.is_verified) {
                  if (routeParams.url) {
                    window.location.href = `${routeParams.url}?sso=${res.user.sso_token}&email=${res.user.email}`
                  }
                } else {
                  this.showForm = true;
                  console.log("show form")
                }

              },
              err => {
              }
            );
          }
        }

      });

      if(routeParams.do != null){
        if(routeParams.do == "sign-out"){
          this.processLogout()
        }else if(routeParams.do == "sign-in"){
          this.processLogin()
        }
      }else{
        // this.processLogin(routeParams)
      }

    });
  }

  processLogin(){
    let currentUser:any = this.session.getCurrentUser();

    if(currentUser!=null){

      if(this.routeParams.url != null){
        this.session.checkSession().subscribe((res) => {
          console.log("login is updated")
          this.session.setSession(res.user);
          debugger
          if (res.user.is_verified) {
            this.redirectUser(this.routeParams, res.user)
          } else {
            this.showForm = true;
            console.log("show form")
          }
       });
      }
    }
  }

  processLogout(){
    this.session.signout();
    this.currentUser = this.session.getCurrentUser()
  }

  redirectUser(routeParams, user=null) {
    if(user!=null){
      window.location.href = `${routeParams.url}?sso=${user.sso_token}&email=${user.email}`
    }else{
      window.location.href = `${routeParams.url}`
    }
  }


  onSubmit(values: Object){
    this.isSubmitting = true;
    this.userService.update(this.currentUser.id,values).subscribe(res=>{
      this.isSubmitting = false;
      if(this.routeParams.url != null){
          console.log("login is updated")
          this.session.setSession(res.user);
          this.redirectUser(this.routeParams, res.user)
      }
    })
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
