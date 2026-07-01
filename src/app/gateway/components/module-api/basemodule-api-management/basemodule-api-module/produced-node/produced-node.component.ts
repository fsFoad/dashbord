// @ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {FuseLoadingService} from '@fuse/services/loading';
import {Toast} from "primeng/toast";
import {BreadcrumbsComponent} from "../../../../../../shared/components/breadcrumbs/breadcrumbs.component";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {MoreChar19Pipe} from "../../../../../../shared/pipes/moreChar19.pipe";
import {detailTypePipe} from "../../../../../../shared/pipes/detail-type.pipe";
import {Menu} from "primeng/menu";
import {ProducednodeRegisterComponent} from "./producednode-register/producednode-register.component";
import {Ripple} from "primeng/ripple";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-produced-node',
    templateUrl: './produced-node.component.html',
    styleUrls: ['./produced-node.component.scss'],
    standalone: true,
    imports: [
        Toast,
        BreadcrumbsComponent,
        ButtonDirective,
        TranslocoPipe,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        detailTypePipe,
        Menu,
        ProducednodeRegisterComponent,
        Ripple,
        NgIf,

    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProducedNodeComponent implements OnInit {
    @Input() producedNodeApi;
    @Output() close = new EventEmitter<string>();

    constructor(
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
    }

    producedDto;
    nodeName = '';
    apiTitle = '';
    apiId = '';
    partyTitle = '';
    moduleTitle = '';
    clientName = '';
    addFlag = false;
    clientBase = false;
    sequenceBase = false;
    moduleBase = false;
    accessBase = false;
    partyBase = false;
    updateFlag = false;
    producedList = [];
    first = 0;
    rows = 10;
    tempProduced;
    items: any[] = [];
    detailsBreadObject = [];
    paginationLabel = this.transloco.translate('label.pagination.table');


    ngOnInit(): void {
        debugger;
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        icon: '',
                        command: () => {
                            debugger
                            this.showUpdate(this.tempProduced);
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
        this.apiTitle = this.producedNodeApi.title;
        this.apiId = this.producedNodeApi.apiId;
        this.clientBase = this.producedNodeApi.clientBase;
        this.moduleBase = this.producedNodeApi.moduleBase;
        this.accessBase = this.producedNodeApi.accessBase;
        this.clientBase = this.producedNodeApi.clientBase;
        this.partyTitle = this.producedNodeApi.partyTitle;
        this.moduleTitle = this.producedNodeApi.moduleTitle;
        this.clientName = this.producedNodeApi.clientName;
        this.sequenceBase = this.producedNodeApi.sequenceBase;
        debugger;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiId).subscribe((l) => {
                    this._primengProgressBarService.hide();
                    this.producedList = [];
                    if (Array.isArray(l)) {
                        this.producedList = l;
                    } else {
                        this.producedList.push(...l);
                    }
                    for (let k = 0; k < this.producedList.length; k++) {
                        if ('row' in this.producedList) {
                        } else {
                            this.producedList[k] = Object.assign(
                                this.producedList[k],
                                {
                                    row: k + 1,
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                },
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
        if (!this.sequenceBase) {
            if (this.clientBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.accessBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                debugger;
                this.partyBase=true
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }
        else {
            if (this.clientBase) {
                debugger;
                this.detailsBreadObject =
                    this.chooseBreadWithSequence('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                debugger;
                this.detailsBreadObject =
                    this.chooseBreadWithSequence('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.accessBase) {
                debugger;
                this.detailsBreadObject =
                    this.chooseBreadWithSequence('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                debugger;
                this.partyBase=true
                this.detailsBreadObject =
                    this.chooseBreadWithSequence('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }
    }

    chooseBread(caseBase: string) {
        debugger
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
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: 'نود های تولید شده',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/node.png',
                    },
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
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'نود های تولید شده',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/node.png',
                    },

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
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'نود های تولید شده',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/node.png',
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
                        label_index4: 'نود های تولید شده',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/node.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    chooseBreadWithSequence(caseBase: string) {
        debugger
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
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: 'مدیریت جریان پردازشی',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/flow.png',
                    },
                    {
                        index: 3,
                        label_index3: 'نود های تولید شده',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/node.png',
                    },
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
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیریت جریان پردازشی',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4,
                        label_index4: 'نود های تولید شده',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/node.png',
                    },
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
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیریت جریان پردازشی',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4,
                        label_index4: 'نود های تولید شده',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/node.png',
                    },

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
                        label_index4: 'مدیریت جریان پردازشی',
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/flow.png',
                    },
                    {
                        index: 5,
                        label_index5: 'نود های تولید شده',
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/node.png',
                    },

                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }

    showAdd() {
        debugger
        this.producedDto = {
            apiId: null,
        };
        this.producedDto.apiId = this.apiId;
        this.producedDto.sequenceBase = this.sequenceBase;
        this.producedDto.apiId = this.apiId;
        this.producedDto.clientBase = this.clientBase;
        this.producedDto.moduleBase = this.moduleBase;
        this.producedDto.accessBase = this.accessBase;
        this.producedDto.partyBase = this.partyBase;
        this.producedDto.partyTitle = this.partyTitle;
        this.producedDto.apiTitle = this.apiTitle;
        this.producedDto.moduleTitle = this.moduleTitle;
        this.producedDto.clientName = this.clientName;
        this.producedDto.sequenceBase = this.sequenceBase;
        this.addFlag = true;
    }

    showUpdate(produced) {
        debugger
        this.producedDto = {
            apiId: null,
            producedId: null,
            nodeName: '',
        };

        this.producedDto = produced;
        this.producedDto.apiId = this.apiId;
        this.producedDto.clientBase = this.clientBase;
        this.producedDto.moduleBase = this.moduleBase;
        this.producedDto.accessBase = this.accessBase;
        this.producedDto.partyBase = this.partyBase;
        this.producedDto.partyTitle = this.partyTitle;
        this.producedDto.moduleTitle = this.moduleTitle;
        this.producedDto.clientName = this.clientName;
        this.producedDto.sequenceBase = this.sequenceBase;
        this.addFlag = true;
    }
    setRecord(produced): void {
        this.tempProduced = produced;
    }

    onClose(e: any): void {
        debugger
        if (e == 'closeAndCreate') {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiId).subscribe((l) => {
                    this._primengProgressBarService.hide();
                    this.producedList = [];
                    if (Array.isArray(l)) {
                        this.producedList = l;
                    } else {
                        this.producedList.push(...l);
                    }
                    for (let k = 0; k < this.producedList.length; k++) {
                        if ('row' in this.producedList) {
                        } else {
                            this.producedList[k] = Object.assign(
                                this.producedList[k],
                                {
                                    row: k + 1,
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                },
                            );
                        }
                    }
                    this.addFlag = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );

        } else {
            this.addFlag = false;
        }
        if (!this.sequenceBase) {
            if (this.clientBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject,);
            } else if (this.moduleBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                debugger;
                this.partyBase=true
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        else {
            if (this.clientBase) {
                debugger;
                this.detailsBreadObject = this.chooseBreadWithSequence('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject,);
            } else if (this.moduleBase) {
                debugger;
                this.detailsBreadObject = this.chooseBreadWithSequence('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject,);
            } else if (this.accessBase) {
                debugger;
                this.detailsBreadObject = this.chooseBreadWithSequence('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                debugger;
                this.partyBase=true
                this.detailsBreadObject = this.chooseBreadWithSequence('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject,);
            }
        }
    }
}
