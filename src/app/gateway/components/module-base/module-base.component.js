import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BasemoduleApiManagementComponent } from '../module-api/basemodule-api-management/basemodule-api-management.component';
let ModuleBaseComponent = class ModuleBaseComponent {
    route;
    constructor(route) {
        this.route = route;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        this.scrollTop();
    }
};
ModuleBaseComponent = __decorate([
    Component({
        selector: 'app-module-base',
        templateUrl: './module-base.component.html',
        standalone: true,
        styleUrls: ['./module-base.component.scss'],
        imports: [BasemoduleApiManagementComponent],
    })
], ModuleBaseComponent);
export { ModuleBaseComponent };
