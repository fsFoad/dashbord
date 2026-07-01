import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';

import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { NgIf } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SelectModule } from 'primeng/select';
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { TableIdPipe } from '../../../../shared/pipes/tableId.pipe';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { KeyFilter } from 'primeng/keyfilter';
import { MessageSelectorComponent } from '../../../../shared/components/message-selector/message-selector.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-api-rule-update',
    templateUrl: './api-rule-update.component.html',
    styleUrls: ['./api-rule-update.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        Toast,
        BreadcrumbsComponent,
        TranslocoPipe,
        FormsModule,
        InputText,
        SelectModule,
        Textarea,
        Panel,
        Tooltip,
        ButtonDirective,
        TableIdPipe,
        Dialog,
        KeyFilter,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        NgIf,
        MessageSelectorComponent,

    ],
})
export class ApiRuleUpdateComponent implements OnInit, OnChanges {
    @Input() inputUpdate;
    @Output() close = new EventEmitter<string>();
    jsonValidationResult: JsonValidationResult | null = null;
    errorText = '';
    jsonValidationError = '';
    dialogMessageFlag = false;
    disableFlag = true;
    removeMessage = false;
    name;
    ruleTemplate;
    generalErrorCodes = null;
    generalErrorCodesOptions = ApiGatewayConstants.generalErrorCodes;
    ruleTemplateOptions = ApiGatewayConstants.ruleTemplate;
    httpsstatusOptions = ApiGatewayConstants.httpsstatus;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    httpsstatus;
    status;
    typeMessage;
    messagesList = [];
    messageId;
    title;
    tableId;
    text;
    codeMessage;
    titleMessage;
    textMessage;
    textENMessage;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    tableIdMessage;
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    updateRulObject = {
        ruleTemplate: null,
        errorText: '',
        httpsstatus: '',
        name: '',
        messageId: null,
        ruleId: null,
    };
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    first = 0;
    rows = 10;
    detailsBreadObject = [];
    clientName;
    apiTitle;
    moduleTitle;
    partyTitle;
    ruleBase: boolean = false;
    clientBase: boolean = false;
    moduleBase: boolean = false;
    accessBase: boolean = false;
    partyBase: boolean = false;
    paginationLabel = this.transloco.translate('label.pagination.table');
    selectedRow: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private transloco: TranslocoService,
        private cdr: ChangeDetectorRef,
        private notifierService: ToastService,
    ) {
    }
    private fromBase64Unicode(str: string): string {
        if (!str) return '';

        try {
            return decodeURIComponent(
                atob(str)
                    .split('')
                    .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('')
            );
        } catch {
            return str; // اگر base64 نبود هم خراب نشه UI
        }
    }
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

    private toBase64Unicode(str: string): string {
        return btoa(
            new TextEncoder()
                .encode(str)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
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
                        label_index2: this.transloco.translate('editRule.header.editRule'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('editRule.header.editRule'),
                        rout_index4: '/registerRule',
                        isActive4: false,
                        img_index4: 'assets/icons/update.png',
                    },
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
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('editRule.header.editRule'),
                        rout_index4: '/registerRule',
                        isActive4: false,
                        img_index4: 'assets/icons/update.png',
                    },
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
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/rule.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('editRule.header.editRule'),
                        rout_index3: '/registerRule',
                        isActive3: false,
                        img_index3: 'assets/icons/update.png',
                    },
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
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('editRule.header.editRule'),
                        rout_index5: '/registerRule',
                        isActive5: false,
                        img_index5: 'assets/icons/update.png',
                    },
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

    private initStaticFieldsFromInput() {
        if (!this.inputUpdate) return;
        this.name = this.inputUpdate.name;
        this.ruleTemplate = this.inputUpdate.ruleTemplate?.toString();
        this.errorText = this.inputUpdate.errorText;
        this.generalErrorCodes = this.inputUpdate.httpsstatus?.toString();
        this.messageId = this.inputUpdate.messageId;
    }

    private loadAndSelectSingleMessage(messageId: any) {
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.getbymessageId(messageId).subscribe(
            (a) => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.generalErrorCodes = a.code?.toString?.() ?? a.code;
                this.codeMessage = a.code?.toString?.() ?? a.code;
                this.titleMessage = a.title?.toString?.() ?? a.title;
                this.tableIdMessage = a.tableId?.toString?.() ?? a.tableId;
                this.textMessage = a.text?.toString?.() ?? a.text;
                this.textENMessage = a.textEN?.toString?.() ?? a.textEN;
                this.typeMessage = a.type?.toString?.() ?? a.type;
                this.title = a.title;
                this.text = a.text;
                this.tableId = a.tableId;
                this.messageId = a.messageId;
                this.disableFlag = this.generalErrorCodes != null ? false : true;
                this.messagesList = [a];
                this.selectedRow = [a];
            },
            () => this._primengProgressBarService.hide(),
        );
    }

    ngOnChanges(changes): void {
        if (changes['inputUpdate']?.currentValue) {
            this.initStaticFieldsFromInput();

            const msgId = this.inputUpdate?.messageId;
            if (msgId !== null && msgId !== undefined && msgId !== '') {
                this.loadAndSelectSingleMessage(msgId);
            }
        }
    }
    onChildSelectionCleared(flag: boolean) {
        if (!flag) return;
        this.removeMessage=true
        this.messageId = null;
        this.title = null;
        this.text = null;
        this.tableId = null;
    }
    ngOnInit(): void {
        debugger
        debugger
        debugger
        this.scrollTop();
        if (this.inputUpdate.messageId !== null) {
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbymessageId(this.inputUpdate.messageId).subscribe((a) => {
                    debugger
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    a.code != undefined
                        ? (this.generalErrorCodes = a.code.toString())
                        : (this.generalErrorCodes = a.code);
                    a.code != undefined
                        ? (this.codeMessage = a.code.toString())
                        : (this.codeMessage = a.code);
                    a.title != undefined
                        ? (this.titleMessage = a.title.toString())
                        : (this.titleMessage = a.title);
                    a.tableId != undefined
                        ? (this.tableIdMessage = a.tableId.toString())
                        : (this.tableIdMessage = a.tableId);
                    a.text != undefined
                        ? (this.textMessage = a.text.toString())
                        : (this.textMessage = a.text);
                    a.textEN != undefined
                        ? (this.textENMessage = a.textEN.toString())
                        : (this.textENMessage = a.textEN);
                    a.type != undefined
                        ? (this.typeMessage = a.type.toString())
                        : (this.typeMessage = a.type);
                    a.text != undefined
                        ? (this.title = a.text.toString())
                        : (this.title = a.text);
                    a.text != undefined
                        ? (this.text = a.text.toString())
                        : (this.text = a.text);
                    a.tableId != undefined
                        ? (this.tableId = a.tableId.toString())
                        : (this.tableId = a.tableId);
                    a.messageId != undefined
                        ? (this.messageId = a.messageId.toString())
                        : (this.messageId = a.messageId);
                    if (this.generalErrorCodes != null) {
                        this.disableFlag = false;
                    } else {
                        this.disableFlag = true;
                    }
                    this.messagesList = [...a];
                    this.selectedRow = [...a];
                    this.initStaticFieldsFromInput();
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                });
        }
        this.name = this.inputUpdate.name;
        this.ruleTemplate = this.inputUpdate.ruleTemplate.toString();
        // this.errorText = this.inputUpdate.errorText;
        this.generalErrorCodes = this.inputUpdate.httpsstatus.toString();
        this.messageId = this.inputUpdate.messageId;
        this.clientBase = this.inputUpdate.clientBase;
        this.moduleBase = this.inputUpdate.moduleBase;
        this.accessBase = this.inputUpdate.accessBase;
        this.ruleBase = this.inputUpdate.ruleBase;
        this.partyBase = this.inputUpdate.partyBase;
        this.clientName = this.inputUpdate.clientName;
        this.apiTitle = this.inputUpdate.apiTitle;
        this.moduleTitle = this.inputUpdate.moduleTitle;
        this.errorText = this.fromBase64Unicode(this.inputUpdate.errorText);
        this.inputUpdate.status == 1 ? (this.status = true) : (this.status = false);
        if (this.ruleBase) {
            this.detailsBreadObject = this.chooseBread('rulesBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
    }

    onMessageSelected(message: any) {
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

    showMessage() {
        debugger
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
                    tableId:  this.tableId,
                    isSystemMessage: 0
                },
            ];
            this.dialogMessageFlag = true;

        } else if (this.generalErrorCodes) {
            this.messagesList = [];
            this.dialogMessageFlag = true;
        } else {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.choosePublicErrorCode'),
                life: 3000,
            });
        }
    }

    clearMessage() {
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
        this.generalErrorCodes = null;
        this.disableFlag = true;
    }

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    onUpdate() {
        if (this.validation()) {
            this.updateRulObject.ruleId = this.inputUpdate.ruleId;
            this.updateRulObject.ruleTemplate = this.ruleTemplate;
            this.updateRulObject.name = this.name;
            // this.updateRulObject.errorText = this.errorText;
            this.updateRulObject.errorText = this.toBase64Unicode(this.errorText);
            this.updateRulObject.httpsstatus = this.generalErrorCodes;
            this.updateRulObject.messageId = null;
            if (!this.removeMessage) {
                this.updateRulObject.messageId = this.messageId;
            }
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerRule(this.updateRulObject).subscribe((a) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                },
            );
        }
    }

    validation(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.enterApiRule'),
                life: 3000,
            });
            return false;
        } else if (!this.generalErrorCodes) {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.enterRuleTemplateOrPublicErrorCode'),
                life: 3000,
            });
            return false;
        } else if (!this.errorText) {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.enterErrorText'),
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
        }else {
            return true;
        }
    }

    onchangeGeneralErrorCodes() {
        if (
            this.generalErrorCodes != '' &&
            this.generalErrorCodes != undefined
        ) {
            this.disableFlag = false;
            this.codeMessage = this.generalErrorCodes;
            this.messageId = '';
        } else {
            this.clearMessage();
            this.disableFlag = true;
        }
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
