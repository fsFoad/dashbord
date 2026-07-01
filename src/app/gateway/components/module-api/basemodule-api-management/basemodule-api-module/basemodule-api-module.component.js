import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TranslocoPipe } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { Tooltip } from 'primeng/tooltip';
import { UIChart } from 'primeng/chart';
import { TieredMenu } from 'primeng/tieredmenu';
import { ApiModuleRegisterComponent } from './api-module-register/api-module-register.component';
import { ApiModuleUpdateComponent } from './api-module-update/api-module-update.component';
import { ApiRuleComponent } from './api-rule/api-rule.component';
import { TimeLimitationComponent } from './time-limitation/time-limitation.component';
import { MediatorsListComponent } from './mediators-list/mediators-list.component';
import { ApiLogsComponent } from './api-logs/api-logs.component';
import { ChartApiComponent } from './chart-api/chart-api.component';
import { AlertClientComponent } from '../../../alert-client/alert-client.component';
import { AlertSystemComponent } from '../../../alert-system/alert-system.component';
import { ClientApiManagementComponent, } from '../../../services-api/endpoint-management/client-api-management/client-api-management.component';
import { ProducedNodeComponent } from './produced-node/produced-node.component';
import { RequiredNodeComponent } from './required-node/required-node.component';
import { SequenceComponent } from './sequence/sequence.component';
import { HeaderEndpointManagementComponent, } from '../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-management.component';
import { apiHubComponent } from './api-hub/api-hub.component';
import { CacheApiComponent } from './cache-api/cache-api.component';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { HttpMethodsPipe } from '../../../../../shared/pipes/http-methods.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { NormalizeJalaliPipe } from '../../../../../shared/pipes/fix-jalali.pipe';
import { SequenceManagementComponent } from './sequence/sequence-management/sequence-management.component';
import { InputMediatorComponent } from './input-mediator-list/input-mediator/input-mediator.component';
import { InputMediatorListComponent } from './input-mediator-list/input-mediator-list.component';
import { AggregatorConfigComponent } from './api-aggregator/aggregator-config/aggregator-config.component';
import { ApiAggregatorComponent } from './api-aggregator/api-aggregator.component';
let BasemoduleApiModuleComponent = class BasemoduleApiModuleComponent {
    apiGatewayService;
    transloco;
    _primengProgressBarService;
    messagesApiFacadeService;
    accessDataSaveService;
    viewportScroller;
    notifierService;
    router;
    route;
    primeng;
    close = new EventEmitter();
    inputAccess;
    inputModulePartyBase;
    inputModule;
    flag;
    errorMessage = '';
    addFlag = false;
    rulFlag = false;
    apiHubFlag = false;
    apiCacheFlag = false;
    apiMediatorFlag = false;
    apiAggregatorFlag = false;
    flagClient = false;
    partyBase = null;
    timeLimitationFlag = false;
    chartApiFlag = false;
    alertClientFlag = false;
    headerFlag = false;
    mediatorsFlag = false;
    apiLogFlag = false;
    alertSystemFlag = false;
    clientApiFlag = false;
    producedNodeFlag = false;
    requiredNodeFlag = false;
    sequenceFlag = false;
    updateFlag = false;
    showDialog = false;
    tableFlag = true;
    apiDto = {
        apiId: null,
        moduleId: null,
        title: '',
        name: '',
        protocol: null,
        type: null,
        url: '',
        timeout: null,
        runningType: null,
        status: null,
        maxCall: null,
        callDuration: null,
        cashing_status: null,
        cashing_expire: '',
        description: '',
        retryCount: null,
        delayRetryCount: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        logRequestStatus: null,
        logResponseStatus: null,
        reverseStatus: null,
        reverseCondition: null,
        cookeSendStatus: null,
        moduleBase: null,
        moduleTitle: null,
        partyTitle: null,
        clientBase: null,
        clientName: null,
        clientId: null,
        accessBase: null,
        moduleType: null,
        sequenceBase: null,
        partyBase: null,
        shenase: null,
    };
    tempApi;
    headerApi = 'سرویس های ماژول';
    baseClientFlag;
    ModuleDto;
    api = {
        delayRetryTime: null,
        description: '',
        esbMode: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        moduleAuthMode: null,
        moduleBase: null,
        moduleGroup: null,
        moduleId: null,
        moduleTitle: '',
        moduleType: null,
        partyId: null,
        partyTitle: '',
        retryCount: null,
        status: null,
    };
    moduleTitle;
    moduleType;
    moduleGroup;
    apiList = [];
    detailsBreadObject = [];
    moduleBase;
    accessBase;
    clientBase;
    nextBtnFlag = false;
    onlyNextBtnFlag = false;
    partyTitle;
    clientName = null;
    items;
    moduleId;
    clientId;
    tempClientId;
    tempModuleById;
    widthModuleTitle;
    widthModuleType;
    widthModuleGroup;
    basicOptions;
    basicData;
    first = 0;
    rows = 10;
    showTitle = true;
    showName = false;
    filterFlag = true;
    name;
    title;
    categoryid = null;
    mainId;
    searchBy = '1';
    apiMainCategories = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    categories = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    mainCategorie = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    searchByOption = [
        { name: 'عنوان سرویس', code: '1' },
        { name: 'نام سرویس', code: '2' },
    ];
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pageno = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    loading;
    apibymoduleidCallFlag = false;
    lastJobRunn;
    totalRecords = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    firstIndex = 0;
    constructor(apiGatewayService, transloco, _primengProgressBarService, messagesApiFacadeService, accessDataSaveService, viewportScroller, notifierService, router, route, primeng) {
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this._primengProgressBarService = _primengProgressBarService;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.accessDataSaveService = accessDataSaveService;
        this.viewportScroller = viewportScroller;
        this.notifierService = notifierService;
        this.router = router;
        this.route = route;
        this.primeng = primeng;
    }
    OnChangeCateguryOptions(event) {
        debugger;
        this.categories = [];
        const newObject = {
            categoryId: null,
            title: '-',
            shenase: '',
        };
        this.categories.unshift(newObject);
        if (event.value != null) {
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getApiCategory(event.value).subscribe((response) => {
                debugger;
                console.log('response', response);
                this._primengProgressBarService.hide();
                this.categoryid = null;
                this.categories = [];
                this.categories = response.outputData;
                const newObject = {
                    categoryId: null,
                    title: '-',
                    shenase: '',
                };
                this.categories.unshift(newObject);
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    transferToStore() {
        this.errorMessage = '';
        debugger;
        if (this.validateTransfer()) {
            debugger;
            if (this.apiDto != undefined && this.apiDto != null) {
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apistoreJwt().subscribe((u) => {
                    debugger;
                    debugger;
                    debugger;
                    debugger;
                    this._primengProgressBarService.hide();
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .integrationTransfer(u?.outputData, this.apiDto.apiId, this.categoryid, this.moduleId).subscribe((m) => {
                        debugger;
                        this._primengProgressBarService.hide();
                        if (m?.resultStatus?.message) {
                            this.notifierService.showSuccess({
                                detail: m?.resultStatus?.message,
                                life: 3000,
                            });
                        }
                        else if (m?.error) {
                            this.notifierService.showSuccess({
                                detail: 'عملیات باموفقیت انجام شد',
                                life: 3000,
                            });
                        }
                        else if (m?.text) {
                            this.notifierService.showSuccess({
                                detail: m?.text,
                                life: 3000,
                            });
                        }
                        // this.errorMessage=m?.error?.text
                        this.closeDialog();
                    }, (error) => {
                        debugger;
                        this.errorMessage = error?.error?.text;
                        this._primengProgressBarService.hide();
                    });
                }, (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
                });
                /*this.messagesApiFacadeService.transferToStore(this.apiDto.apiId,this.categoryid).
                subscribe(p=>{
                    this._primengProgressBarService.hide()
                    console.log(p)
                    this.closeDialog()
                },error => {
                    this._primengProgressBarService.hide()
                })*/
            }
        }
    }
    validateTransfer() {
        if (!this.mainCategorie) {
            this.notifierService.showError({
                detail: 'لطفا دسته بندی سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.categoryid) {
            this.notifierService.showError({
                detail: 'لطفا بسته سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    closeDialog() {
        this.showDialog = false;
        this.errorMessage = ' ';
        this.mainCategorie = null;
        this.categoryid = null;
        this.categories = [];
        this.categories.unshift({ title: '-', categoryId: null });
    }
    onChangeSearch(event) {
        if (event.value == null) {
            this.filterFlag = false;
            this.nextBtnFlag = false;
            this.onlyNextBtnFlag = false;
            this.title = null;
            this.name = null;
        }
        else if (event.value == '1') {
            this.filterFlag = true;
            this.showTitle = true;
            this.showName = false;
            this.onlyNextBtnFlag = true;
            this.name = null;
            this.searchBy = event.value;
        }
        else if (event.value == '2') {
            this.filterFlag = true;
            this.showTitle = false;
            this.showName = true;
            this.onlyNextBtnFlag = true;
            this.title = null;
            this.searchBy = event.value;
        }
    }
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
        this.search(this.pagesize, this.pageno);
    }
    clear() {
        this.name = null;
        this.title = null;
        this.apiList = [];
        this.searchBy = '1';
        this.showTitle = true;
        this.showName = false;
        this.filterFlag = true;
        this.pagesize = 10;
        this.pageno = 0;
        this.firstIndex = 0;
        this.totalRecords = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.nextBtnFlag = false;
        this.onlyNextBtnFlag = false;
        this.loading = false;
        this.apibymoduleidCallFlag = true;
        this.loading = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null)
            .subscribe({
            next: (res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading = false;
                const body = res?.body;
                const startRow = this.pageno ? this.pageno * this.pagesize : 0;
                const list = Array.isArray(body) ? body : (body ? [body] : []);
                this.apiList = list;
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.apiList.forEach(x => {
                    x.status = x.status === 1;
                });
                for (let k = 0; k < this.apiList.length; k++) {
                    const item = this.apiList[k];
                    item.cashing_expire = this.castToDate(item.cashing_expire);
                    item.successData = (item.successData ?? []).map(d => d.count);
                    item.unSuccessData = (item.unSuccessData ?? []).map(d => d.count);
                    item.basicData = {
                        labels: (this.apiList[0]?.days) ?? [],
                        datasets: [
                            {
                                label: 'موفق',
                                data: item.successData,
                                fill: false,
                                borderColor: '#21c57b',
                                tension: 0.4,
                            },
                            {
                                label: 'ناموفق',
                                data: item.unSuccessData,
                                fill: true,
                                borderColor: '#ff5858',
                                tension: 0.4,
                            },
                        ],
                    };
                    item.basicOptions = {
                        plugins: {
                            legend: { display: false },
                        },
                    };
                }
                this.apiList.forEach((item, idx) => {
                    item.row = idx + startRow + 1;
                });
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            },
            error: () => {
                this._primengProgressBarService.hide();
                this.loading = false;
            },
        });
    }
    onKeydown(event) {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick(true);
        }
    }
    searchClick(flag) {
        if (flag) {
            if (this.searchBy == '1') {
                if (this.validationSearchByTitle()) {
                    this.pageno = 0;
                    this.pagesize = 10;
                    this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                    this.search(this.pagesize, this.pageno);
                }
            }
            else if (this.searchBy == '2') {
                if (this.validationSearchByName()) {
                    this.pageno = 0;
                    this.pagesize = 10;
                    this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                    this.search(this.pagesize, this.pageno);
                }
            }
            else {
                this.pageno = 0;
                this.pagesize = 10;
                this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                this.search(this.pagesize, this.pageno);
            }
        }
    }
    search(pagesize, pageno) {
        debugger;
        if (this.searchBy == null) {
            debugger;
            this.nextBtnFlag = false;
            this.loading = true;
            this._primengProgressBarService.show();
            /*  this.messagesApiFacadeService
                  .apibymoduleinfo(
                      this.moduleId,
                      this.pageno,
                      this.pagesize,
                      null,
                      null,
                  )
                  .subscribe(
                      (a) => {
                          this._primengProgressBarService.hide();
                          this.loading = false;
                          if (Array.isArray(a)) {
                              this.apiList = a;
                          } else {
                              this.apiList.push(a);
                          }
                          this.apiList.map((x) =>
                              x.status === 1
                                  ? (x.status = true)
                                  : (x.status = false),
                          );
                          for (let k = 0; k < this.apiList.length; k++) {
                              this.apiList[k].cashing_expire = this.castToDate(
                                  this.apiList[k].cashing_expire,
                              );
                              this.apiList[k].successData = this.apiList[
                                  k
                                  ].successData.map((data) => data.count);
                              this.apiList[k].unSuccessData = this.apiList[
                                  k
                                  ].unSuccessData.map((data) => data.count);
                              this.apiList[k] = Object.assign(this.apiList[k], {
                                  basicData: {
                                      labels: this.apiList[0].days,
                                      datasets: [
                                          {
                                              label: 'موفق',
                                              data: this.apiList[k].successData,
                                              fill: false,
                                              borderColor: '#21c57b',
                                              tension: 0.4,
                                          },
                                          {
                                              label: 'ناموفق',
                                              data: this.apiList[k].unSuccessData,
                                              fill: true,
                                              borderColor: '#ff5858',
                                              tension: 0.4,
                                          },
                                      ],
                                  },
                              });
                              this.apiList[k] = Object.assign(this.apiList[k], {
                                  basicOptions: {
                                      plugins: {
                                          legend: {
                                              display: false,
                                          },
                                      },
                                  },
                              });
                          }
                          if (pageno != 0 && pageno != 1) {
                              debugger;
                              for (let u = 0; u < this.apiList.length; u++) {
                                  this.apiList[u] = Object.assign(
                                      this.apiList[u],
                                      { row: u + startRow + 1 },
                                  );
                                  debugger;
                              }
                          } else if (pageno == 1) {
                              debugger;
                              for (let u = 0; u < this.apiList.length; u++) {
                                  this.apiList[u] = Object.assign(
                                      this.apiList[u],
                                      { row: u + pagesize + 1 },
                                  );
                                  debugger;
                              }
                          } else {
                              for (let u = 0; u < this.apiList.length; u++) {
                                  this.apiList[u] = Object.assign(
                                      this.apiList[u],
                                      { row: u + 1 },
                                  );
                                  debugger;
                              }
                          }
  
                          //console.log('apiList', this.apiList)
                          this.basicOptions = {
                              plugins: {
                                  legend: {
                                      display: false,
                                      labels: {
                                          color: '#495057',
                                      },
                                  },
                              },
                              scales: {
                                  x: {
                                      ticks: {
                                          color: '#495057',
                                      },
                                      grid: {
                                          color: '#ebedef',
                                      },
                                      display: false,
                                  },
                                  y: {
                                      ticks: {
                                          color: '#495057',
                                      },
                                      grid: {
                                          color: '#ebedef',
                                      },
                                  },
                              },
                          };
                          this.loading = false;
                      },
                      (error) => {
                          this._primengProgressBarService.hide();
                      },
                  );*/
            this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null).subscribe({
                next: (res) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.apiList = [];
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    const data = res.body ?? [];
                    this.apiList = Array.isArray(data) ? data : [data];
                    this.apiList = this.apiList.map((x) => ({
                        ...x,
                        status: x.status === 1,
                    }));
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                    this.apiList = this.apiList.map((item) => {
                        const successData = (item.successData ?? []).map((d) => d.count);
                        const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                        return {
                            ...item,
                            cashing_expire: this.castToDate(item.cashing_expire),
                            successData,
                            unSuccessData,
                            basicData: {
                                labels: item.days ?? [],
                                datasets: [
                                    {
                                        label: 'موفق',
                                        data: successData,
                                        fill: false,
                                        borderColor: '#21c57b',
                                        tension: 0.4,
                                    },
                                    {
                                        label: 'ناموفق',
                                        data: unSuccessData,
                                        fill: true,
                                        borderColor: '#ff5858',
                                        tension: 0.4,
                                    },
                                ],
                            },
                            basicOptions: {
                                plugins: {
                                    legend: { display: false },
                                },
                            },
                        };
                    });
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: { color: '#495057' },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                                display: false,
                            },
                            y: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                            },
                        },
                    };
                },
                error: (error) => {
                    this._primengProgressBarService.hide();
                    this.loading = false;
                },
            });
        }
        if (this.searchBy == '1') {
            debugger;
            if (this.title) {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, this.title).subscribe((res) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    this.apiList = [];
                    const data = res.body ?? [];
                    if (Array.isArray(data)) {
                        this.apiList = data;
                    }
                    else if (data) {
                        this.apiList.push(data);
                    }
                    this.apiList.forEach((x, index) => {
                        x.status = x.status === 1;
                        x.row = index + 1;
                        x.cashing_expire = this.castToDate(x.cashing_expire);
                        x.successData = x.successData?.map(d => d.count) ?? [];
                        x.unSuccessData = x.unSuccessData?.map(d => d.count) ?? [];
                        x.basicData = {
                            labels: this.apiList[0]?.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: x.successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: x.unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        };
                        x.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        };
                    });
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                                display: false,
                            },
                            y: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                            },
                        },
                    };
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                }, (error) => {
                    this.loading = false;
                    this._primengProgressBarService.hide();
                });
            }
            else {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null).subscribe((res) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    this.apiList = [];
                    const data = res.body ?? [];
                    if (Array.isArray(data)) {
                        this.apiList = data;
                    }
                    else if (data) {
                        this.apiList.push(data);
                    }
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                    this.apiList.forEach((x, index) => {
                        x.status = x.status === 1;
                        x.row = index + 1;
                        x.cashing_expire = this.castToDate(x.cashing_expire);
                        x.successData = x.successData?.map(d => d.count) ?? [];
                        x.unSuccessData = x.unSuccessData?.map(d => d.count) ?? [];
                        x.basicData = {
                            labels: this.apiList[0]?.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: x.successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: x.unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        };
                        x.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        };
                    });
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                                display: false,
                            },
                            y: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                            },
                        },
                    };
                }, (error) => {
                    this.loading = false;
                    this._primengProgressBarService.hide();
                });
            }
        }
        else if (this.searchBy == '2') {
            debugger;
            if (this.name) {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, this.name, null).subscribe((res) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    this.apiList = [];
                    const data = res.body ?? [];
                    if (Array.isArray(data)) {
                        this.apiList = data;
                    }
                    else if (data) {
                        this.apiList.push(data);
                    }
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                    this.apiList.forEach((x, index) => {
                        x.status = x.status === 1;
                        x.row = index + 1;
                        x.cashing_expire = this.castToDate(x.cashing_expire);
                        x.successData = x.successData?.map(d => d.count) ?? [];
                        x.unSuccessData = x.unSuccessData?.map(d => d.count) ?? [];
                        x.basicData = {
                            labels: this.apiList[0]?.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: x.successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: x.unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        };
                        x.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        };
                    });
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                                display: false,
                            },
                            y: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                            },
                        },
                    };
                }, (error) => {
                    this.loading = false;
                    this._primengProgressBarService.hide();
                });
            }
            else {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null).subscribe((res) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    this.apiList = [];
                    const data = res.body ?? [];
                    if (Array.isArray(data)) {
                        this.apiList = data;
                    }
                    else if (data) {
                        this.apiList.push(data);
                    }
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                    this.apiList.forEach((x, index) => {
                        x.status = x.status === 1;
                        x.row = index + 1;
                        x.cashing_expire = this.castToDate(x.cashing_expire);
                        x.successData = x.successData?.map(d => d.count) ?? [];
                        x.unSuccessData = x.unSuccessData?.map(d => d.count) ?? [];
                        x.basicData = {
                            labels: this.apiList[0]?.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: x.successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: x.unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        };
                        x.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        };
                    });
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                                display: false,
                            },
                            y: {
                                ticks: { color: '#495057' },
                                grid: { color: '#ebedef' },
                            },
                        },
                    };
                }, (error) => {
                    this.loading = false;
                    this._primengProgressBarService.hide();
                });
            }
        }
    }
    validationSearchByTitle() {
        if (this.title && this.title.length < 3) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سرویس را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    validationSearchByName() {
        if (this.name && this.name.length < 3) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو نام سرویس را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    castToDate(args) {
        if (args)
            if (args.toString().length === 10) {
                let tempArgs;
                tempArgs = args.replace(/\//g, '');
                return tempArgs;
            }
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: true,
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
            default:
                return null;
        }
    }
    getsourcecurl(api) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getsourcecurl(api.apiId).subscribe((response) => {
            this._primengProgressBarService.hide();
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    getdestinationcurl(api) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getdestinationcurl(api.apiId).subscribe((response) => {
            this._primengProgressBarService.hide();
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    sequenceFlow(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.moduleType = this.moduleType;
        this.sequenceFlag = true;
        this.apiGatewayService.updateApprovalApiIdSeq(api.apiId);
    }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        this.scrollTop();
        this.messagesApiFacadeService.config().subscribe(x => {
            this.lastJobRunn = x.lastJobRunn;
        });
        this.primeng.ripple.set(true);
        this.items = [
            {
                label: 'مدیریت المان ها',
                icon: '',
                items: [
                    {
                        label: 'المان های سرویس',
                        icon: '',
                        command: () => {
                            this.showHeader(this.tempApi);
                        },
                    },
                    {
                        label: 'افزودن المان سیستمی - <br>(صرفنظر از امضاء دیجیتال)',
                        icon: '',
                        command: () => {
                            this.ignoreSignature(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: 'کلاینت های سرویس',
                icon: '',
                command: () => {
                    this.showClientApi(this.tempApi);
                },
            },
            {
                label: 'قواعد سرویس',
                icon: '',
                command: () => {
                    this.showRules(this.tempApi);
                },
            },
            {
                label: 'هاب سرویس',
                icon: '',
                command: () => {
                    this.showApiHub(this.tempApi);
                },
            },
            {
                label: 'مدیاتور سرویس',
                icon: '',
                items: [
                    {
                        label: 'مدیاتور ورودی',
                        icon: '',
                        command: () => {
                            this.showInputMediatNode(this.tempApi);
                        },
                    },
                    {
                        label: 'مدیاتور خروجی',
                        icon: '',
                        command: () => {
                            this.showMediators(this.tempApi);
                        },
                    },
                ]
            },
            {
                label: this.transloco.translate('contextMenu.curl'),
                icon: '',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.createOriginCurl'),
                        icon: '',
                        command: () => {
                            this.getsourcecurl(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.createDestinationCurl'),
                        icon: '',
                        command: () => {
                            this.getdestinationcurl(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: 'اگریگیتور های سرویس',
                icon: '',
                command: () => {
                    this.showAggregator(this.tempApi);
                },
            },
            {
                label: this.transloco.translate('contextMenu.sequence'),
                icon: '',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.producedNode'),
                        icon: '',
                        command: () => {
                            this.producedNode(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.requiredNode'),
                        icon: '',
                        command: () => {
                            this.requiredNode(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.sequenceFlow'),
                        icon: '',
                        command: () => {
                            this.sequenceFlow(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.apiManagement'),
                items: [
                    {
                        label: this.transloco.translate('contextMenu.apiTimeLimitation'),
                        icon: '',
                        command: () => {
                            this.showTimeLimitation(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.apiCache'),
                        icon: '',
                        command: () => {
                            this.showCacheApi(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.apiReview'),
                items: [
                    {
                        label: this.transloco.translate('contextMenu.apiChart'),
                        icon: '',
                        command: () => {
                            this.showChartApi(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.apiLog'),
                        icon: '',
                        command: () => {
                            //تازمان امدن کافگا در بازی قابل اکشن نباشد
                            this.showApiLog(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.alarms'),
                items: [
                    {
                        label: this.transloco.translate('contextMenu.alarmsUser'),
                        command: () => {
                            this.showAlertClient(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.alarmsSystem'),
                        icon: '',
                        command: () => {
                            this.showAlertSystem(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.TransferringInfoGateway'),
                command: () => {
                    this.showTransport(this.tempApi);
                },
            },
            {
                label: this.transloco.translate('contextMenu.Edit'),
                command: () => {
                    this.showUpdate(this.tempApi);
                },
            },
            {
                separator: true
            },
            {
                label: this.transloco.translate('contextMenu.cancel'),
            },
        ];
        this.tempClientId = null;
        this.apiGatewayService.currentApprovalStageClientObject.subscribe((c) => {
            this.tempClientId = c.clientId;
            this.clientId = c.clientId;
            this.clientName = c.name;
            this.baseClientFlag = c.baseClientFlag;
        });
        debugger;
        if (this.inputAccess != undefined) {
            debugger;
            this.clientBase = this.inputAccess.clientBase;
            this.accessBase = this.inputAccess.accessBase;
            this.clientName = this.inputAccess.clientName;
            this.clientId = this.inputAccess.clientId;
            this.moduleTitle = this.inputAccess.moduleTitle;
            this.moduleId = this.inputAccess.moduleId;
            this.moduleType = this.inputAccess.moduleType;
            this.headerApi = ' سرویس های کلاینت';
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.SearchModuleById(this.moduleId).subscribe((j) => {
                this._primengProgressBarService.hide();
                this.moduleType = j.moduleType;
                this.moduleGroup = j.moduleGroup;
                this.moduleTitle = j.moduleTitle;
            }, (error) => {
                this._primengProgressBarService.hide();
            });
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, this.name, this.title).subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this.loading = false;
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /*    (a) => {
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    if (Array.isArray(a)) {
                        this.apiList = a;
                    } else {
                        this.apiList.push(a);
                    }
                    this.apiList.map((x) =>
                        x.status === 1
                            ? (x.status = true)
                            : (x.status = false),
                    );
                    for (let k = 0; k < this.apiList.length; k++) {
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            row: k + 1,
                        });
                        this.apiList[k].cashing_expire = this.castToDate(
                            this.apiList[k].cashing_expire,
                        );
                        this.apiList[k].successData = this.apiList[
                            k
                            ].successData.map((data) => data.count);
                        this.apiList[k].unSuccessData = this.apiList[
                            k
                            ].unSuccessData.map((data) => data.count);
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            basicData: {
                                labels: this.apiList[0].days,
                                datasets: [
                                    {
                                        label: 'موفق',
                                        data: this.apiList[k].successData,
                                        fill: false,
                                        borderColor: '#21c57b',
                                        tension: 0.4,
                                    },
                                    {
                                        label: 'ناموفق',
                                        data: this.apiList[k].unSuccessData,
                                        fill: true,
                                        borderColor: '#ff5858',
                                        tension: 0.4,
                                    },
                                ],
                            },
                        });
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            basicOptions: {
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            },
                        });
                    }
                    let startRow: number;
                    this.pageno != 0
                        ? (startRow = this.pageno * this.pagesize)
                        : (startRow = 0);
                    if (this.pageno != 0 && this.pagesize != 1) {
                        debugger;
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(
                                this.apiList[u],
                                { row: u + startRow + 1 },
                            );
                            debugger;
                        }
                    } else if (this.pageno == 1) {
                        debugger;
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(
                                this.apiList[u],
                                { row: u + this.pagesize + 1 },
                            );
                            debugger;
                        }
                    } else {
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(
                                this.apiList[u],
                                { row: u + 1 },
                            );
                            debugger;
                        }
                    }
                    //console.log('apiList', this.apiList)
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#495057',
                                },
                                grid: {
                                    color: '#ebedef',
                                },
                                display: false,
                            },
                            y: {
                                ticks: {
                                    color: '#495057',
                                },
                                grid: {
                                    color: '#ebedef',
                                },
                            },
                        },
                    };
                    this.loading = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );*/
        }
        else if (this.inputAccess != undefined) {
            debugger;
            this.accessBase = this.inputAccess.accessBase;
            this.clientBase = this.inputAccess.clientBase;
            this.tempModuleById = this.accessDataSaveService.shareData.moduleId;
            this.moduleId = this.accessDataSaveService.shareData.moduleId;
            this.loading = true;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.SearchModuleById(this.tempModuleById).subscribe((resModule) => {
                this._primengProgressBarService.hide();
                this.loading = false;
                this.moduleTitle = resModule.moduleTitle;
                this.moduleType = resModule.moduleType;
                this.moduleGroup = resModule.moduleGroup;
                if (this.accessBase) {
                    this.detailsBreadObject = [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: true,
                            img_index1: 'assets/icons/api.png',
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                        },
                        { label_index2: null, label_Detail_index2: null },
                        { label_index3: null, label_Detail_index3: null },
                        { label_index4: null, label_Detail_index4: null },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                this.loading = false;
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
        else if (this.inputModule != undefined) {
            debugger;
            this.moduleBase = true;
            this.moduleTitle = this.inputModule.moduleTitle;
            this.moduleType = this.inputModule.moduleType;
            this.moduleGroup = this.inputModule.moduleGroup;
            this.moduleId = this.inputModule.moduleId;
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(this.inputModule.moduleId, this.pageno, this.pagesize, null, null)
                .subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
        }
        /*    (a) => {
                this._primengProgressBarService.hide();
                this.loading = false;
                if (Array.isArray(a)) {
                    this.apiList = a;
                } else {
                    this.apiList.push(a);
                }
                this.apiList.map((x) =>
                    x.status === 1
                        ? (x.status = true)
                        : (x.status = false),
                );
                for (let k = 0; k < this.apiList.length; k++) {
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        row: k + 1,
                    });
                    this.apiList[k].cashing_expire = this.castToDate(
                        this.apiList[k].cashing_expire,
                    );
                    this.apiList[k].successData = this.apiList[
                        k
                        ].successData.map((data) => data.count);
                    this.apiList[k].unSuccessData = this.apiList[
                        k
                        ].unSuccessData.map((data) => data.count);
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        basicData: {
                            labels: this.apiList[0].days,
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: this.apiList[k].successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: this.apiList[k].unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                    });
                    this.apiList[k] = Object.assign(this.apiList[k], {
                        basicOptions: {
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        },
                    });
                }
                //console.log('apiList', this.apiList)
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                color: '#495057',
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#495057',
                            },
                            grid: {
                                color: '#ebedef',
                            },
                            display: false,
                        },
                        y: {
                            ticks: {
                                color: '#495057',
                            },
                            grid: {
                                color: '#ebedef',
                            },
                        },
                    },
                };
                this.loading = false;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );*/
        else if (this.inputModulePartyBase != undefined) {
            this.partyBase = true;
            this.api = this.inputModulePartyBase;
            this.apiGatewayService.updateApprovalModuleId(this.api.moduleId);
            this.moduleId = this.api.moduleId;
            this.moduleType = this.api.moduleType;
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleinfo(this.api.moduleId, this.pageno, this.pagesize, null, null).subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /*   (a) => {
                   this._primengProgressBarService.hide();
                   this.loading = false;
                   if (Array.isArray(a)) {
                       this.apiList = a;
                   } else {
                       this.apiList.push(a);
                   }
                   this.apiList.map((x) =>
                       x.status === 1
                           ? (x.status = true)
                           : (x.status = false),
                   );
                   for (let k = 0; k < this.apiList.length; k++) {
                       this.apiList[k] = Object.assign(this.apiList[k], {
                           row: k + 1,
                       });
                       this.apiList[k].cashing_expire = this.castToDate(
                           this.apiList[k].cashing_expire,
                       );
                       this.apiList[k].successData = this.apiList[
                           k
                           ].successData.map((data) => data.count);
                       this.apiList[k].unSuccessData = this.apiList[
                           k
                           ].unSuccessData.map((data) => data.count);
                       this.apiList[k] = Object.assign(this.apiList[k], {
                           basicData: {
                               labels: this.apiList[0].days,
                               datasets: [
                                   {
                                       label: 'موفق',
                                       data: this.apiList[k].successData,
                                       fill: false,
                                       borderColor: '#21c57b',
                                       tension: 0.4,
                                   },
                                   {
                                       label: 'ناموفق',
                                       data: this.apiList[k].unSuccessData,
                                       fill: true,
                                       borderColor: '#ff5858',
                                       tension: 0.4,
                                   },
                               ],
                           },
                       });
                       this.apiList[k] = Object.assign(this.apiList[k], {
                           basicOptions: {
                               plugins: {
                                   legend: {
                                       display: false,
                                   },
                               },
                           },
                       });
                   }
                   let startRow: number;
                   this.pageno != 0 ? (startRow = this.pageno * this.pagesize) : (startRow = 0);
                   if (this.pageno != 0 && this.pagesize != 1) {
                       debugger;
                       for (let u = 0; u < this.apiList.length; u++) {
                           this.apiList[u] = Object.assign(
                               this.apiList[u],
                               { row: u + startRow + 1 },
                           );
                           debugger;
                       }
                   } else if (this.pageno == 1) {
                       debugger;
                       for (let u = 0; u < this.apiList.length; u++) {
                           this.apiList[u] = Object.assign(
                               this.apiList[u],
                               { row: u + this.pagesize + 1 },
                           );
                           debugger;
                       }
                   } else {
                       for (let u = 0; u < this.apiList.length; u++) {
                           this.apiList[u] = Object.assign(
                               this.apiList[u],
                               { row: u + 1 },
                           );
                           debugger;
                       }
                   }
                   this.basicOptions = {
                       plugins: {
                           legend: {
                               display: false,
                               labels: {
                                   color: '#495057',
                               },
                           },
                       },
                       scales: {
                           x: {
                               ticks: {
                                   color: '#495057',
                               },
                               grid: {
                                   color: '#ebedef',
                               },
                               display: false,
                           },
                           y: {
                               ticks: {
                                   color: '#495057',
                               },
                               grid: {
                                   color: '#ebedef',
                               },
                           },
                       },
                   };
                   this.loading = false;
               },
               (error) => {
                   this._primengProgressBarService.hide();
               },
           );*/
            this.moduleTitle = this.api.moduleTitle;
            this.partyTitle = this.api.partyTitle;
            this.moduleType = this.api.moduleType;
            this.moduleGroup = this.api.moduleGroup;
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
    }
    showAdd() {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.moduleId = this.moduleId;
        this.apiDto.clientId = this.clientId;
        this.addFlag = true;
    }
    setRecord(api) {
        this.tempApi = api;
    }
    showCacheApi(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        debugger;
        this.apiCacheFlag = true;
        debugger;
    }
    showMediators(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.mediatorsFlag = true;
    }
    showTimeLimitation(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.timeLimitationFlag = true;
    }
    showClientApi(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        /*   this.apiGatewayService.updateApprovalApiId(api.apiId)
           this.apiGatewayService.updateApprovalApiName(api.name)
           this.apiGatewayService.updateApprovalApiName(api.url)*/
        this.clientApiFlag = true;
    }
    showRules(api) {
        debugger;
        debugger;
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.rulFlag = true;
    }
    showApiHub(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        debugger;
        this.apiHubFlag = true;
        debugger;
    }
    showChartApi(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.chartApiFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }
    showHeader(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.headerFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }
    showInputMediatNode(api) {
        debugger;
        debugger;
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.partyTitle != undefined || this.partyTitle != null ? (this.apiDto.partyBase = true) : (this.apiDto.partyBase = false);
        this.apiMediatorFlag = true;
    }
    showAggregator(api) {
        debugger;
        debugger;
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.apiId = api.apiId;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.partyTitle != undefined || this.partyTitle != null ? (this.apiDto.partyBase = true) : (this.apiDto.partyBase = false);
        this.apiAggregatorFlag = true;
        debugger;
    }
    showAlertClient(api) {
        this.alertClientFlag = true;
    }
    showAlertSystem(api) {
        this.alertSystemFlag = true;
    }
    showApiLog(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.apiLogFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }
    showTransport(api) {
        this.errorMessage = '';
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        debugger;
        this.showDialog = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getApiMainCategory().subscribe((p) => {
            debugger;
            this._primengProgressBarService.hide();
            this.apiMainCategories = [];
            this.apiMainCategories = p.outputData;
            this.apiMainCategories.unshift({
                title: '-',
                categoryId: null,
            });
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    showUpdate(api) {
        debugger;
        debugger;
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.partyBase = this.partyBase;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.updateFlag = true;
    }
    ignoreSignature(api) {
        this.messagesApiFacadeService.addapiignoresignature(api.apiId).subscribe(res => {
            this.notifierService.showSuccess({ detail: 'عملیات با موفقیت انجام گردید!', life: 3000 });
        }, error => {
        });
    }
    producedNode(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.sequenceBase = false;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.producedNodeFlag = true;
    }
    requiredNode(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.sequenceBase = false;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.requiredNodeFlag = true;
    }
    onClose(event) {
        debugger;
        this.scrollTop();
        if (this.clientBase) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null).subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                debugger;
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /* (a) => {
                 this._primengProgressBarService.hide();
                 this.loading = false;
                 if (Array.isArray(a)) {
                     this.apiList = a;
                 } else {
                     this.apiList.push(a);
                 }
                 this.apiList.map((x) =>
                     x.status === 1
                         ? (x.status = true)
                         : (x.status = false),
                 );
                 for (let k = 0; k < this.apiList.length; k++) {
                     this.apiList[k] = Object.assign(this.apiList[k], {
                         row: k + 1,
                     });
                     this.apiList[k].cashing_expire = this.castToDate(
                         this.apiList[k].cashing_expire,
                     );
                     this.apiList[k].successData = this.apiList[
                         k
                         ].successData.map((data) => data.count);
                     this.apiList[k].unSuccessData = this.apiList[
                         k
                         ].unSuccessData.map((data) => data.count);
                     this.apiList[k] = Object.assign(this.apiList[k], {
                         basicData: {
                             labels: this.apiList[0].days,
                             datasets: [
                                 {
                                     label: 'موفق',
                                     data: this.apiList[k].successData,
                                     fill: false,
                                     borderColor: '#21c57b',
                                     tension: 0.4,
                                 },
                                 {
                                     label: 'ناموفق',
                                     data: this.apiList[k].unSuccessData,
                                     fill: true,
                                     borderColor: '#ff5858',
                                     tension: 0.4,
                                 },
                             ],
                         },
                     });
                     this.apiList[k] = Object.assign(this.apiList[k], {
                         basicOptions: {
                             plugins: {
                                 legend: {
                                     display: false,
                                 },
                             },
                         },
                     });
                 }
                 let startRow: number;
                 this.pageno != 0
                     ? (startRow = this.pageno * this.pagesize)
                     : (startRow = 0);
                 if (this.pageno != 0 && this.pagesize != 1) {
                     debugger;
                     for (let u = 0; u < this.apiList.length; u++) {
                         this.apiList[u] = Object.assign(
                             this.apiList[u],
                             { row: u + startRow + 1 },
                         );
                         debugger;
                     }
                 } else if (this.pageno == 1) {
                     debugger;
                     for (let u = 0; u < this.apiList.length; u++) {
                         this.apiList[u] = Object.assign(
                             this.apiList[u],
                             { row: u + this.pagesize + 1 },
                         );
                         debugger;
                     }
                 } else {
                     for (let u = 0; u < this.apiList.length; u++) {
                         this.apiList[u] = Object.assign(
                             this.apiList[u],
                             { row: u + 1 },
                         );
                         debugger;
                     }
                 }
                 //console.log('apiList', this.apiList)
                 this.basicOptions = {
                     plugins: {
                         legend: {
                             display: false,
                             labels: {
                                 color: '#495057',
                             },
                         },
                     },
                     scales: {
                         x: {
                             ticks: {
                                 color: '#495057',
                             },
                             grid: {
                                 color: '#ebedef',
                             },
                             display: false,
                         },
                         y: {
                             ticks: {
                                 color: '#495057',
                             },
                             grid: {
                                 color: '#ebedef',
                             },
                         },
                     },
                 };
                 this.loading = false;
             },
             (error) => {
                 this._primengProgressBarService.hide();
             },
         );*/
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        if (this.accessBase) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(this.moduleId, this.pageno, this.pagesize, null, null)
                .subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                debugger;
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /*
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false),
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire,
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                                ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                                ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            /!*(this.partyList[k].row = (k+1))*!/
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 },
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 },
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 },
                                );
                                debugger;
                            }
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );*/
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.inputModule != undefined) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(this.inputModule.moduleId, this.pageno, this.pagesize, null, null)
                .subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                debugger;
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /*  (a) => {
                  this._primengProgressBarService.hide();
                  this.loading = false;
                  if (Array.isArray(a)) {
                      this.apiList = a;
                  } else {
                      this.apiList.push(a);
                  }
                  this.apiList.map((x) =>
                      x.status === 1
                          ? (x.status = true)
                          : (x.status = false),
                  );
                  for (let k = 0; k < this.apiList.length; k++) {
                      this.apiList[k] = Object.assign(this.apiList[k], {
                          row: k + 1,
                      });
                      this.apiList[k].cashing_expire = this.castToDate(
                          this.apiList[k].cashing_expire,
                      );
                      this.apiList[k].successData = this.apiList[
                          k
                          ].successData.map((data) => data.count);
                      this.apiList[k].unSuccessData = this.apiList[
                          k
                          ].unSuccessData.map((data) => data.count);
                      this.apiList[k] = Object.assign(this.apiList[k], {
                          basicData: {
                              labels: this.apiList[0].days,
                              datasets: [
                                  {
                                      label: 'موفق',
                                      data: this.apiList[k].successData,
                                      fill: false,
                                      borderColor: '#21c57b',
                                      tension: 0.4,
                                  },
                                  {
                                      label: 'ناموفق',
                                      data: this.apiList[k].unSuccessData,
                                      fill: true,
                                      borderColor: '#ff5858',
                                      tension: 0.4,
                                  },
                              ],
                          },
                      });
                      /!*(this.partyList[k].row = (k+1))*!/
                  }
                  let startRow: number;
                  this.pageno != 0
                      ? (startRow = this.pageno * this.pagesize)
                      : (startRow = 0);
                  if (this.pageno != 0 && this.pagesize != 1) {
                      debugger;
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + startRow + 1 },
                          );
                          debugger;
                      }
                  } else if (this.pageno == 1) {
                      debugger;
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + this.pagesize + 1 },
                          );
                          debugger;
                      }
                  } else {
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + 1 },
                          );
                          debugger;
                      }
                  }
                  this.loading = false;
              },
              (error) => {
                  this._primengProgressBarService.hide();
              },
          );*/
            this.detailsBreadObject = [
                {
                    index: 0,
                    label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                    img_index0: 'assets/icons/team.png',
                    rout_index0: '/home',
                    isActive0: false,
                },
                {
                    index: 1,
                    label_index1: 'ماژول',
                    rout_index1: '/module',
                    isActive1: false,
                    img_index1: 'assets/icons/module.png',
                },
                {
                    index: 2,
                    label_index2: 'سرویس',
                    rout_index2: null,
                    isActive2: true,
                    label_Detail_index2: '(' + this.moduleTitle + ')',
                    img_index2: 'assets/icons/api.png',
                },
                { label_index3: null },
                { label_index4: null },
                { label_index5: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        if (this.inputModulePartyBase != undefined) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleinfo(this.api.moduleId, this.pageno, this.pagesize, null, null).subscribe((res) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiList = [];
                this._primengProgressBarService.hide();
                this.loading = false;
                const data = res.body ?? [];
                this.apiList = Array.isArray(data) ? data : [data];
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.apiList = this.apiList.map((x) => ({
                    ...x,
                    status: x.status === 1,
                }));
                this.apiList = this.apiList.map((item) => {
                    const successData = (item.successData ?? []).map((d) => d.count);
                    const unSuccessData = (item.unSuccessData ?? []).map((d) => d.count);
                    return {
                        ...item,
                        cashing_expire: this.castToDate(item.cashing_expire),
                        successData,
                        unSuccessData,
                        basicData: {
                            labels: item.days ?? [],
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: successData,
                                    fill: false,
                                    borderColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: unSuccessData,
                                    fill: true,
                                    borderColor: '#ff5858',
                                    tension: 0.4,
                                },
                            ],
                        },
                        basicOptions: {
                            plugins: {
                                legend: { display: false },
                            },
                        },
                    };
                });
                this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                this.basicOptions = {
                    plugins: {
                        legend: {
                            display: false,
                            labels: { color: '#495057' },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                            display: false,
                        },
                        y: {
                            ticks: { color: '#495057' },
                            grid: { color: '#ebedef' },
                        },
                    },
                };
            }, error => {
                this._primengProgressBarService.hide();
                this.loading = false;
            });
            /*  (a) => {
                  this._primengProgressBarService.hide();
                  this.loading = false;
                  if (Array.isArray(a)) {
                      this.apiList = a;
                  } else {
                      this.apiList.push(a);
                  }
                  this.apiList.map((x) =>
                      x.status === 1
                          ? (x.status = true)
                          : (x.status = false),
                  );
                  for (let k = 0; k < this.apiList.length; k++) {
                      this.apiList[k] = Object.assign(this.apiList[k], {
                          row: k + 1,
                      });
                      this.apiList[k].cashing_expire = this.castToDate(
                          this.apiList[k].cashing_expire,
                      );
                      this.apiList[k].successData = this.apiList[
                          k
                          ].successData.map((data) => data.count);
                      this.apiList[k].unSuccessData = this.apiList[
                          k
                          ].unSuccessData.map((data) => data.count);
                      this.apiList[k] = Object.assign(this.apiList[k], {
                          basicData: {
                              labels: this.apiList[0].days,
                              datasets: [
                                  {
                                      label: 'موفق',
                                      data: this.apiList[k].successData,
                                      fill: false,
                                      borderColor: '#21c57b',
                                      tension: 0.4,
                                  },
                                  {
                                      label: 'ناموفق',
                                      data: this.apiList[k].unSuccessData,
                                      fill: true,
                                      borderColor: '#ff5858',
                                      tension: 0.4,
                                  },
                              ],
                          },
                      });
                      /!*(this.partyList[k].row = (k+1))*!/
                  }
                  let startRow: number;
                  this.pageno != 0
                      ? (startRow = this.pageno * this.pagesize)
                      : (startRow = 0);
                  if (this.pageno != 0 && this.pagesize != 1) {
                      debugger;
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + startRow + 1 },
                          );
                          debugger;
                      }
                  } else if (this.pageno == 1) {
                      debugger;
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + this.pagesize + 1 },
                          );
                          debugger;
                      }
                  } else {
                      for (let u = 0; u < this.apiList.length; u++) {
                          this.apiList[u] = Object.assign(
                              this.apiList[u],
                              { row: u + 1 },
                          );
                          debugger;
                      }
                  }
                  this.loading = false;
              },
              (error) => {
                  this._primengProgressBarService.hide();
              },
          );*/
            this.detailsBreadObject = [
                {
                    index: 0,
                    label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                    img_index0: 'assets/icons/team.png',
                    rout_index0: '/home',
                    isActive0: false,
                },
                {
                    index: 1,
                    label_index1: 'سازمان',
                    rout_index1: '/party',
                    isActive1: false,
                    img_index1: 'assets/icons/party.png',
                },
                {
                    index: 2,
                    label_index2: 'ماژول',
                    rout_index2: '',
                    isActive2: false,
                    label_Detail_index2: '(' + this.partyTitle + ')',
                    img_index2: 'assets/icons/module.png',
                },
                {
                    index: 3,
                    label_index3: 'سرویس',
                    rout_index3: null,
                    isActive3: true,
                    label_Detail_index3: '(' + this.moduleTitle + ')',
                    img_index3: 'assets/icons/api.png',
                },
                { label_index4: null },
                { label_index5: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        /* if (event == 'close') {*/
        this.addFlag = false;
        this.updateFlag = false;
        this.rulFlag = false;
        this.timeLimitationFlag = false;
        this.mediatorsFlag = false;
        this.apiLogFlag = false;
        this.chartApiFlag = false;
        this.alertSystemFlag = false;
        this.alertClientFlag = false;
        this.clientApiFlag = false;
        this.producedNodeFlag = false;
        this.requiredNodeFlag = false;
        this.sequenceFlag = false;
        this.headerFlag = false;
        this.apiHubFlag = false;
        this.apiCacheFlag = false;
        this.apiMediatorFlag = false;
        this.apiAggregatorFlag = false;
        debugger;
    }
    BeforeButton() {
        this.close.emit('close');
    }
    ngAfterViewInit() {
        this.viewportScroller.scrollToAnchor('section');
        this.router.navigate([], { fragment: 'section' });
    }
};
__decorate([
    Output()
], BasemoduleApiModuleComponent.prototype, "close", void 0);
__decorate([
    Input()
], BasemoduleApiModuleComponent.prototype, "inputAccess", void 0);
__decorate([
    Input()
], BasemoduleApiModuleComponent.prototype, "inputModulePartyBase", void 0);
__decorate([
    Input()
], BasemoduleApiModuleComponent.prototype, "inputModule", void 0);
__decorate([
    Input()
], BasemoduleApiModuleComponent.prototype, "flag", void 0);
BasemoduleApiModuleComponent = __decorate([
    Component({
        selector: 'app-basemodule-api-module',
        templateUrl: './basemodule-api-module.component.html',
        styleUrls: ['./basemodule-api-module.component.scss'],
        standalone: true,
        imports: [
            TableModule,
            BreadcrumbsComponent,
            FormsModule,
            ButtonDirective,
            InputText,
            Toast,
            TranslocoPipe,
            DropdownModule,
            Tooltip,
            NgClass,
            UIChart,
            TieredMenu,
            ApiModuleRegisterComponent,
            ApiModuleUpdateComponent,
            ApiRuleComponent,
            TimeLimitationComponent,
            MediatorsListComponent,
            ApiLogsComponent,
            ChartApiComponent,
            AlertClientComponent,
            AlertSystemComponent,
            ClientApiManagementComponent,
            ProducedNodeComponent,
            RequiredNodeComponent,
            SequenceComponent,
            HeaderEndpointManagementComponent,
            apiHubComponent,
            CacheApiComponent,
            Dialog,
            Ripple,
            NgIf,
            MoreChar19Pipe,
            HttpMethodsPipe,
            StatusPipe,
            NormalizeJalaliPipe,
            SequenceManagementComponent,
            InputMediatorComponent,
            InputMediatorListComponent,
            AggregatorConfigComponent,
            ApiAggregatorComponent,
        ],
    })
], BasemoduleApiModuleComponent);
export { BasemoduleApiModuleComponent };
