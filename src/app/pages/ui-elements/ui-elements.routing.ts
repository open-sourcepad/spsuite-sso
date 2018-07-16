import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UiElementsComponent } from './ui-elements.component';

import { ButtonsComponent } from './buttons/buttons.component';
import { FormsComponent } from './forms/forms.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { SwalComponent } from './swal/swal.component';
import { TiIconsComponent } from './ti-icons/ti-icons.component';

export const routes: Routes = [
  {
    path: '',
    component: UiElementsComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'buttons',
        component: ButtonsComponent
      },
      {
        path: 'forms',
        component: FormsComponent
      },
      {
        path: 'modal',
        component: ModalComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'typography',
        component: TypographyComponent
      },
      {
        path: 'swal',
        component: SwalComponent
      },
      {
        path: 'icons',
        component: TiIconsComponent
      },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
