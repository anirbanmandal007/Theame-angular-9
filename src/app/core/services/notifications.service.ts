import { Injectable } from '@angular/core';
declare const $: any;
// http://bootstrap-notify.remabledesigns.com/

@Injectable()
export class NotificationsService {
    private notify: any;

    showNotification(title: string, message: string, type: string) {
        //const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

        if (this.notify) {
            this.notify.close();
        }

        this.notify = $.notify({
            icon: 'notifications',
            title: title,
            message: message,
        }, {
            type: type,
            allow_dismiss: true,
            newest_on_top: true,
            icon_type: 'class',
            placement: {
                from: 'top', //'bottom'
                align: 'right' //'left', 'center'
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<strong><span data-notify="title">{1}</span></strong> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }
}
