import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { ToastService } from '../../../../shared/services/ToastService';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
let MessagesRegisterComponent = class MessagesRegisterComponent {
    route;
    messagesApiFacadeService;
    _fuseLoadingService;
    fb;
    apiGatewayService;
    messageService;
    commonValidationsService;
    transloco;
    close = new EventEmitter();
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    cust_alphanumEn = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa = ApiGatewayConstants.cust_alphanumFa;
    constructor(route, messagesApiFacadeService, _fuseLoadingService, fb, apiGatewayService, messageService, commonValidationsService, transloco) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._fuseLoadingService = _fuseLoadingService;
        this.fb = fb;
        this.apiGatewayService = apiGatewayService;
        this.messageService = messageService;
        this.commonValidationsService = commonValidationsService;
        this.transloco = transloco;
    }
    registerForm = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        textEN: [''],
        type: [''],
        tableId: [''],
    });
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    detailsBreadObject = [];
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
                        label_index2: this.transloco.translate('registerMessage.header.registerMessage'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
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
        this.detailsBreadObject = this.chooseBread('messageBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    onRegister() {
        if (this.validation()) {
            this.registerTemp.code = this.registerForm.controls['code'].value;
            this.registerTemp.text = this.registerForm.controls['text'].value;
            this.registerTemp.tableId =
                +this.registerForm.controls['tableId'].value;
            if (this.registerForm.controls['tableId'].value == '') {
                this.registerTemp.tableId = null;
            }
            this.registerTemp.textEN =
                this.registerForm.controls['textEN'].value;
            this.registerTemp.title = this.registerForm.controls['title'].value;
            this.registerTemp.type = +this.registerForm.controls['type'].value;
            if (this.registerForm.controls['type'].value == '') {
                this.registerTemp.type = null;
            }
            this._fuseLoadingService.show();
            this._fuseLoadingService.show();
            this.messagesApiFacadeService
                .registerMessage(this.registerTemp)
                .subscribe((a) => {
                this._fuseLoadingService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._fuseLoadingService.hide();
            });
        }
    }
    onCancel() {
        this.close.emit('close');
    }
    validation() {
        if (!this.registerForm.controls['text'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterFaMessage'));
            return false;
        }
        else if (!this.registerForm.controls['code'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageCode'));
            return false;
        }
        else if (!this.registerForm.controls['title'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageTitle'));
            return false;
        }
        else if (!this.registerForm.controls['tableId'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterTableId'));
            return false;
        }
        else if (!this.registerForm.controls['type'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageType'));
            return false;
        }
        else {
            return true;
        }
    }
};
__decorate([
    Output()
], MessagesRegisterComponent.prototype, "close", void 0);
MessagesRegisterComponent = __decorate([
    Component({
        selector: 'app-messages-register',
        templateUrl: './messages-register.component.html',
        standalone: true,
        styleUrls: ['./messages-register.component.scss'],
        providers: [ToastService],
        imports: [
            TranslocoPipe,
            ReactiveFormsModule,
            KeyFilter,
            InputText,
            DropdownModule,
            ButtonDirective,
            BreadcrumbsComponent,
            Toast,
        ],
    })
], MessagesRegisterComponent);
export { MessagesRegisterComponent };
