import { __decorate } from "tslib";
import { Component, effect, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { ModuleApiManagementComponent } from '../services-api/module-api-management/module-api-management.component';
import { MorChar32Pipe } from '../../../shared/pipes/morChar32.pipe';
import { NgClass, NgIf } from '@angular/common';
import { PartyRegisterComponent } from '../party/components/party-register/party-register.component';
import { PartyUpdateComponent } from '../party/components/party-update/party-update.component';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { RegisterRecipientsAlertsComponent } from './register-recipients-alerts/register-recipients-alerts.component';
import { Constants } from '../../../shared/constants/Constants';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { KeyFilter } from 'primeng/keyfilter';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { RegisterHubComponent } from '../hub-management/register-hub/register-hub.component';
import { HourPipe } from '../../../shared/pipes/hour.pipe';
let AuthorizedRecipientsAlertsComponent = class AuthorizedRecipientsAlertsComponent {
    route;
    messagesApiFacadeService;
    _primengProgressBarService;
    fb;
    transloco;
    notifierService;
    apiGatewayService;
    commonValidationsService;
    primeng;
    tempPerson;
    tempReceiver;
    pagesize = 10;
    updateFlag = false;
    addFlag = false;
    showMobile = false;
    showName = true;
    items = [];
    first = 0;
    rows = 10;
    pageno = 0;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    name = null;
    mobileNo = null;
    searchBy = '1';
    cust_alphanumFa = ApiGatewayConstants.cust_alphanumFa;
    personAlertList = [];
    searchByOption = Constants.searchByOption;
    nextBtnFlag = false;
    detailsBreadObject = [];
    personAlertSignal = signal([]);
    loading = signal(false);
    error = signal(null);
    onlyNextBtnFlag = false;
    receiverDto;
    firstIndex = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    totalRecords = 0;
    constructor(route, messagesApiFacadeService, _primengProgressBarService, fb, transloco, notifierService, apiGatewayService, commonValidationsService, primeng) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.fb = fb;
        this.transloco = transloco;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.commonValidationsService = commonValidationsService;
        this.primeng = primeng;
        effect(() => {
            console.log('تعداد نتایج:', this.personAlertSignal().length);
        });
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
                        label_index1: this.transloco.translate('breadcrumbs.recipientsAlerts'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/errorMessage.png',
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
    setRecord(receiver) {
        this.tempReceiver = receiver;
    }
    showUpdate(receiver) {
        this.receiverDto = receiver;
        this.addFlag = true;
    }
    ngOnInit() {
        this.search();
        this.detailsBreadObject = this.chooseBread('receiverBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempReceiver);
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
    onStatusToggle(party) {
        console.log('وضعیت تغییر کرد:', party.name, '→', party.status);
    }
    onChangeSearch(event) {
        if (event.value == null) {
            this.nextBtnFlag = false;
            this.onlyNextBtnFlag = false;
            this.mobileNo = null;
            this.name = null;
        }
        else if (event.value == '1') {
            this.showMobile = false;
            this.showName = true;
            this.onlyNextBtnFlag = true;
            this.mobileNo = null;
            this.searchBy = event.value;
        }
        else if (event.value == '2') {
            this.showMobile = true;
            this.showName = false;
            this.onlyNextBtnFlag = true;
            this.name = null;
            this.searchBy = event.value;
        }
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
    /*   previousPageStatement(): void {
           this.pageno -= 1;
           this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
           this.search();
       }*/
    OnchangePageno(e) {
        debugger;
        this.pageno = e.first / e.rows;
        this.pagesize = e.rows;
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
            this.pageno = 0;
        }
        else {
            this.firstIndex = e.first;
            this.pageno = e.first / e.rows;
        }
        this.pagesize = e.rows;
        this.search();
    }
    search() {
        debugger;
        this.personAlertList = [];
        let startRow;
        this.pageno != 0 ? (startRow = this.pageno * this.pagesize) : (startRow = 0);
        this._primengProgressBarService.show();
        this.loading.set(true);
        this.messagesApiFacadeService
            .getReceiver(this.pageno, this.pagesize, this.name, this.mobileNo)
            .subscribe((httpResponse) => {
            debugger;
            this._primengProgressBarService.hide();
            this.loading.set(false);
            let rawData = [];
            if (Array.isArray(httpResponse.body)) {
                rawData = httpResponse.body;
            }
            else if (httpResponse.body?.data && Array.isArray(httpResponse.body.data)) {
                rawData = httpResponse.body.data;
            }
            const processed = rawData.map((x, i) => {
                const status = x.status === 1;
                const startRow = (this.pageno - 1) * this.pagesize;
                const row = startRow + i + 1;
                return { ...x, status, row };
            });
            this.personAlertSignal.set(processed);
            this.totalRecords = Number(httpResponse.headers.get('totalitems')) || 0;
        }, (err) => {
            console.error('❌ خطا در درخواست API:', err);
            this.error.set('خطا در دریافت داده‌ها');
            this.loading.set(false);
            this._primengProgressBarService.hide();
        });
        /*  const rawData = response?.data ?? response ?? [];
          const processed = rawData.map((x, i) => {
              const status = x.status === 1;
              let row = i + 1;
              if (this.pageno > 1) {
                  const startRow = (this.pageno - 1) * this.pagesize;
                  row = startRow + i + 1;
              }
              return { ...x, status, row };
          });
          this.personAlertSignal.set(processed);
      },
      error: (err) => {
          debugger;
          console.error('❌ خطا در درخواست API:', err);
          this.error.set('خطا در دریافت داده‌ها');
          this.loading.set(false);
          this._primengProgressBarService.hide();
      },
  );*/
    }
    clear() {
        this.name = null;
        this.mobileNo = null;
        this.searchBy = '1';
        this.showMobile = false;
        this.showName = true;
        this.onlyNextBtnFlag = true;
        this.mobileNo = null;
        this.search();
    }
    onKeydown(event) {
        debugger;
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick(true);
        }
    }
    showAdd() {
        this.receiverDto = null;
        this.addFlag = true;
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    onClose(e) {
        debugger;
        if (e == 'close') {
            this.search();
            this.detailsBreadObject = this.chooseBread('receiverBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.items = [
                {
                    items: [
                        {
                            label: this.transloco.translate('contextMenu.Edit'),
                            command: () => {
                                this.showUpdate(this.tempReceiver);
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
        this.addFlag = false;
    }
};
AuthorizedRecipientsAlertsComponent = __decorate([
    Component({
        selector: 'app-authorized-recipients-alerts',
        imports: [
            BreadcrumbsComponent,
            ButtonDirective,
            DropdownModule,
            InputText,
            Menu,
            ModuleApiManagementComponent,
            MorChar32Pipe,
            NgIf,
            PartyRegisterComponent,
            PartyUpdateComponent,
            PrimeTemplate,
            ReactiveFormsModule,
            Ripple,
            StatusPipe,
            TableModule,
            Toast,
            Tooltip,
            TranslocoPipe,
            NgClass,
            FormsModule,
            RegisterRecipientsAlertsComponent,
            ToggleSwitch,
            KeyFilter,
            RegisterHubComponent,
            HourPipe,
        ],
        templateUrl: './authorized-recipients-alerts.component.html',
        styleUrl: './authorized-recipients-alerts.component.scss',
    })
], AuthorizedRecipientsAlertsComponent);
export { AuthorizedRecipientsAlertsComponent };
