import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import { MatTooltip } from '@angular/material/tooltip';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
let UsersComponent = class UsersComponent {
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
], UsersComponent.prototype, "close", void 0);
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss'],
        standalone: true,
        imports: [TranslocoPipe, DevelopmentComponent, MatTooltip, ButtonDirective],
    })
], UsersComponent);
export { UsersComponent };
