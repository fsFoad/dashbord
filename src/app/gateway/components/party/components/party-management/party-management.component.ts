// @ts-nocheck
import {  Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { ModuleDto } from '../../../../models/Module.Dto';
import { PrimeNG } from 'primeng/config';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Panel } from 'primeng/panel';
import { ButtonDirective } from 'primeng/button';
import {  TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Ripple } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { PartyRegisterComponent } from '../party-register/party-register.component';
import { PartyUpdateComponent } from '../party-update/party-update.component';
import { ModuleApiManagementComponent } from '../../../services-api/module-api-management/module-api-management.component';
import { InputText } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MorChar32Pipe } from '../../../../../shared/pipes/morChar32.pipe';
import {  HttpResponse } from '@angular/common/http';
import { Paginator } from 'primeng/paginator';
import { PartyApiService } from '../../services/party-api.service';
import { PartyFacade } from '../../facade/party.facade';

@Component({
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
  schemas: [NO_ERRORS_SCHEMA],
})
export class PartyManagementComponent implements OnInit {
    @Output() close: EventEmitter<string> = new EventEmitter<string>();
    @Input() inputModuleUpdate: ModuleDto;
    @Input() inputUpdate;
    @Input() detailsBreadObject: any[];

    partyList$ = this.facade.partyList$;
    totalRecords$ = this.facade.totalRecords$;
    loading$ = this.facade.loading$;

    title = '';

    addFlag = false;
    updateFlag = false;
    moduleApiFlag = false;

    tempParty: any;
    partyDto: any;
    pagesize = 10;
    pageno  = 0;
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
    items= [

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
    constructor(
        private facade: PartyFacade,
        private transloco: TranslocoService,
        private notifierService: ToastService,
    ) {}

    ngOnInit(): void {
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
            return
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
    OnchangePageno(e: any) {
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
        } else {
            this.firstIndex = e.first;
        }

        this.pagesize = e.rows;
        this.pageno = e.first / e.rows;
        this.facade.setPage(e);
    }
    // 🎯 UI actions
    setRecord(party: any) {
        this.tempParty = party;
    }

    showAdd() {
        this.addFlag = true;
    }

    showUpdate(party: any) {
        this.partyDto = party;
        this.updateFlag = true;
    }

    showModule(party: any) {
        this.partyDto = { ...party, partyBase: true };
        this.moduleApiFlag = true;
    }

    onClose(e: any) {
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
}
