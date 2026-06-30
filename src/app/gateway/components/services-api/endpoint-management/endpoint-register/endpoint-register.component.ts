import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../../constants/ApiGatewayConstants';
import { ActivatedRoute } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../../shared/validators/common-validations.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { InputGroup } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { KeyFilter } from 'primeng/keyfilter';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Panel } from 'primeng/panel';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgIf } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-endpoint-register',
    templateUrl: './endpoint-register.component.html',
    styleUrls: ['./endpoint-register.component.scss'],
    standalone: true,
    imports: [
        InputGroup,
        FormsModule,
        InputText,
        InputGroupAddon,
        KeyFilter,
        ToggleSwitch,
        ButtonDirective,
        TranslocoPipe,
        Dialog,
        Panel,
        Card,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        BreadcrumbsComponent,
        NgIf,
        Checkbox,

    ],
})
export class EndpointRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRegister;
    // slashAlpha: RegExp = /^[a-zA-Z\/]+$/;
    slashAlpha: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLine;
    //slashDotAlpha: RegExp = /^[a-zA-Z\/\.]+$/;
    slashDotAlpha = /[a-zA-Z0-9/.]/;
    moduleId: number;
    clientBase = false;
    status = true;
    isDataHub = false;
    sourceUrl: string = null;
    destinationPortNumber: string = null;
    sourceUrlByApi = true;
    destinationHost: string = null;
    destinationUri: string = null;
    registerTemp = {
        moduleId: null,
        sourceUrl: null,
        status: null,
        destinationPortNumber: null,
        destinationHost: null,
        destinationUri: null,
    };
    dubFlag = true;
    clientTemp = {
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
    aaaa = 'www.google.com' + 'یا' + '192.168.100.20';
    clientName;
    mobile;
    clientKey;
    mobileNo;
    dialogClientFlag = false;
    organizationCode;
    clientList = [];
    tempClient;
    clientId;
    clientAttachList = [];
    first = 0;
    rows = 10;
    first2 = 0;
    rows2 = 10;
    paginationLabel = this.transloco.translate('label.pagination.table');
    endpointid;
    accessBase;
    moduleTitle;
    partyTitle;
    moduleBase;
    detailsBreadObject = [];

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private validationsService: CommonValidationsService,
    ) {
    }
    onChangeIsDataHub(e){
        if(e.checked){
            this.destinationHost="ABC.net"
            this.destinationUri="/api/ABC"
            this.destinationPortNumber=null
        }else {
            this.destinationHost=""
            this.destinationUri=""
            this.destinationPortNumber=""
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    chooseBread(caseBase: string) {
        debugger
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
                        label_index1: this.transloco.translate('breadcrumbs.module'),
                        rout_index1: '/api-gateway/home/party/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.endpoint'),
                        rout_index2: '',
                        isActive2: true,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.registerEndpoint'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
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
                        label_index1: this.transloco.translate('breadcrumbs.party'),
                        rout_index1: '/api-gateway/home/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.module'),
                        rout_index2: '/api-gateway/home/party/module',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        isActive2: false,
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.endpoint'),
                        rout_index3: '',
                        isActive3: true,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('breadcrumbs.registerEndpoint'),
                        rout_index4: '/register',
                        isActive4: true,
                        img_index4: 'assets/icons/save.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.accessList'),
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.endpoint'),
                        rout_index1: '',
                        isActive1: true,
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                        img_index1: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.registerEndpoint'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            case 'clientBase':
                return [

                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.clientApi'),
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.accessList'),
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2:  this.transloco.translate('breadcrumbs.endpoint'),
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '('+this.transloco.translate('breadcrumbs.accessList')+')',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.registerEndpoint'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    ngOnInit(): void {
        this.scrollTop();

        if (this.inputRegister != undefined) {
            debugger
            this.moduleId = this.inputRegister.moduleId;
            this.endpointid = this.inputRegister.endpointId;
            this.accessBase = this.inputRegister.accessBase;
            this.clientBase = this.inputRegister.clientBase;
            this.moduleTitle = this.inputRegister.moduleTitle;
            this.clientName = this.inputRegister.clientName;
            this.moduleId = this.inputRegister.moduleId;
            this.partyTitle = this.inputRegister.partyTitle;
            this.moduleBase = this.inputRegister.moduleBase;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
                this.clientList.push(this.inputRegister);
            } else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            else if (this.moduleBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }
    }


    onKeydownSearch(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.clientSearch();
        }
    }

    clientSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .clientsearchbyclientnameandmobileno(this.clientName, this.mobile)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    this.clientAttachList = a;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
    }

    //this.
    showClients() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                this.clientAttachList = c;
                this.dialogClientFlag = true;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );
    }

    selectedClient(client) {
        this.dubFlag = true;
        this.dialogClientFlag = false;
        this.mobile = '';
        this.clientName = '';
        //console.log(this.clientList, 'ghabl')
        this.clientTemp = {
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
        this.clientTemp.allowedAccountno = client.allowedAccountno;
        this.clientTemp.clientId = client.clientId;
        this.clientTemp.digitalPublickey = client.digitalPublickey;
        this.clientTemp.mobileNo = client.mobileNo;
        this.clientTemp.name = client.name;
        this.clientTemp.organizationCode = client.organizationCode;
        this.clientTemp.publicKey = client.publicKey;
        this.clientTemp.status = client.status;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(
            (f) => {
                this._primengProgressBarService.hide();
                this.clientTemp.apikey = f;
                for (let i = 0; i < this.clientList.length; i++) {
                    if (this.clientList[i].clientId == client.clientId) {
                        this.dubFlag = false;
                    }
                }
                if (this.dubFlag) {
                    this.clientList.push(this.clientTemp);
                } else {
                    this.notifierService.showError({
                        detail: 'این کلاینت قبلا به لیست اتصال اضافه شده است!',
                        life: 3000,
                    });
                }

                //console.log(this.clientList, 'bad')
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );
    }

    clear() {
        this.mobile = '';
        this.clientName = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                this.clientAttachList = c;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );
    }

    deleteClient(client) {
        //console.log(this.clientList, 'ghabl')
        //console.log(this.clientList.indexOf(client))
        const itemIndex = this.clientList.indexOf(client);
        this.clientList.splice(itemIndex, 1);
        //console.log(this.clientList, 'bad')
    }

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    changeSourceUrlByApi(event) {
        debugger
        console.log('event:', event.checked);
        if (event.checked) {
            debugger
            if( this.sourceUrl.startsWith("^\/api\/")){
                debugger
                (this.sourceUrl != undefined || this.sourceUrl != null)
                    ? (this.sourceUrl = this.sourceUrl.replace(/^\/api\//, ''))
                    : this.sourceUrl;
                this.sourceUrl.startsWith('/') ?  this.sourceUrl =  this.sourceUrl.slice(1) :  this.sourceUrl = this.sourceUrl

            }else {
                debugger
                this.sourceUrl.startsWith('/') ?  this.sourceUrl =  this.sourceUrl.slice(1) :  this.sourceUrl = this.sourceUrl
            }

        }else {
            debugger
            (this.sourceUrl != undefined ||this.sourceUrl != null)
                ? (this.sourceUrl = this.sourceUrl.replace(/^\/api/, ''))
                : this.sourceUrl;
            const firstChar = this.sourceUrl.charAt(0);
            firstChar != '/'
                ? (this.sourceUrl = '/' + this.sourceUrl)
                : '/' + this.sourceUrl;
        }
    }
    onRegister() {
        /*  اضاف کردن / به ابتدا و انتهای ورودی
          let firstChar = this.sourceUrl.charAt(0);
          let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1)
          firstChar != "/" ? this.sourceUrl = "/" + this.sourceUrl : "/" + this.sourceUrl
          lastChar != "/" ? this.sourceUrl = this.sourceUrl + "/" : this.sourceUrl + "/"*/
        if (this.validation()) {
            /* this.apiGatewayService.currentApprovalStageModuleId.subscribe(a => {
                 this.registerTemp.moduleId = Number(a);
             })*/

            this.registerTemp.moduleId = this.moduleId;

            const firstChar = this.sourceUrl.charAt(0);
            const lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1);
            lastChar != '/' ? (this.sourceUrl = this.sourceUrl + '/') : this.sourceUrl + '/';
            firstChar != '/' ? (this.sourceUrl = '/' + this.sourceUrl) : '/' + this.sourceUrl;
            if (this.sourceUrlByApi){
                this.sourceUrl = '/api' + this.sourceUrl;
            }

            //this.sourceUrl != null ? this.sourceUrl = this.sourceUrl.toLowerCase() : null
            //this.destinationUri != null ? this.destinationUri = this.destinationUri.toLowerCase() : null
            this.registerTemp.sourceUrl = this.sourceUrl;

            this.registerTemp.destinationPortNumber =
                this.destinationPortNumber;
            this.registerTemp.destinationHost = this.destinationHost;
            this.registerTemp.destinationUri = this.destinationUri;
            if (this.status) {
                this.registerTemp.status = 1;
            }
            else {
                this.registerTemp.status = 0;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerEndpoint(this.registerTemp)
                .subscribe(
                    (respons) => {
                        this._primengProgressBarService.hide();
                        // this.close.emit('closeAndCreate');

                        if (this.clientList.length > 0) {
                            for (let k = 0; k < this.clientList.length; k++) {
                                this.clientList[k].endpointId =
                                    respons.endpointId;
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .registerClient(this.clientList[k])
                                    .subscribe(
                                        (res) => {
                                            this._primengProgressBarService.hide();
                                            this.close.emit('closeAndCreate');
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        },
                                    );
                            }
                        } else {
                            this.close.emit('closeAndCreate');
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }
    }

    validation(): boolean {
        if (!this.sourceUrl) {
            this.notifierService.showError({
                detail: 'لطفا آدرس مبدا را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.destinationHost) {
            this.notifierService.showError({
                detail: 'لطفا آدرس Host را وارد کنید!',
                life: 3000,
            });
            return false;
        }else if (this.destinationHost.includes(':')) {
            this.notifierService.showError({
                detail: 'آدرس Host به فرمت استاندارد وارد نشده است!',
                life: 3000,
            });
            return false;
        }  else {
            /*برداشتن pKeyFilter*/
            /*
       else if (this.validationsService.invalidSite(this.destinationHost)) {
           this.notifierService.showError({detail: "لطفا آدرس Host را به درستی وارد کنید!", life: 3000});
           return false;
       } */
            return true;
        }
    }

    protected readonly onchange = onchange;
}
