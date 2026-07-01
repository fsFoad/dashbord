// @ts-nocheck
import {  Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { BasemoduleApiManagementComponent } from './basemodule-api-management/basemodule-api-management.component';

@Component({
    selector: 'app-module-api',
    templateUrl: './module-api.component.html',
    standalone: true,
    styleUrls: ['./module-api.component.scss'],
    imports: [BasemoduleApiManagementComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ModuleApiComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

