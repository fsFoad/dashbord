// @ts-nocheck
import {  Component, EventEmitter, Input, OnInit, Output, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { IsApprovalPipe } from '../../../../../../shared/pipes/isApproval.pipe';
import { MediatorsComponent } from '../../../../mediators/mediators.component';
import { MediatorsJsonComponent } from '../../../../mediators/mediators-json/mediators-json.component';
import { ModuleTypePipe } from '../../../../../../shared/pipes/moduleType.pipe';
import { MoreChar19Pipe } from '../../../../../../shared/pipes/moreChar19.pipe';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { NodeChangeListComponent } from '../../../../node-change-list/node-change-list.component';
import { Panel } from 'primeng/panel';
import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { TableModule } from 'primeng/table';
import { ThreeDotDetailsPipe } from '../../../../../../shared/pipes/threeDotDetails.pipe';
import { Toast } from 'primeng/toast';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Tooltip } from 'primeng/tooltip';
import { ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { InputMediatorComponent } from './input-mediator/input-mediator.component';
import { HttpResponse } from '@angular/common/http';
import { TreeTableModule } from 'primeng/treetable';
import { Skeleton } from 'primeng/skeleton';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-input-mediator-list',
    imports: [
        BreadcrumbsComponent,
        ButtonDirective,
        Dialog,
        FormsModule,
        InputText,
        IsApprovalPipe,
        MediatorsComponent,
        MediatorsJsonComponent,
        Menu,
        ModuleTypePipe,
        MoreChar19Pipe,
        NgIf,
        NodeChangeListComponent,
        Panel,
        PrimeTemplate,
        Ripple,
        StatusPipe,
        TableModule,
        ThreeDotDetailsPipe,
        Toast,
        TranslocoPipe,
        Tooltip,
        NgClass,
        NgStyle,
        InputMediatorComponent,
        TreeTableModule,
        NgForOf,
        Skeleton,
    ],
    templateUrl: './input-mediator-list.component.html',
    styleUrl: './input-mediator-list.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class InputMediatorListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() input_inputMediatorsList;
    inputMediatorFlag;
    tempMediator;
    inputMediatorsList = [];
    items;
    detApiTitle;
    detApiName;
    detModuleType;
    widthApiTitle;
    widthApiName;
    widthModuleType;
    first = 0;
    rows = 10;
    apiId: number = 0;
    clientBase;
    moduleBase;
    accessBase;
    clientName;
    apiTitle;
    detailsBreadObject = [];
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
        input_inputMediatorsList: null,
        groupId: null,
        operationFlag: null,
        apiName: null,
    };
    partyTitle;
    partyBase;
    moduleTitle;
    apiName;
    pageno = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    totalRecords: number = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    firstIndex: number = 0;
    tempInputMediator;
    expandedGroups: { [key: string]: boolean } = {};
    treeNodes: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService,
    ) {
    }

    chooseBread(caseBase: any) {
        debugger
        switch (caseBase) {

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
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
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
                        label_index3: 'لیست مدیاتور های ورودی',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
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
                        label_index3: 'لیست مدیاتور های ورودی',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: '(' + this.clientName + ')',
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
                        label_index2: 'لیست مدیاتور های ورودی',
                        rout_index2: null,
                        isActive2: true,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiName + ')',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
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
                        label_index4: 'لیست مدیاتور های ورودی',
                        rout_index4: null,
                        isActive4: true,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
            default:
                return null;
        }
    }

    showUpdate(inputMediators) {
        debugger
        debugger
        debugger
        debugger

        debugger
        debugger
        debugger
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
            input_inputMediatorsList: null,
            groupId: null,
            operationFlag: null,
            apiName: null,
        };
        this.apiDto = inputMediators;
        this.apiDto.input_inputMediatorsList = this.input_inputMediatorsList;
        this.apiDto.moduleBase = this.input_inputMediatorsList.moduleBase;
        this.apiDto.apiName = this.input_inputMediatorsList.name;
        this.apiDto.moduleTitle = this.input_inputMediatorsList.moduleTitle;
        this.apiDto.partyTitle = this.input_inputMediatorsList.partyTitle;
        this.apiDto.clientBase = this.input_inputMediatorsList.clientBase;
        this.apiDto.clientName = this.input_inputMediatorsList.clientName;
        this.apiDto.clientId = this.input_inputMediatorsList.clientId;
        this.apiDto.accessBase = this.input_inputMediatorsList.accessBase;
        this.apiDto.moduleType = this.input_inputMediatorsList.moduleType;
        this.apiDto.operationFlag = "U";
        this.apiDto.groupId = inputMediators.groupId;
        this.apiGatewayService.updateApprovalApiId(this.input_inputMediatorsList.apiId);
        this.apiGatewayService.updateApprovalApiName(this.input_inputMediatorsList.name);
        this.apiGatewayService.updateApprovalApiName(this.input_inputMediatorsList.url);

        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
        this.inputMediatorFlag = true;
