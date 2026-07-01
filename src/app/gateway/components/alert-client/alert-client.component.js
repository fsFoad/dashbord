import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
let AlertClientComponent = class AlertClientComponent {
    router;
    route;
    close = new EventEmitter();
    constructor(router, route) {
        this.router = router;
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
    BeforeButton() {
        this.router.navigate(['/main/home']);
        this.close.emit('close');
    }
};
__decorate([
    Output()
], AlertClientComponent.prototype, "close", void 0);
AlertClientComponent = __decorate([
    Component({
        selector: 'app-alert-client',
        templateUrl: './alert-client.component.html',
        standalone: true,
        styleUrls: ['./alert-client.component.scss'],
        imports: [DevelopmentComponent, ButtonDirective, MatTooltip],
    })
], AlertClientComponent);
export { AlertClientComponent };
