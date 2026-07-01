import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {Subject, takeUntil} from 'rxjs';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ApiGatewayConstants} from '../../../../../constants/ApiGatewayConstants';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {InputNumber} from "primeng/inputnumber";
import {PersianCalendarComponent} from "../../../../../../shared/components/persian-calendar/persian-calendar.module";
import {ButtonDirective} from "primeng/button";
import {SelectModule} from "primeng/select";
import {Dialog} from "primeng/dialog";
import {Panel} from "primeng/panel";
import {InputText} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {MoreChar19Pipe} from "../../../../../../shared/pipes/moreChar19.pipe";
import {MessagesCategoryPipe} from "../../../../../../shared/pipes/messagesCategory.pipe";
import {NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {Tooltip} from "primeng/tooltip";
import {
    MessageFilterAction,
    MessageSelectorComponent,
} from '../../../../../../shared/components/message-selector/message-selector.component';

@Component({
    selector: 'app-cash-config',
    imports: [
        ReactiveFormsModule,
        InputNumber,
        TranslocoPipe,
        PersianCalendarComponent,
        ButtonDirective,
        SelectModule,
        Dialog,
        Panel,
        FormsModule,
        InputText,
        TableModule,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        NgIf,
        Ripple,
        Tooltip,
        MessageSelectorComponent,

    ],
    templateUrl: './cash-config.component.html',
    standalone: true,
    styleUrl: './cash-config.component.scss',
})
export class CashConfigComponent implements OnInit, AfterViewInit,OnDestroy  {
    @Input() inputApiCache;
    private destroy$ = new Subject<void>();
    querystringOrPath = '';
    querystringOptions = [];
    icon400_val;
    messageList400 = [];
    statusCodeOptions404 = ApiGatewayConstants.statusCode;
    categoryMessages404 = ApiGatewayConstants.categoryMessages;
    nextBtn400Flag = false;
    message400Flag = false;
    selectionEmpty = false;
    messageSelector500Action$ = new Subject<MessageFilterAction>();

    messageSelector404Action$ = new Subject<MessageFilterAction>();
    apiNumber400;
    textMessage400;
    textENMessage400;
    icon500_val;
    codeMessage400 = '404';
    titleMessage400;
    tableIdMessage400;
    typeMessage400;
    messageId4XX: number = null;
    selectedMessageId4XX = null;
    messageId;
    messageIdDe;
    titleMessageDe;
    tableIdDe;
    codeMessageDe;
    pageno = 0;
    pagesize = 10;
    titleMessage500;
    tableIdMessage500;
    codeMessage500 = '500';
    typeMessage500;
/*    messagesList500 = [];
    messagesList404 = [];*/
    messagesList500Temp = [];
    messagesList400Temp = [];
    statusCodeOptions500 = ApiGatewayConstants.statusCode;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    nextBtn500Flag = false;
    messageId5XX: number = null;
    message500Flag = false;
    apiNumber500;
    textMessage500;
    textENMessage500;
    flagUpdate = null;
    selectedMessageId5XX = null;
    selectedMessageData: any;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    clearTriggerForMessageSelector500 = false;
    clearTriggerForMessageSelector404 = false;
    cacheTypeOptions = [
        { name: '-', code: null },
        { name: 'فراخوانی بصورت مستقیم', code: 0 },
        { name: 'فراخوانی بصورت پیش فرض کش و درغیراینصورت بصورت مستقیم', code: 1 },
        { name: 'فراخوانی از کش', code: 2 },
    ];
    form = new FormGroup({
        year: new FormControl(null, [
            Validators.maxLength(2),
            Validators.min(0),
            Validators.max(10),
        ]),
        month: new FormControl(null, [
            Validators.maxLength(2),
            Validators.pattern(/^(0?[1-9]|1[0-2])$/),
            Validators.min(0),
            Validators.max(11),
        ]),
        day: new FormControl(null, [
            Validators.maxLength(2),
            Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])$/),
            Validators.min(0),
            Validators.max(30),
            Validators.required,
        ]),
        hour: new FormControl(null, [
            Validators.maxLength(2),
            Validators.pattern(/^([01]?[0-9]|2[0-3])$/),
            Validators.min(0),
            Validators.max(23),
        ]),
        minute: new FormControl(null, [
            Validators.maxLength(2),
            Validators.pattern(/^[0-5]?[0-9]$/),
            Validators.min(0),
            Validators.max(59),
        ]),
        cacheType: new FormControl(null, [
            Validators.required,

        ]),

        endpointDetailId: new FormControl(null, [
            Validators.required,
        ]),

        messageId4x: new FormControl(null),
        messageId5x: new FormControl(null),
        flagUpdate: new FormControl(null),
        cacheStartDate: new FormControl(null),

    });

     constructor(
        private apiGatewayService: ApiGatewayService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private cd: ChangeDetectorRef,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
    ) {

    }

    private otpInputs: HTMLInputElement[] = [];

    ngOnInit() {
        debugger
        this.form.reset()
        this.form.enable();
        if (this.inputApiCache != undefined) {
            this.messagesApiFacadeService.getElementsModule(this.inputApiCache.moduleId).subscribe(response => {
                    console.log('response', response);
                    this.querystringOptions = response.filter(item => item.detailType == 3 && item.actionType == 3);
                    this.querystringOptions.unshift({ inputName: '-', endpointDetailId: null });
                });
        }
        this.apiGatewayService.currentApprovalStageApiType.pipe(takeUntil(this.destroy$)).subscribe(val => {
            debugger
            console.log('آپدیت لحظه‌ای:', val);
            if (val == 1) {
                this.querystringOrPath = 'Body';
            } else if (val == 2) {
                this.querystringOrPath = 'QueryString';
            } else {
                this.querystringOrPath = '';
            }
        });
        this.apiGatewayService.selectionEmpty$.subscribe(val => {
            debugger
            this.selectionEmpty = val;
        });
        this.apiGatewayService.fillForUpdateCacheConfig$.subscribe(data => {
            debugger
            if (data) {
                this.form.controls['minute'].patchValue(data.minute);
                this.form.controls['hour'].patchValue(data.hour);
                this.form.controls['day'].patchValue(data.day);
                this.form.controls['month'].patchValue(data.month);
                this.form.controls['year'].patchValue(data.year);
                this.form.controls['cacheType'].patchValue(data.cacheType);
                this.form.controls['endpointDetailId'].patchValue(data.endpointDetailId);
                this.form.controls['cacheStartDate'].patchValue(data.cacheStartDate);
                this.flagUpdate = data.flagUpdate;
                this.selectedMessageId4XX = data.messageId4x;
                this.messageId4XX = data.messageId4x;
                this.form.controls['messageId4x'].patchValue(data.messageId4x);
                data.messageId4x?this.icon400_val = 'pi pi-check':this.icon400_val = null;
                console.log('bingo fill', data);
                this.selectedMessageId5XX = data.messageId5x;
                this.messageId5XX = data.messageId5x;
                this.form.controls['messageId5x'].patchValue(data.messageId5x);
                data.messageId5x?this.icon500_val = 'pi pi-check':this.icon500_val = null;
                console.log('bingo fill', data);
            }
        });
    }

    handleKeyDown(event: KeyboardEvent, index?: number) {
        const { key } = event;
        switch (key) {
            case 'ArrowRight':

                if (index > 0) {
                    this.otpInputs[index - 1].focus();
                }

                break;

            case 'ArrowLeft':
                if (index < this.otpInputs.length - 1) {
                    this.otpInputs[index + 1].focus();
                }
                break;

            case 'Backspace':
                const currentInput = this.otpInputs[index];
                if (!currentInput.value) {
                    if (index > 0) {
                        this.otpInputs[index - 1].focus();
                    }
                } else {
                    currentInput.value = '';
                }
                break;
        }

    }

    ngAfterViewInit() {
        this.setupOtpInputs();
    }
    setupOtpInputs() {
        /*  const container = document.querySelector('.p-inputotp');
          if (!container) return;

          this.otpInputs = Array.from(container.querySelectorAll('.p-inputotp-input')) as HTMLInputElement[];

          this.otpInputs.forEach((input, index) => {
              const newInput = input.cloneNode(true) as HTMLInputElement;
              input.replaceWith(newInput);
              this.otpInputs[index] = newInput;

              // 🔍 Focus Event - select value
              newInput.addEventListener('focus', () => {
                  setTimeout(() => {
                      newInput.select(); // مقدار فعلی را سلکت کن
                  }, 0);
              });

              // ✏️ Input Event - go to next field
              newInput.addEventListener('input', (e) => {
                  const value = newInput.value;

                  if (value && value.length > 0) {
                      newInput.value = value.slice(-1); // فقط آخرین کاراکتر
                      if (index < this.otpInputs.length - 1) {
                          this.otpInputs[index + 1].focus();
                      }
                  }
              });

              // ⌨️ KeyDown Event - navigation with arrows and backspace
              newInput.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
          });*/
        const container = document.querySelector('.p-inputotp');
        if (!container) return;

        this.otpInputs = Array.from(container.querySelectorAll('.p-inputotp-input')) as HTMLInputElement[];

        // متغیر برای ردیابی اینکه آیا هر فیلد قبلاً سلکت شده یا نه
        const hasSelected = new Array(this.otpInputs.length).fill(false);

        this.otpInputs.forEach((input, index) => {
            const newInput = input.cloneNode(true) as HTMLInputElement;
            input.replaceWith(newInput);
            this.otpInputs[index] = newInput;

            // 🔍 Focus Event - فقط یک بار سلکت کن
            newInput.addEventListener('focus', () => {
                if (!hasSelected[index]) {
                    setTimeout(() => {
                        newInput.select(); // فقط در اولین فوکوس سلکت کن
                        hasSelected[index] = true; // علامت بزن که این فیلد سلکت شده
                    }, 0);
                }
            });

            // ✏️ Input Event - فقط آخرین کاراکتر + حرکت به بعدی
            newInput.addEventListener('input', (e) => {
                const value = newInput.value;

                if (value && value.length > 0) {
                    newInput.value = value.slice(-1); // فقط آخرین کاراکتر

                    if (index < this.otpInputs.length - 1) {
                        this.otpInputs[index + 1].focus();
                        // Reset selection flags برای فیلدهای بعدی
                        hasSelected.fill(false);
                        hasSelected[index + 1] = true;
                    }
                }
            });

            // ⌨️ KeyDown Event - Navigation with arrows and backspace
            newInput.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
        });
        /* const containers = document.querySelectorAll('.otp-container');
         let allInputs: HTMLInputElement[] = [];

         containers.forEach(container => {
             const inputs = Array.from(container.querySelectorAll('.p-inputotp-input')) as HTMLInputElement[];
             allInputs.push(...inputs);
         });

         this.otpInputs = allInputs;

         this.otpInputs.forEach((input, index) => {
             const newInput = input.cloneNode(true) as HTMLInputElement;
             input.replaceWith(newInput);
             this.otpInputs[index] = newInput;

             // فقط یک بار مقدار فعلی را سلکت کن
             newInput.addEventListener('focus', () => {
                 if (!this.hasSelected[index]) {
                     setTimeout(() => {
                         newInput.select();
                         this.hasSelected[index] = true;
                     }, 0);
                 }
             });

             // وقتی یک عدد وارد شد، به بعدی برو
             newInput.addEventListener('input', (e) => {
                 const value = newInput.value;
                 if (value && value.length > 0) {
                     newInput.value = value.slice(-1);

                     // اگر آخرین کاراکتر این فیلد بود، به فیلد بعدی برو
                     if (index < this.otpInputs.length - 1) {
                         this.otpInputs[index + 1].focus();
                         this.hasSelected.fill(false);
                         this.hasSelected[index + 1] = true;
                     }
                 }
             });

             newInput.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
         });*/
    }
    onChildSelectionCleared500(flag: boolean) {
        if (!flag) return;
        this.messageId = null;
        this.messageId5XX = null;
        this.form.controls['messageId5x'].patchValue(null);
        this.icon500_val = null;
    }
    handleSelectionCleared(
        type: '404' | '500'
    ) {

        if (type === '404') {

            this.messageId4XX = null;

            this.selectedMessageId4XX = null;

            this.form.controls['messageId4x']
                .patchValue(null);

            this.icon400_val = null;

        } else {

            this.messageId5XX = null;

            this.selectedMessageId5XX = null;

            this.form.controls['messageId5x']
                .patchValue(null);

            this.icon500_val = null;
        }
    }
    handleMessageSelected(
        type: '404' | '500',
        message: any
    ) {

        const id =
            message?.messageid ??
            message?.messageId;

        if (type === '404') {

            this.messageId4XX = id;

            this.form.controls['messageId4x']
                .patchValue(id);

            this.icon400_val = 'pi pi-check';

        } else {

            this.messageId5XX = id;

            this.form.controls['messageId5x']
                .patchValue(id);

            this.icon500_val = 'pi pi-check';
        }

        this.notifierService.showSuccess({
            detail: this.transloco.translate(
                'accessList.message.selectMessage'
            ),
            life: 3000,
        });
    }
   onMessageSelected500(message:any) {
        debugger
        debugger
        debugger
        console.log('✅ LAST SELECTED MESSAGE:', message);
        const id = message?.messageid ?? message?.messageId;
        this.messageId5XX = id;
        this.messageId = id;

        this.form.controls['messageId5x'].patchValue(id);
        this.icon500_val = 'pi pi-check';
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }

  /*  messageSearch400() {
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.messagesearch(
            this.codeMessage400, this.titleMessage400, this.tableIdMessage400,
            this.typeMessage400, null, this.pagesize, this.pageno,
        ).subscribe(response => {
            // FUSEFS

            // this._primengProgressBarService.hide();
            this.messagesList404 = [];
            if (Array.isArray(response)) {
                this.messagesList404 = response;
                this.messagesList400Temp = response;
            } else {
                this.messagesList404.push(response);
                this.messagesList400Temp.push(response);
            }


        }, error => {
            // FUSEFS

            // this._primengProgressBarService.hide();
        });
    }*/

  /*  messageClear400() {
        this.titleMessage400 = '';
        this.textMessage400 = '';
        this.textENMessage400 = '';
        this.tableIdMessage400 = '';
        this.typeMessage400 = '';
        this.messageId = null;
        this.messageIdDe = null;
        this.messageIdDe = '';
        this.codeMessageDe = '';
        this.titleMessageDe = '';
        this.tableIdDe = '';
        this.messageId4XX = null;
        this.icon400_val = '';
     /!*   this.messageSearch400();*!/


    }*/

    openMessage400() {
        debugger
        debugger
        this.messageSelector404Action$.next({
            type: 'search'
        });
        this.message400Flag = true;
    }

     openMessage500() {
        debugger
        debugger
         this.messageSelector500Action$.next({
             type: 'search'
         });
        this.message500Flag = true;
    }

    validatorUpdateCache():boolean{
debugger
        if (this.selectionEmpty) {
            this.notifierService.showError({
                detail: 'لطفا حداقل یک سرویس را انتخاب نمایید!',
                life: 3000,
            });
            return false;
        }else if (
            !(this.form.controls['year'].value||
            this.form.controls['month'].value||
            this.form.controls['day'].value/*&&
            this.form.controls['hour'].value&&
            this.form.controls['minute'].value*/
            )
        ) {
            this.notifierService.showError({
                detail: 'لطفا بازه کش را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.form.controls['cacheStartDate'].value) {
            this.notifierService.showError({
                detail: 'لطفا تاریخ شروع کش را وارد نمائید!',
                life: 3000,
            });
            return false;
        }else if (this.form.controls['cacheType'].value==null||this.form.controls['cacheType'].value==undefined) {
            this.notifierService.showError({
                detail: 'لطفا نوع فراخوانی را وارد نمائید!',
                life: 3000,
            });
            return false;
        }  else {
            return true;
        }
    }
    updateCache() {
        debugger
        const validatorFn = this.apiGatewayService.getValidatorFn();
        if (!validatorFn()) {
            return;
        }
       if (this.validatorUpdateCache()) {
           if (this.flagUpdate != null && this.flagUpdate != undefined) {
               this.form.controls['flagUpdate'].patchValue(this.flagUpdate);
               console.log('اپدیت شد');
           } else {
               this.form.controls['flagUpdate'].patchValue(false);
               console.log('اپدیت نشد');
           }
           this.apiGatewayService.updateCacheConfig(this.form.value);
           this.apiGatewayService.sendCachToCachelist();
           this.form.reset();
           this.apiGatewayService.setDisableTable(false);
           this.apiGatewayService.resetApisCacheTriggerReset();
          /* this.messageClear500();*/
        /*   this.messageClear400();*/
           this.flagUpdate = false;
           this.resetMessageSelectorState();
           this.triggerClearMessageSelector();
       }
    }

    private resetMessageSelectorState() {
        this.messageId5XX = null;
        this.selectedMessageId5XX = null;
        this.form.controls['messageId5x'].patchValue(null);
        this.icon500_val = null;

        this.messageId4XX = null;
        this.selectedMessageId4XX = null;
        this.form.controls['messageId4x'].patchValue(null);
        this.icon400_val = null;
    }
   triggerClearMessageSelector() {
        this.clearTriggerForMessageSelector500 = true;
        setTimeout(() => (this.clearTriggerForMessageSelector500 = false));
    }
    onChildSelectionCleared404(flag: boolean) {
        if (!flag) return;

        this.messageId4XX = null;
        this.selectedMessageId4XX = null;
        this.form.controls['messageId4x'].patchValue(null);
        this.icon400_val = null;
    }
    onMessageSelected404(message: any) {
        const id = message?.messageid ?? message?.messageId;

        this.messageId4XX = id;
        this.selectedMessageId4XX = id;

        this.form.controls['messageId4x'].patchValue(id);
        this.icon400_val = 'pi pi-check';

        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    /*querystringOnChange(event: any) {
        this.form.get('querystring')?.setValue(event.originalEvent.target.innerText);

    }*/
    ngOnDestroy() {
        // this.apiGatewayService.clearData();  // داده‌های مربوط به A, B, C
    }
}
