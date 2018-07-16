import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './your-module.routing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YourModuleComponent } from './your-module.component';
import { YourPageComponent } from './your-page/your-page.component';

import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MODULE_COMPONENTS = [
  YourModuleComponent,
  YourPageComponent
]

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    NgbModule
  ],
  declarations: [
    YourModuleComponent,
    ...MODULE_COMPONENTS
  ],
})

export class YourModuleModule {}
