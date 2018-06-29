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
//         console.log("error",err)
//         // this.router.navigate(['/login']);
//         return of(false);
//       })
//     );
   
//   }


//   processLogin(routeParams,observer){
//     let user = this.session.getCurrentUser()
    
//     if(this.session.getCurrentUser()==null){
//       if(routeParams.sso != null){
//         // setTimeout(this.verifySsoToken(routeParams,observer), 5000);
//         // observer.next(true); 
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
//     this.session.refreshSsoToken().subscribe((res) => {
//       this.location.replaceState('', '')
//       console.log("user is updated");
//       this.session.setSession(res.user);
//       observer.next(true);
//       observer.complete();
//     },err => {
//       observer.next(false);
//       observer.complete();
//       this.session.clearSession();
     
//       window.location.href = this.sign_in_url+"?url="+this.base_url+this.location.path()+"&do=sign-in";
      
//      });
//   }


// verifySsoToken(routeParams,observer){
    
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