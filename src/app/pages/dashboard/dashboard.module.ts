import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dashboard.routing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRange } from '../daterangepicker/datepicker-range';

const MODULE_COMPONENTS = [
  DashboardComponent,
  NgbdDatepickerRange
]

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...MODULE_COMPONENTS
  ],
})

export class DashboardModule {}
