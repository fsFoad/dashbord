import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MessageTypePipe } from '../../../shared/pipes/messageType.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { MessagesRegisterComponent } from './messages-register/messages-register.component';
import { MessagesUpdateComponent } from './messages-update/messages-update.component';
import { Toast } from 'primeng/toast';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
let MessagesManagementComponent = class MessagesManagementComponent {
    route;
    messagesApiFacadeService;
    apiGatewayService;
    _fuseLoadingService;
    transloco;
    fb;
    registerFlag = false;
    updateFlag = false;
    updateMessageDto;
    tblFlag = false;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    isSystemMessage = false;
    detailsBreadObject = [];
    messagesLIstIsSystemMessage = [];
    messagesLNottIsSystemMessage = [];
    filteredSystemCount = 0;
    filteredNonSystemCount = 0;
    firstIsSystem = 0;
    firstIndexIsSystem = 0;
    rowsIsSystem = 10;
    pagenoIsSystem = 0;
    totalRecordsIsSystem = 0;
    pagesizeIsSystem = 10;
    paginationLabelIsSystem = this.transloco.translate('label.pagination.table');
    firstNottIsSystem = 0;
    firstIndexNottIsSystem = 0;
    rowsNottIsSystem = 10;
    pagenoNottIsSystem = 0;
    totalRecordsNottIsSystem = 0;
    pagesizeNottIsSystem = 10;
    paginationLabelNottIsSystem = this.transloco.translate('label.pagination.table');
    constructor(route, messagesApiFacadeService, apiGatewayService, _fuseLoadingService, transloco, fb) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiGatewayService = apiGatewayService;
        this._fuseLoadingService = _fuseLoadingService;
        this.transloco = transloco;
        this.fb = fb;
    }
    managementForm = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        type: [null],
        tableId: [null],
        messageId: [''],
    });
    messagesList;
    last;
    tooltipDisabled(text) {
        if (text) {
            return text.length < 19;
        }
        else {
            return false;
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
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
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        debugger;
        this.searchIsSystem();
        this.searchNottIsSystem();
        debugger;
    }
    showRegister() {
        this.registerFlag = true;
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.searchIsSystem();
            self.searchNottIsSystem();
        }
    }
    onClose(e) {
        this.registerFlag = false;
    }
    clear() {
        this.managementForm.reset();
        this.isSystemMessage = false;
        this.searchIsSystem();
        this.searchNottIsSystem();
    }
    onCloseAndUpdate(e) {
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
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.registerFlag = false;
        this.updateFlag = false;
        if (e === 'closeAndCreate') {
            this.searchIsSystem();
            this.searchNottIsSystem();
        }
    }
    searchIsSystem() {
        debugger;
        this.firstIsSystem = this.pagenoIsSystem * this.pagesizeIsSystem;
        this._fuseLoadingService.show();
        this.messagesApiFacadeService
            .messagesearchIsSystem(this.managementForm.controls['code'].value, this.managementForm.controls['title'].value, this.managementForm.controls['tableId'].value, this.managementForm.controls['type'].value, this.managementForm.controls['messageId'].value, this.pagesizeIsSystem, this.pagenoIsSystem, 1)
            .subscribe((response) => {
            debugger;
            this._fuseLoadingService.hide();
            this.messagesLIstIsSystemMessage = [];
            debugger;
            let data = [];
            debugger;
            if (Array.isArray(response.body)) {
                data = response.body;
            }
            else if (response.body && response.body.data && Array.isArray(response.body.data)) {
                data = response.body.data;
            }
            else {
                data = [];
            }
            this.messagesLIstIsSystemMessage = this.messagesLIstIsSystemMessage.map(x => ({
                ...x,
                isSystemMessage: x.isSystemMessage == 1
            }));
            this.messagesLIstIsSystemMessage = [...this.messagesLIstIsSystemMessage, ...data];
            this.totalRecordsIsSystem = Number(response.headers.get('totalitems')) || 0;
            this.filteredSystemCount = this.totalRecordsIsSystem;
            this.tblFlag = true;
            console.log('messagesLIstIsSystemMessage', this.messagesLIstIsSystemMessage);
            console.log('messagesLNottIsSystemMessage', this.messagesLNottIsSystemMessage);
        }, (error) => {
            this._fuseLoadingService.hide();
        });
    }
    searchNottIsSystem() {
        debugger;
        this.firstNottIsSystem =
            this.pagenoNottIsSystem * this.pagesizeNottIsSystem;
        this._fuseLoadingService.show();
        this.messagesApiFacadeService
            .messagesearchNottIsSystem(this.managementForm.controls['code'].value, this.managementForm.controls['title'].value, this.managementForm.controls['tableId'].value, this.managementForm.controls['type'].value, this.managementForm.controls['messageId'].value, this.pagesizeNottIsSystem, this.pagenoNottIsSystem, 0)
            .subscribe((response) => {
            debugger;
            this._fuseLoadingService.hide();
            debugger;
            this.messagesLNottIsSystemMessage = [];
            debugger;
            let data = [];
            debugger;
            if (Array.isArray(response.body)) {
                data = response.body;
            }
            else if (response.body && response.body.data && Array.isArray(response.body.data)) {
                data = response.body.data;
            }
            else {
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
            this.filteredNonSystemCount = this.totalRecordsNottIsSystem;
            this.tblFlag = true;
            this.messagesLNottIsSystemMessage = [...this.messagesLNottIsSystemMessage];
            console.log('messagesLNottIsSystemMessage', this.messagesLNottIsSystemMessage);
        }, (error) => {
            this._fuseLoadingService.hide();
        });
    }
    showUpdate(messages) {
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
        debugger;
        this.pagenoIsSystem = e.first / e.rows;
        this.pagesizeIsSystem = e.rows;
        if (e.rows !== this.pagesizeIsSystem) {
            this.firstIndexIsSystem = 0;
            this.pagenoIsSystem = 0;
        }
        else {
            this.firstIndexIsSystem = e.first;
            this.pagenoIsSystem = e.first / e.rows;
        }
        this.pagesizeIsSystem = e.rows;
        this.searchIsSystem();
    }
    OnchangePagenoNottIsSystem(e) {
        debugger;
        this.pagenoNottIsSystem = e.first / e.rows;
        this.pagesizeNottIsSystem = e.rows;
        if (e.rows !== this.pagesizeNottIsSystem) {
            this.firstIndexNottIsSystem = 0;
            this.pagenoNottIsSystem = 0;
        }
        else {
            this.firstIndexNottIsSystem = e.first;
            this.pagenoNottIsSystem = e.first / e.rows;
        }
        this.pagesizeNottIsSystem = e.rows;
        this.searchNottIsSystem();
    }
};
MessagesManagementComponent = __decorate([
    Component({
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
    })
], MessagesManagementComponent);
export { MessagesManagementComponent };
