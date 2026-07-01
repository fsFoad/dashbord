import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../../shared/services/ToastService';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
let MessagesUpdateComponent = class MessagesUpdateComponent {
    route;
    messagesApiFacadeService;
    _fuseLoadingService;
    fb;
    apiGatewayService;
    messageService;
    transloco;
    close = new EventEmitter();
    inputUpdate;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    cust_alphanumEn = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa = ApiGatewayConstants.cust_alphanumFa;
    //
    constructor(route, messagesApiFacadeService, _fuseLoadingService, fb, apiGatewayService, messageService, transloco) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._fuseLoadingService = _fuseLoadingService;
        this.fb = fb;
        this.apiGatewayService = apiGatewayService;
        this.messageService = messageService;
        this.transloco = transloco;
    }
    UpdateForm = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        textEN: [''],
        type: [''],
        tableId: [''],
        messageId: [''],
        isSystemMessage: [],
    });
    updateTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
        messageId: null,
    };
    detailsBreadObject = [];
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'messageBase':
                return [
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
                    {
                        index: 2,
                        label_index2: this.transloco.translate('editMessage.header.messageEdit'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
    ngOnInit() {
        this.scrollTop();
        if (this.inputUpdate.code != null)
            this.UpdateForm.controls['code'].patchValue(this.inputUpdate.code);
        if (this.inputUpdate.title != null)
            this.UpdateForm.controls['title'].patchValue(this.inputUpdate.title);
        if (this.inputUpdate.text != null)
            this.UpdateForm.controls['text'].patchValue(this.inputUpdate.text);
        if (this.inputUpdate.textEN != null)
            this.UpdateForm.controls['textEN'].patchValue(this.inputUpdate.textEN);
        if (this.inputUpdate.tableId != null)
            this.UpdateForm.controls['tableId'].patchValue(this.inputUpdate.tableId.toString());
        if (this.inputUpdate.type != null)
            this.UpdateForm.controls['type'].setValue(this.inputUpdate.type.toString());
        this.inputUpdate.isSystemMessage == 1
            ? this.UpdateForm.controls['isSystemMessage'].setValue(true)
            : this.UpdateForm.controls['isSystemMessage'].setValue(false);
        this.UpdateForm.controls['messageId'].patchValue(this.inputUpdate.messageId.toString());
        this.detailsBreadObject = this.chooseBread('messageBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }
    onUpdate() {
        if (this.validation()) {
            this.updateTemp.messageId =
                this.UpdateForm.controls['messageId'].value;
            this.updateTemp.code = this.UpdateForm.controls['code'].value;
            this.updateTemp.text = this.UpdateForm.controls['text'].value;
            this.updateTemp.tableId =
                +this.UpdateForm.controls['tableId'].value;
            if (this.UpdateForm.controls['tableId'].value == '') {
                this.updateTemp.tableId = null;
            }
            this.updateTemp.textEN = this.UpdateForm.controls['textEN'].value;
            this.updateTemp.title = this.UpdateForm.controls['title'].value;
            this.updateTemp.type = this.UpdateForm.controls['type'].value;
            if (this.UpdateForm.controls['type'].value == '') {
                this.updateTemp.type = null;
            }
            this._fuseLoadingService.show();
            this.messagesApiFacadeService
                .registerMessage(this.updateTemp)
                .subscribe((a) => {
                this._fuseLoadingService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._fuseLoadingService.hide();
            });
        }
    }
    onClose() {
        this.close.emit('close');
    }
    validation() {
        if (!this.UpdateForm.controls['code'].value) {
            this.messageService.showError({
                detail: this.transloco.translate('editMessage.message.enterMessageCode'),
                life: 3000,
            });
            return false;
        }
        else if (!this.UpdateForm.controls['title'].value) {
            this.messageService.showError({
                detail: this.transloco.translate('editMessage.message.enterMessageTitle'),
                life: 3000,
            });
            return false;
        }
        else if (!this.UpdateForm.controls['text'].value) {
            this.messageService.showError({
                detail: this.transloco.translate('editMessage.message.enterFaMessage'),
                life: 3000,
            });
            return false;
        }
        else if (!this.UpdateForm.controls['tableId'].value) {
            this.messageService.showError({
                detail: this.transloco.translate('editMessage.message.enterTableId'),
                life: 3000,
            });
            return false;
        }
        else if (!this.UpdateForm.controls['type'].value) {
            this.messageService.showError(this.transloco.translate('editMessage.message.enterMessageType'));
            return false;
        }
        else {
            return true;
        }
    }
};
__decorate([
    Output()
], MessagesUpdateComponent.prototype, "close", void 0);
__decorate([
    Input()
], MessagesUpdateComponent.prototype, "inputUpdate", void 0);
MessagesUpdateComponent = __decorate([
    Component({
        selector: 'app-messages-update',
        templateUrl: './messages-update.component.html',
        standalone: true,
        styleUrls: ['./messages-update.component.scss'],
        imports: [
            ReactiveFormsModule,
            TranslocoPipe,
            KeyFilter,
            InputText,
            DropdownModule,
            ButtonDirective,
            ToastModule,
            BreadcrumbsComponent,
        ],
        providers: [ToastService],
    })
], MessagesUpdateComponent);
export { MessagesUpdateComponent };
