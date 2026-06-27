import {Component, OnInit} from '@angular/core';

import {EndpointDto} from "../../../models/endpoint.Dto";

import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../shared/services/ToastService';
import {ApiGatewayService} from '../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {PrimeNG} from 'primeng/config';
import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {Toast} from "primeng/toast";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {Menu} from "primeng/menu";
import {DropdownModule} from "primeng/dropdown";
import {
    ModuleApiUpdateComponent
} from "../../services-api/module-api-management/module-api-update/module-api-update.component";
import {
    BasemoduleApiAddComponent
} from "./basemodule-api-party-management/basemodule-api-add/basemodule-api-add.component";
import {EndpointManagementComponent} from "../../services-api/endpoint-management/endpoint-management.component";
import {BasemoduleApiModuleComponent} from "./basemodule-api-module/basemodule-api-module.component";
import {CacheComponent} from "../../services-api/module-api-management/cache/cache.component";
import {Dialog} from "primeng/dialog";
import {StatusPipe} from "../../../../shared/pipes/status.pipe";
import {Ripple} from "primeng/ripple";
import {ModuleTypePipe} from "../../../../shared/pipes/moduleType.pipe";
import {MoreChar19Pipe} from "../../../../shared/pipes/moreChar19.pipe";
import { HttpResponse } from '@angular/common/http';


