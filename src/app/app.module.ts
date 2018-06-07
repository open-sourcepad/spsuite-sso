import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { SocialLoginModule } from "angularx-social-login";
import { LoginOpt, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { DemoComponent } from './demo/demo.component';
import { routing } from './app.routes';

const googleLoginOptions: LoginOpt = {
  scope: 'email',
  hosted_domain: 'sourcepad.com',
  fetch_basic_profile: false
}

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("42075831752-9jf638265r2pirv7m31h141dnpf4hkas.apps.googleusercontent.com",googleLoginOptions)
  }
]);



export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule,
    routing
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: GoogleLoginProvider,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
