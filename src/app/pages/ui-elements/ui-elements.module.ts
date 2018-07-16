import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './ui-elements.routing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiElementsComponent } from './ui-elements.component';
import { SharedModule } from '../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonsComponent } from './buttons/buttons.component';
import { FormsComponent } from './forms/forms.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { SwalComponent } from './swal/swal.component';
import { TiIconsComponent } from './ti-icons/ti-icons.component';

const UI_ELEMENTS_COMPONENTS = [
  ButtonsComponent,
  TypographyComponent,
  ModalComponent,
  FormsComponent,
  TableComponent,
  SwalComponent,
  TiIconsComponent
]

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    NgbModule
  ],
  declarations: [
    UiElementsComponent,
    ...UI_ELEMENTS_COMPONENTS
  ],
})

export class UiElementsModule {}
