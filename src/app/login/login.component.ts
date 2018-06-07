import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SessionService } from '../services/api/session';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  // private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private session: SessionService
  ) { }

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      if(user!=null){
        this.user = user;
        debugger
        this.session.authenticateToken({token:user.authToken}).subscribe(
          res => {
            debugger
          },
          err => {
           
          },
        );
      }
     
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  } 

  signOut(): void {
    this.authService.signOut();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect()
    this.user = null;
  }
}
