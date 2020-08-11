import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';

import { DataTablesModule } from 'angular-datatables';

import { AdminRoutes } from './admin.routing';
import { CustomersComponent } from './components/customers/customers.component';
import { customersDialogComponent } from './components/customers/customers-dialog/customers-dialog.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { employeesDialogComponent } from './components/employees/employees-dialog/employees-dialog.component';

import { DashboardComponent } from 'app/modules/admin/components/dashboard/dashboard.component';

import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FlexLayoutModule,
    MatProgressBarModule,
	MatTabsModule,
    DataTablesModule,
    CoreModule
  ],
  declarations: [
    DashboardComponent,
    CustomersComponent,
customersDialogComponent,
EmployeesComponent,
employeesDialogComponent,

    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent, CustomersComponent,customersDialogComponent,EmployeesComponent,employeesDialogComponent,]
})

export class AdminModule { }
