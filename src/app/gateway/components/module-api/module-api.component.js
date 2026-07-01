import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BasemoduleApiManagementComponent } from './basemodule-api-management/basemodule-api-management.component';
let ModuleApiComponent = class ModuleApiComponent {
    constructor() { }
    ngOnInit() { }
};
ModuleApiComponent = __decorate([
    Component({
        selector: 'app-module-api',
        templateUrl: './module-api.component.html',
        standalone: true,
        styleUrls: ['./module-api.component.scss'],
        imports: [BasemoduleApiManagementComponent],
    })
], ModuleApiComponent);
export { ModuleApiComponent };
