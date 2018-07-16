import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { SessionService } from '../../services/api/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug'
})
export class RegisterComponent {
    form: FormGroup;
    errors: any[];

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router) {
    this.buildForm();
   }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }

  onSubmit(params: Object) {
    if (this.form.valid) {
      this.requestStart(params);
    } else {
      console.log('invalid', params)
    }
  }

  requestStart(params: Object) {
    // this.userService.register(params).subscribe(resp => {
    //   this.requestComplete(resp);
    // }, err => {
    //   const response = err.json()
    //   this.errors = response.errors;
    // })
  }

  requestComplete(resp: any) {
    const response = resp.json()
    this.errors = [];
    this.sessionService.setSession(response);
    this.router.navigate(['/']);
  }

  displayError() {
    let errorMsg = "";
    this.errors.forEach((err) => {
      if (typeof err === 'object') {
        for (var k in err){
          if(Array.isArray(err)){
            errorMsg += `${k} ${err.toString()}`
          }
          errorMsg += `${k} ${err[k]}`
        }
      }
    });

    return errorMsg;
  }

}
