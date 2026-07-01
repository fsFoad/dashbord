// @ts-nocheck
import {  Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionPanel,
} from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '@fuse/services/loading';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MessageTypePipe } from '../../../shared/pipes/messageType.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { MessagesDto } from '../../models/messages.Dto';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { MessagesRegisterComponent } from './messages-register/messages-register.component';
import { MessagesUpdateComponent } from './messages-update/messages-update.component';
import { Toast } from 'primeng/toast';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-messages-management',
    templateUrl: './messages-management.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        KeyFilter,
        InputText,
        ButtonDirective,
        DropdownModule,
        Accordion,
        TableModule,
        Tooltip,
        NgIf,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        MessageTypePipe,
        MessagesRegisterComponent,
        MessagesUpdateComponent,
        AccordionPanel,
        AccordionHeader,
        Select,
        TranslocoDirective,
        TranslocoPipe,
        AccordionContent,
        Toast,
        BreadcrumbsComponent,
    ],
    providers: [MessageService],
    styleUrls: ['./messages-management.component.scss'],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MessagesManagementComponent implements OnInit {
    registerFlag = false;
    updateFlag = false;
    updateMessageDto: MessagesDto;
    tblFlag = false;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    isSystemMessage = false;
    detailsBreadObject: any[] = [];
    messagesLIstIsSystemMessage: any[] = [];
    messagesLNottIsSystemMessage: any[] = [];


    filteredSystemCount = 0;
    filteredNonSystemCount = 0;
    firstIsSystem: number = 0;
    firstIndexIsSystem: number = 0;
    rowsIsSystem: number = 10;
    pagenoIsSystem: number = 0;
    totalRecordsIsSystem: number = 0;
    pagesizeIsSystem = 10;
    paginationLabelIsSystem = this.transloco.translate('label.pagination.table');

    firstNottIsSystem: number = 0;
    firstIndexNottIsSystem: number = 0;
    rowsNottIsSystem: number = 10;
    pagenoNottIsSystem: number = 0;
    totalRecordsNottIsSystem: number = 0;
    pagesizeNottIsSystem = 10;
    paginationLabelNottIsSystem = this.transloco.translate('label.pagination.table');


    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _fuseLoadingService: FuseLoadingService,
        private transloco :TranslocoService,
        private fb: FormBuilder
    ) {
    }

    managementForm: FormGroup = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        type: [null],
        tableId: [null],
        messageId: [''],
    });
    messagesList;
    last: any;

    tooltipDisabled(text): boolean {
        if (text) {
            return text.length < 19;
        } else {
            return false;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('menu.basicInfo'),
                img_index0: 'assets/icons/bulletin.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('menu.messages'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/message.png',
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
        debugger;
        this.searchIsSystem();
        this.searchNottIsSystem();
        debugger;
    }

    showRegister(): void {
        this.registerFlag = true;
    }

    onKeydown(event): void {
        const self = this;
        if (event.key === 'Enter') {
            self.searchIsSystem();
            self.searchNottIsSystem();
        }
    }

    onClose(e: any): void {
        this.registerFlag = false;
    }

    clear(): void {
        this.managementForm.reset();
        this.isSystemMessage = false;
        this.searchIsSystem();
        this.searchNottIsSystem();
    }

    onCloseAndUpdate(e: any): void {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('menu.basicInfo'),
                img_index0: 'assets/icons/home.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('menu.messages'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/message.png',
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
        this.registerFlag = false;
        this.updateFlag = false;
        if (e === 'closeAndCreate') {
            this.searchIsSystem();
            this.searchNottIsSystem();
        }
    }

    searchIsSystem(): void {
        debugger
        this.firstIsSystem = this.pagenoIsSystem * this.pagesizeIsSystem;
        this._fuseLoadingService.show();
        this.messagesApiFacadeService
            .messagesearchIsSystem(
                this.managementForm.controls['code'].value,
                this.managementForm.controls['title'].value,
                this.managementForm.controls['tableId'].value,
                this.managementForm.controls['type'].value,
                this.managementForm.controls['messageId'].value,
                this.pagesizeIsSystem,
                this.pagenoIsSystem,
                1
            )
            .subscribe(
                (response: HttpResponse<any>) => {
                    debugger
                    this._fuseLoadingService.hide();
                    this.messagesLIstIsSystemMessage = [];
                    debugger
                    let data: any[] = [];
                    debugger
                    if (Array.isArray(response.body)) {
                        data = response.body;
                    } else if (response.body && response.body.data && Array.isArray(response.body.data)) {
                        data = response.body.data;
                    } else {
                        data = [];
                    }
                    this.messagesLIstIsSystemMessage = this.messagesLIstIsSystemMessage.map(x => ({
                        ...x,
                        isSystemMessage: x.isSystemMessage == 1
                    }));
                    this.messagesLIstIsSystemMessage = [...this.messagesLIstIsSystemMessage, ...data];
                    this.totalRecordsIsSystem = Number(response.headers.get('totalitems')) || 0;
                    this.filteredSystemCount =  this.totalRecordsIsSystem
                    this.tblFlag = true;
                    console.log('messagesLIstIsSystemMessage',this.messagesLIstIsSystemMessage);
                    console.log('messagesLNottIsSystemMessage',this.messagesLNottIsSystemMessage);
                },
                (error) => {
                    this._fuseLoadingService.hide();
                }

            );

    }
    searchNottIsSystem(): void {
        debugger
        this.firstNottIsSystem =
            this.pagenoNottIsSystem * this.pagesizeNottIsSystem;
        this._fuseLoadingService.show();
        this.messagesApiFacadeService
            .messagesearchNottIsSystem(
                this.managementForm.controls['code'].value,
                this.managementForm.controls['title'].value,
                this.managementForm.controls['tableId'].value,
                this.managementForm.controls['type'].value,
                this.managementForm.controls['messageId'].value,
                this.pagesizeNottIsSystem,
                this.pagenoNottIsSystem,
                0
            )
            .subscribe(
                (response: HttpResponse<any>) => {

                    debugger
                    this._fuseLoadingService.hide();
                    debugger;
                    this.messagesLNottIsSystemMessage = [];
                    debugger
                    let data: any[] = [];
                    debugger
                    if (Array.isArray(response.body)) {
                        data = response.body;
                    } else if (response.body && response.body.data && Array.isArray(response.body.data)) {
                        data = response.body.data;
                    } else {
                        data = [];
                    }
                    this.messagesLNottIsSystemMessage = [...this.messagesLNottIsSystemMessage, ...data];
                    this.totalRecordsNottIsSystem = Number(response.headers.get('totalitems')) || 0;
                  /*  for (let i = 0; i < this.messagesList?.length; i++) {
                        debugger
                        if (this.messagesList[i].isSystemMessage == 1) {
                            debugger
                            this.messagesLIstIsSystemMessage.push(
                                this.messagesList[i]
                            );
                        } else {
                            debugger
                            this.messagesLNottIsSystemMessage.push(
                                this.messagesList[i]
                            );
                        }
                    }*/

                    this.messagesLNottIsSystemMessage = this.messagesLNottIsSystemMessage.map(x => ({
                        ...x,
                        isSystemMessage: x.isSystemMessage == 1
                    }));
                    this.filteredNonSystemCount =  this.totalRecordsNottIsSystem;
                    this.tblFlag = true;
                    this.messagesLNottIsSystemMessage = [...this.messagesLNottIsSystemMessage];
                    console.log('messagesLNottIsSystemMessage',this.messagesLNottIsSystemMessage);
                },
                (error) => {
                    this._fuseLoadingService.hide();
                }

            );
    }
    showUpdate(messages): void {
        this.updateMessageDto = {
            code: '',
            title: '',
            text: '',
            textEN: '',
            type: null,
            tableId: null,
            messageId: null,
            isSystemMessage: null,
        };
        this.updateMessageDto = messages;
        this.updateFlag = true;
    }
    OnchangePagenoIsSystem(e) {
        debugger
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
        this.searchIsSystem();
    }
    OnchangePagenoNottIsSystem(e) {
        debugger
        this.pagenoNottIsSystem = e.first / e.rows;
        this.pagesizeNottIsSystem = e.rows;
        if (e.rows !== this.pagesizeNottIsSystem) {
            this.firstIndexNottIsSystem = 0;
            this.pagenoNottIsSystem = 0;
        } else {
            this.firstIndexNottIsSystem = e.first;
            this.pagenoNottIsSystem = e.first / e.rows;
        }
        this.pagesizeNottIsSystem = e.rows;
        this.searchNottIsSystem();    }
}
