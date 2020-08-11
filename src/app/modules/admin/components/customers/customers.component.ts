import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { customersApiService } from 'app/core/services/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { Customers } from 'app/shared/models/customers';
import { customersDialogComponent } from './customers-dialog/customers-dialog.component';
import { ConfirmDialogModel } from 'app/shared/models/confirm-dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationsService } from 'app/core/services/notifications.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-customers-cmp',
    templateUrl: 'customers.component.html',
    providers: [customersApiService]
})

export class CustomersComponent implements OnInit, OnDestroy {
    public dtos: Customers[];

    @ViewChild(DataTableDirective,  {static: false}) dtElement: DataTableDirective;
    public dtTrigger: Subject<any> = new Subject();
    public dtOptions: any;

    constructor(
        public dialog: MatDialog,
        private customersApiService: customersApiService,
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
                emptyTable: 'Fetching customers...'
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

        this.getAllcustomerss();
    }

    ngAfterViewInit() {
        this.renderDataTable();
    }

    getAllcustomerss() {
        this.customersApiService.getAllcustomerss().subscribe(dtos => {
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
        const dialogRef = this.dialog.open(customersDialogComponent, {
            width: '650px',
            data: new Customers()
        });

        dialogRef.afterClosed().subscribe(customers => {
            if (customers) {
                this.customersApiService.addcustomers(customers).subscribe(() => {
                    this.getAllcustomerss();
                    this.notificationsService.showNotification('Success', 'Customers added successfully', 'success');
                }, (err) => {
                    this.notificationsService.showNotification('Error', err.message, 'warning');
                });
            }
        });
    }

    editDialog(customers: Customers) {
        const dialogRef = this.dialog.open(customersDialogComponent, {
            width: '650px',
            data: customers
        });

        dialogRef.afterClosed().subscribe(customers => {
            if (customers) {
                this.customersApiService.updatecustomers(customers).subscribe(() => {
                    this.getAllcustomerss();
                    this.notificationsService.showNotification('Success', 'Customers updated successfully', 'success');
                }, (err) => {
                    this.notificationsService.showNotification('Error', err.message, 'warning');
                });
            }
        });
    }

    deleteDialog(customers: Customers) {
        const dialogData = new ConfirmDialogModel("Really delete?", customers.customerNumber.toString());
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: "400px",
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(remove => {
            if (remove) {
                this.customersApiService.deletecustomers(customers.customerNumber).subscribe(() => {
                    this.getAllcustomerss();
                    this.notificationsService.showNotification('Success', 'Customers deleted successfully', 'success');
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

