// @ts-nocheck
import {  Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EndpointheaderDto } from '../../../../models/endpointheader.Dto';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ThreeDotDetailsPipe } from '../../../../../shared/pipes/threeDotDetails.pipe';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { AccordionTab } from '../../../../../shared/_compat/primeng/accordion';
import { TableModule } from 'primeng/table';
import { detailTypePipe } from '../../../../../shared/pipes/detail-type.pipe';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { HeaderTypePipe } from '../../../../../shared/pipes/headerType.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { ButtonDirective } from 'primeng/button';
import { HeaderEndpointRegisterComponent } from './header-endpoint-register/header-endpoint-register.component';
import { HeaderEndpointUpdateComponent } from './header-endpoint-update/header-endpoint-update.component';
import { Toast } from 'primeng/toast';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { HttpResponse } from '@angular/common/http';
import {  ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
@Component({
    selector: 'app-header-endpoint-management',
    templateUrl: './header-endpoint-management.component.html',
    styleUrls: ['./header-endpoint-management.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Tooltip,
        NgIf,
        ThreeDotDetailsPipe,
        Accordion,
        AccordionTab,
        TableModule,
        detailTypePipe,
        MoreChar19Pipe,
        HeaderTypePipe,
        StatusPipe,
        ButtonDirective,
        TranslocoPipe,
        HeaderEndpointRegisterComponent,
        HeaderEndpointUpdateComponent,
        Toast,
        NgClass,
        CommonModule,
        Menu,
        Ripple,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HeaderEndpointManagementComponent implements OnInit {
    @Input() inputEndpointHeader;
    @Input() inputApiEndpointHeader;
    @Output() close = new EventEmitter<string>();

    tempElement: any;
    items: any[] = [];
    registerFlag = false;
    updateFlag = false;
    tblFlag = false;
    apiEndpointHeaderFlag: boolean;
    endpointElementFlag: boolean = false;
    apiElementFlag: boolean = false;
    endpointList = [];
    activeAccordionIndexes: number[] = [];
    endpointListIsSystemEndpointDetail = [];
    endpointNotIsSystemEndpointDetail = [];
    temp;
    sourceUrl;
    destinationHost;
    destinationUri;
    updateEndpointHeaderDto;
    endpointid: string;
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    endpointTitle;
    clientName;
    apiName;
    moduleBase = false;
    accessBase = false;
    clientBase = false;
    partyBase = false;
    rowsNotIsSystem = 10;
    rowsIsSystem = 10;
    pagesizeIsSystem = 10;
    pagenoIsSystem = 0;
    firstIsSystem = 0;
    totalRecordsIsSystem = 0;
    pagesizeNotIsSystem = 10;
    pagenoNotIsSystem = 0;
    firstNotIsSystem = 0;
    totalRecordsNotIsSystem = 0;
    apiId;
    apiTitle;
    apiUrl;
    headerHeaderEndpoint = 'المان های اندپوینت';
    apiBase = false;
    endpointDetailApiFlag = false;
    updateTemp: EndpointheaderDto = {
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
    systemElementsCount=0
    nonSystemElements=0
    firstIndexIsSystem = 0;
    firstIndexNotIsSystem = 0;
    paginationLabelNotIsSystem = this.transloco.translate('label.pagination.table');
    paginationLabelIsSystem = this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private cdr: ChangeDetectorRef,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
    }

    chooseBread(caseBase: any) {
        debugger
        let resultBreadcrumb;
        if (this.inputApiEndpointHeader != undefined) {
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
                            label_Detail_index3: '(' + this.apiName + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
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
                            label_Detail_index3: '(' + this.apiName + ')',
                            img_index3: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index4: null, label_index4: null },
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
                            label_Detail_index2: '(' + this.apiName + ')',
                            img_index2: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index3: null, label_index3: null },
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
                            label_Detail_index4: '(' + this.apiName + ')',
                            img_index4: 'assets/icons/headerEndpoint.png',
                        },
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        }
        else if (this.inputEndpointHeader != undefined) {
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
                        { label_Detail_index4: null, label_index4: null },
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
                        { label_Detail_index4: null, label_index4: null },
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
                        { label_Detail_index3: null, label_index3: null },
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
                        { label_Detail_index5: null, label_index5: null },
                        { label_Detail_index6: null, label_index6: null },
                    ];
                    break;
                default:
                    resultBreadcrumb = null;
            }
        }
        return resultBreadcrumb;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    setAccordionState(): void {

        const indexes: number[] = [];

        if (this.systemElementsCount > 0) {
            indexes.push(0);
        }

        if (this.nonSystemElements > 0) {
            indexes.push(1);
        }

        this.activeAccordionIndexes = [...indexes];

        this.cdr.detectChanges();
    }
    activation(element) {

        if (this.inputEndpointHeader != undefined) {
            debugger
            debugger
            debugger
            debugger
            debugger;
            delete element.row;
            this.updateTemp = element;
            this.updateTemp.status = 1;
            this.updateTemp.actionType = +element.actionType;
            this.updateTemp.ouputName = element.ouputName;
            this.updateTemp.inputName = element.inputName;
            this.updateTemp.inputValue = element.inputValue;
            this.updateTemp.outputValue = element.outputValue;
            this.updateTemp.endpointDetailId = +element.endpointDetailId;
            this.updateTemp.detailType = +element.detailType;
            element.isSystemEndpointDetail ? this.updateTemp.isSystemEndpointDetail = 1 : this.updateTemp.isSystemEndpointDetail = 0;
            if (element.checkElementPath != null &&
                element.checkElementPath != undefined) {
                const firstChar = element.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (element.checkElementPath = '/' + element.checkElementPath)
                    : element.checkElementPath;
            }
            this.updateTemp.checkElementPath = element.checkElementPath;

            let levelId: number = null;
            let recordId: number = null;
            //المان اندپوینت
            levelId = 0;
            recordId = element.endpointDetailId;
            this._primengProgressBarService.show();
            debugger
            debugger
            debugger
            debugger
            if ('row' in this.updateTemp) {
                delete this.updateTemp.row;
            }
            this.messagesApiFacadeService.registerEndpointdetail(levelId, recordId, this.updateTemp).subscribe((a) => {
                    this._primengProgressBarService.hide();
                /*    this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe((getAllResponse) => {
                            this.endpointList = [];
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            this.tblFlag = true;
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    this.searchIsSystemByEndpointId();
                    this.searchNotIsSystemByEndpointId()

                },
                (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
                  /*  this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe((getAllResponse) => {
                            this.endpointList = [];
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    this.searchIsSystemByEndpointId();
                    this.searchNotIsSystemByEndpointId()

                    console.log(error);

                },
            );


            console.log(this.inputEndpointHeader);
        }
        else if (this.inputApiEndpointHeader != undefined) {
            debugger;
            delete element.row;
            this.updateTemp = element;
            this.updateTemp.status = 1;
            this.updateTemp.actionType = +element.actionType;
            this.updateTemp.ouputName = element.ouputName;
            this.updateTemp.inputName = element.inputName;
            this.updateTemp.inputValue = element.inputValue;
            this.updateTemp.outputValue = element.outputValue;
            this.updateTemp.endpointDetailId = +element.endpointDetailId;
            this.updateTemp.detailType = +element.detailType;
            element.isSystemEndpointDetail ? this.updateTemp.isSystemEndpointDetail = 1 : this.updateTemp.isSystemEndpointDetail = 0;
            if (element.checkElementPath != null &&
                element.checkElementPath != undefined) {
                const firstChar = element.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (element.checkElementPath = '/' + element.checkElementPath)
                    : element.checkElementPath;
            }
            this.updateTemp.checkElementPath = element.checkElementPath;

            let levelId: number = null;
            let recordId: number = null;
            //المان سرویس
            levelId = 1;
            recordId = this.apiId;
            this._primengProgressBarService.show();
            debugger
            debugger
            debugger
            debugger
            if ('row' in this.updateTemp) {
                delete this.updateTemp.row;
            }
            //issystem
            this.messagesApiFacadeService.registerEndpointdetail(levelId, recordId, this.updateTemp).subscribe((a) => {
                debugger
                    this._primengProgressBarService.hide();
                    this._primengProgressBarService.show();
                    this.searchIsSystemByApiId();
                    this.searchNotIsSystemByApiId();
                   /* this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem,1).subscribe(
                        (res: HttpResponse<any>) => {
                            debugger
                            this._primengProgressBarService.hide();
                            debugger;
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointListIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.endpointListIsSystemEndpointDetail = [];

    /!*                        for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }*!/
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;

                          /!*  for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }*!/
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                },
                (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.searchIsSystemByApiId();
                    this.searchNotIsSystemByApiId();

                  /*  this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem,1).subscribe(
                        (res: HttpResponse<any>) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointList = [];
                            this.endpointListIsSystemEndpointDetail = [];
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointListIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.endpointListIsSystemEndpointDetail.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );

                            this.tblFlag = true;

                          /!*  for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }*!/
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    console.log(error);

                },
            );

            //not issystem
            this.messagesApiFacadeService.registerEndpointdetail(levelId, recordId, this.updateTemp).subscribe((a) => {
                    debugger
                    this._primengProgressBarService.hide();
                    this._primengProgressBarService.show();
                    this.searchNotIsSystemByEndpointId();
                    /*this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoNotIsSystem, this.pagesizeNotIsSystem,0).subscribe(
                        (res: HttpResponse<any>) => {
                            debugger
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointNotIsSystemEndpointDetail = [];
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointNotIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsNotIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );

                           /!* for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }*!/

                            this.tblFlag = true;

                        /!*    for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }*!/
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                },
                (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.searchNotIsSystemByEndpointId();
                  /*  this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoNotIsSystem, this.pagesizeNotIsSystem,0).subscribe(
                        (res: HttpResponse<any>) => {
                            debugger
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointNotIsSystemEndpointDetail = [];
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointNotIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsNotIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
/!*
                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );*!/
                            this.tblFlag = true;

                      /!*      for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }*!/
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    console.log(error);

                },
            );
        }


    }
    deactivation(element) {
        debugger;
        if (this.inputEndpointHeader != undefined) {
            debugger
            debugger
            debugger
            debugger
            this.updateTemp = element;
            this.updateTemp.status = 0;
            this.updateTemp.actionType = +element.actionType;
            this.updateTemp.ouputName = element.ouputName;
            this.updateTemp.inputName = element.inputName;
            this.updateTemp.inputValue = element.inputValue;
            this.updateTemp.outputValue = element.outputValue;
            this.updateTemp.endpointDetailId = +element.endpointDetailId;
            this.updateTemp.detailType = +element.detailType;
            element.isSystemEndpointDetail ? this.updateTemp.isSystemEndpointDetail = 1 : this.updateTemp.isSystemEndpointDetail = 0;
            if (element.checkElementPath != null &&
                element.checkElementPath != undefined) {
                const firstChar = element.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (element.checkElementPath = '/' + element.checkElementPath)
                    : element.checkElementPath;
            }
            this.updateTemp.checkElementPath = element.checkElementPath;

            let levelId: number = null;
            let recordId: number = null;
            //المان اندپوینت
            levelId = 0;
            recordId = element.endpointDetailId;
            this._primengProgressBarService.show();
            debugger
            debugger
            debugger
            debugger
            if ('row' in this.updateTemp) {
                delete this.updateTemp.row;
            }

            this.messagesApiFacadeService.registerEndpointdetail(levelId, recordId, this.updateTemp).subscribe((a) => {
                    this._primengProgressBarService.hide();
                    this._primengProgressBarService.show();
                 /*   this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe((getAllResponse) => {
                            this.endpointList = [];
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    this.searchIsSystemByEndpointId();
                    this.searchNotIsSystemByEndpointId()
                },
                (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
             /*       this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe((getAllResponse) => {
                            this.endpointList = [];
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i].isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                                this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointListIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                                this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                    this.endpointNotIsSystemEndpointDetail[k],
                                    { row: k + 1 },
                                );
                            }
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    this.searchIsSystemByEndpointId();
                    this.searchNotIsSystemByEndpointId()
                    console.log(error);

                },
            );


            console.log(this.inputEndpointHeader);
        }
        else if (this.inputApiEndpointHeader != undefined) {
            this.updateTemp = element;
            this.updateTemp.status = 0;
            this.updateTemp.actionType = +element.actionType;
            this.updateTemp.ouputName = element.ouputName;
            this.updateTemp.inputName = element.inputName;
            this.updateTemp.inputValue = element.inputValue;
            this.updateTemp.outputValue = element.outputValue;
            this.updateTemp.endpointDetailId = +element.endpointDetailId;
            this.updateTemp.detailType = +element.detailType;
            element.isSystemEndpointDetail ? this.updateTemp.isSystemEndpointDetail = 1 : this.updateTemp.isSystemEndpointDetail = 0;
            if (element.checkElementPath != null &&
                element.checkElementPath != undefined) {
                const firstChar = element.checkElementPath.charAt(0);
                firstChar != '/'
                    ? (element.checkElementPath = '/' + element.checkElementPath)
                    : element.checkElementPath;
            }
            this.updateTemp.checkElementPath = element.checkElementPath;

            let levelId: number = null;
            let recordId: number = null;
            //المان سرویس
            levelId = 1;
            recordId = this.apiId;
            this._primengProgressBarService.show();
            debugger
            debugger
            debugger
            debugger
            if ('row' in this.updateTemp) {
                delete this.updateTemp.row;
            }
            this.messagesApiFacadeService.registerEndpointdetail(levelId, recordId, this.updateTemp).subscribe((a) => {
                    this._primengProgressBarService.hide();
                    this._primengProgressBarService.show();
   /*                 this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem,1).subscribe((res) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointListIsSystemEndpointDetail=[]
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointListIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsIsSystem = Number(res.headers.get('totalitems')) || 0;

                            this.tblFlag = true;

                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    this.searchNotIsSystemByApiId();
                    this.searchIsSystemByApiId();
                 /*   this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoNotIsSystem, this.pagesizeNotIsSystem,0).subscribe((res) => {
                            this._primengProgressBarService.hide();
                            debugger;

                            this.endpointNotIsSystemEndpointDetail = [];
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointNotIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsNotIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.tblFlag = true;
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/

                },
                (error) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    this.searchNotIsSystemByApiId();
                    this.searchIsSystemByApiId();
              /*      this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem,1).subscribe((res) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointListIsSystemEndpointDetail=[]
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointListIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsIsSystem = Number(res.headers.get('totalitems')) || 0;

                            this.tblFlag = true;

                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/

                  /*  this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoNotIsSystem, this.pagesizeNotIsSystem,0).subscribe((res) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointNotIsSystemEndpointDetail = [];
                            const body = res.body ?? [];
                            const list = Array.isArray(body) ? body : [body];
                            this.endpointNotIsSystemEndpointDetail = list
                                .map((x) => ({
                                    ...x,
                                    status: x.status === 1,
                                }));
                            this.totalRecordsNotIsSystem = Number(res.headers.get('totalitems')) || 0;
                            this.tblFlag = true;
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        });*/
                    console.log(error);

                },
            );
        }


    }
    ngOnInit(): void {
        debugger
        debugger
        debugger
        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی',
                        icon: '',
                        command: () => {
                            this.activation(this.tempElement);
                        },
                    },
                    {
                        label: 'غیرفعالسازی',
                        icon: '',
                        command: () => {
                            this.deactivation(this.tempElement);
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
        this.scrollTop();
        debugger
        if (this.inputEndpointHeader != undefined) {
            debugger
            debugger
            debugger
            debugger
            debugger
            this.endpointElementFlag = true;
            this.apiEndpointHeaderFlag = false;
            debugger
            this.apiBase = false;
            this.headerHeaderEndpoint = 'المان های اندپوینت';
            this.endpointDetailApiFlag = false;
            this.endpointList = [];
            this._primengProgressBarService.show();
            this.apiGatewayService.currentApprovalStageEndpoint.subscribe(
                (msg) => {
                    debugger
                    this._primengProgressBarService.hide();
                    this.temp = msg;
                    debugger
                    if (!this.temp) {
                        debugger
                        return;
                    }

                    this.sourceUrl = this.temp?.sourceUrl;
                    this.destinationHost = this.temp?.destinationHost;
                    this.destinationUri = this.temp?.destinationUri;
                    this.endpointid = this.temp?.endpointId;
                    this.apiGatewayService.updateApprovalEndpointIdHeader(
                        this.endpointid.toString(),
                    );
                    debugger
                    this.searchNotIsSystemByEndpointId();
                    this.searchIsSystemByEndpointId();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
            this.partyTitle = this.inputEndpointHeader.partyTitle;
            this.moduleTitle = this.inputEndpointHeader.moduleTitle;
            this.endpointTitle = this.inputEndpointHeader.endpointTitle;
            this.clientName = this.inputEndpointHeader.clientName;
            this.moduleBase = this.inputEndpointHeader.moduleBase;
            this.accessBase = this.inputEndpointHeader.accessBase;
            this.clientBase = this.inputEndpointHeader.clientBase;
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            else {
                this.partyBase = true;
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }

         /*    this._primengProgressBarService.show();
         this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe((getAllResponse) => {

                        this._primengProgressBarService.hide();
                        if (Array.isArray(getAllResponse)) {
                            this.endpointList = getAllResponse;
                        } else {
                            this.endpointList.push(getAllResponse);
                        }
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false),
                        );
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { row: k + 1 },
                            );
                        }
                        for (let i = 0; i < this.endpointList.length; i++) {
                            debugger;
                            if (
                                this.endpointList[i].isSystemEndpointDetail == 1
                            ) {
                                debugger;
                                this.endpointListIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            } else {
                                this.endpointNotIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            }
                        }


                        this.endpointList.map((x) => x.isSystemEndpointDetail == 1 ? (x.isSystemEndpointDetail = true) : (x.isSystemEndpointDetail = false),
                        );
                        this.tblFlag = true;
                        for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                            this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                this.endpointListIsSystemEndpointDetail[k],
                                { row: k + 1 },
                            );
                        }
                        for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                            this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                this.endpointNotIsSystemEndpointDetail[k],
                                { row: k + 1 },
                            );
                        }
                    this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                    this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                    this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                    this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;

                },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );*/

        }
        else if (this.inputApiEndpointHeader != undefined) {
            debugger
            debugger
            debugger
            debugger
            debugger
            this.endpointElementFlag = false;
            this.apiEndpointHeaderFlag = true;
            this.apiBase = true;
            this.partyTitle = this.inputApiEndpointHeader.partyTitle;
            this.moduleTitle = this.inputApiEndpointHeader.moduleTitle;
            this.endpointTitle = this.inputApiEndpointHeader.endpointTitle;
            this.clientName = this.inputApiEndpointHeader.clientName;
            this.moduleBase = this.inputApiEndpointHeader.moduleBase;
            this.apiName = this.inputApiEndpointHeader.name;
            this.accessBase = this.inputApiEndpointHeader.accessBase;
            this.clientBase = this.inputApiEndpointHeader.clientBase;
            this.apiId = this.inputApiEndpointHeader.apiId;
            this.apiTitle = this.inputApiEndpointHeader.title;
            this.apiUrl = this.inputApiEndpointHeader.url;
            this.headerHeaderEndpoint = 'المان های سرویس';
            this.endpointDetailApiFlag = true;
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else {
                this.partyBase = true;
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            debugger
            this._primengProgressBarService.show();
       /*     this.messagesApiFacadeService
                .endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem,1)
                .subscribe(
                    (res: HttpResponse<any>) => {
                        debugger
                        this._primengProgressBarService.hide();
                        debugger;
                        this.endpointListIsSystemEndpointDetail=[]
                        const body = res.body ?? [];
                        const list = Array.isArray(body) ? body : [body];
                        this.endpointListIsSystemEndpointDetail = list
                            .map((x) => ({
                                ...x,
                                status: x.status === 1,
                            }));
                        this.totalRecordsIsSystem = Number(res.headers.get('totalitems')) || 0;

                        /!*for (let i = 0; i < this.endpointList.length; i++) {
                            debugger;
                            if (
                                this.endpointList[i].isSystemEndpointDetail == 1
                            ) {
                                debugger;
                                this.endpointListIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            } else {
                                this.endpointNotIsSystemEndpointDetail.push(
                                    this.endpointList[i],
                                );
                            }
                        }
                        this.endpointList.map((x) =>
                            x.isSystemEndpointDetail == 1
                                ? (x.isSystemEndpointDetail = true)
                                : (x.isSystemEndpointDetail = false),
                        );*!/
                        this.tblFlag = true;

                       /!* for (let k = 0; k < this.endpointListIsSystemEndpointDetail.length; k++) {
                            this.endpointListIsSystemEndpointDetail[k] = Object.assign(
                                this.endpointListIsSystemEndpointDetail[k],
                                { row: k + 1 },
                            );
                        }
                        for (let k = 0; k < this.endpointNotIsSystemEndpointDetail.length; k++) {
                            this.endpointNotIsSystemEndpointDetail[k] = Object.assign(
                                this.endpointNotIsSystemEndpointDetail[k],
                                { row: k + 1 },
                            );
                        }*!/
                        this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                        this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );*/
           /* this.messagesApiFacadeService
                .endpointdetailByApi(this.apiId, this.pagenoNotIsSystem, this.pagesizeNotIsSystem,0)
                .subscribe(
                    (res: HttpResponse<any>) => {
                        debugger
                        this._primengProgressBarService.hide();
                        debugger;
                        this.endpointNotIsSystemEndpointDetail=[]
                        const body = res.body ?? [];
                        const list = Array.isArray(body) ? body : [body];
                        this.endpointNotIsSystemEndpointDetail = list
                            .map((x) => ({
                                ...x,
                                status: x.status === 1,
                            }));
                        this.totalRecordsNotIsSystem = Number(res.headers.get('totalitems')) || 0;

                        this.tblFlag = true;
                        this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                        this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );*/
            debugger
            this.searchNotIsSystemByApiId();
            this.searchIsSystemByApiId();
        }
        debugger
        debugger
        debugger
    }
    showAdd() {
        debugger;
        this.updateEndpointHeaderDto = {
            endpointElementFlag: null,
            apiEndpointHeaderFlag: null,
            apiBaseFlag: this.apiBase,
            apiId: null,
        };

        console.log(this.apiEndpointHeaderFlag);
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
            this.updateEndpointHeaderDto.endpointElementFlag = false;
        } else {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
            this.updateEndpointHeaderDto.endpointElementFlag = true;
        }
        this.updateEndpointHeaderDto.apiBaseFlag = this.apiBase;
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
            this.updateEndpointHeaderDto.endpointElementFlag = false;
            this.updateEndpointHeaderDto.partyBase = this.partyBase;
            this.updateEndpointHeaderDto.moduleTitle = this.moduleTitle;
            this.updateEndpointHeaderDto.accessBase = this.accessBase;
            this.updateEndpointHeaderDto.clientBase = this.clientBase;
            this.updateEndpointHeaderDto.clientName = this.clientName;
            this.updateEndpointHeaderDto.moduleBase = this.moduleBase;
            this.updateEndpointHeaderDto.partyTitle = this.partyTitle;
            this.updateEndpointHeaderDto.apiTitle = this.apiTitle;
            this.updateEndpointHeaderDto.destinationHost = this.destinationHost;
        }
        else if (this.endpointElementFlag){
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
            this.updateEndpointHeaderDto.endpointElementFlag = true;
            this.updateEndpointHeaderDto.partyTitle = this.partyTitle;
            this.updateEndpointHeaderDto.moduleTitle = this.moduleTitle;
            this.updateEndpointHeaderDto.partyBase = this.partyBase;
            this.updateEndpointHeaderDto.accessBase = this.accessBase;
            this.updateEndpointHeaderDto.clientBase = this.clientBase;
            this.updateEndpointHeaderDto.clientName = this.clientName;
            this.updateEndpointHeaderDto.moduleBase = this.moduleBase;
            this.updateEndpointHeaderDto.destinationHost = this.destinationHost;

        }
        this.updateEndpointHeaderDto.destinationHost = this.destinationHost;
        this.updateEndpointHeaderDto.apiId = this.apiId;
        debugger
        this.registerFlag = true;
    }
    showUpdate(EndpointHeader) {
        debugger
        debugger
        this.updateEndpointHeaderDto = EndpointHeader;
        this.updateEndpointHeaderDto.apiBaseFlag = this.apiBase;
        this.updateEndpointHeaderDto.isSystemEndpointDetail =EndpointHeader.isSystemEndpointDetail;
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
            this.updateEndpointHeaderDto.endpointElementFlag = false;
        } else {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
            this.updateEndpointHeaderDto.endpointElementFlag = true;
        }
        if (this.apiEndpointHeaderFlag) {
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = true;
            this.updateEndpointHeaderDto.endpointElementFlag = false;
            this.updateEndpointHeaderDto.partyTitle = this.partyTitle;
            this.updateEndpointHeaderDto.moduleTitle = this.moduleTitle;
            this.updateEndpointHeaderDto.apiTitle = this.apiTitle;
            this.updateEndpointHeaderDto.partyBase = this.partyBase;
            this.updateEndpointHeaderDto.accessBase = this.accessBase;
            this.updateEndpointHeaderDto.clientBase = this.clientBase;
            this.updateEndpointHeaderDto.clientName = this.clientName;
            this.updateEndpointHeaderDto.moduleBase = this.moduleBase;
        }
        else if (this.endpointElementFlag){
            this.updateEndpointHeaderDto.apiEndpointHeaderFlag = false;
            this.updateEndpointHeaderDto.endpointElementFlag = true;
            this.updateEndpointHeaderDto.endpointid = this.inputEndpointHeader?.endpointId;
            this.updateEndpointHeaderDto.accessBase = this.inputEndpointHeader?.accessBase;
            this.updateEndpointHeaderDto.partyBase = this.inputEndpointHeader?.partyBase;
            this.updateEndpointHeaderDto.clientBase = this.inputEndpointHeader?.clientBase;
            this.updateEndpointHeaderDto.moduleTitle = this.inputEndpointHeader?.moduleTitle;
            this.updateEndpointHeaderDto.clientName = this.inputEndpointHeader?.clientName;
            this.updateEndpointHeaderDto.moduleId = this.inputEndpointHeader?.moduleId;
            this.updateEndpointHeaderDto.moduleBase = this.inputEndpointHeader?.moduleBase;
            this.updateEndpointHeaderDto.moduleTitle = this.inputEndpointHeader?.moduleTitle;
            this.updateEndpointHeaderDto.partyTitle = this.inputEndpointHeader?.partyTitle;
            this.updateEndpointHeaderDto.moduleBase = this.inputEndpointHeader?.moduleBase;
            this.updateEndpointHeaderDto.moduleId = this.inputEndpointHeader?.moduleId;
            this.updateEndpointHeaderDto.partyBase = this.partyBase;
            this.updateEndpointHeaderDto.destinationHost = this.destinationHost;
        }

        this.updateEndpointHeaderDto.apiId = this.apiId;
        this.updateFlag = true;
    }
    onClose(event) {
        this.scrollTop();

        if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
        } else if (event == 'closeAndCreate') {
            if (this.inputEndpointHeader != undefined) {
                this.apiEndpointHeaderFlag = false;
             /*   this.messagesApiFacadeService.getbyendpointid(this.endpointid).subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            this.endpointListIsSystemEndpointDetail = [];
                            this.endpointNotIsSystemEndpointDetail = [];
                            this.endpointList = [];
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { row: k + 1 },
                                );
                                /!*(this.partyList[k].row = (k+1))*!/
                            }

                            for (let i = 0; i < this.endpointList.length; i++) {
                                debugger;
                                if (
                                    this.endpointList[i]
                                        .isSystemEndpointDetail == 1
                                ) {
                                    debugger;
                                    this.endpointListIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                } else {
                                    this.endpointNotIsSystemEndpointDetail.push(
                                        this.endpointList[i],
                                    );
                                }
                            }
                            this.endpointList.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        },
                    );*/
                this.searchIsSystemByEndpointId();
                this.searchNotIsSystemByEndpointId()
                this.registerFlag = false;
                this.updateFlag = false;
            } else if (this.inputApiEndpointHeader != undefined) {
                this.apiEndpointHeaderFlag = true;
                this.searchNotIsSystemByApiId();
                this.searchIsSystemByApiId();
          /*      this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointdetailByApi(this.apiId,0,1000)
                    .subscribe(
                        (res) => {
                            this._primengProgressBarService.hide();
                            debugger;
                            this.endpointNotIsSystemEndpointDetail = [];
                            if (Array.isArray(res)) {
                                for (let i = 0; i < res.length; i++) {
                                    debugger;
                                    if (res[i].isSystemEndpointDetail != 1) {
                                        debugger;
                                        this.endpointNotIsSystemEndpointDetail.push(
                                            res[i],
                                        );
                                    }
                                }
                            }
                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            for (
                                let k = 0;
                                k <
                                this.endpointNotIsSystemEndpointDetail.length;
                                k++
                            ) {
                                this.endpointNotIsSystemEndpointDetail[k] =
                                    Object.assign(
                                        this.endpointNotIsSystemEndpointDetail[
                                            k
                                            ],
                                        { row: k + 1 },
                                    );
                            }

                            this.endpointNotIsSystemEndpointDetail.map((x) =>
                                x.isSystemEndpointDetail == 1
                                    ? (x.isSystemEndpointDetail = true)
                                    : (x.isSystemEndpointDetail = false),
                            );
                            this.tblFlag = true;
                            this.endpointListIsSystemEndpointDetail = [...this.endpointListIsSystemEndpointDetail];
                            this.endpointNotIsSystemEndpointDetail = [...this.endpointNotIsSystemEndpointDetail];
                            this.systemElementsCount = this.endpointListIsSystemEndpointDetail.length;
                            this.nonSystemElements = this.endpointNotIsSystemEndpointDetail.length;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        },
                    );*/
                this.registerFlag = false;
                this.updateFlag = false;
            }
        }
    }
    BeforeButton() {
        this.close.emit('close');
    }
    setRecord(api): void {
        this.tempElement = api;
    }
    searchNotIsSystemByEndpointId(){
        debugger
        this.firstNotIsSystem =
            this.pagenoNotIsSystem * this.pagesizeNotIsSystem;

        this._primengProgressBarService.show();
        debugger
        debugger
        debugger

        this.messagesApiFacadeService
            .getByEndpointIdNotIssystem(
                Number(this.endpointid),
                this.pagesizeNotIsSystem,
                this.pagenoNotIsSystem
            )
            .subscribe(
                (response: HttpResponse<any>) => {
                    debugger
                    this._primengProgressBarService.hide();

                    let data: any[] = [];

                    if (Array.isArray(response.body)) {

                        data = response.body;

                    } else if (
                        response.body &&
                        response.body.data &&
                        Array.isArray(response.body.data)
                    ) {

                        data = response.body.data;
                    }

                    this.endpointNotIsSystemEndpointDetail =
                        data.map((x, index) => ({
                            ...x,
                            row:
                                (this.pagenoNotIsSystem * this.pagesizeNotIsSystem)
                                + index + 1,
                            status: x.status == 1,
                            isSystemEndpointDetail:
                                x.isSystemEndpointDetail == 1
                        }));

                    this.totalRecordsNotIsSystem =
                        Number(response.headers.get('totalitems')) || 0;

                    this.nonSystemElements =
                        this.totalRecordsNotIsSystem;

                    this.tblFlag = true;
                    this.setAccordionState();
                },
                () => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    searchIsSystemByEndpointId(){
        debugger

        this.firstIsSystem =
            this.pagenoIsSystem * this.pagesizeIsSystem;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getByEndpointIdIssystem(
                Number(this.endpointid),
                this.pagesizeIsSystem,
                this.pagenoIsSystem
            )
            .subscribe(
                (response: HttpResponse<any>) => {
                    debugger
                    this._primengProgressBarService.hide();

                    let data: any[] = [];

                    if (Array.isArray(response.body)) {

                        data = response.body;

                    } else if (
                        response.body &&
                        response.body.data &&
                        Array.isArray(response.body.data)
                    ) {

                        data = response.body.data;
                    }

                    this.endpointListIsSystemEndpointDetail =
                        data.map((x, index) => ({
                            ...x,
                            row:
                                (this.pagenoIsSystem * this.pagesizeIsSystem)
                                + index + 1,
                            status: x.status == 1,
                            isSystemEndpointDetail:
                                x.isSystemEndpointDetail == 1
                        }));

                    this.totalRecordsIsSystem =
                        Number(response.headers.get('totalitems')) || 0;

                    this.systemElementsCount =
                        this.totalRecordsIsSystem;

                    this.tblFlag = true;
                    this.setAccordionState();
                },
                () => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    searchNotIsSystemByApiId(){
        debugger
        this.firstNotIsSystem =
            this.pagenoNotIsSystem * this.pagesizeNotIsSystem;

        this._primengProgressBarService.show();
        debugger
        debugger
        debugger
        this.messagesApiFacadeService.endpointdetailByApi(this.apiId, this.pagenoIsSystem, this.pagesizeIsSystem, 0).subscribe(
                (response: HttpResponse<any>) => {
                    debugger
                    this._primengProgressBarService.hide();

                    let data: any[] = [];

                    if (Array.isArray(response.body)) {

                        data = response.body;

                    } else if (
                        response.body &&
                        response.body.data &&
                        Array.isArray(response.body.data)
                    ) {

                        data = response.body.data;
                    }

                    this.endpointNotIsSystemEndpointDetail =
                        data.map((x, index) => ({
                            ...x,
                            row:
                                (this.pagenoIsSystem * this.pagesizeIsSystem)
                                + index + 1,
                            status: x.status == 1,
                            isSystemEndpointDetail:
                                x.isSystemEndpointDetail == 1
                        }));

                    this.totalRecordsNotIsSystem =
                        Number(response.headers.get('totalitems')) || 0;

                    this.nonSystemElements =
                        this.totalRecordsNotIsSystem;

                    this.tblFlag = true;
                    this.setAccordionState();
                },
                () => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    searchIsSystemByApiId(){
        debugger
        this.firstIsSystem =
            this.pagenoIsSystem * this.pagesizeIsSystem;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.endpointdetailByApi(
            this.apiId,
            this.pagenoIsSystem,
                this.pagesizeIsSystem,

            1
            )
            .subscribe(
                (response: HttpResponse<any>) => {
                    debugger
                    this._primengProgressBarService.hide();

                    let data: any[] = [];

                    if (Array.isArray(response.body)) {

                        data = response.body;

                    } else if (
                        response.body &&
                        response.body.data &&
                        Array.isArray(response.body.data)
                    ) {

                        data = response.body.data;
                    }

                    this.endpointListIsSystemEndpointDetail =
                        data.map((x, index) => ({
                            ...x,
                            row:
                                (this.pagenoIsSystem * this.pagesizeIsSystem)
                                + index + 1,
                            status: x.status == 1,
                            isSystemEndpointDetail:
                                x.isSystemEndpointDetail == 1
                        }));

                    this.totalRecordsIsSystem =
                        Number(response.headers.get('totalitems')) || 0;

                    this.systemElementsCount =
                        this.totalRecordsIsSystem;

                    this.tblFlag = true;
                    this.setAccordionState();
                },
                () => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    OnchangePagenoNotIsSystem(e: any) {
        this.pagenoNotIsSystem = e.first / e.rows;
        this.pagesizeNotIsSystem = e.rows;
        if (e.rows !== this.pagesizeNotIsSystem) {
            this.firstIndexNotIsSystem = 0;
            this.pagenoNotIsSystem = 0;
        } else {
            this.firstIndexNotIsSystem = e.first;
            this.pagenoNotIsSystem = e.first / e.rows;
        }
        this.pagesizeNotIsSystem = e.rows;
        if (this.inputEndpointHeader != undefined){
            this.searchNotIsSystemByEndpointId();
        }
        else if (this.inputApiEndpointHeader != undefined) {
            this.searchNotIsSystemByApiId();
        }
    }

    OnchangePagenoIsSystem(e: any){
        this.pagenoIsSystem = e.first / e.rows;
        this.pagesizeIsSystem = e.rows;
        if (e.rows !== this.pagesizeIsSystem) {
            this.firstIndexIsSystem = 0;
            this.pagenoIsSystem = 0;
        } else {
            this.firstIndexIsSystem = e.first;
            this.pagenoIsSystem = e.first / e.rows;
        }
        this.pagesizeIsSystem = e.rows;
        if (this.inputEndpointHeader != undefined){
            this.searchIsSystemByEndpointId();
        }
        else if (this.inputApiEndpointHeader != undefined) {
            this.searchIsSystemByApiId();
        }

    }
}
