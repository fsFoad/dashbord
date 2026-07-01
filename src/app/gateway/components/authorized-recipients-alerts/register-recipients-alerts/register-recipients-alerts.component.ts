// @ts-nocheck
import {  Component, effect, EventEmitter, Input, OnInit, Output, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { ToastService } from '../../../../shared/services/ToastService';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { InputNumber } from 'primeng/inputnumber';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { toSignal } from '@angular/core/rxjs-interop';
import { HubDto } from '../../../models/hub.Dto';

@Component({
  selector: 'app-register-recipients-alerts',
    imports: [
        BreadcrumbsComponent,
        ButtonDirective,
        DropdownModule,
        InputText,
        KeyFilter,
        ReactiveFormsModule,
        Toast,
        TranslocoPipe,
        InputNumber,
        ToggleSwitch,
    ],
  templateUrl: './register-recipients-alerts.component.html',
  styleUrl: './register-recipients-alerts.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})
export class RegisterRecipientsAlertsComponent implements OnInit{
    @Output() close: EventEmitter<string> = new EventEmitter<string>();
    @Input() inputUpdate;
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _fuseLoadingService: FuseLoadingService,
        private fb: FormBuilder,
        private apiGatewayService: ApiGatewayService,
        private messageService: ToastService,
        private commonValidationsService: CommonValidationsService,
        private transloco: TranslocoService
    ) {
        debugger
        effect(() => {
            const result = this.registerReceiverSignal();
            if (result) {
                console.log('✅ ثبت موفق:', result);
                this.registerForm.reset({
                    name: '',
                    mobileNo: '',
                    fromhh: 0,
                    tohh: 0,
                    description: '',
                    emailAddress: '',
                    networkIdentifyAddress: '',
                    telegramUsername: '',
                    status: 1
                });
                this.registerForm.markAsPristine();
                this.registerForm.markAsUntouched();
                this.registerForm.updateValueAndValidity();
                this.close.emit('close');
            }
        });
    }
    receiver = signal<any>(null);
    registerReceiverSignal = toSignal(
        this.messagesApiFacadeService.registerReceiverEffect(this.receiver),
        { initialValue: null }
    );
    registerForm: FormGroup = this.fb.group({
        mobileNo: [''],
        name: [''],
        fromhh: [''],
        tohh: [''],
        description: [''],
        status: [true],
        receiverid: [''],
        row: [''],
        emailAddress: [''],
        networkIdentifyAddress: [''],
        telegramUsername: [''],
    });
    detailsBreadObject: any[] = [];
    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'registerReceiverBase':
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
                        label_index1: this.transloco.translate('breadcrumbs.recipientsAlerts'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/errorMessage.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.recipientsAlerts.register'),
                        rout_index2: '/',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'editReceiverBase':
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
                        label_index1: this.transloco.translate('breadcrumbs.recipientsAlerts'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/errorMessage.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.recipientsAlerts.Edit'),
                        rout_index2: '/',
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
    ngOnInit(): void {
        if (this.inputUpdate != undefined) {
            this.registerForm.patchValue(this.inputUpdate);
            this.detailsBreadObject = this.chooseBread('editReceiverBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }else {
            this.registerForm.reset({
                name: '',
                mobileNo: '',
                fromhh: 0,
                tohh: 0,
                description: '',
                emailAddress: '',
                networkIdentifyAddress: '',
                telegramUsername: '',
                status: 1
            });
            this.registerForm.markAsPristine();
            this.registerForm.markAsUntouched();
            this.registerForm.updateValueAndValidity();
            this.detailsBreadObject = this.chooseBread('registerReceiverBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.registerForm.controls['status'].patchValue(true)
        }
    }
    onKeydown(event): void {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    onRegister(){
        debugger
        if (this.validation()){
            const formValue = this.registerForm.value;
            const payload: any = {
                name: (formValue.name ?? '').toString(),
                mobileNo: (formValue.mobileNo ?? '').toString(),
                fromhh: formValue.fromhh,
                tohh: formValue.tohh,
                description: (formValue.description ?? '').toString(),
                status: formValue.status ? 1 : 0
            };
            if (this.inputUpdate ) {
                payload.receiverId = this.inputUpdate.receiverId;
            }
            debugger
            this.receiver.set(payload);
        }
    }
    onCancel(){
        debugger
        this.registerForm.reset({
            name: '',
            mobileNo: '',
            fromhh: 0,
            tohh: 0,
            description: '',
            emailAddress: '',
            networkIdentifyAddress: '',
            telegramUsername: '',
            status: 1
        });
        this.registerForm.markAsPristine();
        this.registerForm.markAsUntouched();
        this.registerForm.updateValueAndValidity();
        this.close.emit('close');
    }
    onStatusToggle(event): void {

    }
    validation(): boolean {
        if (!this.registerForm.controls['name'].value) {
            this.messageService.showError(this.transloco.translate('registerRecipientsAlerts.message.name'));
            return false;
        } else if (!this.registerForm.controls['mobileNo'].value) {
            this.messageService.showError(this.transloco.translate('registerRecipientsAlerts.message.mobileNo'));
            return false;
        } else if (this.registerForm.controls['fromhh'].value == null || this.registerForm.controls['fromhh'].value === '') {
            this.messageService.showError(this.transloco.translate('registerRecipientsAlerts.message.fromhh'));
            return false;
        }else if (this.registerForm.controls['tohh'].value == null || this.registerForm.controls['tohh'].value === '') {
            this.messageService.showError(this.transloco.translate('registerRecipientsAlerts.message.tohh'));
            return false;

        }else if (this.registerForm.controls['fromhh'].value == this.registerForm.controls['tohh'].value) {
            this.messageService.showError(this.transloco.translate('registerRecipientsAlerts.message.fromhhTohh'));
            return false;
        } else {
            return true;
        }
    }
}
