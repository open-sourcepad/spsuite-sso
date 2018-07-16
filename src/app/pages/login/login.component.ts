import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { SessionService } from '../../services/api/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug'
})
export class LoginComponent {
  form: FormGroup;
  return: string = '';
  errors: any[];

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.buildForm();
   }

   ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
   }

  buildForm() {
    this.form = this.fb.group({
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
    // this.userService.login(params).subscribe(resp => {
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
    this.router.navigateByUrl(this.return);
  }
}
