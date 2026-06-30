import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../../constants/ApiGatewayConstants";
import {EndpointheaderDto} from "../../../../../models/endpointheader.Dto";
import {ActivatedRoute} from "@angular/router";
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete} from 'primeng/autocomplete';
import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {HeaderNameService} from '../../../../../services/headerName.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Ripple } from 'primeng/ripple';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header-endpoint-register',
    templateUrl: './header-endpoint-register.component.html',
    styleUrls: ['./header-endpoint-register.component.scss'],
    standalone: true,
    imports: [
        Panel,
        DropdownModule,
        FormsModule,
        AutoComplete,
        InputText,
        Checkbox,
        ButtonDirective,
        TranslocoPipe,
        ToggleSwitch,
        Ripple,
        BreadcrumbsComponent,
        Toast,
        CommonModule
    ],
    providers: [HeaderNameService],
})
export class HeaderEndpointRegisterComponent implements OnInit, AfterViewInit {
    @Output() close = new EventEmitter<string>();
    @Output() closeCache = new EventEmitter<{ type: string; apiId: any ;endpointDetailId:number ,visible?:boolean}>();
    @Input() aggregatorInput;
    @Input() input;
    @Input() hubInput;
    @Input() cacheInput!: any;
    headerTypeValue = ApiGatewayConstants.headerType;
    headerTypeGroup = ApiGatewayConstants.headerTypeGroup;
    actionType;
    detailType;
    endpointId;
    inputName;
    inputValue;
    ouputName;
    outputValue;
    status;
    detailTypeFlag = false;
    inputHeaderNameFlag = false;
    inputHeaderValueFlag = false;
    ouputHeaderNameFlag = false;
    someVariable = true;
    outputHeaderValueFlag = false;
    inputHeaderNameStar = '* ';
    ouputHeaderNameStar = '* ';
    outputHeaderValueStar = '* ';
    inputHeaderValueStar = '* ';
    registerTemp: EndpointheaderDto = {
        actionType: null,
        status: null,
        inputName: '',
        inputValue: '',
        ouputName: '',
        outputValue: '',
        detailType: null,
        checkElementPath: null,
        isSystemEndpointDetail: null,
    };
    filteredGroups: any[];
    headerName: any[];
    checkElementPath: string = null;
    showMessage = false;
    checked;
    bodyFlag = true;
    apiBaseFlag = false;
    cacheFlag = false;
    aggregatorFlag = false;
    headerRegister = 'ثبت المان های اندپوینت';

