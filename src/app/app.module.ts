import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';

import { SocialLoginModule } from "angularx-social-login";
import { LoginOpt, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';
import { provideConfig } from './providerconfig'

// ADDED----
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TextMaskModule } from 'angular2-text-mask';

import {
  HttpService,
  CommonService,
  LocalStorage,
  ToasterService
} from './services/util';

import {
  SessionService,
  UserService
} from './services/api';

const PROVIDERS = [
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  {
    provide: GoogleLoginProvider,
    useFactory: provideConfig
  },
  HttpService,
  CommonService,
  LocalStorage,
  SessionService,
  UserService,
  ToasterService
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SocialLoginModule,
    RouterModule,
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    TextMaskModule,
    routing
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
