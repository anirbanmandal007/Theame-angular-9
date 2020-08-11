import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { employeesApiService } from 'app/core/services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { Employees } from 'app/shared/models/employees';
import { employeesDialogComponent } from './employees-dialog/employees-dialog.component';
import { ConfirmDialogModel } from 'app/shared/models/confirm-dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationsService } from 'app/core/services/notifications.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-employees-cmp',
    templateUrl: 'employees.component.html',
    providers: [employeesApiService]
})

export class EmployeesComponent implements OnInit, OnDestroy {
    public dtos: Employees[];

    @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
    public dtTrigger: Subject<any> = new Subject();
    public dtOptions: any;

    constructor(
        public dialog: MatDialog,
        private employeesApiService: employeesApiService,
        private notificationsService: NotificationsService) { }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            lengthMenu: [
                [5, 10, 20, -1],
                [5, 10, 20, 'All']
            ],
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
                emptyTable: 'Fetching employees...'
            },
            scrollX: true,
            responsive: true,
            // Declare the use of the extension in the dom parameter
            dom: 'Bfrtip',
            
            buttons: [
                
                'copy',
                'print',
                'excel',
                
            ]
        };

        this.getAllemployeess();
    }

    ngAfterViewInit() {
        this.renderDataTable();
    }

    getAllemployeess() {
        this.employeesApiService.getAllemployeess().subscribe(dtos => {
            this.dtos = dtos['records'];
            if (this.dtos.length == 0) {
                this.dtOptions.language.emptyTable = 'No dtos available yet.';
            }

            this.renderDataTable();
        }, (err) => {
            this.renderDataTable();
            this.dtOptions.language.emptyTable = 'Error while fetching dtos, pls try refreshing the page or contact admin.';
            this.notificationsService.showNotification('Error', err.message, 'warning');
        });
    }

    addDialog() {
        const dialogRef = this.dialog.open(employeesDialogComponent, {
            width: '650px',
            data: new Employees()
        });

        dialogRef.afterClosed().subscribe(employees => {
            if (employees) {
                this.employeesApiService.addemployees(employees).subscribe(() => {
                    this.getAllemployeess();
                    this.notificationsService.showNotification('Success', 'Employees added successfully', 'success');
                }, (err) => {
                    this.notificationsService.showNotification('Error', err.message, 'warning');
                });
            }
        });
    }

    editDialog(employees: Employees) {
        const dialogRef = this.dialog.open(employeesDialogComponent, {
            width: '650px',
            data: employees
        });

        dialogRef.afterClosed().subscribe(employees => {
            if (employees) {
                this.employeesApiService.updateemployees(employees).subscribe(() => {
                    this.getAllemployeess();
                    this.notificationsService.showNotification('Success', 'Employees updated successfully', 'success');
                }, (err) => {
                    this.notificationsService.showNotification('Error', err.message, 'warning');
                });
            }
        });
    }

    deleteDialog(employees: Employees) {
        const dialogData = new ConfirmDialogModel("Really delete?", employees.employeeNumber.toString());
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "400px",
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(remove => {
            if (remove) {
                this.employeesApiService.deleteemployees(employees.employeeNumber).subscribe(() => {
                    this.getAllemployeess();
                    this.notificationsService.showNotification('Success', 'Employees deleted successfully', 'success');
                }, (err) => {
                    this.notificationsService.showNotification('Error', err.message, 'warning');
                });
            }
        });
    }

    renderDataTable(): void {
        if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
            });
        }

        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}

