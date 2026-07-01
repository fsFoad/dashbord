import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonDirective } from 'primeng/button';
let CostsComponent = class CostsComponent {
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
], CostsComponent.prototype, "close", void 0);
CostsComponent = __decorate([
    Component({
        selector: 'app-costs',
        templateUrl: './costs.component.html',
        standalone: true,
        styleUrls: ['./costs.component.scss'],
        imports: [DevelopmentComponent, MatTooltip, ButtonDirective],
    })
], CostsComponent);
export { CostsComponent };
