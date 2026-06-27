import { Component, OnInit } from '@angular/core';
import { BasemoduleApiManagementComponent } from './basemodule-api-management/basemodule-api-management.component';

@Component({
    selector: 'app-module-api',
    templateUrl: './module-api.component.html',
    standalone: true,
    styleUrls: ['./module-api.component.scss'],
    imports: [BasemoduleApiManagementComponent],
})
export class ModuleApiComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

