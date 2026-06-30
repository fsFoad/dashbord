import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EndpointDto } from '../../../../models/endpoint.Dto';
import { ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../../shared/validators/common-validations.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';

import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgIf } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-endpoint-update',
    templateUrl: './endpoint-update.component.html',
    styleUrls: ['./endpoint-update.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        InputText,
        KeyFilter,
        TranslocoPipe,
        ButtonDirective,
        ToggleSwitch,
        InputGroup,
        InputGroupAddon,
        BreadcrumbsComponent,
        NgIf,
        Checkbox,

    ],
})
export class EndpointUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate;

    status;
    sourceUrlByApi = null;
    sourceUrl: string = null;
    destinationPortNumber: string = null;
    destinationHost: string = null;
    destinationUri: string = null;
    endpointId;
    moduleId;
    updateTemp = {
        sourceUrl: '',
        status: null,
        destinationPortNumber: '',
        destinationHost: '',
        destinationUri: '',
        moduleId: null,
        endpointId: null,
    };
    moduleTitle;
    partyTitle;
    clientName;
    accessBase;
    clientBase;
    moduleBase;
    detailsBreadObject = [];
    isDataHub = false;
    slashAlpha = /[a-zA-Z0-9/]/;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private validationsService: CommonValidationsService,
    ) {
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
                        label_index3: this.transloco.translate('breadcrumbs.editEndpoint'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/update.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
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
                        label_index4: this.transloco.translate('breadcrumbs.editEndpoint'),
                        rout_index4: '/register',
                        isActive4: true,
                        img_index4: 'assets/icons/update.png',
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
                        label_index2: this.transloco.translate('breadcrumbs.editEndpoint'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
                        label_index2: this.transloco.translate('breadcrumbs.endpoint'),
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.transloco.translate('breadcrumbs.accessList') + ')',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.editEndpoint'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/update.png',
                    },
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
            if (element) element.scrollIntoView(true);
        });
    }

    onChangeIsDataHub(e) {
        if (e.checked) {
            this.destinationHost = 'fake.net';
            this.destinationUri = '/apifake';
            this.destinationPortNumber = null;
        } else {
            this.destinationHost = '';
            this.destinationUri = '';
            this.destinationPortNumber = '';
        }
    }

    ngOnInit(): void {
        this.scrollTop();


        if (this.inputUpdate.sourceUrl != undefined || this.inputUpdate.sourceUrl != null) {

            if (this.inputUpdate.sourceUrl.startsWith('/api/')) {
                this.sourceUrlByApi = true;
                (this.inputUpdate.sourceUrl != undefined || this.inputUpdate.sourceUrl != null)
                    ? (this.sourceUrl = this.inputUpdate.sourceUrl.replace(/^\/api\//, ''))
                    : this.inputUpdate.sourceUrl;
            } else {
                this.sourceUrl = this.inputUpdate.sourceUrl;
            }
        }

        this.status = this.inputUpdate.status;
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.destinationPortNumber = this.inputUpdate.destinationPortNumber;
        this.destinationHost = this.inputUpdate.destinationHost;
        this.destinationUri = this.inputUpdate.destinationUri;
        this.endpointId = this.inputUpdate.endpointId;
        this.moduleId = this.inputUpdate.moduleId;
        if (this.inputUpdate != undefined) {
            debugger
            this.moduleId = this.inputUpdate.moduleId;
            this.accessBase = this.inputUpdate.accessBase;
            this.clientBase = this.inputUpdate.clientBase;
            this.moduleTitle = this.inputUpdate.moduleTitle;
            this.clientName = this.inputUpdate.clientName;
            this.moduleId = this.inputUpdate.moduleId;
            this.partyTitle = this.inputUpdate.partyTitle;
            this.moduleBase = this.inputUpdate.moduleBase;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.moduleBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
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

    onClose() {
        this.close.emit('close');
    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    onUpdate() {
        if (this.validation()) {
            /*  اضاف کردن / به ابتدا و انتهای ورودی
            let firstChar = this.sourceUrl.charAt(0);
             let lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1)
             firstChar != "/"?this.sourceUrl="/"+ this.sourceUrl: "/"+ this.sourceUrl
             lastChar != "/"?this.sourceUrl= this.sourceUrl+"/": this.sourceUrl+"/"*/
            this.apiGatewayService.currentApprovalStageModuleId.subscribe(
                (a) => {
                    this.updateTemp.moduleId = a;
                },
            );

            this.updateTemp.moduleId = this.moduleId;
            this.updateTemp.endpointId = this.endpointId;

            const firstChar = this.sourceUrl.charAt(0);
            const lastChar = this.sourceUrl.charAt(this.sourceUrl.length - 1);
            lastChar != '/'
                ? (this.sourceUrl = this.sourceUrl + '/')
                : this.sourceUrl + '/';
            firstChar != '/'
                ? (this.sourceUrl = '/' + this.sourceUrl)
                : '/' + this.sourceUrl;
            if (this.sourceUrlByApi) {
                this.sourceUrl = '/api' + this.sourceUrl;
            }
            // this.sourceUrl != null ? this.sourceUrl = this.sourceUrl.toLowerCase() : null
            // this.destinationUri != null ? this.destinationUri = this.destinationUri.toLowerCase() : null
            this.updateTemp.sourceUrl = this.sourceUrl;
            this.updateTemp.destinationPortNumber = this.destinationPortNumber;
            this.updateTemp.destinationHost = this.destinationHost;
            this.updateTemp.destinationUri = this.destinationUri;
            this.status == true
                ? (this.updateTemp.status = 1)
                : (this.updateTemp.status = 0);
            this.updateTemp.destinationHost = this.destinationHost;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .updateEndpoint(this.updateTemp)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
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
                detail: 'لطفا آدرس مقصد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.destinationHost.includes(':')) {
            this.notifierService.showError({
                detail: 'آدرس Host به فرمت استاندارد وارد نشده است!',
                life: 3000,
            });
            return false;
        } else {
            /*برداشتن pKeyFilter*/
            /* else if (this.validationsService.invalidSite(this.destinationHost)) {
             this.notifierService.showError({detail: "لطفا آدرس Host را به درستی وارد کنید!", life: 3000});
             return false;
         }*/
            return true;
        }
    }
}
