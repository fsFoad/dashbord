import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ApiGatewayConstants} from '../../../constants/ApiGatewayConstants';

import {ActivatedRoute} from '@angular/router';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../shared/services/ToastService';
import {ApiGatewayService} from '../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {ButtonDirective} from 'primeng/button';
import {TableIdPipe} from '../../../../shared/pipes/tableId.pipe';
import {Dialog} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {MoreChar19Pipe} from '../../../../shared/pipes/moreChar19.pipe';
import {MessagesCategoryPipe} from '../../../../shared/pipes/messagesCategory.pipe';
import { NgForOf, NgIf } from '@angular/common';
import {BreadcrumbsComponent} from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Toast} from 'primeng/toast';
import {Textarea} from 'primeng/textarea';
import {KeyFilter} from 'primeng/keyfilter';
import { MessageSelectorComponent } from '../../../../shared/components/message-selector/message-selector.component';
import { Subject, Observable } from 'rxjs';
import { Tooltip } from 'primeng/tooltip';
@Component({
    selector: 'app-api-rule-register',
    templateUrl: './api-rule-register.component.html',
    standalone: true,
    styleUrls: ['./api-rule-register.component.scss'],
    imports: [
        Panel,
        FormsModule,
        InputText,
        SelectModule,
        Tooltip,
        TranslocoPipe,
        ButtonDirective,
        TableIdPipe,
        Dialog,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        NgIf,
        BreadcrumbsComponent,
        Toast,
        Textarea,
        KeyFilter,
        MessageSelectorComponent,
        NgForOf,
    ],
})
export class ApiRuleRegisterComponent implements OnInit {
    @Input() inputRegister;
    @Output() close = new EventEmitter<string>();
    jsonValidationResult: JsonValidationResult | null = null;
    errorText = '';
    jsonValidationError = '';
    msgSelectorAction$ = new Subject<any>();
    dialogMessageFlag = false;
    disableFlag = true;
    name;
    ruleTemplate=null;
    status;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    generalErrorCodesOptions = ApiGatewayConstants.generalErrorCodes;
    ruleTemplateOptions = ApiGatewayConstants.ruleTemplate;
    httpsstatusOptions = ApiGatewayConstants.httpsstatus;
    generalErrorCodes=null;
    httpsstatus;
    removeMessage = false;
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    rigesterRulObject = {
        ruleTemplate: null,
        errorText: '',
        httpsstatus: '',
        name: '',
        messageId: null,
    };

