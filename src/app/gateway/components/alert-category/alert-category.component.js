import { __decorate } from "tslib";
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Toast } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@ngneat/transloco';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonDirective } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { MorChar32Pipe } from '../../../shared/pipes/morChar32.pipe';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRecipientsAlertsComponent, } from '../authorized-recipients-alerts/register-recipients-alerts/register-recipients-alerts.component';
import { Ripple } from 'primeng/ripple';
import { Tooltip } from 'primeng/tooltip';
import { ScheduledStatusPipe } from '../../../shared/pipes/scheduled-status.pipe';
import { RunSchedledPeriodHHPipe } from '../../../shared/pipes/run-schedled-period-hh.pipe';
import { PriorityTypePipe } from '../../../shared/pipes/priority-type.pipe';
import { ScheduleTypePipe } from '../../../shared/pipes/schedule-type.pipe';
let AlertCategoryComponent = class AlertCategoryComponent {
    router;
    route;
    messagesApiFacadeService;
    transloco;
    apiGatewayService;
    _primengProgressBarService;
    close = new EventEmitter();
    alertSignal = signal([]);
    loading = signal(false);
    error = signal(null);
    first = 0;
    rows = 10;
    pageno = 0;
    pagesize = 10;
    title = null;
    totalRecords = 0;
    nextBtnFlag = false;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    paginationLabel = this.transloco.translate('label.pagination.table');
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    detailsBreadObject = [];
    constructor(router, route, messagesApiFacadeService, transloco, apiGatewayService, _primengProgressBarService) {
        this.router = router;
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.transloco = transloco;
        this.apiGatewayService = apiGatewayService;
        this._primengProgressBarService = _primengProgressBarService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'receiverBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.alertCategory'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/alert.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
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
        this.search();
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('receiverBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    BeforeButton() {
        // this.router.navigate(['/home']);
        this.close.emit('close');
    }
    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search();
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    search() {
        this.messagesApiFacadeService.getSection(this.pageno, this.pagesize, this.title).subscribe({
            next: (response) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading.set(false);
                const rawData = response?.data ?? response ?? [];
                const processed = rawData.map((x, i) => {
                    const status = x.status === 1;
                    let row = i + 1;
                    if (this.pageno > 1) {
                        const startRow = (this.pageno - 1) * this.pagesize;
                        row = startRow + i + 1;
                    }
                    return { ...x, status, row };
                });
                this.alertSignal.set(processed);
            },
            error: (err) => {
                debugger;
                console.error('❌ خطا در درخواست API:', err);
                this.error.set('خطا در دریافت داده‌ها');
                this.loading.set(false);
                this._primengProgressBarService.hide();
            },
        });
    }
};
__decorate([
    Output()
], AlertCategoryComponent.prototype, "close", void 0);
AlertCategoryComponent = __decorate([
    Component({
        selector: 'app-alert-category',
        imports: [
            Toast,
            TableModule,
            ToggleSwitch,
            ButtonDirective,
            BreadcrumbsComponent,
            DropdownModule, InputText, MorChar32Pipe, NgIf, PrimeTemplate, ReactiveFormsModule, RegisterRecipientsAlertsComponent, Ripple, TableModule, Toast, ToggleSwitch, Tooltip, TranslocoPipe, FormsModule, ScheduledStatusPipe, RunSchedledPeriodHHPipe, PriorityTypePipe, ScheduleTypePipe, NgSwitch, NgSwitchCase, NgSwitchDefault,
        ],
        templateUrl: './alert-category.component.html',
        styleUrl: './alert-category.component.scss',
    })
], AlertCategoryComponent);
export { AlertCategoryComponent };
