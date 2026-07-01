import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { ClientApiRegisterComponent } from './client-api-register/client-api-register.component';
import { ClientApiUpdateComponent } from './client-api-update/client-api-update.component';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
let ClientApiManagementComponent = class ClientApiManagementComponent {
    route;
    messagesApiFacadeService;
    apiGatewayService;
    accessDataSaveService;
    _primengProgressBarService;
    transloco;
    notifierService;
    close = new EventEmitter();
    inputclient;
    inputAccess;
    inputApi;
    clientApiDto = {
        apiId: null,
        dailyCount: null,
        weeklyCount: null,
        monthlyCount: null,
        clientList: [],
    };
    registerFlag = false;
    updateFlag = false;
    ruleClientFlag = false;
    dubFlag = false;
    clientList = [];
    clientAttachList = [];
    clientDto;
    sourceUrl;
    destinationHost;
    newModuleId;
    destinationUri;
    temp;
    detailsBreadObject = [];
    moduleTitle;
    partyTitle;
    clientName;
    mobile;
    accessBase = false;
    endpointId;
    widthSourceUrl;
    widthDestinationHost;
    widthDestinationUri;
    items;
    tempClient;
    moduleBase;
    partyBase;
    clientBase;
    apiTitle;
    apiName;
    flagClient;
    dialogClientFlag = false;
    clientTemp;
    first = 0;
    rows = 10;
    first2 = 0;
    rows2 = 10;
    apiId;
    dailyCount;
    weeklyCount;
    monthlyCount;
    paginationLabel = this.transloco.translate('label.pagination.table');
    pagesizeClient = 10;
    pagenoClient = 1;
    totalRecordsClient = 0;
    firstClient = 0;
    constructor(route, messagesApiFacadeService, apiGatewayService, accessDataSaveService, _primengProgressBarService, transloco, notifierService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiGatewayService = apiGatewayService;
        this.accessDataSaveService = accessDataSaveService;
        this._primengProgressBarService = _primengProgressBarService;
        this.transloco = transloco;
        this.notifierService = notifierService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
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
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'کلاینت',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/client.png',
                    },
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
                        rout_index1: '/api-gateway/access-list',
                        label_Detail_index1: '(' + this.clientName + ')',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [
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
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'کلاینت',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiName + ')',
                        img_index2: 'assets/icons/client.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    onKeydownSearch(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.clientSearch();
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
    clientSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientsearchbyclientnameandmobileno(this.clientName, this.mobile).subscribe((a) => {
            this._primengProgressBarService.hide();
            if (Array.isArray(a)) {
                this.clientAttachList = a;
            }
            else {
                this.clientAttachList.push(a);
            }
            this.clientAttachList.map((x) => x.status === 1 ? (x.status = true) : (x.status = false));
            for (let k = 0; k < this.clientAttachList.length; k++) {
                this.clientAttachList[k] = Object.assign(this.clientAttachList[k], { row: k + 1 });
            }
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    clientApiSearch(apiId) {
        this._primengProgressBarService.show();
        /*  this.messagesApiFacadeService.clientbyapiid(apiId).subscribe(
              (a) => {
                  this._primengProgressBarService.hide();
                  if (Array.isArray(a)) {
                      this.clientList = a;
                  } else {
                      this.clientList.push(a);
                  }
                  this.clientList.map((x) =>
                      x.status === 1 ? (x.status = true) : (x.status = false)
                  );
                  for (let k = 0; k < this.clientList.length; k++) {
                      this.clientList[k] = Object.assign(this.clientList[k], {
                          row: k + 1,
                      });
                  }
              },
              (error) => {
                  this._primengProgressBarService.hide();
              }
          );*/
        this.messagesApiFacadeService
            .clientbyapiid(apiId, this.pagesizeClient, this.pagenoClient)
            .subscribe((response) => {
            this._primengProgressBarService.hide();
            let data = [];
            if (Array.isArray(response.body)) {
                data = response.body;
            }
            else if (response.body &&
                response.body.data &&
                Array.isArray(response.body.data)) {
                data = response.body.data;
            }
            this.clientList = data.map((x, index) => ({
                ...x,
                status: x.status === 1,
                row: ((this.pagenoClient - 1) * this.pagesizeClient) +
                    index +
                    1
            }));
            this.totalRecordsClient =
                Number(response.headers.get('totalitems')) || 0;
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    resetClientPagination() {
        this.firstClient = 0;
        this.pagenoClient = 1;
    }
    OnchangePagenoClient(event) {
        this.firstClient = event.first;
        this.pagesizeClient = event.rows;
        this.pagenoClient = (event.first / event.rows) + 1;
        this.clientApiSearch(this.apiId);
    }
    clear() {
        this.mobile = '';
        this.clientName = '';
        this.showClients();
    }
    ngOnInit() {
        this.scrollTop();
        this.items = [
            {
                items: [
                    {
                        label: 'قواعد کلاینت',
                        icon: '',
                        command: () => {
                            this.showRuleClient(this.tempClient);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempClient);
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
        this.accessBase = false;
        this.apiGatewayService.currentApprovalStageEndpoint.subscribe((msg) => {
            this.temp = msg;
        });
        this.sourceUrl = this.temp.sourceUrl;
        this.destinationHost = this.temp.destinationHost;
        this.destinationUri = this.temp.destinationUri;
        if (this.inputApi != undefined) {
            this.apiId = this.inputApi.apiId;
            this.dailyCount = this.inputApi.dailyCount;
            this.weeklyCount = this.inputApi.weeklyCount;
            this.monthlyCount = this.inputApi.monthlyCount;
            this.partyTitle = this.inputApi.partyTitle;
            this.moduleTitle = this.inputApi.moduleTitle;
            this.clientName = this.inputApi.clientName;
            this.accessBase = this.inputApi.accessBase;
            this.moduleBase = this.inputApi.moduleBase;
            this.partyBase = this.inputApi.partyBase;
            this.clientBase = this.inputApi.clientBase;
            this.apiName = this.inputApi.name;
            this.apiTitle = this.inputApi.title;
            this.clientApiDto.apiId = this.inputApi.apiId;
            this.clientApiDto.dailyCount = this.inputApi.dailyCount;
            this.clientApiDto.weeklyCount = this.inputApi.weeklyCount;
            this.clientApiDto.monthlyCount = this.inputApi.monthlyCount;
            this.clientApiSearch(this.apiId);
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        else if (this.inputclient != undefined) {
            this.partyTitle = this.inputclient.partyTitle;
            this.moduleTitle = this.inputclient.moduleTitle;
            this.clientName = this.inputclient.clientName;
            this.accessBase = this.inputclient.accessBase;
            this.moduleBase = this.inputclient.moduleBase;
            this.partyBase = this.inputclient.partyBase;
            this.clientBase = this.inputclient.clientBase;
            this.endpointId = this.inputclient.endpointid;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .clientgetbyendpointid(this.endpointId)
                .subscribe((getAllResponse) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(getAllResponse)) {
                    this.clientList = getAllResponse;
                }
                else {
                    this.clientList.push(getAllResponse);
                }
                this.clientList.map((x) => x.status === 1
                    ? (x.status = true)
                    : (x.status = false));
                for (let k = 0; k < this.clientList.length; k++) {
                    this.clientList[k] = Object.assign(this.clientList[k], { row: k + 1 });
                }
            }, (error) => {
                this._primengProgressBarService.hide();
            });
            this.apiGatewayService.updateApprovalEndpointIdClient(this.inputclient.endpointId.toString());
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            }
            else if (this.inputclient.clientBase) {
                this.flagClient = this.inputclient.clientBase;
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            }
            else if (this.inputclient.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            }
        }
    }
    /* showAdd() {
         this._primengProgressBarService.show();
         this.messagesApiFacadeService.clientbyapiid(this.apiId).subscribe(
             (a) => {
                 this._primengProgressBarService.hide();
                 if (Array.isArray(a)) {
                     this.clientList = a;
                 } else {
                     this.clientList.push(a);
                 }
                 this.clientList.map((x) =>
                     x.status === 1 ? (x.status = true) : (x.status = false)
                 );
                 for (let k = 0; k < this.clientList.length; k++) {
                     this.clientList[k] = Object.assign(this.clientList[k], {
                         row: k + 1,
                     });
                 }
             },
             (error) => {
                 this._primengProgressBarService.hide();
             }
         );
         this.clientApiDto.clientList = this.clientList;
         this.registerFlag = true;
     }*/
    showAdd() {
        this.resetClientPagination();
        this.clientApiSearch(this.apiId);
        this.clientApiDto.clientList = this.clientList;
        this.registerFlag = true;
    }
    showClients() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe((c) => {
            this._primengProgressBarService.hide();
            if (Array.isArray(c)) {
                this.clientAttachList = c;
            }
            else {
                this.clientAttachList.push(c);
            }
            this.clientAttachList.map((x) => x.status === 1 ? (x.status = true) : (x.status = false));
            for (let k = 0; k < this.clientAttachList.length; k++) {
                this.clientAttachList[k] = Object.assign(this.clientAttachList[k], { row: k + 1 });
            }
            this.dialogClientFlag = true;
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    selectedClient(client) {
        this.dubFlag = false;
        for (let i = 0; i < this.clientList.length; i++) {
            if (client.name == this.clientList[i].name &&
                client.mobileNo == this.clientList[i].mobileNo) {
                this.dubFlag = true;
                this.notifierService.showError({
                    detail: 'کلاینت منتخب قبلا به سرویس متصل شده است!',
                    life: 3000,
                });
                break;
            }
            else {
                this.dubFlag = false;
            }
        }
        if (!this.dubFlag) {
            this.clientTemp = {
                clientId: null,
                apiId: null,
                dailyCount: null,
                weeklyCount: null,
                monthlyCount: null,
            };
            this.clientList = [];
            //console.log('selected')
            this.clientTemp.apiId = this.apiId;
            this.clientTemp.dailyCount = this.dailyCount;
            this.clientTemp.weeklyCount = this.weeklyCount;
            this.clientTemp.monthlyCount = this.monthlyCount;
            this.clientTemp.clientId = client.clientId;
            this.clientTemp.authType = 0;
            this.clientTemp.basicAuthUsername = null;
            this.clientTemp.basicAuthPassword = null;
            // if ()
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .clientAttachApi(this.clientTemp)
                .subscribe((res) => {
                this._primengProgressBarService.hide();
                this.clientApiSearch(this.apiId);
                this.dialogClientFlag = false;
                /* this.messagesApiFacadeService.clientgetbyendpointid(this.endpointId).subscribe(getAllResponse => {
             if (Array.isArray(getAllResponse)) {
                 this.clientList = getAllResponse
             } else {
                 this.clientList.push(getAllResponse)
             }
             this.clientList.map(x => (x.status === 1 ? x.status = true : x.status = false))
             for (let k = 0; k < this.clientList.length; k++) {
                 this.clientList[k] = Object.assign(this.clientList[k], {row: (k + 1)})
             }

         })*/
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    onClose(event) {
        this.scrollTop();
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.ruleClientFlag = false;
        }
        else if (event == 'closeAndCreate') {
            /*      this.registerFlag = false;
                  this.updateFlag = false;
                  this.ruleClientFlag = false;
                  this.clientApiSearch(this.apiId);*/
            this.registerFlag = false;
            this.updateFlag = false;
            this.ruleClientFlag = false;
            this.resetClientPagination();
            this.clientApiSearch(this.apiId);
        }
        if (this.inputApi != undefined) {
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        if (this.inputclient != undefined) {
            if (this.inputclient.moduleBase) {
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
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else {
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
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'کلاینت',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/client.png',
                    },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            if (this.inputclient.accessBase) {
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
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'کلاینت',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiName + ')',
                        img_index2: 'assets/icons/client.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        if (this.inputclient != undefined) {
            if (this.inputclient.clientBase) {
                this.detailsBreadObject = [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: 'کلاینت',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiName + ')',
                        img_index2: 'assets/icons/client.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
    }
    setRecord(client) {
        this.tempClient = client;
    }
    showUpdate(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
        };
        this.clientDto = client;
        this.updateFlag = true;
    }
    showRuleClient(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
            moduleBase: false,
            moduleTitle: null,
            partyTitle: null,
            clientBase: false,
            partyBase: false,
            clientName: null,
            accessBase: false,
            destinationHost: null,
            apiName: null,
        };
        this.clientDto = client;
        this.clientDto.moduleBase = this.moduleBase;
        this.clientDto.moduleTitle = this.moduleTitle;
        this.clientDto.apiName = this.apiName;
        this.clientDto.partyTitle = this.partyTitle;
        this.clientDto.clientBase = this.flagClient;
        this.clientDto.clientName = this.clientName;
        this.clientDto.accessBase = this.accessBase;
        this.clientDto.partyBase = this.partyBase;
        this.clientDto.destinationHost = this.destinationHost;
        this.ruleClientFlag = true;
    }
    BeforeButton() {
        this.close.emit('close');
    }
};
__decorate([
    Output()
], ClientApiManagementComponent.prototype, "close", void 0);
__decorate([
    Input()
], ClientApiManagementComponent.prototype, "inputclient", void 0);
__decorate([
    Input()
], ClientApiManagementComponent.prototype, "inputAccess", void 0);
__decorate([
    Input()
], ClientApiManagementComponent.prototype, "inputApi", void 0);
ClientApiManagementComponent = __decorate([
    Component({
        selector: 'app-client-api-management',
        templateUrl: './client-api-management.component.html',
        styleUrls: ['./client-api-management.component.scss'],
        standalone: true,
        imports: [
            Toast,
            BreadcrumbsComponent,
            TranslocoPipe,
            NgIf,
            Tooltip,
            MoreChar19Pipe,
            TableModule,
            NgClass,
            StatusPipe,
            ClientApiRegisterComponent,
            ClientApiUpdateComponent,
            Dialog,
            Panel,
            FormsModule,
            InputText,
            ButtonDirective,
            Card
        ],
    })
], ClientApiManagementComponent);
export { ClientApiManagementComponent };
