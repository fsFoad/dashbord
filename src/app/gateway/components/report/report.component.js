import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ReportComponent = class ReportComponent {
    route;
    constructor(route) {
        this.route = route;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        this.scrollTop();
    }
};
ReportComponent = __decorate([
    Component({
        selector: 'app-report',
        templateUrl: './report.component.html',
        standalone: true,
        styleUrls: ['./report.component.scss'],
    })
], ReportComponent);
export { ReportComponent };
