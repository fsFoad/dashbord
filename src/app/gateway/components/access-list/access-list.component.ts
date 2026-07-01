import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { AccessDto } from '../../models/access.Dto';

import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import {
    TranslocoDirective,
    TranslocoPipe,
    TranslocoService,
} from '@jsverse/transloco';
import { ButtonDirective } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { Menu } from 'primeng/menu';
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Fieldset } from 'primeng/fieldset';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormatRulePipe } from '../../../shared/pipes/FormatRule.pipe';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { ThreeDotDetailsPipe } from '../../../shared/pipes/threeDotDetails.pipe';
import { AccessDataSaveService } from '../../../shared/services/access-data-save.service';
import {
    BasemoduleApiModuleComponent,
} from '../module-api/basemodule-api-management/basemodule-api-module/basemodule-api-module.component';
import {
    ClientApiManagementComponent,
} from '../services-api/endpoint-management/client-api-management/client-api-management.component';
import { EndpointManagementComponent } from '../services-api/endpoint-management/endpoint-management.component';
import { Toast } from 'primeng/toast';
import { FileUpload } from 'primeng/fileupload';
import { Card } from 'primeng/card';
import { Password } from 'primeng/password';
import { EncodingServiceService } from '../../../shared/services/encoding-service.service';
import { HttpResponse } from '@angular/common/http';
import { MessageSelectorComponent } from '../../../shared/components/message-selector/message-selector.component';
import { MessageFilterValue } from '../../../../../shared/models/message-filter-value.model';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-access-list',
    templateUrl: './access-list.component.html',
    styleUrls: ['./access-list.component.scss'],
    imports: [

        TabsModule,
        NgForOf,
        ButtonDirective,
        NgClass,
        Menu,
        BreadcrumbsComponent,
        Panel,
        NgIf,
        SelectModule,
        FormsModule,
        TranslocoPipe,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        NgStyle,
        Ripple,
        Dialog,
        Fieldset,
        ThreeDotDetailsPipe,
        FormatRulePipe,
        MessagesCategoryPipe,
        Checkbox,
        StatusPipe,
        KeyFilter,
        InputText,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        ClientApiManagementComponent,
        Toast,
        ReactiveFormsModule,
        Tooltip,
        Card,
        Password,
        MessageSelectorComponent,
    ],
    standalone: true,
})
export class AccessListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() InputClient;
    dialogApiFlag;
    //  selectedProduct3: apiAtt;
    partyListOptions = [{ title: '-', partyId: null }];
    clientListOptions = [
        {
            name: '-', partyId: null, allowedAccountno: null, apikey: null, clientId: null,
            digitalPublickey: null, mobileNo: null, organizationCode: null, publicKey: null,
            status: null,
        },
    ];
    moduleListOptions = [{ moduleTitle: '-', moduleId: null }];
    partyId = null;
    clientId: number = null;
    moduleId = null;
    clientNameFlag = false;
    apiModuleFlag = false;
    endpointFlag = false;
    clientFlag = false;
    loading = false;
    accessList = [];
    items;
    itemsApi;
    tempAccess;
    tempApi;
    accessDto: AccessDto;
    DirectBaseAccess = true;
    detailsBreadObject;
    accessBase = null;
    clientBase = null;
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    apiAttachList = [];
    dailyCount: number = 0;
    weeklyCount: number = 0;
    monthlyCount: number = 0;
    tempAttach: any;
    tempAttachRoule: any;
    limitApi = false;
    index1 = true;
    index2 = false;
    index3 = false;
    index4 = false;
    index5 = false;
    index6 = false;
    showListFlag = false;
    checkedAllApi: boolean = false;
    checkedMultiApi: boolean = false;
    registerFlag = false;
    nextDisableFlag = true;
    nextFlag = true;
    beforeFlag = true;
    beforeDisableFlag = true;
    digitalSignicher = true;
    clientName;
    apiAttachLimitList = [];
    widthTitleApi;
    widthNameApi;
    widthRetryCountApi;
    widthMaxCallApi;
    widthDailyCountApi;
    widthWeeklyCountApi;
    widthMonthlyCountApi;
    serviceRequestVerify: number = 0;
    ruleName;
    apiTitle;
    apiName;
    ruleList;
    codeMessage;
    textMessage;
    textENMessage;
    tableIdMessage;
    typeMessage;
    pagenoMessage: number = 0;
    pagesizeMessage = 10;
    messagesList = [];
    totalRecordsMessagesList;
    selectedMessageList: any[];
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    paginationLabel = this.transloco.translate('label.pagination.table');
    widthTitleMessage;
    widthMessageId;
    widthCodeMessage;
    widthMessageTitle;
    widthHttpsstatus;
    widthRuleTemplate;
    widthruleName;
    tableIdDe;
    messageTitleDe;
    httpsstatusDe;
    ruleTemplateDe;
    ruleNameDe;
    codeMessageDe;
    messageIdDe;
    titleMessageDe;
    titleApiDe;
    nameApiDe;
    retryCountApiDe;
    maxCallApiDe;
    apiId: number = null;
    dailyCountApiDe: number = 0;
    weeklyCountApiDe: number = 0;
    monthlyCountApiDe: number = 0;
    selectedApi: any[];
    selectedRuleList: any;
    ruleId: number = null;
    messageId: number = null;
    updateClientId: number = null;
    updateModuleId: number = null;
    selectApiFlag: boolean = false;
    headerDialog = '';
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    flagSelectAll = false;
    headerIndex5 = 'گام آخر - بررسی اطلاعات ثبتی و ثبت نهایی';
    serviceRequestVerifyOptions: any[] = [
        { name: 'امضاء دیجیتال', code: 0 },
        { name: 'Basic Authentication', code: 1 },
    ];
    digitalPublickey: any = '';
    base64: any = '';
    publicKey: any = '';
    user: any = null;
    pass: any = null;
    status: number = null;
    showDialog1: boolean = false;
    showDialog2: boolean = false;
    showDialog3: boolean = false;
    pageno: number = 0;
    totalRecords: number = 0;
    firstIndex: number = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 5, code: 5 },
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag: boolean = false;
    selectedRow: any[] = [];
    selectedMessageId: number | null = null;
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private primeng: PrimeNG,
        private encodingService: EncodingServiceService,
        private apiGatewayService: ApiGatewayService,
        private router: Router,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private cdr: ChangeDetectorRef,
        private accessDataSaveService: AccessDataSaveService,
    ) {
    }

    verifyChange(event) {
        this.digitalSignicher = (event.value == 0);
    }

    onDisplayB64() {
        if (this.pass && this.user) {
            this.base64 = this.encodingService.toBase64(this.user + ':' + this.pass);
            this.showDialog1 = true;
        }
    }

    onDisplayUploadPublicKey() {
        if (this.publicKey) {
            this.showDialog2 = true;
        }
    }

    onDisplayUploadDigital() {
        if (this.digitalPublickey) {
            this.showDialog3 = true;
        }
    }

    onRowSelect(event) {
        if (this.apiAttachList.length == this.selectedApi.length) {
            this.checkedAllApi = true;
        }
        if (this.selectedApi.indexOf(event.data) === -1) this.selectedApi.push(event.data);
        this.nextDisableFlag = !(this.selectedApi.length >= 1);
        this.checkedMultiApi = this.selectedApi.length > 1;
    }

    onRowUnselect(event) {
        this.selectedApi = this.selectedApi.filter(x => {
            return x.apiId != event.data.apiId;
        });
        if (this.apiAttachList.length != this.selectedApi.length) {
            this.checkedAllApi = false;
        }
        this.nextDisableFlag = !(this.selectedApi.length >= 1);
        this.checkedMultiApi = this.selectedApi.length > 1;
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [
                    {
                        index: 0, label_index0: 'لیست دسترسی',
                        rout_index0: '', isActive0: true,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: null,
                    },
                    { label_index1: null, label_Detail_index1: null },
                    { label_index2: null, label_Detail_index2: null }, {
                        label_index3: null,
                        label_Detail_index3: null,
                    },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null,
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [

                    {
                        index: 0, label_index0: 'کلاینت', rout_index0: '', isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1, label_index1: 'لیست دسترسی', rout_index1: '', isActive1: true,
                        img_index1: 'assets/icons/access.png', label_Detail_index1: '(' + this.clientName + ')',
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

    clearRules() {
        this.ruleName = '';
        this.ruleNameDe = '';
        this.ruleTemplateDe = '';
        this.httpsstatusDe = '';
        this.selectedRuleList = [];
        this.ruleId = null;
        this.pageno = 0;
        this.pagesize = 10;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.nextBtnFlag = false;
        this.searchRules();
    }



    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchRules();
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchRules();
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.searchRules();
    }

    searchByName(){debugger
        this.ruleList = [];
        this.pageno=0
        this.pagesize = 10;
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        // FUSEFS

        // this._primengProgressBarService.show();
        debugger
        this.messagesApiFacadeService.rulesearch(this.pageno, this.pagesize, this.ruleName,null,null,0).subscribe(httpResponse => {
            debugger;
            // FUSEFS

            // this._primengProgressBarService.hide();
            if (Array.isArray(httpResponse)) {
                this.ruleList = httpResponse;
            } else {
                this.ruleList.push(httpResponse);
            }
            this.ruleList = this.ruleList?.filter(x => x != null)?.map(x => {
                x.status = x.status === 1;
                return x;
            });
            if (this.pageno != 0 && this.pageno != 1) {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + startRow + 1 },
                    );
                }
            } else if (this.pageno == 1) {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + this.pagesize + 1 },
                    );
                }
            } else {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + 1 },
                    );
                }
            }
            // FUSEFS

            // this._primengProgressBarService.hide();
            for (let k = 0; k < this.ruleList.length; k++) {
                this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
            }
        }, error => {
            // FUSEFS

            // this._primengProgressBarService.hide();
        });

    }

    searchRules() {debugger
        this.ruleList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);

        // FUSEFS


        // this._primengProgressBarService.show();
        debugger
        this.messagesApiFacadeService.rulesearch(this.pageno, this.pagesize, this.ruleName,null,null,0).subscribe(httpResponse => {
            debugger;

            // FUSEFS


            // this._primengProgressBarService.hide();
            if (Array.isArray(httpResponse)) {
                this.ruleList = httpResponse;
            } else {
                this.ruleList.push(httpResponse);

            }
            this.ruleList = this.ruleList?.filter(x => x != null)?.map(x => {
                x.status = x.status === 1;
                return x;
            });

            if (this.pageno != 0 && this.pageno != 1) {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + startRow + 1 },
                    );
                }
            } else if (this.pageno == 1) {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + this.pagesize + 1 },
                    );
                }
            } else {
                for (let u = 0; u < this.ruleList.length; u++) {
                    this.ruleList[u] = Object.assign(
                        this.ruleList[u],
                        { row: u + 1 },
                    );
                }
            }
            // FUSEFS

            // this._primengProgressBarService.hide();
            for (let k = 0; k < this.ruleList.length; k++) {
                this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
            }
        }, error => {
            // FUSEFS

            // this._primengProgressBarService.hide();
        });
    }

    OnchangeParty(event) {
        debugger
        // this.moduleListOptions = [{moduleTitle: '-', moduleId: null}]
        if (event.value != null) {
            debugger
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(m => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide();
                // this.moduleListOptions.push(...m)
                this.moduleListOptions = m;
                this.moduleListOptions.unshift({ moduleTitle: '-', moduleId: null });
                console.log('a', m);
                // this.moduleListOptions = this.moduleListOptions.sort()
                this.search();
            }, error => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
        } else {
            debugger
            this.moduleId = null;
            this.search();
        }

    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallparty().subscribe(a => {
            // FUSEFS

            // this._primengProgressBarService.hide();
            this.partyListOptions.push(...a);
            this.partyListOptions = this.partyListOptions.sort();
        }, error => {
            // FUSEFS

            // this._primengProgressBarService.hide();
        });

        /*this.messagesApiFacadeService.fetchallmodule().subscribe(c => {
            this.moduleListOptions.push(...c)
            this.moduleListOptions = this.moduleListOptions.sort()
        })*/

        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [

                    {
                        label: 'سرویس های ماژول ',
                        icon: '',
                        command: () => {

                            this.showApiOrEndpoint(this.tempAccess, 1);
                        },
                    }, {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {

                            this.showApiOrEndpoint(this.tempAccess, 2);
                        },
                    },
                    {
                        label: 'فعالسازی',
                        icon: '',
                        command: () => {
                            debugger
                            console.log('this.فعالسازی',this.tempAccess.apiId);
                            debugger
                            if (this.tempAccess.status){
                                this.notifierService.showWarning({
                                    detail: 'این دسترسی فعال است!',
                                    life: 3000,
                                });
                            }else {
                                this.messagesApiFacadeService.activeAndDeactiveAccess(this.tempAccess.apiId,this.tempAccess.clientId,1).subscribe(x=>{
                                    console.log('d',x);
                                    this.notifierService.showSuccess({
                                        detail: 'عملیات با موفقیت انجام گردید!',
                                        life: 3000,
                                    });
                                    this.search();
                                });
                            }

                        },
                    },
                    {
                        label: 'غیرفعالسازی',
                        icon: '',
                        command: () => {
                            debugger
                            console.log('this.غیرفعالسازی',this.tempAccess);
                            debugger
                            if (!this.tempAccess.status){
                                this.notifierService.showWarning({
                                    detail: 'این دسترسی غیرفعال است!',
                                    life: 3000,
                                });
                            }else {
                                this.messagesApiFacadeService.activeAndDeactiveAccess(this.tempAccess.apiId,this.tempAccess.clientId,2).subscribe(x=>{
                                    console.log('d',x);
                                    this.notifierService.showSuccess({
                                        detail: 'عملیات با موفقیت انجام گردید!',
                                        life: 3000,
                                    });
                                    this.search();
                                });
                            }

                        },
                    },

                    {
                        label: 'ویرایش',
                        icon: '',
                        command: () => {
                            this.updateAccess(this.tempAccess);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {

                items: [{
                    label: 'انصراف',

                }],
            },
        ];
        if (this.InputClient != undefined) {
            this.clientName = this.InputClient.name;
            this.clientBase = this.InputClient.clientBase;
            this.showListFlag = true;
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallclient().subscribe(b => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.clientListOptions.push(...b);
                this.clientListOptions = this.clientListOptions.sort();
                if (this.InputClient.clientFlag) {
                    for (let i = 0; i < this.clientListOptions.length; i++) {
                        if (this.InputClient.clientId == this.clientListOptions[i].clientId) {
                            this.clientId = this.clientListOptions[i].clientId;
                            this.clientNameFlag = true;
                            this.search();
                        }
                    }
                }
            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else {
            this.showListFlag = false;
            this.clientNameFlag = false;
            this.accessBase = true;
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallclient().subscribe(b => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.clientListOptions.push(...b);
            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.search();
        }

    }

    onClose(event: any) {
        this.scrollTop();
        this.apiModuleFlag = false;
        this.endpointFlag = false;
        this.clientFlag = false;
        if (event == 'closeAndCreate' || event == 'doubleClose' || event == 'close') {
            this.search();
        }
        if (this.InputClient != undefined) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }

    }

    onChildSelectionCleared(flag: boolean) {
        if (!flag) return;

        this.messageId = null;
        this.selectedMessageId = null;

        this.messageIdDe = null;
        this.codeMessageDe = null;
        this.titleMessageDe = null;
        this.tableIdDe = null;
        this.selectedMessageList = [];
        this.selectedRow = [];

        this.cdr.markForCheck();
    }
    updateAccess(access) {
debugger
        debugger
        debugger
        if (access.clientId != (-1)) {
            this.headerDialog = 'ویرایش دسترسی';
            this.apiAttachList = [];
            this.selectApiFlag = true;
            this.nextDisableFlag = false;
            this.apiId = access.apiId;
            this.moduleId = access.moduleId;
            this.clientId = access.clientId;
            this.searchRules();
            this.messagesApiFacadeService.getclientapibyclientidandapiid(access.clientId, access.apiId).subscribe(r => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.selectedRuleList = [];
                debugger
                this.user = r.basicAuthUsername;
                this.pass = r.basicAuthPassword;
                this.status= r.status;
                this.serviceRequestVerify = r.authType;
                r.authType == 0 ? this.digitalSignicher = true : this.digitalSignicher = false;
                if (r.ruleId != null) {
                    // FUSEFS

                    // this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getByRuleId(r.ruleId).subscribe(a => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        if (Array.isArray(a)) {
                            this.selectedRuleList = a;
                        } else {
                            this.selectedRuleList.push(a);
                        }
                        this.selectedRuleList.map(x => (x.status === 1 ? x.status = true : x.status = false));
                        for (let k = 0; k < this.selectedRuleList.length; k++) {
                            this.selectedRuleList[k] = Object.assign(this.selectedRuleList[k], { row: (k + 1) });
                            /*(this.partyList[k].row = (k+1))*/
                        }
                        if (this.selectedRuleList.length !=0) {
                            this.ruleNameDe = this.selectedRuleList[0]?.name;
                            this.ruleId = this.selectedRuleList[0]?.ruleId;
                            this.ruleTemplateDe = this.selectedRuleList[0]?.ruleTemplate;
                            this.messageId = this.selectedRuleList[0]?.messageId;
                            this.httpsstatusDe = this.selectedRuleList[0]?.httpsstatus;
                        }
                        if (r.messageId != null) {
                            debugger
                            // FUSEFS

                            // this._primengProgressBarService.show();
                            this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                                this.dialogApiFlag = true;
                                this.selectedMessageList = [];
                                if (Array.isArray(l)) {
                                    this.selectedMessageList = l;
                                    this.messagesList
                                } else {
                                    this.selectedMessageList.push(l);
                                    this.messagesList = [...this.selectedMessageList];
                                    this.selectedRow = [...this.selectedMessageList];
                                }
                                this.messageIdDe = this.selectedMessageList[0].messageId;
                                this.codeMessageDe = this.selectedMessageList[0].code;
                                this.titleMessageDe = this.selectedMessageList[0].title;
                                this.tableIdDe = this.selectedMessageList[0].tableId;
                            }, error => {
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                            });
                        } else {
                            this.dialogApiFlag = true;
                        }
                    }, error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });
                }
                else if (r.messageId != null) {
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.dialogApiFlag = true;
                        this.selectedMessageList = [];
                        if (Array.isArray(l)) {
                            this.selectedMessageList = l;
                        } else {
                            this.selectedMessageList.push(l);
                            this.messagesList = [...this.selectedMessageList];
                            this.selectedRow = [...this.selectedMessageList];
                        }
                        this.messageIdDe = this.selectedMessageList[0].messageId;
                        this.codeMessageDe = this.selectedMessageList[0].code;
                        this.titleMessageDe = this.selectedMessageList[0].title;
                        this.tableIdDe = this.selectedMessageList[0].tableId;
                    }, error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });
                }
                else {
                    this.dialogApiFlag = true;
                }

            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.titleApiDe = this.selectedApi[0].title;
                this.nameApiDe = this.selectedApi[0].name;
                this.retryCountApiDe = this.selectedApi[0].retryCount;
                this.maxCallApiDe = this.selectedApi[0].maxCall;
                this.apiId = this.selectedApi[0].apiId;
                this.updateClientId = access.clientId;
                this.updateModuleId = access.moduleId;
                this.dailyCount = access.dailyCount;
                this.weeklyCount = access.weeklyCount;
                this.monthlyCount = access.monthlyCount;
                this.beforeFlag = false;
                this.nextFlag = true;
                this.index1 = true;
                this.index2 = false;
                this.index3 = false;
                this.index4 = false;
            });
           /* this.messageSearch(filterWithPagination);*/
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibyid(access.apiId).subscribe(k => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.selectedApi = [];
                if (Array.isArray(k)) {
                    this.selectedApi = k;
                    this.apiAttachList = k;
                } else {
                    this.selectedApi.push(k);
                    this.apiAttachList.push(k);
                }
                console.log('apiIdList', this.apiAttachList.map(a => a.apiId));
                this.titleApiDe = this.selectedApi[0].title;
                this.nameApiDe = this.selectedApi[0].name;
                this.retryCountApiDe = this.selectedApi[0].retryCount;
                this.maxCallApiDe = this.selectedApi[0].maxCall;
                this.apiId = this.selectedApi[0].apiId;
                this.updateClientId = access.clientId;
                this.updateModuleId = access.moduleId;
                this.dailyCount = access.dailyCount;
                this.weeklyCount = access.weeklyCount;
                this.monthlyCount = access.monthlyCount;
                this.beforeFlag = false;
                this.nextFlag = true;
                this.index1 = true;
                this.index2 = false;
                this.index3 = false;
                this.index4 = false;
                // FUSEFS

                // this._primengProgressBarService.show();
                debugger
                debugger
                debugger
                debugger
                this.messagesApiFacadeService.getclientapibyclientidandapiid(access.clientId, access.apiId).subscribe(r => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.selectedRuleList = [];
                    debugger
                    this.user = r.basicAuthUsername;
                    this.pass = r.basicAuthPassword;
                    this.status= r.status;
                    this.serviceRequestVerify = r.authType;
                    r.authType == 0 ? this.digitalSignicher = true : this.digitalSignicher = false;
                    if (r.ruleId != null) {
                        // FUSEFS

                        // this._primengProgressBarService.show();
                        this.messagesApiFacadeService.getByRuleId(r.ruleId).subscribe(a => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            if (Array.isArray(a)) {
                                this.selectedRuleList = a;
                            } else {
                                this.selectedRuleList.push(a);
                            }
                            this.selectedRuleList.map(x => (x.status === 1 ? x.status = true : x.status = false));
                            for (let k = 0; k < this.selectedRuleList.length; k++) {
                                this.selectedRuleList[k] = Object.assign(this.selectedRuleList[k], { row: (k + 1) });
                                /*(this.partyList[k].row = (k+1))*/
                            }
                            if (this.selectedRuleList.length !=0) {
                            this.ruleNameDe = this.selectedRuleList[0].name;
                            this.ruleId = this.selectedRuleList[0].ruleId;
                            this.ruleTemplateDe = this.selectedRuleList[0].ruleTemplate;
                            this.messageId = this.selectedRuleList[0].messageId;
                            this.httpsstatusDe = this.selectedRuleList[0].httpsstatus;
                            }
                            if (r.messageId != null) {
                                debugger
                                debugger

                                // FUSEFS


                                // this._primengProgressBarService.show();
                                this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                                    debugger
                                    debugger
                                    debugger

                                    // FUSEFS


                                    // this._primengProgressBarService.hide();
                                    this.dialogApiFlag = true;
                                    this.selectedMessageList = [];
                                    if (Array.isArray(l)) {
                                        this.selectedMessageList = l;
                                    } else {
                                        this.selectedMessageList.push(l);
                                        this.messagesList = [...this.selectedMessageList];
                                        this.selectedRow = [...this.selectedMessageList];
                                    }
                                    this.messageIdDe = this.selectedMessageList[0].messageId;
                                    this.codeMessageDe = this.selectedMessageList[0].code;
                                    this.titleMessageDe = this.selectedMessageList[0].title;
                                    this.tableIdDe = this.selectedMessageList[0].tableId;
                                }, error => {
                                    // FUSEFS

                                    // this._primengProgressBarService.hide();
                                });
                            } else {
                                this.dialogApiFlag = true;
                            }
                        }, error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        });
                    } else if (r.messageId != null) {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.show();
                        this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            this.dialogApiFlag = true;
                            this.selectedMessageList = [];
                            if (Array.isArray(l)) {
                                this.selectedMessageList = l;
                            } else {
                                this.selectedMessageList.push(l);
                                this.messagesList = [...this.selectedMessageList];
                                this.selectedRow = [...this.selectedMessageList];

                            }
                            this.messageIdDe = this.selectedMessageList[0].messageId;
                            this.codeMessageDe = this.selectedMessageList[0].code;
                            this.titleMessageDe = this.selectedMessageList[0].title;
                            this.tableIdDe = this.selectedMessageList[0].tableId;
                        }, error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        });
                    } else {
                        this.dialogApiFlag = true;
                    }

                }, error => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                });

                //  this.messageSearch()

            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
        }
        else {
            this.notifierService.showError({
                detail: 'امکان ویرایش برای موارد اختصاص نیافته وجود ندارد!',
                life: 3000,
            });
        }
        debugger
        debugger
        debugger
        debugger


    }

    onKeydown(event) {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    setRecord(access) {

        this.tempAccess = access;
    }

    showApiOrEndpoint(access, flag) {
        this.accessDto = {
            partyId: null,
            endpointId: null,
            moduleId: null,
            partyName: '',
            moduleTitle: '',
            clientName: '',
            accessBase: null,
            clientBase: null,
        };
        this.accessDto = access;
        this.accessDto.moduleId = access.moduleId;
        this.accessDto.accessBase = this.accessBase;
        this.accessDto.clientBase = this.clientBase;
        this.accessDataSaveService.shareData = this.accessDto;
        if (flag == 1) {
            this.accessDto.apiBase = true;
            this.apiModuleFlag = true;
        } else if (flag == 2) {
            this.endpointFlag = true;
            this.accessDto.endpointBase = true;
        }
    }

    search() {
        this.loading = true;
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.quickaccess(this.partyId, this.moduleId, this.clientId).subscribe(a => {
            // FUSEFS

            // this._primengProgressBarService.hide();
            this.accessList = a;
            this.loading = false;
            if (Array.isArray(a)) {
                this.accessList = a;
            } else {
                this.accessList.push(a);
            }
            for (let k = 0; k < this.accessList.length; k++) {
                this.accessList[k] = Object.assign(this.accessList[k], { row: (k + 1) });
            }
        }, error => {
            // FUSEFS

            // this._primengProgressBarService.hide();
        });
    }

    clear() {
        this.partyId = null;
        this.moduleListOptions = [{ moduleTitle: '-', moduleId: null }];
        this.clientId = null;
        this.moduleId = null;
        this.accessList = [];
        this.clientNameFlag = false;
        this.search();
    }

    addApiSelect() {
        debugger
        this.serviceRequestVerify = 0;
        this.digitalSignicher = true;
        this.headerDialog = 'ایجاد دسترسی';
        this.beforeFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.selectApiFlag = false;
        this.tableIdMessage = null;
        this.typeMessage = null;
        this.searchRules();
        if (this.validation()) {
            debugger
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(c => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                debugger
                if (Array.isArray(c)) {
                    this.apiAttachList = c;
                } else {
                    this.apiAttachList.push(c);
                }
                for (let k = 0; k < this.apiAttachList.length; k++) {
                    this.apiAttachList[k] = Object.assign(this.apiAttachList[k], { row: (k + 1) });
                }
                console.log('apiIdList', this.apiAttachList.map(a => a.apiId));
                if (c.length == 0) {
                    debugger
                    this.notifierService.showError({
                        detail: this.transloco.translate('accessList.message.notFoundApi'),
                        life: 3000,
                    });
                } else {
                    debugger

                    this.dialogApiFlag = true;
                    this.messagesApiFacadeService.getDigitalkey(this.clientId).subscribe(c => {
                        this.digitalPublickey = c.key;
                    });
                    this.messagesApiFacadeService.getPublickkey(this.clientId).subscribe(c => {
                        this.publicKey = c.key;
                    });
                }

            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
        }
    }

    onCancel() {
        this.dialogApiFlag = false;
        this.beforeFlag = false;
        this.registerFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.index6 = false;
        this.clearRules();
        this.clearFinalVar();
    }

    clearFinalVar() {
        this.serviceRequestVerify = 0;
        this.dailyCount = 0;
        this.weeklyCount = 0;
        this.monthlyCount = 0;
        this.tableIdDe = '';
        this.messageTitleDe = '';
        this.httpsstatusDe = '';
        this.ruleTemplateDe = '';
        this.ruleNameDe = '';
        this.codeMessageDe = '';
        this.messageIdDe = '';
        this.titleMessageDe = '';
        this.titleApiDe = '';
        this.nameApiDe = '';
        this.retryCountApiDe = '';
        this.maxCallApiDe = '';
        this.dailyCountApiDe = 0;
        this.weeklyCountApiDe = 0;
        this.monthlyCountApiDe = 0;
        this.messageId = null;
        this.apiId = null;
        this.ruleId = null;
        this.updateClientId = null;
        this.typeMessage = null;
        this.tableIdMessage = null;
        this.textMessage = '';
        this.textENMessage = '';
        this.checkedAllApi = false;
        this.user = '';
        this.pass = '';
        this.status = 1;
        this.selectedApi = [];
        this.selectedRuleList = [];
        this.selectedMessageList = [];
    }

    flagChange() {
        this.beforeFlag = false;
        this.registerFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.index6 = false;
        this.clearRules();
        this.clearFinalVar();
    }

    selectAllApi() {
        if (this.checkedAllApi) {
            debugger
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(
                c => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.apiAttachList = Array.isArray(c) ? c : [c];

                    this.apiAttachList.forEach((item, index) => {
                        item.row = index + 1;
                    });

                    this.selectApiFlag = true;
                    this.nextDisableFlag = false;

                    // انتخاب همه
                    this.selectedApi = [...this.apiAttachList];
                    console.log('apiIdList', this.apiAttachList.map(a => a.apiId));
                },
                error => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                },
            );
        } else {
            debugger
            // لغو انتخاب همه
            this.selectApiFlag = false;
            this.nextDisableFlag = true;

            // پاک‌سازی انتخاب‌ها و اطمینان از بروزرسانی صحیح
            this.selectedApi = [];
            this.checkedAllApi = false;

            // اختیاری: اگر خطا ادامه داشت، می‌تونی apiAttachList = [] هم بزنی
            // this.apiAttachList = [];
            console.log('Uncheck all fired');
            console.log('selectedApi before reset:', this.selectedApi);
        }
    }

    selectedRule(event) {
        this.ruleId = event.data.ruleId;
        this.ruleNameDe = event.data.name;
        this.ruleTemplateDe = event.data.ruleTemplate;
        this.httpsstatusDe = event.data.httpsstatus;
        this.httpsstatusDe = event.data.httpsstatus;
        this.messageTitleDe = event.data.messageTitle;
        this.nextDisableFlag = false;
        /*  this.ruleList = this.ruleList.filter(function (x) {

              return x.ruleId === event.data.ruleId;
          });*/
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectedRule'),
            life: 3000,
        });
    }

    onClearMessage(message:any) {
        this.codeMessageDe = null;
        this.messageIdDe = null;
        this.titleMessageDe =null
        this.tableIdDe = null
        this.messageId = null

    }
    onMessageSelected(message:any) {
        debugger
        debugger
        debugger
        console.log('✅ LAST SELECTED MESSAGE:', message);
        this.codeMessageDe = message.code;
        this.messageIdDe = message.messageid;
        this.titleMessageDe = message.title;
        this.tableIdDe = message.tableid;
        this.messageId = message.messageid;
        const id = message.messageId ?? message.messageid;
        this.selectedMessageId = id;
        this.messageId = id;
        this.nextDisableFlag = false;
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
        this.nextDisableFlag = false;
    }

    nextPageApi() {
        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index1 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index1 = false;
            this.index2 = true;
            this.registerFlag = false;
            this.nextDisableFlag = false;
        } else if (this.index2 == true) {
            this.selectedApi = this.selectedApi.map(api => ({
                ...api,
                dailyCount: this.dailyCount,
                weeklyCount: this.weeklyCount,
                monthlyCount: this.monthlyCount,
            }));
            this.dailyCountApiDe = this.dailyCount;
            this.weeklyCountApiDe = this.weeklyCount;
            this.monthlyCountApiDe = this.monthlyCount;
            if (!this.user && this.serviceRequestVerify == 1) {
                this.notifierService.showError({
                    detail: 'لطفا نام کاربری را وارد کنید!',
                    life: 3000,
                });
            } else if (!this.pass && this.serviceRequestVerify == 1) {
                this.notifierService.showError({
                    detail: 'لطفا رمز را وارد کنید!',
                    life: 3000,
                });
            } else {
                this.beforeFlag = true;
                this.index2 = false;
                this.index1 = false;
                this.nextFlag = true;
                this.index3 = true;
                this.registerFlag = false;
            }

        } else if (this.index3 == true) {
            this.beforeFlag = true;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = true;
            this.index4 = true;
            this.registerFlag = false;
        } else if (this.index4 == true && !(this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true;
            this.index4 = false;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = false;
            this.index5 = true;
            this.registerFlag = true;
            this.headerIndex5 = '';

        } else if (this.index4 == true && (this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true;
            this.index4 = false;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = true;
            this.index6 = true;
            this.registerFlag = false;
        } else if (this.index6) {
            this.beforeFlag = true;
            this.index4 = false;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = false;
            this.index6 = false;
            this.index5 = true;
            this.registerFlag = true;
        }
    }

    onRegisterAttachment() {
        debugger
        let tempObj = {
            clientId: null,
            apiId: null,
            dailyCount: null,
            weeklyCount: null,
            monthlyCount: null,
            ruleId: null,
            messageId: null,
            authType: null,
            basicAuthUsername: null,
            basicAuthPassword: null,
            status:1
        };

        if (!this.checkedAllApi && !this.checkedMultiApi) {
            this.dialogApiFlag = false;
            this.index4 = false;
            this.index5 = false;
            this.index6 = false;
            this.index3 = false;
            this.index2 = false;
            this.index1 = true;
            this.registerFlag = false;
            this.nextFlag = true;
            this.nextDisableFlag = true;
            this.dailyCountApiDe = this.dailyCount;
            this.weeklyCountApiDe = this.weeklyCount;
            this.monthlyCountApiDe = this.monthlyCount;
            if (this.updateClientId == null || this.updateClientId == undefined) {
                tempObj.clientId = this.clientId;
                tempObj.apiId = this.selectedApi[0].apiId;
                tempObj.dailyCount = this.dailyCountApiDe;
                tempObj.weeklyCount = this.weeklyCountApiDe;
                tempObj.monthlyCount = this.monthlyCountApiDe;
                tempObj.ruleId = this.ruleId;
                tempObj.messageId = this.messageId;
                tempObj.authType = this.serviceRequestVerify;
                tempObj.basicAuthUsername = this.user;
                tempObj.basicAuthPassword = this.pass;
                tempObj.status =1;
            } else {
                tempObj.clientId = this.updateClientId;
                tempObj.apiId = this.apiId;
                tempObj.dailyCount = this.dailyCountApiDe;
                tempObj.weeklyCount = this.weeklyCountApiDe;
                tempObj.monthlyCount = this.monthlyCountApiDe;
                tempObj.ruleId = this.ruleId;
                tempObj.messageId = this.messageIdDe;
                tempObj.authType = this.serviceRequestVerify;
                tempObj.basicAuthUsername = this.user;
                tempObj.basicAuthPassword = this.pass;
                tempObj.status =1;
            }
            // FUSEFS

            // this._primengProgressBarService.show();
            debugger
            this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.search();
                this.clearFinalVar();

            }, error => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
        } else if (this.checkedAllApi && !this.checkedMultiApi) {
            this.dialogApiFlag = false;
            debugger
            if (this.updateClientId == null || this.updateClientId == undefined) {
                debugger
                debugger
                this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(c => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        if (Array.isArray(c)) {
                            this.apiAttachLimitList = c;
                        } else {
                            this.apiAttachLimitList.push(c);
                        }
                        for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                            this.apiAttachLimitList[k] = Object.assign(this.apiAttachLimitList[k], { row: (k + 1) });
                            this.apiAttachLimitList[k].dailyCount = this.dailyCount;
                            this.apiAttachLimitList[k].weeklyCount = this.weeklyCount;
                            this.apiAttachLimitList[k].monthlyCount = this.monthlyCount;
                        }
                        for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                            tempObj.clientId = this.clientId;
                            tempObj.apiId = this.apiAttachLimitList[k].apiId;
                            tempObj.dailyCount = this.dailyCount;
                            tempObj.weeklyCount = this.weeklyCount;
                            tempObj.monthlyCount = this.monthlyCount;
                            tempObj.ruleId = this.ruleId;
                            tempObj.messageId = this.messageId;
                            tempObj.authType = this.serviceRequestVerify;
                            tempObj.basicAuthUsername = this.user;
                            tempObj.basicAuthPassword = this.pass;
                            tempObj.basicAuthPassword = this.pass;
                            tempObj.status =1;
                            // FUSEFS

                            // this._primengProgressBarService.show();
                            debugger
                            debugger
                            debugger
                            this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                                this.search();
                                this.clearFinalVar();

                            }, error => {
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                            });
                        }
                    },
                    error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });

            }
            else {
                for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                    tempObj.clientId = this.updateClientId;
                    tempObj.apiId = this.apiAttachLimitList[k].apiId;
                    tempObj.dailyCount = this.dailyCount;
                    tempObj.weeklyCount = this.weeklyCount;
                    tempObj.monthlyCount = this.monthlyCount;
                    tempObj.ruleId = this.ruleId;
                    tempObj.messageId = this.messageIdDe;
                    tempObj.authType = this.serviceRequestVerify;
                    tempObj.basicAuthUsername = this.user;
                    tempObj.basicAuthPassword = this.pass;
                    tempObj.status = this.status;
                    // FUSEFS

                    // this._primengProgressBarService.show();
                    debugger
                    debugger
                    debugger

                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {

                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.search();
                        this.clearFinalVar();

                    }, error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });
                }
            }

        } else if (this.checkedMultiApi) {
            //------------
            this.dialogApiFlag = false;
            if (this.updateClientId == null || this.updateClientId == undefined) {
                for (let k = 0; k < this.selectedApi.length; k++) {
                    tempObj.clientId = this.clientId;
                    tempObj.apiId = this.selectedApi[k].apiId;
                    tempObj.dailyCount = this.dailyCount;
                    tempObj.weeklyCount = this.weeklyCount;
                    tempObj.monthlyCount = this.monthlyCount;
                    tempObj.ruleId = this.ruleId;
                    tempObj.messageId = this.messageId;
                    tempObj.authType = this.serviceRequestVerify;
                    tempObj.basicAuthUsername = this.user;
                    tempObj.basicAuthPassword = this.pass;
                    tempObj.status = this.status;
                    // FUSEFS

                    // this._primengProgressBarService.show();
                    debugger
                    debugger
                    debugger

                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.search();
                        this.clearFinalVar();

                    }, error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });
                }
            } else {
                for (let k = 0; k < this.selectedApi.length; k++) {

                    tempObj.clientId = this.updateClientId;
                    tempObj.apiId = this.selectedApi[k].apiId;
                    tempObj.dailyCount = this.dailyCount;
                    tempObj.weeklyCount = this.weeklyCount;
                    tempObj.monthlyCount = this.monthlyCount;
                    tempObj.ruleId = this.ruleId;
                    tempObj.messageId = this.messageIdDe;
                    tempObj.authType = this.serviceRequestVerify;
                    tempObj.basicAuthUsername = this.user;
                    tempObj.basicAuthPassword = this.pass;
                    tempObj.status = this.status;
                    // FUSEFS

                    // this._primengProgressBarService.show();
                    debugger
                    debugger
                    debugger
                    debugger
                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.search();
                        this.clearFinalVar();

                    }, error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    });
                }
            }

            //------------
        }
    }

    beforePageApi() {

        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index5 == true && !(this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index4 = true;
            this.index5 = false;
            this.registerFlag = false;
        } else if ((this.index5 == true && (this.checkedAllApi || this.checkedMultiApi))) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index6 = true;
            this.index5 = false;
            this.registerFlag = false;
        } else if ((this.index6 == true && (this.checkedAllApi || this.checkedMultiApi))) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index6 = false;
            this.index4 = true;
            this.registerFlag = false;
        } else if (this.index4 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index3 = true;
            this.index4 = false;
            this.registerFlag = false;
        } else if (this.index3 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index2 = true;
            this.index3 = false;
            this.registerFlag = false;
            this.nextDisableFlag = this.selectedApi.length < 0;
        } else if (this.index2 == true) {
            this.beforeFlag = false;
            this.index2 = false;
            this.nextFlag = true;
            this.index1 = true;
            this.registerFlag = false;
            this.nextDisableFlag = this.selectedApi.length < 0;
        }
    }

    validation(): boolean {
        if (!this.clientId) {
            this.notifierService.showError({
                detail: this.transloco.translate('accessList.message.enterClientName'),
                life: 3000,
            });
            return false;
        } else if (!this.partyId) {
            this.notifierService.showError({
                detail: this.transloco.translate('accessList.message.enterPartyName'),
                life: 3000,
            });
            return false;
        } else if (!this.moduleId) {
            this.notifierService.showError({
                detail: this.transloco.translate('accessList.message.enterModuleTitle'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    BeforeButtonDialog() {
        this.limitApi = false;
    }


}
