import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customers } from 'app/shared/models/customers';
import { employeesApiService } from 'app/core/services/employees.service';



@Component({
    selector: 'customers-dialog-cmp',
    templateUrl: 'customers-dialog.component.html',
    styleUrls: ['customers-dialog.component.css'],
	providers: [employeesApiService,],
})
export class customersDialogComponent {
    customersObj: Customers;
	
	salesRepEmployeeNumberList = [];


    

    constructor(
        public dialogRef: MatDialogRef<customersDialogComponent>,
		private employeesApiService: employeesApiService,


        @Inject(MAT_DIALOG_DATA) public customers: Customers) {
        this.customersObj = Object.assign({}, customers);
		this.getAllemployeess();


    }
	
	getAllemployeess() {
        this.employeesApiService.getAllemployeess().subscribe(salesRepEmployeeNumberList => {
            this.salesRepEmployeeNumberList = salesRepEmployeeNumberList['records'];
        });
    }



    savecustomers(customers: Customers): void {
        this.dialogRef.close(customers);
    }
}