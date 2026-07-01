import { __decorate } from "tslib";
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { MorChar32Pipe } from '../../../shared/pipes/morChar32.pipe';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRecipientsAlertsComponent } from '../authorized-recipients-alerts/register-recipients-alerts/register-recipients-alerts.component';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { ToggleSwitch } from 'primeng/toggleswitch';
let AlertSystemComponent = class AlertSystemComponent {
    router;
    route;
    transloco;
    close = new EventEmitter();
    AlertSignal = signal([]);
    loading = signal(false);
    error = signal(null);
    first = 0;
    rows = 10;
    pageno = 0;
    totalRecords = 0;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    paginationLabel = this.transloco.translate('label.pagination.table');
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    constructor(router, route, transloco) {
        this.router = router;
        this.route = route;
        this.transloco = transloco;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    onStatusToggle(party) {
        console.log('وضعیت تغییر کرد:', party.name, '→', party.status);
    }
    ngOnInit() {
        this.scrollTop();
    }
    BeforeButton() {
        // this.router.navigate(['/home']);
        this.close.emit('close');
    }
};
__decorate([
    Output()
], AlertSystemComponent.prototype, "close", void 0);
AlertSystemComponent = __decorate([
    Component({
        selector: 'app-alert-system',
        templateUrl: './alert-system.component.html',
        standalone: true,
        styleUrls: ['./alert-system.component.scss'],
        imports: [ToggleSwitch, DevelopmentComponent, ButtonDirective, MatTooltip, BreadcrumbsComponent, DropdownModule, InputText, MorChar32Pipe, NgIf, PrimeTemplate, ReactiveFormsModule, RegisterRecipientsAlertsComponent, Ripple, TableModule, Toast, ToggleSwitch, Tooltip, TranslocoPipe, FormsModule],
    })
], AlertSystemComponent);
export { AlertSystemComponent };
