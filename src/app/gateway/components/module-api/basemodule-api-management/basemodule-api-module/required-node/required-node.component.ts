import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {ButtonDirective} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {MoreChar19Pipe} from '../../../../../../shared/pipes/moreChar19.pipe';
import {Menu} from 'primeng/menu';
import {Ripple} from 'primeng/ripple';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {RequiredNodeRegisterComponent} from './required-node-register/required-node-register.component';
import {detailTypePipe} from '../../../../../../shared/pipes/detail-type.pipe';
import {Toast} from 'primeng/toast';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-required-node',
    templateUrl: './required-node.component.html',
    styleUrls: ['./required-node.component.scss'],
    standalone: true,
    imports: [
        Toast,
        BreadcrumbsComponent,
        TranslocoPipe,
        ButtonDirective,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        detailTypePipe,
        Ripple,
        Menu,
        RequiredNodeRegisterComponent,
        NgIf,

    ],
})
export class RequiredNodeComponent implements OnInit {
    @Input() requiredNodeApi;
    @Output() close = new EventEmitter<string>();
    producedDto;
    nodeName = '';
    apiTitle = '';
    apiId = '';
    partyTitle = '';
    moduleTitle = '';
    clientName = '';
    addFlag = false;
    clientBase = false;
    moduleBase = false;
    accessBase = false;
    updateFlag = false;
    requirednodeList = [];
    first = 0;
    rows = 10;
    tempProduced;
    items: any[] = [];
    detailsBreadObject = [];
    sequenceBase = false;
    partyBase = false;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService
    ) {}
    getapirequirednodebyapiid;

    BeforeButton() {
        this.close.emit('close');
    }
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
                    }
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
        this.apiTitle = this.requiredNodeApi.title;
        this.apiId = this.requiredNodeApi.apiId;
        this.clientBase = this.requiredNodeApi.clientBase;
        this.moduleBase = this.requiredNodeApi.moduleBase;
        this.accessBase = this.requiredNodeApi.accessBase;
        this.clientBase = this.requiredNodeApi.clientBase;
        this.partyTitle = this.requiredNodeApi.partyTitle;
        this.moduleTitle = this.requiredNodeApi.moduleTitle;
        this.clientName = this.requiredNodeApi.clientName;
        this.sequenceBase = this.requiredNodeApi.sequenceBase;
        debugger;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiId).subscribe((l) => {
                    this._primengProgressBarService.hide();
                    this.requirednodeList = [];
                    if (Array.isArray(l)) {
                        this.requirednodeList = l;
                    } else {
                        this.requirednodeList.push(...l);
                    }
                    for (let k = 0; k < this.requirednodeList.length; k++) {
                        if ('row' in this.requirednodeList) {
                        } else {
                            this.requirednodeList[k] = Object.assign(
                                this.requirednodeList[k],
                                {
                                    row: k + 1,
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                });
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
                        label_index2: ' جریان پردازشی',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/flow.png',
                    },
                    {
                        index: 3,
                        label_index3: 'نود های مورد نیاز',
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
                        label_index3: ' جریان پردازشی',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4,
                        label_index4: 'نود های مورد نیاز',
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
                        label_index3: ' جریان پردازشی',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4,
                        label_index4: 'نود های مورد نیاز',
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
                        label_index4: ' جریان پردازشی',
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/flow.png',
                    },
                    {
                        index: 5,
                        label_index5: 'نود های مورد نیاز',
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
    chooseBread(caseBase: string) {
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
                        label_index2: 'نود های مورد نیاز',
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
                        label_index3: 'نود های مورد نیاز',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/node.png',
                    },
                    { label_index5: null },
                    { label_index6: null },
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
                        label_index3: 'نود های مورد نیاز',
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
                        label_index4: 'نود های مورد نیاز',
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
    setRecord(produced): void {
        debugger
        this.tempProduced = produced;
    }

    onClose(e: any): void {
        if (e == 'closeAndCreate') {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getapirequirednodebyapiid(this.apiId)
                .subscribe(
                    (l) => {
                        this._primengProgressBarService.hide();
                        this.requirednodeList = [];
                        if (Array.isArray(l)) {
                            this.requirednodeList = l;
                        } else {
                            this.requirednodeList.push(...l);
                        }
                        for (let k = 0; k < this.requirednodeList.length; k++) {
                            if ('row' in this.requirednodeList) {
                            } else {
                                this.requirednodeList[k] = Object.assign(
                                    this.requirednodeList[k],
                                    {
                                        row: k + 1,
                                        apiTitle: this.apiTitle,
                                        moduleTitle: this.moduleTitle,
                                        partyTitle: this.partyTitle,
                                    }
                                );
                            }
                        }

                        this.addFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else {
            this.addFlag = false;
        }
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
}
