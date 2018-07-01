// import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { SessionService} from '../api';
// import { Observable, Subject } from 'rxjs';
// import { catchError, map, flatMap} from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import { Location } from '@angular/common';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   user;
//   sign_in_url = "https://sso.spsuite.co/";
//   // sign_in_url = "http://sso.example.com:4200/";
//   base_url = "http://localhost:3000";

//   constructor(
//     private activeRoute: ActivatedRoute,
//     private router: Router,
//     private session: SessionService,
//     private location: Location
//   ) {

//   }

//   private userState: Observable<boolean>;

//   private userSubject = new Subject<boolean>();
//   private observer;

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean>|Promise<boolean>|boolean {

//     this.userState =  new Observable(((observer)=>{
//       this.processLogin(route.queryParams,observer);
//     }));
    
//     return this.userState.pipe(
//       map(e => {
//         if (e) {
//           console.log("returned true");
//           return true;
//         } else {
//           console.log("returned false");
//           return false
//         }
//       }),
//       catchError((err) => {
//         return of(false);
//       })
//     );
   
//   }


//   processLogin(routeParams,observer){
//     let user = this.session.getCurrentUser() || null
    
//     if(user==null){
//       if(routeParams.sso != null){
//         this.verifySsoToken(routeParams,observer);
//       }else{
//         observer.next(false); 
//         observer.complete();
//         window.location.href = this.sign_in_url+"?url="+this.base_url+this.location.path()+"&do=sign-in";
//       }
//     }else{
//       this.getNewSsoToken(observer);
//     }
//   }

//   getNewSsoToken(observer){
//     let user = this.session.getCurrentUser();
    
//     this.session.refreshSsoToken(user.id).subscribe((res) => {
      
//       this.location.replaceState('', '')
//       console.log("user is updated");
//       res.data.attributes['id'] = res.data.id
//       this.session.setSession(res.data.attributes); //user object
//       observer.next(true);
//       observer.complete();
//     },err => {
      
//       observer.next(false);
//       observer.complete();
//       this.session.clearSession();
     
//       window.location.href = this.sign_in_url+"?url="+this.base_url+this.location.path()+"&do=sign-in";
      
//      });
//   }


//   verifySsoToken(routeParams,observer){
    
//     this.session.verifySsoToken({sso_token:routeParams.sso,email:routeParams.email}).subscribe((res) => {

//       res.data.attributes['id'] = res.data.id
//       this.session.setSession(res.data.attributes); //user object
//       observer.next(true); //user is logged in
//       observer.complete();
//     },err => {
      
//       console.log("error","invalid sso token")
//       observer.next(false); //user is already logged in
//       observer.complete();
      
//      });
//   }
// }