debugger
    }
 /*   buildTree(): any[] {
        const groups: { [key: string]: any[] } = {};

        (this.inputMediatorsList || []).forEach((item: any) => {
            const key = item.mediatorTitle || 'سایر';

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(item);
        });

        let groupIndex = 1;

        return Object.keys(groups).map(groupName => {
            const children = groups[groupName];

            let childIndex = 1;

            const node = {
                key: `group-${groupIndex}`,

                data: {
                    row: groupIndex,
                    mediatorTitle: groupName,
                    count: children.length,
                    isGroup: true,
                    inputMediatorDetailId: item.mediatorDetailId,
                },

                children: children.map(child => ({
                    key: `child-${groupIndex}-${childIndex}`,
                    data: {
                        ...child,
                        row: `${groupIndex}.${childIndex++}`,
                        mediatorTitle: child.mediatorTitle,
                        clientName: child.clientName,
                        clientMobileNo: child.clientMobileNo,
                        isGroup: false,
                        inputMediatorDetailId: child.inputMediatorDetailId
                    },
                    leaf: true
                })),

                leaf: false
            };

            groupIndex++; // ✅🔥 این خط مشکل رو کامل حل میکنه

            return node;
        });
    }*/
    buildTree(): any[] {
        const groups: { [key: string]: any[] } = {};

        (this.inputMediatorsList || []).forEach((item: any) => {
            const key = item.mediatorTitle || 'سایر';

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(item);
        });

        let groupIndex = 1;
        const apiId = this.input_inputMediatorsList?.apiId || null; // ✅ گرفتن apiId

        return Object.keys(groups).map(groupName => {
            const children = groups[groupName];
            let childIndex = 1;

            const node = {
                key: `group-${groupIndex}`,

                data: {
                    row: groupIndex,
                    mediatorTitle: groupName,
                    count: children.length,
                    isGroup: true,
                    apiId: apiId, // ✅ اضافه شد
                    groupId: children[0]?.groupId || null,
                    input_inputMediatorsList: this.input_inputMediatorsList
                },

                children: children.map(child => ({
                    key: `child-${groupIndex}-${childIndex}`,

                    data: {
                        ...child,
                        row: `${groupIndex}.${childIndex++}`,
                        mediatorTitle: child.mediatorTitle,
                        clientName: child.clientName,
                        clientMobileNo: child.clientMobileNo,
                        isGroup: false,
                        apiId: apiId, // ✅ اضافه شد
                        groupId: child.groupId
                    },

                    leaf: true
                })),

                leaf: false
            };

            groupIndex++;

            return node;
        });
    }
    ngOnInit(): void {
        debugger
        this.items = [
            {
                label: this.transloco.translate('contextMenu.Edit'),
                command: () => {
                    this.showUpdate(this.tempInputMediator);
                },
            },
            {
                separator: true
            },
            {
                label: this.transloco.translate('contextMenu.cancel'),
            },
        ];
        if (this.input_inputMediatorsList != undefined) {
            debugger
            this.detApiTitle = this.input_inputMediatorsList.title;
            this.detApiName = this.input_inputMediatorsList.name;
            this.detModuleType = this.input_inputMediatorsList.moduleType;
            this.apiId = this.input_inputMediatorsList.apiId;
            this.partyTitle = this.input_inputMediatorsList.partyTitle;
            this.moduleTitle = this.input_inputMediatorsList.moduleTitle;
            this.partyBase = this.input_inputMediatorsList.PartyBase;
            this.apiName = this.input_inputMediatorsList.name;
            this.clientName = this.input_inputMediatorsList.clientName;
            this.apiTitle = this.input_inputMediatorsList.title;

            this.detApiTitle.length > 22
                ? (this.widthApiTitle = 100)
                : (this.widthApiTitle = 50);
            this.detApiName.length > 22
                ? (this.widthApiName = 100)
                : (this.widthApiName = 50);
            this.detModuleType.length > 22
                ? (this.widthModuleType = 100)
                : (this.widthModuleType = 50);

            this.search(0, 10000);
        }
        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
            this.partyBase = true;
        }

    }

    onClose(e) {
        if (this.input_inputMediatorsList != undefined) {
            this.detApiTitle = this.input_inputMediatorsList.title;
            this.detApiName = this.input_inputMediatorsList.name;
            this.detModuleType = this.input_inputMediatorsList.moduleType;
            this.apiId = this.input_inputMediatorsList.apiId;
            this.partyTitle = this.input_inputMediatorsList.partyTitle;
            this.moduleTitle = this.input_inputMediatorsList.moduleTitle;
            this.partyBase = this.input_inputMediatorsList.PartyBase;
            this.apiName = this.input_inputMediatorsList.name;
            this.clientName = this.input_inputMediatorsList.clientName;
            this.apiTitle = this.input_inputMediatorsList.title;
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
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست مدیاتور های خروجی',
                        rout_index2: null,
                        isActive2: true,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiName + ')',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.clientBase) {
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
                        label_index2: 'لیست مدیاتور های خروجی',
                        rout_index2: null,
                        isActive2: true,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiName + ')',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
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
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'لیست مدیاتور های خروجی',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else {
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
                        label_index4: 'لیست مدیاتور های خروجی',
                        rout_index4: null,
                        isActive4: true,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiName + ')',
                    },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            if (e == 'close') {
                this.inputMediatorFlag = false;
            } else if (e == 'closed&called') {
                this.inputMediatorFlag = false;
                this.search(0, 10000);
            }
        }
        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
            this.partyBase = true;
        }

    }

    OnchangePageno(e) {
        debugger
        this.pageno = e.first / e.rows;
        this.pagesize = e.rows;
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
            this.pageno = 0;
        } else {
            this.firstIndex = e.first;
            this.pageno = e.first / e.rows;
        }
        this.pagesize = e.rows;
        this.search(this.pagesize, this.pageno);
    }

    search(pageno, pagesize) {
        debugger
        this.messagesApiFacadeService.getinputmediatorelement(this.input_inputMediatorsList.apiId, pageno, pagesize).subscribe((res: HttpResponse<any[]>) => {
            debugger
            this.totalRecords = 0;
            this.firstIndex = 0;
            this.pagesize = 10;
            this._primengProgressBarService.hide();
            const body = res?.body as any;
            const list = Array.isArray(body) ? body : (body ? [body] : []);
            this.inputMediatorsList = list;
            this.totalRecords = Number(res.headers.get('totalitems')) || 0;
            this.inputMediatorsList.forEach((x, index) => {
                x.status = x.status === 1;
                x.row = index + 1;
            });
            this.treeNodes = this.buildTree();
        });
    }

    createMediator() {
        debugger
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.validateInputMediatorElement(this.apiId).subscribe({
            next: (res) => {
                debugger
                this.inputMediatorFlag = true;
                this._primengProgressBarService.hide();
                console.log(res.status);
                if (res.status == 200) {
                    debugger
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
                        input_inputMediatorsList: null,
                        groupId: null,
                        apiName: null,
                        operationFlag: null,
                    };

                    this.apiDto = this.input_inputMediatorsList;
                    this.apiDto.moduleBase = this.input_inputMediatorsList.moduleBase;
                    this.apiDto.operationFlag = "I";
                    this.apiDto.apiName = this.input_inputMediatorsList.name;
                    this.apiDto.moduleTitle = this.input_inputMediatorsList.moduleTitle;
                    this.apiDto.partyTitle = this.input_inputMediatorsList.partyTitle;
                    this.apiDto.clientBase = this.input_inputMediatorsList.clientBase;
                    this.apiDto.clientName = this.input_inputMediatorsList.clientName;
                    this.apiDto.clientId = this.input_inputMediatorsList.clientId;
                    this.apiDto.accessBase = this.input_inputMediatorsList.accessBase;
                    this.apiDto.moduleType = this.input_inputMediatorsList.moduleType;
                    this.apiGatewayService.updateApprovalApiId(this.input_inputMediatorsList.apiId);
                    this.apiGatewayService.updateApprovalApiName(this.input_inputMediatorsList.name);
                    this.apiGatewayService.updateApprovalApiName(this.input_inputMediatorsList.url);

                    this.partyTitle != undefined || this.partyTitle != null
                        ? (this.apiDto.partyBase = true)
                        : (this.apiDto.partyBase = false);
                }
            },
            error: (err) => {
                debugger
                this._primengProgressBarService.hide();
            },
        });

    }

    setRecord(mediator) {
        debugger
        this.tempInputMediator = mediator;
        debugger
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
