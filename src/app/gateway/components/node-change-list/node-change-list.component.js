import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ChangeTypeIdPipe } from '../../../shared/pipes/changeTypeId.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { Toast } from 'primeng/toast';
let NodeChangeListComponent = class NodeChangeListComponent {
    route;
    transloco;
    messagesApiFacadeService;
    notifierService;
    _primengProgressBarService;
    apiGatewayService;
    close = new EventEmitter();
    inputListMedia;
    inputListMediatorApi;
    nodeTitle;
    nodesList;
    items;
    tempNode;
    detailsBreadObject = [];
    createMediatorFlag = true;
    countLicense = 0;
    nodeName = '';
    mediatorId;
    changeId;
    moduleTitle;
    apiName;
    accessBase;
    clientBase;
    clientName;
    moduleBase;
    partyBase;
    partyTitle;
    apiTitle;
    first = 0;
    rows = 10;
    paginationLabel = this.transloco.translate('label.pagination.table');
    constructor(route, transloco, messagesApiFacadeService, notifierService, _primengProgressBarService, apiGatewayService) {
        this.route = route;
        this.transloco = transloco;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.notifierService = notifierService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiGatewayService = apiGatewayService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
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
                        rout_index3: '',
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'لیست نود های مرتبط',
                        rout_index4: '',
                        isActive4: true,
                        img_index4: 'assets/icons/node.png',
                        label_Detail_index4: '(' + this.nodeName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
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
                        rout_index4: '',
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'لیست نود های مرتبط',
                        rout_index5: '',
                        isActive5: true,
                        img_index5: 'assets/icons/node.png',
                        label_Detail_index5: '(' + this.nodeName + ')',
                    },
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
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست مدیاتور های خروجی',
                        rout_index2: '',
                        isActive2: false,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'لیست نود های مرتبط',
                        rout_index3: '',
                        isActive3: true,
                        img_index3: 'assets/icons/node.png',
                        label_Detail_index3: '(' + this.nodeName + ')',
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
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'لیست مدیاتور های خروجی',
                        rout_index3: '',
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'لیست نود های مرتبط',
                        rout_index4: '',
                        isActive4: true,
                        img_index4: 'assets/icons/node.png',
                        label_Detail_index4: '(' + this.nodeName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'mediatorBase':
                return [
                    {
                        index: 0,
                        label_index0: 'مدیاتور',
                        img_index0: 'assets/icons/mediatorXml.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست مدیاتور های خروجی',
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/mediators.png',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست نود های مرتبط',
                        rout_index2: '',
                        isActive2: true,
                        img_index2: 'assets/icons/node.png',
                        label_Detail_index2: '(' + this.nodeName + ')',
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
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        this.scrollTop();
        if (this.inputListMedia != undefined) {
            this.mediatorId = this.inputListMedia.mediatorId;
            this.nodeName = this.inputListMedia.title;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .findbymediatorid(this.mediatorId)
                .subscribe((b) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(b)) {
                    this.nodesList = b;
                }
                else {
                    this.nodesList.push(b);
                }
                this.nodesList.map((x) => x.status === 1
                    ? (x.status = true)
                    : (x.status = false));
                for (let k = 0; k < this.nodesList.length; k++) {
                    this.nodesList[k] = Object.assign(this.nodesList[k], { row: k + 1 });
                }
            }, (error) => {
                this._primengProgressBarService.hide();
            });
            this.detailsBreadObject = this.chooseBread('mediatorBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.inputListMediatorApi != undefined) {
            this.accessBase = this.inputListMediatorApi.accessBase;
            this.moduleBase = this.inputListMediatorApi.moduleBase;
            this.partyBase = this.inputListMediatorApi.partyBase;
            this.clientBase = this.inputListMediatorApi.clientBase;
            this.moduleTitle = this.inputListMediatorApi.moduleTitle;
            this.clientName = this.inputListMediatorApi.clientName;
            this.partyTitle = this.inputListMediatorApi.partyTitle;
            this.mediatorId = this.inputListMediatorApi.mediatorId;
            this.nodeName = this.inputListMediatorApi.title;
            this.apiTitle = this.inputListMediatorApi.apiTitle;
            this.search();
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی نود',
                        icon: '',
                        command: () => {
                            this.activationNode(this.tempNode);
                        },
                    },
                    {
                        label: 'غیرفعالسازی نود',
                        icon: '',
                        command: () => {
                            this.deactivationNode(this.tempNode);
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
    }
    deactivationNode(tempMediatorchang) {
        this.changeId = tempMediatorchang.changeId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .deactiveMediatorchange(this.changeId)
            .subscribe((b) => {
            this._primengProgressBarService.hide();
            console.log('resB', b);
            this.search();
        }, (error) => {
            this._primengProgressBarService.hide();
            this.search();
        });
        /* setTimeout(a => {
             this.fetchTable(), 2
         })*/
    }
    activationNode(tempMediatorchang) {
        this.countLicense = 0;
        this.nodesList.forEach((item) => {
            if (item.status || item.status == 1) {
                this.countLicense += 1;
            }
        });
        const changeId = tempMediatorchang.changeId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.activeMediatorchange(changeId).subscribe((a) => {
            console.log('resA', a);
            this._primengProgressBarService.hide();
            this.search();
        }, (error) => {
            this._primengProgressBarService.hide();
            this.search();
        });
        /* setTimeout(a => {
             this.fetchTable(), 15
         })*/
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }
    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .findbymediatorid(this.mediatorId)
            .subscribe((b) => {
            this._primengProgressBarService.hide();
            if (Array.isArray(b)) {
                this.nodesList = b;
            }
            else {
                this.nodesList.push(b);
            }
            this.nodesList.map((x) => x.status === 1 ? (x.status = true) : (x.status = false));
            for (let k = 0; k < this.nodesList.length; k++) {
                this.nodesList[k] = Object.assign(this.nodesList[k], {
                    row: k + 1,
                });
            }
            this.createMediatorFlag = this.disabelCheck();
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    disabelCheck() {
        this.countLicense = 0;
        this.nodesList.forEach((item) => {
            if (item.status) {
                this.countLicense += 1;
            }
        });
        if (this.countLicense == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    clear() { }
    BeforeButton() {
        this.close.emit('close');
    }
    setRecord(nodes) {
        this.tempNode = nodes;
    }
};
__decorate([
    Output()
], NodeChangeListComponent.prototype, "close", void 0);
__decorate([
    Input()
], NodeChangeListComponent.prototype, "inputListMedia", void 0);
__decorate([
    Input()
], NodeChangeListComponent.prototype, "inputListMediatorApi", void 0);
NodeChangeListComponent = __decorate([
    Component({
        selector: 'app-node-change-list',
        templateUrl: './node-change-list.component.html',
        styleUrls: ['./node-change-list.component.scss'],
        standalone: true,
        imports: [
            TableModule,
            BreadcrumbsComponent,
            FormsModule,
            ButtonDirective,
            Tooltip,
            MoreChar19Pipe,
            NgStyle,
            StatusPipe,
            Menu,
            Ripple,
            DropdownModule,
            NgClass,
            ChangeTypeIdPipe,
            Toast,
        ],
    })
], NodeChangeListComponent);
export { NodeChangeListComponent };
