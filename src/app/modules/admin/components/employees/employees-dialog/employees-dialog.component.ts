import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employees } from 'app/shared/models/employees';


@Component({
    selector: 'employees-dialog-cmp',
    templateUrl: 'employees-dialog.component.html',
    styleUrls: ['employees-dialog.component.css'],
	providers: [],
})
export class employeesDialogComponent {
    employeesObj: Employees;
	
	
    

    constructor(
        public dialogRef: MatDialogRef<employeesDialogComponent>,
		
        @Inject(MAT_DIALOG_DATA) public employees: Employees) {
        this.employeesObj = Object.assign({}, employees);
		
    }
	
	

    saveemployees(employees: Employees): void {
        this.dialogRef.close(employees);
    }
}