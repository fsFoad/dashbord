import { __decorate } from "tslib";
import { Component, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Menu } from 'primeng/menu';
import { MorChar32Pipe } from '../../../shared/pipes/morChar32.pipe';
import { NgClass, NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { Constants } from '../../../shared/constants/Constants';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { SaffronShamsiDatePipe, } from '../../../mat-wrapper-components/projects/components/src/lib/_01-components/_11-saffron-pipes/_07-saffron-ShamsiDate.pipe';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { DestionationPlatformIdPipe } from '../../../shared/pipes/destionation-platform-id.pipe';
import { ConsumedPipe } from '../../../shared/pipes/consumed.pipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertDetailList } from './alert-detail-list';
let AlertManagementComponent = class AlertManagementComponent {
    router;
    route;
    messagesApiFacadeService;
    transloco;
    notifierService;
    apiGatewayService;
    dialogService;
    ref;
    _primengProgressBarService;
    addFlag = false;
    searchBy = '1';
    fromdate = null;
    todate = null;
    searchByOption = Constants.searchByAlertOption;
    showMobile = false;
    showDate = true;
    destination_address = null;
    items = null;
    tempAlert = null;
    nextBtnFlag = false;
    onlyNextBtnFlag = false;
    first = 0;
    rows = 10;
    pageno = 0;
    pagesize = 10;
    totalRecords = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    detailsBreadObject = [];
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    alertSignal = signal([]);
    loading = signal(false);
    error = signal(null);
    alarmOption = [];
    sectionid = null;
    constructor(router, route, messagesApiFacadeService, transloco, notifierService, apiGatewayService, dialogService, ref, _primengProgressBarService) {
        this.router = router;
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.transloco = transloco;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.dialogService = dialogService;
        this.ref = ref;
        this._primengProgressBarService = _primengProgressBarService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'alerts':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.alert'),
                        img_index0: 'assets/icons/alerts.png',
                        rout_index0: '/home',
                        isActive0: true,
                    },
                    { label_index1: null, label_Detail_index1: null },
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
    setRecord(alert) {
        this.tempAlert = alert;
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
    clear() {
        this.fromdate = '';
        this.todate = '';
        this.destination_address = '';
        this.search();
    }
    onChangealarm(e) {
    }
    search() {
        if (this.fromdate || this.todate) {
            if (!(this.fromdate && this.todate)) {
                this.notifierService.showError('لطفا بازه جستجو را به درستی وارد نمائید!');
                return;
            }
            else if (this.fromdate > this.todate) {
                this.notifierService.showError('لطفا بازه جستجو را به درستی وارد نمائید!');
                return;
            }
        }
        let startRow;
        this.pageno != 0 ? (startRow = this.pageno * this.pagesize) : (startRow = 0);
        this._primengProgressBarService.show();
        this.loading.set(true);
        this.messagesApiFacadeService.getAlarm(this.pageno, this.pagesize, this.destination_address, this.fromdate, this.todate).subscribe({
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
    searchClick(flag) {
        if (flag) {
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this.search();
        }
        else {
            debugger;
            this.search();
        }
    }
    onKeydown(event) {
        debugger;
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick(true);
        }
    }
    ngOnInit() {
        this.detailsBreadObject = this.chooseBread('alerts');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.loadSections();
    }
    loadSections() {
        this.messagesApiFacadeService.getSection(0, 10000, null, {
            skipEmptyCheck: true,
        }).subscribe({
            next: (res) => {
                this.alarmOption = res?.data ?? [];
            },
            error: (err) => {
                console.error(err);
            },
        });
    }
    show(alert) {
        debugger;
        this.messagesApiFacadeService.getAlarmDetail(alert.id).subscribe({
            next: (res) => {
                debugger;
                let rawLogs = res.output;
                this.apiGatewayService.updateApprovalAlert(({
                    output: rawLogs.replace(/#/g, '<br>'),
                    collectionFromDateShamsi: alert.collectionFromDateShamsi,
                    collectionToDateShamsi: alert.collectionToDateShamsi,
                }));
                this.ref = this.dialogService.open(AlertDetailList, {
                    header: 'جزئیات آلارم',
                    width: '60%',
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                    maximizable: true,
                    closable: true,
                    data: {
                        onLoadingComplete: () => {
                            debugger;
                        },
                    },
                });
            },
            error: (err) => {
                console.error('❌ Error loading alarm detail:', err);
                this.ref.close();
            },
        });
    }
};
AlertManagementComponent = __decorate([
    Component({
        selector: 'app-alert-management',
        imports: [
            BreadcrumbsComponent,
            ButtonDirective,
            DropdownModule,
            InputText,
            KeyFilter,
            Menu,
            MorChar32Pipe,
            NgIf,
            PrimeTemplate,
            ReactiveFormsModule,
            Ripple,
            StatusPipe,
            TableModule,
            Toast,
            Tooltip,
            TranslocoPipe,
            FormsModule,
            PersianCalendarComponent,
            NgClass,
            SaffronShamsiDatePipe,
            TimePipe,
            DestionationPlatformIdPipe,
            ConsumedPipe,
        ],
        standalone: true,
        providers: [DialogService, DynamicDialogRef],
        templateUrl: './alert-management.component.html',
        styleUrl: './alert-management.component.scss',
    })
], AlertManagementComponent);
export { AlertManagementComponent };
