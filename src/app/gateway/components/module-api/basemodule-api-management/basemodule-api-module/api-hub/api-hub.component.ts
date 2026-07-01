// @ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ConfirmationService} from "primeng/api";


import {take} from "rxjs/operators";

import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {FuseLoadingService} from '@fuse/services/loading';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {PrimeNG} from 'primeng/config';
import {Toast} from "primeng/toast";
import {MoreChar19Pipe} from "../../../../../../shared/pipes/moreChar19.pipe";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {Menu} from "primeng/menu";
import {ApiHubAttachmentComponent} from "./api-hub-attachment/api-hub-attachment.component";
import {DbEnginePipe} from "../../../../../../shared/pipes/dbEngine.pipe";
import {EnStatusPipe} from "../../../../../../shared/pipes/en-status.pipe";
import {Ripple} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
    selector: 'app-api-hub',
    templateUrl: './api-hub.component.html',
    styleUrls: ['./api-hub.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        FormsModule,
        ButtonDirective,
        Tooltip,
        Toast,
        TranslocoPipe,
        MoreChar19Pipe,
        NgStyle,
        NgClass,
        Menu,
        ApiHubAttachmentComponent,
        DbEnginePipe,
        EnStatusPipe,
        Ripple,
        NgIf,
        ConfirmDialogModule

    ],
    providers: [ConfirmationService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class apiHubComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputApiHub;

    isCalled = false;
    addFlag = false;
    updateFlag = false;
    rulConditionFlag = false;
    moduleType;
    hubList = [];
    ruleDto;
    detailsBreadObject = [];
    moduleBase;
    accessBase;
    partyBase;
    moduleTitle;
    partyTitle;
    clientName;
    clientBase;
    type;

    widthName;
    widthTitle;
    hubAttachList = [];
    HubAttachmentFlag = false;
    tooltipAttachHub = 'یک هاب فعال متصل به سرویس وجود دارد!';
    apiDto;
    attachFlag = false;
    hubObj = {
        apiId: null,
        hubId: null,
    };
    first = 0;
    rows = 10;

    first2 = 0;
    rows2 = 10;

    tempHub;
    selectedHubList: any;
    dbname;
    ip;
    apiId;
    hubId;
    name;
    title;
    items;
    nextBtnFlag = false;
    pageno = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
        private confirmationService: ConfirmationService,
        private notifierService: ToastService
    ) {}

    deactive(item: any) {
        this.confirmationService.confirm({
            header: 'غیرفعالسازی هاب سرویس',
            message: 'آیا از غیرفعالسازی هاب سرویس اطمینان دارید؟',
            icon: 'pi pi-question',
            accept: () => {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.changeapidatahubstatus(item.APIHUBID, 0).subscribe(
                    () => {
                        this._primengProgressBarService.hide();
                        this.searchHub(this.apiId);
                    },
                    () => {
                        this._primengProgressBarService.hide();
                        this.searchHub(this.apiId);
                    }
                );
            },
            reject: () => {
            }
        });
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    chooseBread(caseBase: any) {
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
                        label_index3: 'هاب سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/hub.png',
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
                        label_index3: 'هاب سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/hub.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
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
                        label_index2: 'هاب سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/hub.png',
                    },
                    { label_inde34: null, label_Detail_index3: null },
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
                        label_index4: 'هاب سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/hub.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    ngOnInit(): void {
        debugger;
        this.scrollTop();
        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی',
                        command: () => {
                            this.active(this.tempHub);
                        },
                    },
                    {
                        label: 'غیرفعالسازی',
                        command: () => {
                            this.deactive(this.tempHub);
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
        if (this.inputApiHub != undefined) {
            this.apiId = this.inputApiHub.apiId;
            this.name = this.inputApiHub.name;
            this.title = this.inputApiHub.title;
            this.moduleTitle = this.inputApiHub.moduleTitle;
            this.partyTitle = this.inputApiHub.partyTitle;
            this.clientName = this.inputApiHub.clientName;
            this.clientBase = this.inputApiHub.clientBase;
            this.moduleBase = this.inputApiHub.moduleBase;
            this.accessBase = this.inputApiHub.accessBase;
            this.partyBase = this.inputApiHub.partyBase;
            this.type = this.inputApiHub.type;
        }
        if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        debugger;
        this.searchHub(this.apiId);
    }

    clear() {
        this.dbname = '';
        this.ip = '';
        this.search();
    }

    search() {
        this.hubList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getbydbanmeip(this.pageno, this.pagesize, this.dbname, this.ip)
            .subscribe(
                (r) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(r)) {
                        this.hubList = r;
                    } else {
                        this.hubList.push(r);
                    }
                    // this.hubList[0].isTestConnection=1
                    this.hubList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + startRow + 1,
                            });
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + this.pagesize + 1,
                            });
                        }
                    } else {
                        for (let u = 0; u < this.hubList.length; u++) {
                            this.hubList[u] = Object.assign(this.hubList[u], {
                                row: u + 1,
                            });
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    showHubs() {
        this.HubAttachmentFlag = true;
        if (this.inputApiHub != undefined) {
            this.apiDto = this.inputApiHub;
        }
    }

    active(item) {
        console.log(item);
        let counter = 0;
        for (let k = 0; k < this.hubList.length; k++) {
            if (this.hubList[k].APIHUBID_STATUS == true) {
                counter++;
            }
        }
        if (this.hubList.length == 0) {
            this.attachFlag = false;
        } else {
            if (counter != 0) {
                this.attachFlag = true;
            } else {
                this.attachFlag = false;
            }
        }
        if (!this.attachFlag) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .changeapidatahubstatus(item.APIHUBID, 1)
                .subscribe(
                    (w) => {
                        this._primengProgressBarService.hide();
                        this.searchHub(this.apiId);
                    },
                    (error) => {
                        this.searchHub(this.apiId);
                    }
                );
        } else {
            this.notifierService.showError({
                detail: 'یک هاب فعال متصل به سرویس وجود دارد!',
                life: 3000,
            });
        }
    }

   /* confirmDialog(item) {
        this.confirmationService.confirm({
            message: 'آیا از غیرفعالسازی هاب سرویس اطمینان دارید؟',
            accept: () => {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .changeapidatahubstatus(item.APIHUBID, 0)
                    .subscribe(
                        (w) => {
                            this._primengProgressBarService.hide();
                            this.searchHub(this.apiId);
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                            this.searchHub(this.apiId);
                        }
                    );
            },
            reject: () => {},
        });
    }*/

   /* deactive(item) {
        console.log(item);
        this.confirmDialog(item);
    }*/

    onCancel() {
        this.HubAttachmentFlag = false;
    }

    showUpdate(rule: any) {
        /* this.ruleDto = {
           ruleTemplate: null,
           errorText: '',
           status: null,
           httpsstatus: '',
           name: '',
           messageId: null,
           apiId: null,
           ruleId: null
         }
         this.ruleDto = rule;*/
        this.updateFlag = true;
    }

    selectedHub(event) {
        this.hubId = event.data.hubId;
    }

    onRowUnselect(event) {
        this.hubId = null;
    }

    onClose(event) {
        if (this.inputApiHub != undefined) {
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.HubAttachmentFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.HubAttachmentFlag = false;
            debugger;
            this.searchHub(this.apiId);
            /* this._primengProgressBarService.show()
            debugger
            if (this.isCalled) {
                this._primengProgressBarService.hide()
                return
            }

            this.messagesApiFacadeService.getdatahubinfo(this.apiId).subscribe(b => {
                debugger

                this._primengProgressBarService.hide()
                if (!b) {
                    this.hubList = [];
                    this.attachFlag = false;
                    return;
                }
                this.hubList = Array.isArray(b) ? b : [b];
                this.hubList = this.hubList.map((item, index) => ({
                    ...item,
                    status: item.status === 1,
                    row: index + 1,
                }));
                const activeCount = this.hubList.filter(item => item.APIHUBID_STATUS === true).length;
                this.attachFlag = activeCount > 0;
            },error => {
                this._primengProgressBarService.hide()
            })
            this.isCalled=true*/
        }
    }

    searchHub(apiId) {
        debugger;
        this._primengProgressBarService.show();
        debugger;

        this.messagesApiFacadeService
            .getdatahubinfo(apiId)
            .pipe(take(1))
            .subscribe(
                (b) => {
                    debugger;
                    this._primengProgressBarService.hide();
                    if (!b) {
                        this.hubList = [];
                        this.attachFlag = false;
                        return;
                    }
                    this.hubList = Array.isArray(b) ? b : [b];
                    this.hubList = this.hubList.map((item, index) => ({
                        ...item,
                        status: item.status === 1,
                        row: index + 1,
                    }));
                    const activeCount = this.hubList.filter(
                        (item) => item.APIHUBID_STATUS === true
                    ).length;
                    this.attachFlag = activeCount > 0;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    setRecord(hub) {
        this.tempHub = hub;
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
