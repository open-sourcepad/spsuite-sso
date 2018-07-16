import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './pages/home/home.component';

import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '/' },
  { path: 'register', component: RegisterComponent },
  { path: 'ui-elements', loadChildren: './pages/ui-elements/ui-elements.module#UiElementsModule' },
  { path: 'your-module', loadChildren: './pages/your-module/your-module.module#YourModuleModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
