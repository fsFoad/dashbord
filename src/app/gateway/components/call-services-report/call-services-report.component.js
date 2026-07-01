import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Menu } from 'primeng/menu';
import { LogReportsComponent } from '../log-reports/log-reports.component';
import { Ripple } from 'primeng/ripple';
import { TranslocoPipe } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';
import { PersianCalendarComponent } from "../../../shared/components/persian-calendar/persian-calendar.module";
import { FormsModule } from "@angular/forms";
let CallServicesReportComponent = class CallServicesReportComponent {
    router;
    route;
    commonValidationsService;
    transloco;
    messagesApiFacadeService;
    _primengProgressBarService;
    notifierService;
    apiGatewayService;
    reportApiList = [];
    itemsReport = [];
    detailsBreadObject = [];
    tempLog;
    fromdate;
    todate;
    tblFlag = false;
    serviceLog = false;
    dataLog;
    last = 0;
    first = 0;
    rows = 5;
    totalRecords = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    constructor(router, route, commonValidationsService, transloco, messagesApiFacadeService, _primengProgressBarService, notifierService, apiGatewayService) {
        this.router = router;
        this.route = route;
        this.commonValidationsService = commonValidationsService;
        this.transloco = transloco;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
    }
    onClose(e) {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('logApiBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (e == 'close') {
            this.serviceLog = false;
        }
    }
    validation() {
        if (!this.fromdate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ شروع را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.todate) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ پایان را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        if (this.fromdate > this.todate) {
            this.notifierService.showError({
                detail: 'لطفا بازه تاریخ معتبر را وارد کنید!',
                life: 3000,
            });
            return false;
        } /*else if (this.commonValidationsService.maximumDateDayChecker(this.todate)) {
            this.notifierService.showError({
                detail: "حداکثر تاریخ پایان روزجاری می تواند باشد!",
                life: 3000
            });
            return false;
        }*/
        else {
            return true;
        }
    }
    downloadData() {
        if (this.validation()) {
            if (this.reportApiList.length != 0) {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .DownloadStatisticReport(1, this.fromdate, this.todate)
                    .subscribe((b) => {
                    this._primengProgressBarService.hide();
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
            else {
                this.notifierService.showError({
                    detail: 'دیتایی جهت دانلود وجود ندارد!',
                    life: 3000,
                });
                return false;
            }
        }
    }
    search() {
        if (this.validation()) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getstatisticReport(0, this.fromdate, this.todate)
                .subscribe((p) => {
                this._primengProgressBarService.hide();
                this.tblFlag = true;
                this.reportApiList = Array.isArray(p) ? p : [p];
                this.last = Math.min(this.first + this.rows, this.totalRecords);
                for (let k = 0; k < this.reportApiList.length; k++) {
                    this.reportApiList[k] = Object.assign(this.reportApiList[k], { row: k + 1 });
                }
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    clear() {
        this.tblFlag = false;
        this.fromdate = null;
        this.todate = null;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    showDetail(report) {
        this.dataLog = {
            SUCCESSCOUNT: null,
            PARTYID: null,
            MODULEID: null,
            FAILEDCOUNT: null,
            PARTY_TITLE: '',
            MODULE_TITLE: '',
            APIID: null,
            CLIENT_NAME: '',
            API_TILE: '',
            fromdate: '',
            todate: '',
            chartFlag: '',
        };
        console.log('report', report);
        this.dataLog = report;
        this.dataLog.chartFlag = false;
        this.dataLog.fromdate = this.fromdate;
        this.dataLog.todate = this.todate;
        this.dataLog.callApiFlag = true;
        this.serviceLog = true;
    }
    setRecordReport(log) {
        this.tempLog = log;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'logApiBase':
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'گزارش فراخوانی تجمیعی سرویس ها',
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/log.png',
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
    ngOnInit() {
        this.detailsBreadObject = this.chooseBread('logApiBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.scrollTop();
        this.itemsReport = [
            {
                items: [
                    {
                        label: 'جزئیات',
                        icon: '',
                        command: () => {
                            this.showDetail(this.tempLog);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
    }
    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
};
CallServicesReportComponent = __decorate([
    Component({
        selector: 'app-call-services-report',
        templateUrl: './call-services-report.component.html',
        standalone: true,
        styleUrls: ['./call-services-report.component.scss'],
        imports: [
            BreadcrumbsComponent,
            ButtonDirective,
            TableModule,
            Menu,
            LogReportsComponent,
            NgIf,
            Ripple,
            Toast,
            TranslocoPipe,
            PersianCalendarComponent,
            FormsModule,
        ],
    })
], CallServicesReportComponent);
export { CallServicesReportComponent };
