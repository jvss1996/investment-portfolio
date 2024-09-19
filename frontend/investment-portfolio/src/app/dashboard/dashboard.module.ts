import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {TransactionsComponent} from "./transactions/transactions.component";
import {MatCard} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DashboardComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCard,
    MatList,
    MatListItem,
    MatLabel,
    MatFormField,
    FormsModule
  ]
})
export class DashboardModule { }