    detailsBreadObject = [];
    accessBase
    moduleBase
    partyBase
    clientBase
    clientName
    apiName
    apiTitle
    moduleTitle
    partyTitle
    destinationHost
    cust_alphanEnAndSlash: RegExp = ApiGatewayConstants.url_cust_alphaEnOSlashOUnderLine;


    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private headerNameService: HeaderNameService
    ) {
    }

    chooseBread(caseBase: any) {
        debugger
        debugger
        let resultBreadcrumb;
        if (this.input.apiEndpointHeaderFlag) {
            debugger
            switch (caseBase) {
                case 'clientBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.clientName + ')',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های سرویس',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت المان سرویس'),
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'moduleBase':
                    resultBreadcrumb = [
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
                            rout_index1: '/api-gateway/home/party/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های سرویس',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت المان سرویس'),
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'accessBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },

                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: '',
                            isActive1: false,
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 2,
                            label_index2: 'المان های سرویس',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ثبت المان سرویس'),
                            rout_index3: '/register',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'partyBase':
                    resultBreadcrumb = [
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
                            rout_index2: '/module',
                            isActive2: false,
                            img_index2: 'assets/icons/module.png',
                            label_Detail_index2: '(' + this.partyTitle + ')',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس ',
                            rout_index3: './endpoint',
                            isActive3: false,
                            img_index3: 'assets/icons/api.png',
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 4,
                            label_index4: 'المان های سرویس',
                            rout_index4: null,
                            isActive4: true,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ثبت المان سرویس'),
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        }
        else if (this.input.endpointElementFlag) {
            debugger
            switch (caseBase) {
                case 'clientBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                        },
                        {
                            index: 2,
                            label_index2: 'اندپوینت',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.clientName + ')',
                            img_index2: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های اندپوینت',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3:
                                '(' + this.destinationHost + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت المان اندپوینت'),
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'moduleBase':
                    resultBreadcrumb = [
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
                            rout_index1: '/api-gateway/home/party/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'اندپوینت',
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: 'المان های اندپوینت',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3:
                                '(' + this.destinationHost + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت المان اندپوینت'),
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'accessBase':
                    resultBreadcrumb = [

                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },

                        {
                            index: 1,
                            label_index1: 'اندپوینت',
                            rout_index1: '',
                            isActive1: false,
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                            img_index1: 'assets/icons/endpoint.png',
                        },
                        {
                            index: 2,
                            label_index2: 'المان های اندپوینت',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2:
                                '(' + this.destinationHost + ')',
                            img_index2: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ثبت المان اندپوینت'),
                            rout_index3: '/register',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                case 'partyBase':
                    resultBreadcrumb = [
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
                            rout_index2: '/module',
                            isActive2: false,
                            img_index2: 'assets/icons/module.png',
                            label_Detail_index2: '(' + this.partyTitle + ')',
                        },
                        {
                            index: 3,
                            label_index3: 'اندپوینت',
                            rout_index3: './endpoint',
                            isActive3: false,
                            img_index3: 'assets/icons/endpoint.png',
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 4,
                            label_index4: 'المان های اندپوینت',
                            rout_index4: null,
                            isActive4: true,
                            label_Detail_index4:
                                '(' + this.destinationHost + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ثبت المان اندپوینت'),
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        }
        return resultBreadcrumb;
    }

    onShowMessage(e) {
        this.checkElementPath != null || this.checkElementPath != ''
            ? (this.showMessage = true)
            : (this.showMessage = false);
    }

    bodyState(e) {
        debugger
        if (this.input != undefined) {
            if (this.input.apiBaseFlag == true) {
                if (e.value == '1') {
                    (this.apiBaseFlag = true),
                        (this.actionType = '1'),
                        this.onChangeHeaderType('1');
                } else {
                    (this.apiBaseFlag = false),
                        (this.actionType = null),
                        this.onChangeHeaderType(null);
                }
            } else {
                (this.apiBaseFlag = false),
                    (this.actionType = null),
                    this.onChangeHeaderType(null);
            }
        } else {
            (this.apiBaseFlag = false),
                (this.actionType = null),
                this.onChangeHeaderType(null);
        }

        if (e.value == '2') {
            this.bodyFlag = false;
        } else {
            this.checked = false;
            this.checkElementPath = '';
            this.bodyFlag = true;
        }
    }

    search(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.headerName?.length; i++) {
            const char = this.headerName[i];
            //console.log('char',char)
            if (char.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(char);
                //console.log('filtered',filtered)
            }
        }

        this.filteredGroups = filtered;
        // this.filteredGroups = this.headerName;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngAfterViewInit() {
        debugger
        console.log('child => ngAfterViewInit()');
        //debugger
        if (this.hubInput != undefined) {
            debugger;
            debugger;
            this.detailType = '3';
            this.detailTypeFlag = true;
        }
        if (this.aggregatorInput != undefined) {
            debugger
            this.someVariable=false
            this.detailType = '2';
            this.actionType='3'
            this.detailTypeFlag = true;
            this.aggregatorFlag = true;
            this.status=true
            this.onChangeHeaderType({ value:'3' })
        }
    }

    ngOnInit(): void {
        debugger;
        this.moduleBase=this.input.moduleBase
        this.partyBase=this.input.partyBase
        this.clientBase=this.input.clientBase
        this.accessBase=this.input.accessBase
        this.clientName=this.input.clientName
        this.apiName=this.input.apiName
        this.apiTitle=this.input.apiTitle
        this.moduleTitle=this.input.moduleTitle
        this.partyTitle=this.input.partyTitle
        this.destinationHost=this.input.destinationHost
        this.scrollTop();
        if (this.moduleBase) {
            debugger
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.partyBase){
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.accessBase) {
            debugger
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        this.someVariable=true
        this.scrollTop();
        this.input != undefined ? this.input.apiBaseFlag == false ? (this.headerRegister = 'ثبت المان های اندپوینت') : (this.headerRegister = 'ثبت المان های سرویس') : null;
        this.input != undefined ? this.input.apiBaseFlag == true ? ((this.detailType = '1'), (this.apiBaseFlag = true), (this.actionType = '1')) : ((this.apiBaseFlag = false), (this.detailType = null), (this.actionType = null)) : null;
        this.status = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getinputheadernamesUrl().subscribe((h) => {
                debugger;
                this._primengProgressBarService.hide();
                debugger;
                this.headerName = h?.data;
                debugger;
            },
            (error) => {
                debugger;
                try {
                    const cleanedText = error?.error?.text
                        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                    const temp = JSON.parse(cleanedText);
                    this.headerName = temp.data;
                } catch (e) {
                    console.error('خطا در parsing JSON', e);
                    this.headerName = [];
                } finally {
                    this._primengProgressBarService.hide();
                }
            }
        );
        debugger;
        if (this.hubInput != undefined) {
            debugger;
            this.someVariable=true
            this.detailType = '3';
            this.detailTypeFlag = true;
        }
        if (this.cacheInput!=undefined){
            this.someVariable=false
            this.detailType = '3';
            this.actionType='3'
            this.onChangeHeaderType({ value:'3' })
            this.detailTypeFlag = true;
            this.cacheFlag = true;
        }
        if (this.aggregatorInput != undefined) {
            debugger
            this.someVariable=false
            this.detailType = '2';
            this.actionType='3'
            this.detailTypeFlag = true;
            this.aggregatorFlag = true;
            this.status=true
            this.onChangeHeaderType({ value:'3' })
        }
    }

    onCancel() {
        debugger
        if (this.cacheInput!=undefined){
            this.closeCache.emit({  type: 'close',
                apiId: null,
                endpointDetailId: null ,visible:false});
        }
        this.close.emit('close');

    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onChangeHeaderType(e: any) {
        debugger;
        if (this.actionType === '1') {
            this.inputHeaderNameFlag = true;
            this.inputHeaderValueFlag = true;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.inputName = '';
            this.inputValue = '';
            this.ouputName = '';
            this.outputValue = '';
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '* ';
            this.inputHeaderNameStar = '';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        }
        else if (this.actionType === '2') {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '* ';
            this.inputHeaderNameStar = '* ';
            this.inputHeaderValueStar = '* ';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        }
        else if (this.actionType === '3') {
            debugger
            this.inputValue = '* ';
            this.inputHeaderValueFlag = true;
            this.outputValue = '* ';
            this.outputHeaderValueFlag = true;
            this.inputHeaderNameFlag = false;
            this.ouputHeaderNameFlag = false;
            this.ouputHeaderNameStar = '* ';
            this.outputHeaderValueStar = '';
            this.inputHeaderNameStar = '* ';
            this.inputHeaderValueStar = '';
            // this.beforeEndpointIdStar = ""
            //this.afterEndpointIdStar = ""
        } else {
            this.inputHeaderNameFlag = false;
            this.inputHeaderValueFlag = false;
            this.outputHeaderValueFlag = false;
            this.ouputHeaderNameFlag = false;
            this.inputName = '';
            this.inputValue = '';
            this.ouputName = '';
            this.outputValue = '';
        }
    }

    onRegister() {
        debugger
        if (this.validationRegister()) {
            debugger;
            this.registerTemp.actionType = +this.actionType;
            this.registerTemp.detailType = +this.detailType;
            this.status == true
                ? (this.registerTemp.status = 1)
                : (this.registerTemp.status = 0);
            // this.registerTemp.inputName = this.inputName;
            // this.registerTemp.ouputName = this.ouputName;
            if (typeof this.inputName == 'object') {
                this.registerTemp.inputName = this.inputName.name;
            } else {
                this.registerTemp.inputName = this.inputName;
            }
            if (typeof this.ouputName == 'object') {
                this.registerTemp.ouputName = this.ouputName.name;
            } else {
                this.registerTemp.ouputName = this.ouputName;
            }
            this.registerTemp.inputValue = this.inputValue;
            this.registerTemp.outputValue = this.outputValue;
            this.registerTemp.isSystemEndpointDetail = 0;
            //  this.registerTemp.beforeEndpointId = +this.beforeEndpointId;
            // this.registerTemp.afterEndpointId = +this.afterEndpointId;
            if (this.checked == false) {
                this.checkElementPath = null;
            }

            if (
                this.checkElementPath != null &&
                this.checkElementPath != undefined
            ) {
                const firstChar = this.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (this.checkElementPath = '/' + this.checkElementPath)
                    : '/' + this.checkElementPath;
            }
            this.registerTemp.checkElementPath = this.checkElementPath;
            console.log('registerTemp', this.registerTemp);

            if (this.input != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;
                if (this.input.apiEndpointHeaderFlag) {
                    levelId = 1;
                    recordId = this.input.apiId;
                }
                else if (!this.input.apiEndpointHeaderFlag) {
                    this.apiGatewayService.currentApprovalStageEndpointIdHeader.subscribe(
                        (msg) => {
                            recordId = Number(msg);
                            levelId = 0;
                        },
                        (error) => {
                        }
                    );
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerEndpointdetail(
                        levelId,
                        recordId,
                        this.registerTemp
                    )
                    .subscribe(
                        (a) => {
                            this._primengProgressBarService.hide();
                            this.close.emit('closeAndCreate');
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            console.log(error);
                            this.close.emit('close');
                        }
                    );
            }
            else if (this.hubInput != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;
                if (this.hubInput.apiEndpointHeaderFlag) {
                    levelId = 1;
                    recordId = this.hubInput.apiId;
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .registerEndpointdetail(
                            levelId,
                            recordId,
                            this.registerTemp
                        )
                        .subscribe(
                            (a) => {
                                this._primengProgressBarService.hide();
                                this.close.emit('closeAndCreate');
                            },
                            (error) => {
                                debugger;
                                this._primengProgressBarService.hide();
                                console.log(error);
                                this.close.emit('close');
                            }
                        );
                }
            }
            else if (this.cacheInput != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;

                    levelId = 1;
                    recordId = this.cacheInput?.cacheObj?.apiId;
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.registerEndpointdetail(
                            levelId,
                            recordId,
                            this.registerTemp
                        ).subscribe((a) => {
                            debugger
                                this._primengProgressBarService.hide();
                                this.closeCache.emit({
                                    type: 'closeAndCreate',
                                    apiId: this.cacheInput?.cacheObj?.apiId,
                                    endpointDetailId: a?.endpointDetailId
                                });
                            },
                            (error) => {
                                debugger;
                                this._primengProgressBarService.hide();
                                console.log(error);
                                this.close.emit('close');
                            }
                        );

            }
            else if (this.aggregatorInput != undefined) {
                let levelId: number = null;
                let recordId: number = null;
                debugger;
                    levelId = 1;
                    recordId = this.aggregatorInput.apiId;
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .registerEndpointdetail(
                            levelId,
                            recordId,
                            this.registerTemp
                        )
                        .subscribe(
                            (a) => {
                                this._primengProgressBarService.hide();
                                this.close.emit('closeAndCreate');
                            },
                            (error) => {
                                debugger;
                                this._primengProgressBarService.hide();
                                console.log(error);
                                this.close.emit('close');
                            }
                        );

            }
        }
    }

    validationRegister(): boolean {
        debugger
        if (!this.detailType){
            this.notifierService.showError({
                detail: 'لطفا گروه بندی را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.actionType){
            this.notifierService.showError({
                detail: 'لطفا نوع عملیات را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        switch (this.actionType) {
            case '1':
                if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.outputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
            case '2':
                if (!this.inputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.inputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.outputValue) {
                    this.notifierService.showError({
                        detail: 'لطفا مقدار خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
            case '3':
                if (!this.inputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام ورودی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else if (!this.ouputName) {
                    this.notifierService.showError({
                        detail: 'لطفا نام خروجی را وارد کنید!',
                        life: 3000,
                    });
                    return false;
                } else {
                    return true;
                }
        }
    }
}
