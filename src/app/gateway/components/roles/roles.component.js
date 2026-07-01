import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
let RolesComponent = class RolesComponent {
    route;
    router;
    close = new EventEmitter();
    constructor(route, router) {
        this.route = route;
        this.router = router;
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
    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
};
__decorate([
    Output()
], RolesComponent.prototype, "close", void 0);
RolesComponent = __decorate([
    Component({
        selector: 'app-roles',
        templateUrl: './roles.component.html',
        standalone: true,
        styleUrls: ['./roles.component.scss'],
        imports: [DevelopmentComponent, MatTooltip, TranslocoPipe, ButtonDirective],
    })
], RolesComponent);
export { RolesComponent };
