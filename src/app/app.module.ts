import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';

import { SocialLoginModule } from "angularx-social-login";
import { LoginOpt, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { LoginComponent } from './login/login.component';

import { provideConfig } from './providerconfig'

// FROM DASHBOARD REPO
import { AppRoutingModule } from './app.routes';
import { UserGuard } from './services/route-guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

import { CommendationService } from './services/api/commendation.service';
import { CompanyEventService } from './services/api/company_event.service';
import { EmployeeEventService } from './services/api/employee_event.service';
import { EventTypeService } from './services/api/event_type.service';
import { SharedModule } from './pages/shared/shared.module';
import { MESSAGES } from './constants';
import { SwalService } from './services/utils';

import { HttpClientModule } from '@angular/common/http';
import '../styles/stylesheets/app.scss';

// ADDED----
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TextMaskModule } from 'angular2-text-mask';

import {
  HttpService,
  CommonService,
  LocalStorage,
  ToasterService
} from './services/utils';

import {
  SessionService,
  UserService
} from './services/api';

const APP_PROVIDERS = [
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
  ToasterService,
  SwalService
]

const APP_CONSTANTS = [
  MESSAGES,
];

const ROUTE_GUARDS = [
  UserGuard
];

const APP_SERVICES = [
  UserService,
  SessionService,
  CommendationService,
  CompanyEventService,
  EmployeeEventService,
  EventTypeService
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
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
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    ...APP_PROVIDERS,
    ...APP_SERVICES,
    ...ROUTE_GUARDS,
    ...APP_CONSTANTS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
