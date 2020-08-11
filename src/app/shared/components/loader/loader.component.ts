import { Component } from '@angular/core';
import { LoaderService } from 'app/core/services/loader.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
    loading: boolean;

    constructor(private loaderService: LoaderService) {
        this.loaderService.isLoading.subscribe((res) => {
            this.loading = res;
        });
    }
}
