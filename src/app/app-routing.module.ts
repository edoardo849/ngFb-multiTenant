import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './/core/auth.guard';

// Components with Routing

import { LoginComponent } from './/login/login.component'

const routes: Routes = [

  { path: 'login', component: LoginComponent },

];


@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [AuthGuard],
})

export class AppRoutingModule { }
