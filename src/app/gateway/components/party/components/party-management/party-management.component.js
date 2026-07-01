import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Panel } from 'primeng/panel';
import { ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Ripple } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { PartyRegisterComponent } from '../party-register/party-register.component';
import { PartyUpdateComponent } from '../party-update/party-update.component';
import { ModuleApiManagementComponent } from '../../../services-api/module-api-management/module-api-management.component';
import { InputText } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MorChar32Pipe } from '../../../../../shared/pipes/morChar32.pipe';
import { Paginator } from 'primeng/paginator';
let PartyManagementComponent = class PartyManagementComponent {
    facade;
    transloco;
    notifierService;
    close = new EventEmitter();
    inputModuleUpdate;
    inputUpdate;
    detailsBreadObject;
    partyList$ = this.facade.partyList$;
    totalRecords$ = this.facade.totalRecords$;
    loading$ = this.facade.loading$;
    title = '';
    addFlag = false;
    updateFlag = false;
    moduleApiFlag = false;
    tempParty;
    partyDto;
    pagesize = 10;
    pageno = 0;
    firstIndex = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    /*    items = [
            {
                items: [
                    {
                        label: 'مشاهده ماژول',
                        command: () => this.showModule(this.tempParty)
                    },
                    {
                        label: 'ویرایش',
                        command: () => this.showUpdate(this.tempParty)
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
    
                ]
            }
        ];*/
    items = [
        {
            items: [
                {
                    label: 'مشاهده ماژول',
                    command: () => this.showModule(this.tempParty)
                },
                {
                    label: 'ویرایش',
                    command: () => this.showUpdate(this.tempParty)
                },
                {
                    separator: true
                },
                {
                    label: this.transloco.translate('contextMenu.cancel'),
                }
            ]
        }
    ];
    constructor(facade, transloco, notifierService) {
        this.facade = facade;
        this.transloco = transloco;
        this.notifierService = notifierService;
    }
    ngOnInit() {
        this.pageno = 0;
        this.pagesize = 10;
        this.facade.setBread('serviceRecipientsParty');
        this.facade.loadParties();
    }
    // 🔍 search
    searchClick() {
        if (this.title && this.title.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سازمان را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            this.facade.setSearch(this.title);
            return;
        }
        this.pageno = 0;
        this.firstIndex = 0;
        this.facade.setSearch(this.title);
    }
    clear() {
        this.title = '';
        this.pageno = 0;
        this.firstIndex = 0;
        this.pagesize = 10;
        this.facade.clear();
    }
    // 📄 pagination
    OnchangePageno(e) {
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
        }
        else {
            this.firstIndex = e.first;
        }
        this.pagesize = e.rows;
        this.pageno = e.first / e.rows;
        this.facade.setPage(e);
    }
    // 🎯 UI actions
    setRecord(party) {
        this.tempParty = party;
    }
    showAdd() {
        this.addFlag = true;
    }
    showUpdate(party) {
        this.partyDto = party;
        this.updateFlag = true;
    }
    showModule(party) {
        this.partyDto = { ...party, partyBase: true };
        this.moduleApiFlag = true;
    }
    onClose(e) {
        this.addFlag = false;
        this.updateFlag = false;
        this.moduleApiFlag = false;
        this.facade.loadParties();
    }
    onKeydown(event) {
        if (event.key === 'Enter') {
            this.searchClick();
        }
    }
};
__decorate([
    Output()
], PartyManagementComponent.prototype, "close", void 0);
__decorate([
    Input()
], PartyManagementComponent.prototype, "inputModuleUpdate", void 0);
__decorate([
    Input()
], PartyManagementComponent.prototype, "inputUpdate", void 0);
__decorate([
    Input()
], PartyManagementComponent.prototype, "detailsBreadObject", void 0);
PartyManagementComponent = __decorate([
    Component({
        selector: 'app-party-management',
        templateUrl: './party-management.component.html',
        standalone: true,
        imports: [
            BreadcrumbsComponent,
            NgIf,
            Panel,
            FormsModule,
            ButtonDirective,
            TranslocoPipe,
            TableModule,
            Tooltip,
            MoreChar19Pipe,
            NgStyle,
            StatusPipe,
            Ripple,
            Menu,
            DropdownModule,
            PartyRegisterComponent,
            PartyUpdateComponent,
            ModuleApiManagementComponent,
            InputText,
            Toast,
            NgClass,
            MorChar32Pipe,
            Paginator,
            AsyncPipe,
        ],
        styleUrls: ['./party-management.component.scss'],
    })
], PartyManagementComponent);
export { PartyManagementComponent };
