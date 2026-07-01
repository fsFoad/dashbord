import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ClientComponent } from '../client/client.component';
let ClientBaseComponent = class ClientBaseComponent {
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
ClientBaseComponent = __decorate([
    Component({
        selector: 'app-client-base',
        templateUrl: './client-base.component.html',
        standalone: true,
        styleUrls: ['./client-base.component.scss'],
        imports: [ClientComponent],
    })
], ClientBaseComponent);
export { ClientBaseComponent };
