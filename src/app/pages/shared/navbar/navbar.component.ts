import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../services/api/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.pug'
})
export class NavbarComponent {
  constructor(
    public sessionService: SessionService,
    private router: Router
  ) {}

  logout() {
    this.sessionService.clearSession()
    this.router.navigate(['/']);
  }
}
