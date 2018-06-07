import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private googleLog: GoogleLoginProvider
  ) { }

  ngOnInit() {
    this.authService
    debugger;
    this.signInWithGoogle();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn("42075831752-9jf638265r2pirv7m31h141dnpf4hkas.apps.googleusercontent.com");
  } 

  signOut(): void {
    this.authService.signOut();
  }
}
