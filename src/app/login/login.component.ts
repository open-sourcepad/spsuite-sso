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

import * as moment from 'moment';
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
  isSubmit:boolean = false;
  invalidBirthday = false;
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
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required,EmailValidator.validate])],
      'department': [ {value: '', disabled: true}, Validators.compose([Validators.required])],
      'position': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'mobile_number': ['', Validators.compose([Validators.required])],
      'us_phone': ['', Validators.compose([])],
      'skype': ['', Validators.compose([Validators.required])],
      'office_location': ['', Validators.compose([Validators.required])],
      'birthday': ['', Validators.compose([Validators.required])],
      'age': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'start_date': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'id_number': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'proximity_card_number': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'tin_number': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'sss_number': [{value: '', disabled: true}, Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'person_to_notify': ['', Validators.compose([Validators.required])],
      'person_to_notify_mobile': ['', Validators.compose([Validators.required])],

    });
    let birthdayForm = this.form.get('birthday');
    let ageForm = this.form.get('age');
    birthdayForm.valueChanges.subscribe(val => {
      if(val!=null && !val.includes('_')){
       let age = moment().diff(moment(val, 'MM-DD-YYYY'), 'years') || -1
       if(age != -1 && age < 100){
         this.invalidBirthday = false;
        ageForm.setValue(age+"");
       }else{
        this.invalidBirthday = true;
       }
      }else{
        this.invalidBirthday = true;
      }
      });

   }
  ngOnInit() {
    this.currentUser = this.session.getCurrentUser();
    if(this.currentUser!=null && !this.currentUser.is_verified){
      this.showForm = true;
    }
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
            this.session.authenticateSsoToken({token:user.authToken}).subscribe(
              res => {
                let user = this.formatDate(res.user);
                this.session.setSession(user);
                this.currentUser = this.session.getCurrentUser();
                if(user.birthday != null){
                  user.age = moment().diff(moment(user.birthday, 'MMDDYYYY'), 'years')
                }
                this.form.patchValue(res.user,{emitEvent:false});

                if (user.is_verified) {
                  this.showForm = false;
                  if (routeParams.url) {
                    window.location.href = `${routeParams.url}?sso=${user.sso_token}&email=${user.email}`
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

  formatDate(user):any{

    user.birthday = moment(user.birthday).format('MMDDYYYY');
    user.start_date = moment(user.birthday).format('MMDDYYYY');
    return user
  }
  
  processLogin(){
    let currentUser:any = this.session.getCurrentUser();

    if(currentUser!=null){

      if(this.routeParams.url != null){
        this.session.checkSession().subscribe((res) => {
          console.log("login is updated")
          let user = this.formatDate(res.user);
          this.session.setSession(user);
          if (user.is_verified) {
            this.redirectUser(this.routeParams, user)
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
    this.signOut(this.routeParams);
  }

  redirectUser(routeParams, user=null) {
    if(user!=null){
      window.location.href = `${routeParams.url}?sso=${user.sso_token}&email=${user.email}`
    }else{
      window.location.href = `${routeParams.url}`
    }
  }


  onSubmit(values: Object){
    debugger
    this.isSubmit = true;
    if(!this.form.valid || this.invalidBirthday){
      return;
    }
    this.isSubmitting = true;
    this.userService.verify(values).subscribe(res=>{
      this.isSubmitting = false;
      if(res.user.is_verified){
        this.showForm = false;
      }
      this.session.setSession(res.user);
      if(this.routeParams.url != null){
          this.redirectUser(this.routeParams, res.user)
      }
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(routeParams): void {
    this.showForm = false;
    this.authService.signOut();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect()
    this.session.clearSession();
    this.user = null;
    if(this.routeParams.url != null){
      this.redirectUser(routeParams);
    }
    
  }
}