    codeMessage;
    titleMessage;
    tableIdMessage;
    typeMessage;
    textMessage;
    textENMessage;
    messageId;
    title;
    tableId;
    text;
    messageDetailFlag = false;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    messagesList = [];
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    first = 0;
    rows = 10;
    detailsBreadObject = [];
    paginationLabel=this.transloco.translate('label.pagination.table');
    clientName
    moduleTitle
    partyTitle
    ruleBase:boolean=false
    clientBase:boolean=false
    moduleBase:boolean=false
    accessBase:boolean=false
    partyBase:boolean=false
    selectedRow: any[] = [];
    constructor(
        private route: ActivatedRoute,
        private transloco:TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private cdr: ChangeDetectorRef,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService
    ) {}
    private tryParse(value: string): { ok: boolean; error?: any; parsed?: any } {
        try {
            return { ok: true, parsed: JSON.parse(value) };
        } catch (e) {
            return { ok: false, error: e };
        }
    }
    private analyzeJsonSyntax(value: string): string[] {
        const errors: string[] = [];

        // 1. key بدون کوتیشن
        const keyWithoutQuotes = /[{,]\s*([a-zA-Z_$][\w$]*)\s*:/g;
        if (keyWithoutQuotes.test(value)) {
            errors.push('نام کلید باید داخل دابل کوتیشن (") قرار گیرد.');
        }

        // 2. کامای جا افتاده (very important fix)
        const missingComma = /"\s*\d+\s+[a-zA-Z_$]/;
        if (missingComma.test(value)) {
            errors.push('احتمالاً بین دو فیلد کاما (,) فراموش شده است.');
        }

        // 3. سینگل کوتیشن
        if (value.includes("'")) {
            errors.push('در JSON باید از دابل کوتیشن (") استفاده شود.');
        }

        // 4. کامای قبل از کلید بعدی
        if (/:\s*[^,{}[\]]+\s+[a-zA-Z_$]/.test(value)) {
            errors.push('احتمالاً بین مقادیر کاما (,) جا افتاده است.');
        }

        return errors;
    }
    private getLineAndColumn(
        text: string,
        position: number
    ): { line: number; column: number } {

        const lines = text
            .substring(0, position)
            .split('\n');

        return {
            line: lines.length,
            column: lines[lines.length - 1].length + 1
        };
    }

    private checkBrackets(text: string): string[] {
        let open = 0;
        let errors: string[] = [];

        for (let c of text) {
            if (c === '{') open++;
            if (c === '}') open--;
        }

        if (open > 0) {
            errors.push('اکولاد { بسته نشده است.');
        }

        if (open < 0) {
            errors.push('اکولاد } اضافه وجود دارد.');
        }

        return errors;
    }
    validateJson(value: string): void {
        console.log('validator fired', value);
        console.log('result', this.jsonValidationResult);
        this.jsonValidationResult = this.validateJsonInternal(value);
        this.cdr.markForCheck();
    }
    private validateJsonInternal(value: string): JsonValidationResult {
        const result: JsonValidationResult = {
            valid: false,
            errors: [],
            warnings: []
        };

        if (!value?.trim()) {
            result.errors.push('ورودی خالی است');
            return result;
        }

        const parsed = this.tryParse(value);

        // 🔴 اگر JSON خراب است
        if (!parsed.ok) {
            const positionMatch = parsed.error?.message?.match(/position\s+(\d+)/i);
            const position = positionMatch ? Number(positionMatch[1]) : 0;

            const lc = this.getLineAndColumn(value, position);

            result.line = lc.line;
            result.column = lc.column;

            result.errors.push(
                'JSON syntax invalid'
            );

            // structural analysis حتی برای invalid JSON
            result.errors.push(...this.analyzeJsonSyntax(value));
            result.errors.push(...this.checkBrackets(value));

            return result;
        }
        if (typeof parsed.parsed !== 'object' || parsed.parsed === null || Array.isArray(parsed.parsed)) {
            result.valid = false;
            result.errors.push('فقط JSON از نوع object قابل قبول است');
            return result;
        }
        // 🟢 JSON valid هست
        result.valid = true;
        result.parsed = parsed.parsed;

        // 🔍 structural checks (quality layer)
        result.warnings.push(...this.analyzeJsonSyntax(value));
        result.warnings.push(...this.checkBrackets(value));

        return result;
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'rulesBase':
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
                        label_index1: this.transloco.translate('menu.rule'),
                        rout_index1: '/rule',
                        isActive1: false,
                        img_index1: 'assets/icons/rule.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('registerRule.header.registerRule'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'قواعد',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'قواعد',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'قواعد',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/rule.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'قواعد',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
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
            if (element) element.scrollIntoView(true);
        });
    }
    onMessageSelected(message:any) {
        debugger
        debugger
        debugger
        console.log('✅ LAST SELECTED MESSAGE:', message);
        this.codeMessage = message.code;
        this.messageId = message.messageid;
        this.titleMessage = message.title;
        this.title = message.title;
        this.tableIdMessage = message.tableid;
        this.tableId = message.tableid;
        this.messageId = message.messageid;
        this.text = message.text;
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared(flag: boolean) {
        debugger
        if (!flag) return;
        this.removeMessage=true
        this.messageId = null;
        this.title = null;
        this.text = null;
        this.tableId = null;
    }
    ngOnInit(): void {
        debugger
        if (this.inputRegister!=undefined){
            this.ruleBase= this.inputRegister.ruleBase
            this.moduleBase=this.inputRegister.moduleBase
            this.accessBase=this.inputRegister.accessBase
            this.partyBase=this.inputRegister.partyBase
            this.clientBase=this.inputRegister.clientBase
        }

        this.scrollTop();
        this.tableIdMessage = '7';
        this.status = true;
        if (this.title != undefined) {
            if (this.title.length > 22) {
                this.widthTitle = 100;
            }
        }
        if (this.tableId != undefined) {
            if (this.tableId.length > 22) {
                this.widthTableId = 100;
            }
        }
        if (this.text != undefined) {
            if (this.text.length > 22) {
                this.widthText = 100;
            }
        }
        if (this.messageId != undefined) {
            if (this.messageId.length > 22) {
                this.widthMessageId = 100;
            }
        }
        if (this.ruleBase){
            this.detailsBreadObject = this.chooseBread('rulesBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
    }
    deleteMessage() {
        debugger
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
        this.disableFlag = true;

        this.clearFromParent()
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    onCancel() {
        this.close.emit('close');
    }
    private toBase64Unicode(str: string): string {
        return btoa(
            new TextEncoder()
                .encode(str)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
    onRegister() {
        if (this.validation()) {
            this.rigesterRulObject.ruleTemplate = this.ruleTemplate;
            this.rigesterRulObject.name = this.name;
            this.rigesterRulObject.errorText = this.errorText;
            this.rigesterRulObject.httpsstatus = this.generalErrorCodes;
            if (!this.removeMessage) {
                this.rigesterRulObject.messageId = this.messageId;
            }
            this.rigesterRulObject.errorText = this.toBase64Unicode(this.errorText);
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRule(this.rigesterRulObject)
                .subscribe(
                    (a) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    }
                );
        }
    }
    showMessage() {
        if (this.generalErrorCodes && (this.messageId != undefined && this.messageId != null)) {
            debugger

            this.messagesList = [];
            this.messagesList = [
                {
                    messageId: this.messageId,
                    code: this.codeMessage,
                    title: this.titleMessage,
                    text: this.textMessage,
                    textEN: this.textENMessage,
                    type: this.typeMessage,
                    tableId: this.tableIdMessage,
                    isSystemMessage: 0
                },
            ];
            this.dialogMessageFlag = true;

        }else if (this.generalErrorCodes) {
            this.dialogMessageFlag = true;
            this.messagesList = [];
            setTimeout(() => {
                this.messagesList = [...this.messagesList];
            });
        } else {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.choosePublicErrorCode'),
                life: 3000,
            });
        }
    }
    validation(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterApiRule'),
                life: 3000,
            });
            return false;
        } else if (!this.generalErrorCodes) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterRuleTemplateOrPublicErrorCode'),
                life: 3000,
            });
            return false;
        }
        else if (!this.errorText) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterErrorText'),
                life: 3000,
            });
            return false;
        }
        else if (this.jsonValidationError) {
            this.notifierService.showError({
                detail: 'فرمت JSON نامعتبر است',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    onchangeGeneralErrorCodes() {
        debugger
        if (
            this.generalErrorCodes != '' &&
            this.generalErrorCodes != undefined &&
            this.generalErrorCodes != null
        ) {
            this.disableFlag = false;
            this.codeMessage = this.generalErrorCodes;
        } else {

            this.disableFlag = true;
        }
        this.deleteMessage();
    }
    clearFromParent() {
        this.msgSelectorAction$.next({ type: 'clear' });
        this.messagesList = [];
        this.selectedRow = [];
    }

}
interface JsonValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    line?: number;
    column?: number;
    parsed?: any;
}