@Component({
    selector: 'app-basemodule-api-management',
    templateUrl: './basemodule-api-management.component.html',
    styleUrls: ['./basemodule-api-management.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        Tooltip,
        Toast,
        TranslocoPipe,
        NgStyle,
        NgClass,
        Menu,
        DropdownModule,
        ModuleApiUpdateComponent,
        BasemoduleApiAddComponent,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        CacheComponent,
        Dialog,
        StatusPipe,
        Ripple,
        ModuleTypePipe,
        MoreChar19Pipe,
        NgIf,

    ],
})
export class BasemoduleApiManagementComponent implements OnInit {
    errorMessage
    addFlag = false;
    apiModuleFlag = false;
    cacheFlag = false;
    endpointFlag = false;
    updateFlag = false;
    partyFlag = false;
    moduleTitle = '';
    title = '';
    moduleList = [];
    ModuleDto;
    geeks: boolean;
    endpointDto: EndpointDto;
    clientFlag = false;
    headerFlag = false;
    minLength_partyName = ApiGatewayConstants.minLength_partyName;
    partyList = [];
    partyDto;
    detailsBreadObject = [];
    tempModule;
    items;
    partyTitle;
    first = 0;
    rows = 10;
    first2 = 0;
    rows2 = 10;
    pageno = 0;
    pagenoParty = 0;
    pagesize = 10;
    pagesizeParty = 10;
    totalRecordsParty
    firstParty
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pagesizeOptionsParty = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag = false;
    nextBtnFlagParty = false;

    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private primeng: PrimeNG
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: 'سرویس های ماژول',
                        icon: '',
                        command: () => {
                            this.showApi(this.tempModule);
                        },
                    },
                    {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {
                            this.showEndpoint(this.tempModule);
                        },
                    },
                    {
                        label: 'کش های ماژول',
                        icon: '',
                        command: () => {
                            this.showCache(this.tempModule);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempModule);
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
                label_index1: this.transloco.translate('breadcrumbs.module'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/module.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        this.moduleList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchbytitlemodule(this.pageno, this.pagesize, this.moduleTitle)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.moduleList = b;
                    if (Array.isArray(b)) {
                        this.moduleList = b;
                    } else {
                        this.moduleList.push(b);
                    }
                    this.moduleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    searchClick(flag: boolean) {
        if (flag) {
            if (this.validationSearchByTitle()) {
                this.pageno = 0;
                this.pagesize = 10;
                this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                this.search();
            }
        } else {
            this.search();
        }
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.searchClick(true);
        }
    }
    showAdd() {
        this.pagenoParty = 0;
        this.pagesizeParty = 10;
        this.paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
     /*   this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b: HttpResponse<any>) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );*/
        this.messagesApiFacadeService
            .getpartyinfo(
                this.pagenoParty,
                this.pagesizeParty,
                this.title
            )
            .subscribe(
                (httpResponse: HttpResponse<any>) => {

                    this._primengProgressBarService.hide();

                    let data: any[] = [];

                    if (Array.isArray(httpResponse.body)) {

                        data = httpResponse.body;

                    } else if (
                        httpResponse.body &&
                        httpResponse.body.data &&
                        Array.isArray(httpResponse.body.data)
                    ) {

                        data = httpResponse.body.data;

                    } else {

                        data = [];
                    }

                    this.partyList = data.map((item, index) => ({
                        ...item,

                        status: item.status === 1,

                        row:
                            (this.pagenoParty * this.pagesizeParty) +
                            index +
                            1
                    }));

                    this.totalRecordsParty =
                        Number(httpResponse.headers.get('totalitems')) || 0;
                },
                (error) => {

                    this._primengProgressBarService.hide();
                }
            );
        this.geeks = true;
        this.partyFlag = true;
    }
    setRecord(module) {
        this.tempModule = module;
    }
    showUpdate(module) {
        this.ModuleDto = {
            partyId: null,
            partyTitle: null,
            moduleTitle: '',
            moduleType: '',
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            basemoduleFlag: null,
            moduleid: null,
            moduleId: null,
        };

        this.ModuleDto = module;
        this.ModuleDto.basemoduleFlag = true;
        this.ModuleDto.moduleid = module.moduleId;
        debugger
        this.updateFlag = true;
    }
    showAddParty(party) {
        this.geeks = false;
        this.partyDto = {
            title: '',
            status: null,
            partyid: null,
        };
        this.partyDto = party;
        this.addFlag = true;
        this.partyTitle=party.title

    }
    showEndpoint(module) {
        debugger
        debugger
        debugger
        debugger
        this.ModuleDto = {
            partyId: null,
            partyTitle: null,
            moduleTitle: '',
            moduleType: null,
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleid: null,
            moduleBase: null,
            moduleId: null,
        };
        this.ModuleDto = module;
        this.ModuleDto.moduleid = module.moduleId;
        this.ModuleDto.partyTitle = module.moduleId;
        this.ModuleDto.moduleBase = true;
        this.apiGatewayService.updateApprovalModuleId(module.moduleId);
        this.endpointFlag = true;
    }
    showApi(module) {
        this.ModuleDto = {
            partyId: null,
            moduleTitle: '',
            moduleType: null,
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleid: null,
            moduleId: null,
        };
        this.ModuleDto = module;
        this.ModuleDto.moduleid = module.moduleId;

        this.apiGatewayService.updateApprovalmoduleBase(true);
        this.apiModuleFlag = true;
    }
    showCache(module) {
        debugger
        this.ModuleDto = {
            partyId: null,
            moduleTitle: '',
            moduleType: null,
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleid: null,
            moduleId: null,
            partyTitle: null,
            moduleBase: null,
            partyBase: null,
        };
        this.ModuleDto = module;
        this.ModuleDto.moduleId = module.moduleId;
        this.ModuleDto.moduleTitle = module.moduleTitle;
        debugger
        this.ModuleDto.partyTitle = this.partyTitle;
        this.ModuleDto.moduleBase = true;
        this.ModuleDto.partyBase = false;
        this.apiGatewayService.updateApprovalModuleId(module.moduleId);
        this.cacheFlag = true;
    }
    onCloseCache(event: any) {
        this.scrollTop();
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
                label_index1: this.transloco.translate('breadcrumbs.module'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/module.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.endpointFlag = false;
            this.apiModuleFlag = false;
            this.cacheFlag  = false;
        }
        else if (event == 'closeAndCreate') {
            this.cacheFlag  = false;
            this.moduleList = [];
            this.pagesize = 10;
            this.pageno = 0;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this.moduleTitle = '';
            this.search();
        }
    }
    onClose(event: any) {
        this.scrollTop();
        this.addFlag = false;
        this.updateFlag = false;
        this.partyFlag = false;
        this.apiModuleFlag = false;
        this.endpointFlag = false;
        if (event == 'closeAndCreate' || event == 'doubleClose') {
            this.moduleList = [];
            this.pagesize = 10;
            this.pageno = 0;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this.moduleTitle = '';
            this.search();
            /*
                        this.messagesApiFacadeService.modulegetall().subscribe(getAllResponse => {
                            this.moduleList = getAllResponse;
                            this.moduleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                            for (let k = 0; k < this.moduleList.length; k++) {
                                this.moduleList[k] = Object.assign(this.moduleList[k], {row: (k + 1)})
                                /!*(this.partyList[k].row = (k+1))*!/
                            }
                        });
            */
        }
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
                label_index1: this.transloco.translate('breadcrumbs.module'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/module.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }
    clear() {
        this.moduleTitle = '';
        this.moduleList = [];
        this.pagesize = 10;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
        /*  this.messagesApiFacadeService.modulegetall().subscribe(responseAll => {
              this.moduleList = responseAll;
              this.moduleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
              for (let k = 0; k < this.moduleList.length; k++) {
                  this.moduleList[k] = Object.assign(this.moduleList[k], {row: (k + 1)})
                  /!*(this.partyList[k].row = (k+1))*!/
              }
          })*/
    }
    search() {
        this.moduleList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchbytitlemodule(this.pageno, this.pagesize, this.moduleTitle)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.moduleList = b;
                    if (Array.isArray(b)) {
                        this.moduleList = b;
                    } else {
                        this.moduleList.push(b);
                    }
                    this.moduleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    nextPageStatementParty(): void {
        this.pagenoParty += 1;
        this.paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        this.searchParty();
    }
    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    previousPageStatementParty(): void {
        this.pagenoParty -= 1;
        this.paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        this.searchParty();
    }
    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        //if()
        this.search();
    }
    OnchangePagenoParty(e) {
        this.pagenoParty = e.first / e.rows;
        this.pagesizeParty = e.rows;
        if (e.rows !== this.pagesizeParty) {
            this.firstParty = 0;
            this.pagenoParty = 0;
        } else {
            this.firstParty = e.first;
            this.pagenoParty = e.first / e.rows;
        }
        this.pagesizeParty = e.rows;
        this.paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.searchParty();
    }
    searchParty() {
        this.partyList = [];
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    clearParty() {
        this.title = '';
        this.pagenoParty = 0;
        this.pagesizeParty = 10;
        this.paginationLabelParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    validationSearchByTitle(): boolean {
        if (this.moduleTitle && this.moduleTitle.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان ماژول را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
