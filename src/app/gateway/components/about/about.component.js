import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonDirective } from 'primeng/button';
let AboutComponent = class AboutComponent {
    router;
    checkTabValidService;
    route;
    close = new EventEmitter();
    constructor(router, checkTabValidService, route) {
        this.router = router;
        this.checkTabValidService = checkTabValidService;
        this.route = route;
    }
    ngOnInit() {
        this.scrollTop();
        window.open('assets/Gateway_Doc.docx', '_blank');
        this.router.navigate([this.checkTabValidService.previousRoute]);
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
};
__decorate([
    Output()
], AboutComponent.prototype, "close", void 0);
AboutComponent = __decorate([
    Component({
        selector: 'app-about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.scss'],
        imports: [MatTooltip, ButtonDirective],
        standalone: true,
    })
], AboutComponent);
export { AboutComponent };
