import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { MatCard } from "@angular/material/card";
import { MatFormField } from "@angular/material/form-field";
import { AuthComponent } from "./auth.component";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatCard,
    MatFormField
  ]
})
export class AuthModule { }
