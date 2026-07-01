import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonValidationsService} from '../../../shared/validators/common-validations.service';
import {MessagesApiFacadeService} from '../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../services/api-gateway.service';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../@fuse/services/loading';
import {ToastService} from '../../../shared/services/ToastService';
import {BreadcrumbsComponent} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Menu} from 'primeng/menu';
import {LogReportsComponent} from '../log-reports/log-reports.component';
import {Ripple} from 'primeng/ripple';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {Toast} from 'primeng/toast';
import {PersianCalendarComponent} from "../../../shared/components/persian-calendar/persian-calendar.module";
import {FormsModule} from "@angular/forms";

@Component({
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
export class CallServicesReportComponent implements OnInit {
    reportApiList = [];
    itemsReport: any[] = [];
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
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private commonValidationsService: CommonValidationsService,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService
    ) {}
    onClose(e) {
        this.scrollTop();

        this.detailsBreadObject = this.chooseBread('logApiBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
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
        } else if (!this.todate) {
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
        }*/ else {
            return true;
        }
    }
    downloadData() {
        if (this.validation()) {
            if (this.reportApiList.length != 0) {
                // FUSEFS

                // this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .DownloadStatisticReport(1, this.fromdate, this.todate)
                    .subscribe(
                        (b) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        },
                        (error) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        }
                    );
            } else {
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
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getstatisticReport(0, this.fromdate, this.todate)
                .subscribe(
                    (p) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.tblFlag = true;
                        this.reportApiList = Array.isArray(p) ? p : [p];

                        this.last = Math.min(
                            this.first + this.rows,
                            this.totalRecords
                        );
                        for (let k = 0; k < this.reportApiList.length; k++) {
                            this.reportApiList[k] = Object.assign(
                                this.reportApiList[k],
                                { row: k + 1 }
                            );
                        }
                    },
                    (error) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    }
                );
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
            if (element) element.scrollIntoView(true);
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
    chooseBread(caseBase: string) {
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
    ngOnInit(): void {
        this.detailsBreadObject = this.chooseBread('logApiBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

        this.scrollTop();
        this.itemsReport = [
            {
                items: [
                    {
                        label: 'جزئیات',
                        icon: '',
                        command: (): void => {
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
        this.router.navigate(['/home']);
        // this.close.emit('close');
    }

}
