// @ts-nocheck
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {MoreChar19Pipe} from '../../../shared/pipes/moreChar19.pipe';
import {NgIf} from '@angular/common';
import {Menu} from 'primeng/menu';
import {Ripple} from 'primeng/ripple';
import {TranslocoPipe, TranslocoService,} from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {ToastService} from '../../../shared/services/ToastService';
import {FuseLoadingService} from '@fuse/services/loading';
import {ApiGatewayService} from '../../services/api-gateway.service';
import {CommonValidationsService} from '../../../shared/validators/common-validations.service';
import {MessagesApiFacadeService} from '../../services/messages-api-facade.service';
import {Constants} from '../../../shared/constants/Constants';
import {LocaleSettings} from 'primeng/calendar';
import {CastToDatePipe} from '../../../shared/pipes/cast-to-date.pipe';
import {WageRegisterComponent} from './wage-register/wage-register.component';
import {WageTypePipe} from '../../../shared/pipes/wageType.pipe';
import {PrimeNG} from 'primeng/config';
import {PersianCalendarComponent} from '../../../shared/components/persian-calendar/persian-calendar.module';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-wage',
    templateUrl: './wage.component.html',
    styleUrls: ['./wage.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        FormsModule,
        ButtonDirective,
        Tooltip,
        MoreChar19Pipe,
        Menu,
        Ripple,
        DropdownModule,
        NgIf,
        TranslocoPipe,
        CastToDatePipe,
        WageRegisterComponent,
        WageTypePipe,
        PersianCalendarComponent,
        Toast,
    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WageComponent implements OnInit {
    addFlag = false;
    updateFlag = false;
    categoryListOptions = Constants.categoryListOptions;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private commonValidationsService: CommonValidationsService,
        private translateService: TranslocoService,
        private config: PrimeNG,
        private notifierService: ToastService
    ) {}
    paginationLabel=this.transloco.translate('label.pagination.table');
    registerObj = {
        headerWage: '',
        partyTitle: null,
        fromDate: null,
        toDate: null,
        moduleTitle: null,
        clientTitle: null,
        apiTitle: null,
        feeTitle: null,
        status: null,
        feeDetailCount: null,
        partyId: null,
        moduleId: null,
        apiId: null,
        clientId: null,
        feeId: null,
        apiFeeId: null,
        feeHeaderId: null,
        apiListOptions: [
            {
                apiId: null,
                moduleId: null,
                title: null,
                name: null,
                protocol: null,
                type: null,
                url: null,
                timeout: null,
                runningType: null,
                status: null,
                maxCall: null,
                callDuration: null,
                cashing_status: null,
                cashing_expire: null,
                description: null,
                retryCount: null,
                delayRetryCount: null,
                limitForPeriod: null,
                limitRefreshPeriod: null,
                logRequestStatus: null,
                logResponseStatus: null,
                reverseStatus: null,
                reverseCondition: null,
                cookeSendStatus: null,
                dailyCount: null,
                weeklyCount: null,
                monthlyCount: null,
                retryForHttpStatusCode: null,
                hasBody: null,
            },
        ],
    };

    partyListOptions = [{ title: '-', partyId: null }];
    moduleListOptions = [{ moduleTitle: '-', moduleId: null }];
    apiListOptions = [{ title: '-', apiId: null }];
    hideApiListOptions = [
        {
            apiId: null,
            moduleId: null,
            title: null,
            name: null,
            protocol: null,
            type: null,
            url: null,
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: null,
            description: null,
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            dailyCount: null,
            weeklyCount: null,
            monthlyCount: null,
            retryForHttpStatusCode: null,
            hasBody: null,
        },
    ];
    clientListOptions = [{ name: '-', clientId: null }];
    partyId: string = null;
    moduleId: string = null;
    clientId: string = null;
    apiId: string = null;
    rows = 10;
    first = 0;
    wageList = [];
    tempWage = null;
    detailsBreadObject: any = null;
    fromdate;
    todate;
    items;
    partyModuleDisabled = true;
    clientDisabled = true;
    apiDisabled = true;
    disabledAdd = true;
    persianLocale: LocaleSettings;

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit() {
        //  let a:number=1.224521
        //console.log(a)
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallparty().subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('wageBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        this.items = [
            {
                items: [
                    {
                        label: 'مشاهده کارمزد',
                        icon: '',
                        command: () => {
                            this.showDisplay(this.tempWage);
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

    showDisplay(Wage) {
        this.addFlag = true;
        this.registerObj.apiFeeId = Wage.apiFeeId;
        this.registerObj.partyId = Wage.partyId;
        this.registerObj.partyTitle = Wage.partyTile;

        this.registerObj.fromDate = Wage.fromDate;
        this.registerObj.toDate = Wage.partyTile;

        this.registerObj.clientId = Wage.clientId;
        this.registerObj.clientTitle = Wage.clinetTitle;
        this.registerObj.apiId = Wage.apiId;
        this.registerObj.apiTitle = Wage.apiTitle;
        this.registerObj.feeId = Wage.feeId;
        this.registerObj.feeTitle = Wage.feeTitle;
        this.registerObj.headerWage = 'نمایش کارمزد';
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'wageBase':
                return [

                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.feeApis'),
                        rout_index0: '',
                        isActive0: true,
                        img_index0: 'assets/icons/wage.png',
                        label_Detail_index0: null,
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

    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }

    clear() {
        this.wageList = [];
        this.clientId = null;
        this.apiId = null;
        this.fromdate = null;
        this.todate = null;
        this.apiListOptions = [{ title: '-', apiId: null }];
        this.clientListOptions = [{ name: '-', clientId: null }];
        this.partyId = null;
        this.registerObj = {
            headerWage: '',
            partyTitle: null,
            moduleTitle: null,
            clientTitle: null,
            apiTitle: null,
            feeTitle: null,
            status: null,
            feeDetailCount: null,
            partyId: null,
            moduleId: null,
            apiId: null,
            clientId: null,
            feeId: null,
            apiFeeId: null,
            feeHeaderId: null,
            fromDate: null,
            toDate: null,
            apiListOptions: [
                {
                    apiId: null,
                    moduleId: null,
                    title: null,
                    name: null,
                    protocol: null,
                    type: null,
                    url: null,
                    timeout: null,
                    runningType: null,
                    status: null,
                    maxCall: null,
                    callDuration: null,
                    cashing_status: null,
                    cashing_expire: null,
                    description: null,
                    retryCount: null,
                    delayRetryCount: null,
                    limitForPeriod: null,
                    limitRefreshPeriod: null,
                    logRequestStatus: null,
                    logResponseStatus: null,
                    reverseStatus: null,
                    reverseCondition: null,
                    cookeSendStatus: null,
                    dailyCount: null,
                    weeklyCount: null,
                    monthlyCount: null,
                    retryForHttpStatusCode: null,
                    hasBody: null,
                },
            ],
        };
    }

    onKeydown(event): void {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    validationSearch() {
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
        } else if (this.fromdate > this.todate) {
            this.notifierService.showError({
                detail: 'لطفا بازه تاریخ معتبر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.commonValidationsService.maximumDateDayChecker(this.todate)
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روزجاری می تواند باشد!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    search() {
        if (this.partyId) {
            //  if (this.validationSearch()) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apifeesearch(
                    this.partyId,
                    this.clientId,
                    this.apiId,
                    this.fromdate,
                    this.todate
                )
                .subscribe(
                    (v) => {
                        this._primengProgressBarService.hide();
                        this.wageList = [];
                        if (Array.isArray(v)) {
                            this.wageList = v;
                        } else {
                            this.wageList.push(...v);
                        }
                        for (let k = 0; k < this.wageList.length; k++) {
                            if ('row' in this.wageList) {
                            } else {
                                this.wageList[k] = Object.assign(
                                    this.wageList[k],
                                    { row: k + 1 }
                                );
                            }
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            // }
        } else {
            this.wageList = [];
            this.notifierService.showError({
                detail: 'لطفا نام سازمان را انتخاب کنید!',
                life: 3000,
            });
        }
    }

    OnchangeParty(event) {
        if (event.value != null) {
            this.partyListOptions.forEach((s) => {
                if (s.partyId == event.value) {
                    this.registerObj.partyTitle = s.title;
                    this.registerObj.partyId = s.partyId;
                }
            });
            this.search();
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibypartyid(event.value).subscribe(
                (l) => {
                    this._primengProgressBarService.hide();
                    this.registerObj.apiListOptions = [];
                    this.hideApiListOptions = [];
                    this.apiListOptions = [{ title: '-', apiId: null }];
                    this.clientListOptions = [{ name: '-', clientId: null }];
                    if (Array.isArray(l)) {
                        this.apiListOptions = l;
                        this.hideApiListOptions = l;
                        this.apiListOptions.unshift({
                            title: '-',
                            apiId: null,
                        });
                    } else {
                        this.apiListOptions.push(...l);
                        this.hideApiListOptions.push(l);
                    }
                    this.registerObj.apiListOptions = this.hideApiListOptions;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        } else {
            this.apiListOptions = [{ title: '-', apiId: null }];
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.search();
        }
    }

    OnchangeClient(event) {
        if (event.value != null) {
            this.clientListOptions.forEach((s) => {
                if (s.clientId == event.value) {
                    this.registerObj.clientTitle = s.name;
                    this.registerObj.clientId = s.clientId;
                }
            });
            this.search();
        } else {
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.clientId = null;
            this.search();
        }
    }
/*
    OnchangeApi(event) {
        if (event.value != null) {
            this.apiListOptions.forEach((s) => {
                if (s.apiId == event.value) {
                    this.registerObj.apiTitle = s.title;
                    this.registerObj.apiId = s.apiId;
                }
            });
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.search();
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.clientbyapiid(event.value).subscribe(
                (i) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(i)) {
                        this.clientListOptions = i;
                    } else {
                        this.clientListOptions.push(...i);
                    }
                    this.clientListOptions.unshift({
                        name: '-',
                        clientId: null,
                    });
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        } else {
            this.clientListOptions = [{ name: '-', clientId: null }];
            this.apiId = null;
            this.search();
        }
    }*/
    OnchangeApi(event) {

        if (event.value != null) {

            this.apiListOptions.forEach((s) => {

                if (s.apiId == event.value) {

                    this.registerObj.apiTitle = s.title;

                    this.registerObj.apiId = s.apiId;
                }
            });

            this.clientListOptions = [{ name: '-', clientId: null }];

            this.search();

            this._primengProgressBarService.show();

            this.messagesApiFacadeService
                .clientbyapiid(event.value, 10000, 0)
                .subscribe(
                    (response: any) => {

                        this._primengProgressBarService.hide();

                        let data = [];

                        if (Array.isArray(response.body)) {

                            data = response.body;

                        } else if (
                            response.body &&
                            response.body.data &&
                            Array.isArray(response.body.data)
                        ) {

                            data = response.body.data;
                        }

                        this.clientListOptions = [...data];

                        this.clientListOptions.unshift({
                            name: '-',
                            clientId: null,
                        });
                    },
                    (error) => {

                        this._primengProgressBarService.hide();
                    }
                );

        } else {

            this.clientListOptions = [{ name: '-', clientId: null }];

            this.apiId = null;

            this.search();
        }
    }
    validationAdd(): boolean {
        if (!this.commonValidationsService.stringNotNullChecker(this.partyId)) {
            this.notifierService.showError({
                detail: 'لطفا سازمان را انتخاب کنید!',
                life: 3000,
            });
            return false;
        }
        if (!this.commonValidationsService.stringNotNullChecker(this.apiId)) {
            this.notifierService.showError({
                detail: 'لطفا سرویس را انتخاب کنید!',
                life: 3000,
            });
            return false;
        }
        if (
            !this.commonValidationsService.stringNotNullChecker(this.clientId)
        ) {
            this.notifierService.showError({
                detail: 'لطفا کلاینت را انتخاب کنید!',
                life: 3000,
            });
            return false;
        }
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
        } else if (this.fromdate > this.todate) {
            this.notifierService.showError({
                detail: 'لطفا بازه تاریخ معتبر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            this.commonValidationsService.maximumDateDayChecker(this.todate)
        ) {
            this.notifierService.showError({
                detail: 'حداکثر تاریخ پایان روزجاری می تواند باشد!',
                life: 3000,
            });
            return false;
        } else if (this.wageList.length > 0) {
            this.notifierService.showError({
                detail: 'در بازه تاریخ منتخب قبلا کارمزد صادر گردیده است!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    showAdd() {
        if (this.validationAdd()) {
            this.registerObj.headerWage = 'ایجاد کارمزد';
            this.registerObj.fromDate = this.fromdate;
            this.registerObj.toDate = this.todate;

            this.partyListOptions.forEach((s) => {
                if (s.partyId == this.partyId) {
                    this.registerObj.partyTitle = s.title;
                    this.registerObj.partyId = this.partyId;
                }
            });
            this.clientListOptions.forEach((s) => {
                if (s.clientId == this.clientId) {
                    this.registerObj.clientTitle = s.name;
                    this.registerObj.clientId = this.clientId;
                }
            });
            this.apiListOptions.forEach((s) => {
                if (s.apiId == this.apiId) {
                    this.registerObj.apiTitle = s.title;
                    this.registerObj.apiId = this.apiId;
                }
            });
            if (this.apiId) {
                const mySelf = this;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .getapicountwithoutfeebypartyandclientandapi(
                        this.partyId,
                        this.clientId,
                        this.apiId
                    )
                    .subscribe(
                        (t) => {
                            this._primengProgressBarService.hide();
                            if (t == 0) {
                                if (this.wageList.length != 0) {
                                    this.notifierService.showError({
                                        detail: 'امکان ایجاد مجدد کارمزد برای این سازمان وجود ندارد!',
                                        life: 3000,
                                    });
                                }
                            } else {
                                this.addFlag = true;
                            }
                            this.registerObj.apiListOptions =
                                this.hideApiListOptions.filter(function (x) {
                                    return x.apiId === mySelf.apiId;
                                });
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            } else if (!this.apiId && this.partyId) {
                this.registerObj.apiListOptions = [];
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .getapicountwithoutfeebyparty(this.partyId)
                    .subscribe(
                        (g) => {
                            this._primengProgressBarService.hide();
                            if (g == 0) {
                                if (this.wageList.length == 0) {
                                    this.notifierService.showError({
                                        detail: 'درصورت عدم وجود کلاینت ویا سرویس برای سازمان منتخب امکان ایجاد کارمزد وجود ندارد!',
                                        life: 3000,
                                    });
                                } else {
                                    this.notifierService.showError({
                                        detail: 'امکان ایجاد مجدد کارمزد برای این سازمان وجود ندارد!',
                                        life: 3000,
                                    });
                                }
                            } else {
                                this.addFlag = true;
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    onClose(event: any) {
        if (event == 'closeAndCreate') {
            this.search();
        }
        this.scrollTop();
        if (this.apiListOptions[0].apiId != null) {
            this.apiListOptions.unshift({ title: '-', apiId: null });
        }
        this.detailsBreadObject = this.chooseBread('wageBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        this.addFlag = false;
    }

    setRecord(wage) {
        this.tempWage = wage;
    }
}
