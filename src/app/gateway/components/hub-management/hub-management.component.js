import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { DbEnginePipe } from '../../../shared/pipes/dbEngine.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterHubComponent } from './register-hub/register-hub.component';
import { Toast } from 'primeng/toast';
let HubManagementComponent = class HubManagementComponent {
    apiGatewayService;
    transloco;
    _primengProgressBarService;
    messagesApiFacadeService;
    updateFlag = false;
    addFlag = false;
    loading = false;
    pageno = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    firstIndex = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    totalRecords = 0;
    nextBtnFlag = false;
    hubList = [];
    items = [];
    tempHub;
    detailsBreadObject = [];
    ip;
    dbname;
    title;
    hubDto;
    constructor(apiGatewayService, transloco, _primengProgressBarService, messagesApiFacadeService) {
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this._primengProgressBarService = _primengProgressBarService;
        this.messagesApiFacadeService = messagesApiFacadeService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'hubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    onClose(e) {
        this.detailsBreadObject = this.chooseBread('hubBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.addFlag = false;
        this.search();
    }
    clear() {
        this.title = '';
        this.dbname = '';
        this.ip = '';
        this.pageno = 0;
        this.pagesize = 10;
        this.search();
    }
    onKeydown(event) {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick();
        }
    }
    searchClick() {
        this.pageno = 0;
        this.pagesize = 10;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    search() {
        this.hubList = [];
        let startRow;
        this.loading = true;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchhub(this.pageno, this.pagesize, this.dbname, this.ip, this.title)
            .subscribe((httpResponse) => {
            this._primengProgressBarService.hide();
            this.loading = false;
            let data = [];
            debugger;
            if (Array.isArray(httpResponse.body)) {
                data = httpResponse.body;
            }
            else if (httpResponse.body && httpResponse.body.data && Array.isArray(httpResponse.body.data)) {
                data = httpResponse.body.data;
            }
            else {
                data = [];
            }
            this.hubList = [...this.hubList, ...data];
            this.totalRecords = Number(httpResponse.headers.get('totalitems')) || 0;
            this.hubList.map((x) => x.status === 1 ? (x.status = true) : (x.status = false));
            /* if (this.pageno != 0 && this.pageno != 1) {
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
             }*/
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    /* nextPageStatement() {
         this.pageno += 1;
         this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
         this.search();
     }
     previousPageStatement() {
         this.pageno -= 1;
         this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
         this.search();
     }
    */
    setRecord(hub) {
        this.tempHub = hub;
    }
    /*    OnchangePageno(e) {
            this.pageno = 0;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
            this.search();
        }*/
    showUpdate(hub) {
        this.hubDto = hub;
        this.addFlag = true;
    }
    OnchangePageno(e) {
        debugger;
        this.pageno = e.first / e.rows;
        this.pagesize = e.rows;
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
            this.pageno = 0;
        }
        else {
            this.firstIndex = e.first;
            this.pageno = e.first / e.rows;
        }
        this.pagesize = e.rows;
        this.search();
    }
    ngOnInit() {
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempHub);
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
        let startRow;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this.loading = true;
        this.search();
        this.detailsBreadObject = this.chooseBread('hubBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    showAdd() {
        this.hubDto = undefined;
        this.addFlag = true;
    }
};
HubManagementComponent = __decorate([
    Component({
        selector: 'app-hub-management',
        templateUrl: './hub-management.component.html',
        standalone: true,
        styleUrls: ['./hub-management.component.scss'],
        imports: [
            BreadcrumbsComponent,
            NgIf,
            InputText,
            FormsModule,
            TranslocoPipe,
            ButtonDirective,
            TableModule,
            Tooltip,
            MoreChar19Pipe,
            DbEnginePipe,
            Menu,
            Ripple,
            DropdownModule,
            RegisterHubComponent,
            Toast,
        ],
    })
], HubManagementComponent);
export { HubManagementComponent };
