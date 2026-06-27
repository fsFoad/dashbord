import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { MessagesDto } from '../../../models/messages.Dto';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ToastService } from '../../../../shared/services/ToastService';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { Toast } from 'primeng/toast';

@Component({
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
export class MessagesRegisterComponent implements OnInit {
    @Output() close: EventEmitter<string> = new EventEmitter<string>();
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _fuseLoadingService: FuseLoadingService,
        private fb: FormBuilder,
        private apiGatewayService: ApiGatewayService,
        private messageService: ToastService,
        private commonValidationsService: CommonValidationsService,
        private transloco: TranslocoService
    ) {}

    registerForm: FormGroup = this.fb.group({
        code: [''],
        title: [''],
        text: [''],
        textEN: [''],
        type: [''],
        tableId: [''],
    });

    registerTemp: MessagesDto = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    detailsBreadObject = [];
    chooseBread(caseBase: string) {
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
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('messageBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    onKeydown(event): void {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onRegister(): void {
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
                .subscribe(
                    (a) => {
                        this._fuseLoadingService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        this._fuseLoadingService.hide();
                    }
                );
        }
    }

    onCancel(): void {
        this.close.emit('close');
    }

    validation(): boolean {
        if (!this.registerForm.controls['text'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterFaMessage'));
            return false;
        } else if (!this.registerForm.controls['code'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageCode'));
            return false;
        } else if (!this.registerForm.controls['title'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageTitle'));
            return false;
        } else if (!this.registerForm.controls['tableId'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterTableId'));
            return false;
        } else if (!this.registerForm.controls['type'].value) {
            this.messageService.showError(this.transloco.translate('registerMessage.message.enterMessageType'));
            return false;
        } else {
            return true;
        }
    }
}
