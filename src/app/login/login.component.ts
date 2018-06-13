import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SessionService } from '../services/api/session';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'
import { LocalStorage } from '../services/util'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user: SocialUser;
  // private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorage
  ) { }

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
          // if (res.user.is_verified) {
          //   this.redirectUser(routeParams, res.user)
          // } else {
          //   console.log("show form")
          // }
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
