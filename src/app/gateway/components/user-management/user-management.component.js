import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
let UserManagementComponent = class UserManagementComponent {
    route;
    router;
    close = new EventEmitter();
    constructor(route, router) {
        this.route = route;
        this.router = router;
    }
    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f);
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
        // this.close.emit('close');
    }
};
__decorate([
    Output()
], UserManagementComponent.prototype, "close", void 0);
UserManagementComponent = __decorate([
    Component({
        selector: 'app-user-management',
        templateUrl: './user-management.component.html',
        styleUrls: ['./user-management.component.scss'],
        standalone: true,
        imports: [],
    })
], UserManagementComponent);
export { UserManagementComponent };
