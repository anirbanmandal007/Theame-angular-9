import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { EmployeesComponent } from './components/employees/employees.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';

export const AdminRoutes: Routes = [
    { path: '', component: AdminComponent },
	{ path: 'customers', component: CustomersComponent },
    { path: 'employees', component: EmployeesComponent },

    { path: 'dashboard', component: DashboardComponent }
    
];
