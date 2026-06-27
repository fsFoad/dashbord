import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelect } from 'primeng/multiselect';
import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { ApiGatewayConstants } from '../../../../../../constants/ApiGatewayConstants';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { KeyFilter } from 'primeng/keyfilter';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';

@Component({
    selector: 'app-input-mediator',
    imports: [
        Toast,
        ConfirmDialogModule,
        ReactiveFormsModule,
        NgIf,
        DropdownModule,
        MultiSelect,
        NgForOf,
        ButtonDirective,
        NgClass,
        FormsModule,
        Tag,
        RadioButton,
        InputText,
        Tooltip,
        BreadcrumbsComponent,
        InputTextarea,
        Checkbox,
        TranslocoPipe,
        KeyFilter,
    ],
    providers: [ConfirmationService],
    templateUrl: './input-mediator.component.html',
    styleUrl: './input-mediator.component.scss',
})
export class InputMediatorComponent implements OnInit {
    @Input() inputMediatorApi;
    @Output() close = new EventEmitter<string>();
    activeTabIndex = 0;
    private lastJsonFingerprint = '';
    partyListOptions = [{ title: '-', partyId: null }];
    autoGenerateRules = true;
    jsonInput = '';
    jsonStatus: 'empty' | 'valid' | 'invalid' = 'empty';
    partyId = null;
    moduleId = null;
    jsonOutput = 'waiting for input...';
    typeOptions: { label: string; value: JsonType }[] = [
        { label: 'String', value: 'String' },
        { label: 'Number', value: 'Number' },
    ];
    private lastParsedInput: any = null;
    actionOptions: { label: string; value: number }[] = [
        { label: 'بدون تغییر', value: 0 },
        { label: 'اجرای جاوا اسکریپت کد', value: 2 },
        { label: 'اجرای یک سرویس', value: 3 },
        { label: 'mapping', value: 1 },
    ];
    clientListOptions: any[] = [];
    selectedClientIds: number[] = [];   // یا string[] بسته به نوع clientId
    clientNameFlag = false;
    clientId: number | null = null;
    availablePaths: { name: string; code: string }[] = [];
    serviceOptions = [
        'UserService.getUserDetails()',
        'ProductService.getPrice()',
    ];
    jsonPlaceholder = `
{
  "user": {
    "id": 101,
    "name": "Ali",
    "role": "admin"
  },
  "token": "secret123"
}`;
    detailsBreadObject: any;
    clientBase = false;
    accessBase = false;
    moduleBase = false;
    partyBase = false;
    apiName: string = '';
    clientName: string = '';
    moduleTitle: string = '';
    partyTitle: string = '';
    private isFromBackend = false;
    mediatorTitle: string = '';
    ruleConditionOptions = ApiGatewayConstants.conditionsMediationsNode;
    functionTypeNumberOptions = ApiGatewayConstants.functionTypeNumberOptions;
    saveReportActionLines: string[] = [];
    saveReportActionItems: { label: string; count: number }[] = [];
    rules: RuleModel[] = [];
    saveReportAddedCount = 0;
    saveReportDeletedCount = 0;
    jsonIssue: JsonParseIssue | null = null;

    isEditMode = false;
    isInitialLoadDone = false;
    isInitialOutputLoaded = false;
    isUpdatingPreview = false;
    private isFirstPreviewAfterLoad = true;
    private originalJsonOrder: any = null;
    private operatorToNumberMap: Record<string, number> = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
    };

    constructor(private _primengProgressBarService: FuseLoadingService,
                private messagesApiFacadeService: MessagesApiFacadeService,
                private notifierService: ToastService,
                private apiGatewayService: ApiGatewayService,
                private transloco: TranslocoService,
                private confirmationService: ConfirmationService,
    ) {

        if (!this.inputMediatorApi) {
            this.jsonOutput = 'TEST OUTPUT';

        }
        this.updateOutputPreview();
    }
    private isCompletelyEmpty(value: any): boolean {

        if (value === null || value === undefined) {
            return true;
        }

        // array
        if (Array.isArray(value)) {

            // حذف null های ناشی از deleteByPath
            const filtered = value.filter(v => v !== null && v !== undefined);

            if (filtered.length === 0) {
                return true;
            }

            return filtered.every(v => this.isCompletelyEmpty(v));
        }

        // object
        if (typeof value === 'object') {

            const keys = Object.keys(value);

            if (keys.length === 0) {
                return true;
            }

            return keys.every(k => this.isCompletelyEmpty(value[k]));
        }

        return false;
    }
    private mapOperatorToNumber(op: any): number | null {
        if (op == null) return null;
        if (typeof op === 'object') {
            op = op.code ?? op.value ?? op;
        }

        const num = Number(op);

        return isNaN(num) ? null : num;
    }

   private buildValidatorExpression(rule: RuleModel): string | null {

        const node = (rule.path || '').trim() || 'node';

        const getLabel = (code: any) => this.getConditionLabel(rule, code);

        // =========================
        // 🔥 STRING
        // =========================
        if (rule.newType !== 'Number') {

            if (
                rule.stringConditionMode === 'single' &&
                rule.stringRuleCondition &&
                rule.stringCompareValue
            ) {

                const label = getLabel(rule.stringRuleCondition);

                if (!label) return null;

                return `${node} ${label} ${rule.stringCompareValue}`;
            }

            return null;
        }

        const mode = rule.numberConditionMode;

        if (!mode || mode === 'none') {
            return null;
        }

        if (mode === 'single') {

            const label = getLabel(rule.ruleCondition);

            if (!label || !rule.compareTargetValue) return null;

            return `${rule.compareTargetValue} ${label} ${node}`;
        }

        if (mode === 'range') {

            const label1 = getLabel(rule.rangeCondition1);
            const label2 = getLabel(rule.rangeCondition2);

            if (
                !label1 ||
                !label2 ||
                !rule.rangeValue1 ||
                !rule.rangeValue2
            ) {
                return null;
            }

            return `${rule.rangeValue2} ${label2} ${node} ${label1} ${rule.rangeValue1}`;
        }

        return null;
    }

    private getUniqueNewNodeName(base = 'newNode'): string {

        const newNodes = (this.rules ?? [])
            .filter(r => r.kind === 'new' && r.deleted !== true) // 🔥 مهم
            .map(r => r?.targetPath)
            .filter(Boolean);

        const count = newNodes.length;

        let candidate = `${base}_${count + 1}`;

        const used = new Set(
            (this.rules ?? [])
                .flatMap(r => [r?.targetPath, r?.newPath, r?.path])
                .filter(Boolean),
        );

        while (used.has(candidate)) {
            const match = candidate.match(/_(\d+)$/);
            const next = match ? Number(match[1]) + 1 : count + 1;
            candidate = `${base}_${next}`;
        }

        return candidate;
    }

    normalizeName(s: string): string {
        return JSON.stringify(this.parsePath(s));
    }

    private fingerprint(obj: any) {
        try {
            return JSON.stringify(obj);
        } catch {
            return String(Date.now());
        }
    }

    private doSaveNodeMediations() {


        const rep = this.getSaveDialogReport();

        this.saveReportActionItems = rep.actionItems;
        this.saveReportAddedCount = rep.addedCount;
        this.saveReportDeletedCount = rep.deletedCount;

        console.table(this.rules.map(r => ({
            path: r.path,
            targetPath: r.targetPath,
            kind: r.kind,
            mediatorId: r.mediatorId,
        })));
        const dto = this.buildSaveDto();

        console.log('DTO =>', dto); // برای تست

        this.messagesApiFacadeService.saveMediator(dto).subscribe({
            next: () => {
                this.notifierService.showSuccess({
                    detail: 'ثبت اطلاعات انجام شد',
                    life: 3000,
                });
                this.close.emit('closed&called');
            },
            error: () => {

            },
        });
        console.log('🔥 BEFORE BUILD DTO RULES =>');
        this.rules.forEach(r => {
            console.log({
                path: r.path,
                target: r.targetPath,
                mode: r.numberConditionMode,
                ruleCondition: r.ruleCondition,
                value: r.compareTargetValue,
                range1: r.rangeValue1,
                range2: r.rangeValue2,
            });
        });
    }

    toBackendFormat(jsonStr: string): string {
        try {
            const obj = JSON.parse(jsonStr);

            const convert = (val: any): string => {
                if (val === null) return 'null';

                if (typeof val === 'string') {
                    return `"${val}"`;
                }

                if (typeof val === 'number' || typeof val === 'boolean') {
                    return String(val);
                }

                if (Array.isArray(val)) {
                    return `[${val.map(convert).join(',')}]`;
                }

                if (typeof val === 'object') {
                    return `{${Object.entries(val)
                        // 🔥 فقط این خط تغییر کرده
                        .map(([k, v]) => `${k}:${convert(v)}`)
                        .join(',')}}`;
                }

                return '';
            };

            return convert(obj);

        } catch {
            return jsonStr;
        }
    }

    chooseBread(caseBase: any) {
debugger
debugger
debugger
        if (this.isEditMode) {
            switch (caseBase) {
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
                            label_index3: 'لیست مدیاتور های ورودی',
                            rout_index3: null,
                            isActive3: false,
                            img_index3: 'assets/icons/mediators.png',
                            label_Detail_index3: '(' + this.apiName + ')',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش مدیاتور ورودی'),
                            rout_index4: '/input-mediator',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
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
                            img_index1: 'assets/icons/module.png',
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
                            label_index3: 'لیست مدیاتور های ورودی',
                            rout_index3: null,
                            isActive3: false,
                            img_index3: 'assets/icons/mediators.png',
                            label_Detail_index3: '(' + this.apiName + ')',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش مدیاتور ورودی'),
                            rout_index4: '/input-mediator',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
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
                            label_index2: 'لیست مدیاتور های ورودی',
                            rout_index2: null,
                            isActive2: false,
                            img_index2: 'assets/icons/mediators.png',
                            label_Detail_index2: '(' + this.apiName + ')',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ویرایش مدیاتور ورودی'),
                            rout_index3: '/input-mediator',
                            isActive3: true,
                            img_index3: 'assets/icons/update.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
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
                            rout_index2: '/module',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: '/api',
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'لیست مدیاتور های ورودی',
                            rout_index4: null,
                            isActive4: false,
                            img_index4: 'assets/icons/mediators.png',
                            label_Detail_index4: '(' + this.apiName + ')',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ویرایش مدیاتور ورودی'),
                            rout_index5: '/input-mediator',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                    ];
                default:
                    return null;
            }
        } else {
            switch (caseBase) {
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
                            label_index3: 'لیست مدیاتور های ورودی',
                            rout_index3: null,
                            isActive3: false,
                            img_index3: 'assets/icons/mediators.png',
                            label_Detail_index3: '(' + this.apiName + ')',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت مدیاتور ورودی'),
                            rout_index4: '/input-mediator',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
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
                            img_index1: 'assets/icons/module.png',
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
                            label_index3: 'لیست مدیاتور های ورودی',
                            rout_index3: null,
                            isActive3: false,
                            img_index3: 'assets/icons/mediators.png',
                            label_Detail_index3: '(' + this.apiName + ')',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت مدیاتور ورودی'),
                            rout_index4: '/input-mediator',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
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
                            label_index2: 'لیست مدیاتور های ورودی',
                            rout_index2: null,
                            isActive2: false,
                            img_index2: 'assets/icons/mediators.png',
                            label_Detail_index2: '(' + this.apiName + ')',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ثبت مدیاتور ورودی'),
                            rout_index3: '/input-mediator',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
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
                            rout_index2: '/module',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: '/api',
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'لیست مدیاتور های ورودی',
                            rout_index4: null,
                            isActive4: false,
                            img_index4: 'assets/icons/mediators.png',
                            label_Detail_index4: '(' + this.apiName + ')',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ثبت مدیاتور ورودی'),
                            rout_index5: '/input-mediator',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                    ];
                default:
                    return null;
            }
        }
    }
    prepareJsForBackend(code: string | null): string | null {
        if (!code) return null;

        return code
            // newline ها
            .replace(/\r?\n/g, ' ')
            .replace(/\\n/g, ' ')
            .replace(/\\r/g, '')

            // مرحله 1: \"0543\" → "0543"
            .replace(/\\"/g, '"')

            // مرحله 2: "0543" → '0543'
            .replace(/"([^"]*)"/g, "'$1'")

            .trim();
    }
    fillFormFromService(data: any) {
        debugger
        if (!data) return;

        // 1️⃣ mediatorTitle
        this.mediatorTitle = data?.mediatorTitle || '';

        // 2️⃣ clientInfo → selectedClientIds
        const clientInfo = data.inputMediatorElementDtoList?.[0]?.clientInfo || [];

        this.selectedClientIds = clientInfo
            .filter(c => c.status === 1)
            .map(c => Number(c.clientId));

        // 3️⃣ optional: اگر خواستی clientId تکی هم ست کنی
        this.clientId = this.selectedClientIds.length ? this.selectedClientIds[0] : null;
        this.selectedClientIds = [...this.selectedClientIds];
        console.log('clientListOptions:', this.clientListOptions);
        console.log('selectedClientIds:', this.selectedClientIds);
    }
    buildSaveDto() {
        const isUpdate = this.isEditMode;

        const clientInfoList = (this.selectedClientIds || []).map(id => ({
            clientId: id,
            status: 1,
        }));

        return {
            operationFlag: isUpdate ? 'U' : 'I',

            apiId: this.inputMediatorApi?.apiId ?? 0,
            groupId: this.inputMediatorApi?.groupId ?? null,

            mediatorTitle: this.mediatorTitle,

            inputMediatorElementDtoList: this.rules

                // =========================
                // 🔥 FIX اصلی
                // =========================
                .filter(rule => {
                    // اگر register هست و نود جدیدی که delete شده → اصلا ارسال نشه
                    if (!isUpdate && !rule.mediatorId && rule.deleted === true) {
                        return false;
                    }

                    return true;
                })

                .map(rule => {

                    const validator = this.buildValidator(rule);
                    const expression = this.buildValidatorExpression(rule);

                    const dto: any = {
                        inputJsonTest: this.toBackendFormat(this.jsonInput),

                        outputJsonTest: this.applyDeleteOnOutputJson(
                            this.jsonInput,
                            this.rules
                        ),

                        // ========= SOURCE =========
                        sourceNodeName:
                            rule.kind === 'new'
                                ? (rule.targetPath || rule.newPath)
                                : rule.path,

                        sourceNodeType: this.mapSimpleType(rule.originalType),
                        sourceNodeShouldDecode: rule.autoDecodeToMapFrom ? 1 : 0,

                        detailOperationFlag:
                            rule.deleted === true
                                ? 'D'
                                : (rule.mediatorId ? 'U' : 'I'),

                        sourceNodeHasValidator: validator.sourceNodeHasValidator,
                        sourceNodeValidatorComparatorValue: validator.sourceNodeValidatorComparatorValue,
                        sourceNodeValidatorOperand: validator.sourceNodeValidatorOperand,
                        sourceNodeValidatorComparatorSecondValue: validator.sourceNodeValidatorComparatorSecondValue,
                        sourceNodeValidatorSecondOperand: validator.sourceNodeValidatorSecondOperand,
                        sourceNodeValidatorExpression: expression,

                        // ========= TARGET =========
                        targetNodeName: rule.targetPath,
                        targetNodeType: this.mapSimpleType(rule.newType),
                        targetNodePrefixValue: rule.pre || null,
                        targetNodeSuffixValue: rule.post || null,
                        targetNodeActionType: rule.action,

                        targetNodeMappingValue:
                            rule.action == 1
                                ? (rule.mapTo ?? null)
                                : null,

                        targetNodeCalculationScript:
                            rule.action == 2
                                ? this.prepareJsForBackend(rule.jsCode)
                                : null,

                        targetNodeEncode: rule.finalEncode ? 1 : 0,

                        targetNodeExtraValueNodePath:
                            rule.serviceResponsePath?.trim()
                                ? rule.serviceResponsePath
                                : null,

                        targetNodeCalledApiId:
                            rule.action == 3
                                ? (rule.apiId ?? null)
                                : null,

                        targetNodeCalledPartyId:
                            rule.action == 3
                                ? (rule.partyId ?? null)
                                : null,

                        targetNodeCalledModuleId:
                            rule.action == 3
                                ? (rule.moduleId ?? null)
                                : null,

                        participateTargetNodeAsForwardEndpointDetail:
                            rule.sendNodeAsQueryParam === 1 ? 1 : 0,

                        clientInfo: clientInfoList,
                    };

                    // فقط برای update یا delete واقعی
                    if (rule.mediatorId != null && (isUpdate || rule.deleted === true)) {
                        dto.mediatorId = rule.mediatorId;
                    }

                    return dto;
                }),
        };
    }
    getRuleConditionOptions(rule: RuleModel) {
        return rule?.newType === 'Number'
            ? ApiGatewayConstants.conditionsMathInputMediator
            : ApiGatewayConstants.conditionsMediationsNodeInputMediator; // برای String (و بقیه)
    }

    markExpressionDirty(rule: RuleModel) {
        this.updateOutputPreview();
    }
    sanitizeJsCode(code: string): string {
        return code
            .replace(/\\n/g, ' ')
            .replace(/\\r/g, '')
            .replace(/\\"/g, '"');
    }
    mapBackendType(type: number): JsonType {
        switch (type) {
            case 0:
                return 'String';
            case 1:
                return 'Number';
            default:
                return 'String';
        }
    }

  private extractOrder(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(v => this.extractOrder(v));
        }

        if (obj && typeof obj === 'object') {
            return Object.keys(obj).map(key => ({
                key,
                children: this.extractOrder(obj[key]),
            }));
        }

        return null;
    }

    private rebuildWithOrder(order: any, source: any): any {
        if (!order) return source;

        // array
        if (Array.isArray(order) && Array.isArray(source)) {
            return source.map((v, i) =>
                this.rebuildWithOrder(order[i], v),
            );
        }

        // object
        if (Array.isArray(order) && typeof source === 'object') {
            const result: any = {};

            // اول keys قدیمی
            for (const item of order) {
                if (source.hasOwnProperty(item.key)) {
                    result[item.key] = this.rebuildWithOrder(
                        item.children,
                        source[item.key],
                    );
                }
            }

            // بعد keys جدید (آخر اضافه میشن)
            for (const key of Object.keys(source)) {
                if (!result.hasOwnProperty(key)) {
                    result[key] = source[key];
                }
            }

            return result;
        }

        return source;
    }
    mapBackendToRules(list: any[]): RuleModel[] {

        console.log('BACKEND LIST:', list);

        return (list || []).map(item => {

            const rule = this.createEmptyRule();

            // =========================
            // BASIC
            // =========================
            rule.mediatorId = item.mediatorId;
            console.log('BACKEND mediatorId:', item.mediatorId);

            const sourcePath = (item.sourceNodeName || '').trim();
            rule.path = sourcePath;

            // =========================
            // 🔥 تشخیص new / existing
            // =========================
            const existsInInput =
                this.lastParsedInput &&
                this.getByPath(this.lastParsedInput, sourcePath) !== undefined;

            rule.isNewlyAdded = false;
            rule.kind = existsInInput ? 'existing' : 'new';

            // =========================
            // TYPES
            // =========================
            rule.originalType = this.mapBackendType(item.sourceNodeType);
            rule.newType = this.mapBackendType(item.targetNodeType);

            // =========================
            // PATH
            // =========================
            rule.targetPath = (item.targetNodeName || sourcePath || '').trim();

            if (rule.kind === 'new') {
                rule.targetPath = sourcePath;
                rule.newPath = sourcePath;
            }

            // =========================
            // ACTION
            // =========================
            rule.action = item.targetNodeActionType ?? 0;

            // =========================
            // 🔥🔥🔥 SERVICE FIELDS (این مهمه)
            // =========================
            if (rule.action === 3) {

                rule.partyId = item.targetNodeCalledPartyId ?? null;
                rule.moduleId = item.targetNodeCalledModuleId ?? null;
                rule.apiId = item.targetNodeCalledApiId ?? null;
                rule.serviceResponsePath =
                    item.targetNodeExtraValueNodePath ?? null;
            }

            // =========================
            // MAPPING
            // =========================
            if (item.targetNodeMappingValue != null) {
                rule.action = 1;
                rule.mapTo = item.targetNodeMappingValue;
            }

            // =========================
            // PREFIX / SUFFIX
            // =========================
            rule.pre = item.targetNodePrefixValue || '';
            rule.post = item.targetNodeSuffixValue || '';

            // =========================
            // ENCODE / DECODE
            // =========================
            rule.autoDecodeToMapFrom = item.sourceNodeShouldDecode === 1;
            rule.finalEncode = item.targetNodeEncode === 1;

            // =========================
            // JS
            // =========================
            if (item.targetNodeActionType === 2 && item.targetNodeCalculationScript) {
                rule.action = 2;

                rule.jsCode = this.sanitizeJsCode(
                    item.targetNodeCalculationScript
                );
            }

            return rule;
        });
    }
   ngOnInit(): void {
        debugger;

        this.isEditMode = this.inputMediatorApi?.operationFlag === 'U';
        this.isInitialLoadDone = false;

        forkJoin({
            a: this.messagesApiFacadeService.fetchallparty(),
            b: this.messagesApiFacadeService.fetchallclient(),
        })
            .pipe(
                switchMap(({ a, b }) => {

                    this.partyListOptions = [...a].sort();
                    this.partyListOptions.unshift({ title: '-', partyId: null });
                    this.clientListOptions = b.map(x => ({
                        ...x,
                        clientId: Number(x.clientId),
                    })).sort((x, y) =>
                        (x?.name || '').localeCompare(y?.name || ''),
                    );

                    const groupId = this.inputMediatorApi?.groupId;

                    if (!groupId) {
                        console.warn('groupId is missing ⚠️');
                        return of({ body: null });
                    }

                    return this.messagesApiFacadeService.getInputMediatorElementDetail(
                        this.inputMediatorApi.apiId,
                        groupId,
                    );
                }),
                tap(res => {
                    const body = res?.body;
                    if (!body) return;

                    const list = body.inputMediatorElementDtoList || [];

                    if (list.length) {

                        const item = list[0];

                        // =========================
                        // JSON INPUT
                        // =========================
                        if (item?.inputJsonTest) {
                            this.jsonInput = this.addQuotesToKeys(item.inputJsonTest);
                        }

                        console.log('BACKEND RAW:', item.inputJsonTest);

                        // =========================
                        // JSON OUTPUT (FROM BACKEND)
                        // =========================
                        if (item?.outputJsonTest) {
                            this.jsonOutput = this.addQuotesToKeys(item.outputJsonTest);

                            try {
                                const obj = new Function(`return (${this.jsonOutput})`)();

                                this.jsonOutput = JSON.stringify(obj, null, 4);
                            } catch {
                                // اگر خراب بود همون نسخه fix شده
                            }

                            this.isInitialOutputLoaded = true;
                        } else {
                            this.isInitialOutputLoaded = false;
                        }

                        this.isFirstPreviewAfterLoad = true;
                        this.mediatorTitle = body?.mediatorTitle || '';

                        // =========================
                        // PARSE INPUT + SAVE ORDER 🔥🔥🔥
                        // =========================
                        try {
                            this.lastParsedInput = JSON.parse(this.jsonInput);

                            // 🔥 ذخیره ترتیب نودها
                            this.originalJsonOrder = this.extractOrder(this.lastParsedInput);

                        } catch {
                            this.lastParsedInput = null;
                            this.jsonStatus = 'invalid';
                            return;
                        }

                        this.jsonStatus = 'valid';
                        this.lastJsonFingerprint = this.fingerprint(this.lastParsedInput);

                        // =========================
                        // RULES
                        // =========================
                        this.rules = this.mapBackendToRules(list);
                        this.rules.forEach(rule => {

                            if (rule.action === 3) {

                                // load modules
                                if (rule.partyId) {

                                    this.messagesApiFacadeService
                                        .moduleSearchByPartyId(rule.partyId)
                                        .subscribe(modules => {

                                            rule.moduleOptions = [
                                                { moduleTitle: '-', moduleId: null },
                                                ...modules
                                            ];

                                            // load apis
                                            if (rule.moduleId) {

                                                this.messagesApiFacadeService
                                                    .apiNochart(0, 10000, rule.moduleId)
                                                    .subscribe(apis => {

                                                        rule.apiOptions = [
                                                            { title: '-', apiId: null },
                                                            ...apis
                                                        ];

                                                        // title سرویس هم ست کن
                                                        const selectedApi = apis.find(
                                                            x => x.apiId === rule.apiId
                                                        );

                                                        rule.apiTitle =
                                                            selectedApi?.title ?? null;
                                                    });
                                            }
                                        });
                                }
                            }
                        });
                        // =========================
                        // CLIENTS
                        // =========================
                        const clientInfo = item.clientInfo || [];

                        const selected = clientInfo
                            .filter(c => c.status === 1)
                            .map(c => Number(c.clientId));

                        this.selectedClientIds = [...selected];
                        this.clientId = selected.length ? selected[0] : null;

                        // =========================
                        // ❗ مهم: اینو حذف نکردم ولی اصلاح کردم
                        // =========================
                        this.sortInputJson();

                        // 🔥 بعد از sort دوباره order بگیر
                        try {
                            const parsedAfterSort = JSON.parse(this.jsonInput);
                            this.originalJsonOrder = this.extractOrder(parsedAfterSort);
                        } catch {
                            // ignore
                        }
                    }

                    // =========================
                    // FORM
                    // =========================
                    this.fillFormFromService(body);
                }),
            )
            .subscribe({
                next: () => {
                    console.log('SUBSCRIBE HIT ✅');
                    this._primengProgressBarService.hide();
                },
                error: (er) => {
                    console.log('SUBSCRIBE ERROR ❌', er);
                    this._primengProgressBarService.hide();
                },
            });
       if (this.isEditMode) {
           this.clientBase = this.inputMediatorApi?.input_inputMediatorsList?.clientBase;
           this.accessBase = this.inputMediatorApi?.input_inputMediatorsList?.accessBase;
           this.moduleBase = this.inputMediatorApi?.input_inputMediatorsList?.moduleBase;
           this.partyBase = this.inputMediatorApi?.input_inputMediatorsList?.partyBase;

           this.clientName = this.inputMediatorApi?.input_inputMediatorsList?.clientName;
           this.moduleTitle = this.inputMediatorApi?.input_inputMediatorsList?.moduleTitle;
           this.partyTitle = this.inputMediatorApi?.input_inputMediatorsList?.partyTitle;

           this.apiName = this.inputMediatorApi?.input_inputMediatorsList?.title;
       }else {
           this.clientBase = this.inputMediatorApi?.clientBase;
           this.accessBase = this.inputMediatorApi?.accessBase;
           this.moduleBase = this.inputMediatorApi?.moduleBase;
           this.partyBase = this.inputMediatorApi?.partyBase;
           this.clientName = this.inputMediatorApi?.clientName;
           this.moduleTitle = this.inputMediatorApi?.moduleTitle;
           this.partyTitle = this.inputMediatorApi?.partyTitle;
           this.apiName = this.inputMediatorApi?.title;
       }
       if (this.clientBase) {
           this.detailsBreadObject = this.chooseBread('clientBase');
       }
       else if (this.accessBase) {
           this.detailsBreadObject = this.chooseBread('accessBase');
       }
       else if (this.partyBase) {
           this.detailsBreadObject = this.chooseBread('partyBase');
       }
       else {
           this.detailsBreadObject = this.chooseBread('moduleBase');
       }
       this.apiGatewayService.updateApprovalDetailsBreadObject(
           this.detailsBreadObject,
       );
   }

    addQuotesToKeys(str: string): string {
        if (!str) return str;

        try {
            // فقط key ها رو کوتیشن‌دار می‌کنه
            const fixed = str.replace(
                /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
                '$1"$2":',
            );

            return fixed;
        } catch {
            return str;
        }

    }

 fixInnerJsonStrings(str: string): string {
        if (!str) return str;

        return str.replace(/"(\{.*?\})"/g, (match, inner) => {
            try {
                // 1. fix key ها داخلش
                let fixed = inner.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

                // 2. fix string value ها
                fixed = fixed.replace(/:\s*"([^"]*)"/g, (m, val) => {
                    return `:"${val}"`;
                });

                // 3. escape کلش برای اینکه string معتبر بشه
                const escaped = fixed.replace(/"/g, '\\"');

                return `"${escaped}"`;
            } catch {
                return match;
            }
        });
    }

  getConditionLabel(rule: RuleModel, code: any): string {
        if (!code) return '';
        const options = rule?.newType === 'Number'
            ? ApiGatewayConstants.conditionsMathInputMediator
            : ApiGatewayConstants.conditionsMediationsNodeInputMediator;

        return options.find((x: any) => x.code === code)?.name ?? '';
    }

    onClientsChange(event: any) {
        // اگر search با لیست کلاینت‌ها کار می‌کند:

        // اگر جایی هنوز "clientId" تکی لازم داری، می‌تونی یکی رو به عنوان پیش‌فرض ست کنی:
        this.clientId = this.selectedClientIds?.length ? this.selectedClientIds[0] : null;
    }

    onStringModeChange(rule: RuleModel) {

        if (rule.stringConditionMode === 'none') {
            rule.stringRuleCondition = null;
            rule.stringCompareValue = '';
        }

        if (rule.stringConditionMode === 'single') {
            // چیز خاصی نداره فعلاً
        }

        this.updateOutputPreview();
    }

    onNumberModeChange(rule: RuleModel) {
        console.log('MODE CHANGED =>', rule.numberConditionMode);

        if (rule.numberConditionMode === 'none') {
            rule.ruleCondition = null;
            rule.compareTargetValue = '';
            rule.rangeCondition1 = null;
            rule.rangeValue1 = '';
            rule.rangeCondition2 = null;
            rule.rangeValue2 = '';
        }

        if (rule.numberConditionMode === 'single') {
            // فقط range رو پاک کن
            rule.rangeCondition1 = null;
            rule.rangeValue1 = '';
            rule.rangeCondition2 = null;
            rule.rangeValue2 = '';
        }

        if (rule.numberConditionMode === 'range') {
            // فقط single رو پاک کن
            rule.ruleCondition = null;
            rule.compareTargetValue = '';
        }

        this.updateOutputPreview();
    }

    onNewTypeChange(rule: RuleModel) {
        if (rule.newType === 'Number') {
            rule.pre = '';
            rule.post = '';
            rule.numberConditionMode = rule.numberConditionMode ?? 'single';
        } else {
            rule.numberConditionMode = rule.numberConditionMode ?? 'none';
        }
        rule.ruleCondition = null;
        rule.compareTargetValue = '';
        rule.rangeCondition1 = null;
        rule.rangeValue1 = '';
        rule.rangeCondition2 = null;
        rule.rangeValue2 = '';

        this.updateOutputPreview();
    }

    BeforeButton() {
        this.close.emit('close');

    }

    buildAvailablePaths(): { name: string; code: string }[] {
        const data = this.lastParsedInput;
        if (!data) return [];

        const paths: string[] = [];

        const isObjectOrArray = (v: any) =>
            v !== null && (Array.isArray(v) || typeof v === 'object');

        const walk = (val: any, path: string) => {
            if (path && !isObjectOrArray(val)) {
                paths.push(path);
            }

            if (val && typeof val === 'object') {
                if (Array.isArray(val)) {
                    val.forEach((item, i) =>
                        walk(item, path ? `${path}[${i}]` : `[${i}]`),
                    );
                } else {
                    Object.keys(val).forEach((k) => {
                        const nextPath = path ? `${path}.${k}` : k;
                        walk(val[k], nextPath);
                    });
                }
            }
        };

        walk(data, '');

        return [{ name: '-', code: '' }, ...paths.map(p => ({ name: p, code: p }))];
    }

    saveNodeMediations() {
        this.openSaveConfirmDialog();
    }

    private openSaveConfirmDialog() {

        if (!this.mediatorTitle || !this.mediatorTitle.trim()) {
            this.notifierService.showError({
                detail: 'لطفا عنوان مدیاتور را وارد کنید!',
                life: 4000,
            });
            return;
        }
        if (!this.selectedClientIds || this.selectedClientIds.length === 0) {
            this.notifierService.showError({
                detail: 'هیچ کلاینتی جهت اعمال مدیاتور ورودی انتخاب نشده است!',
                life: 4000,
            });
            return;
        }
// =========================
// 🔴 VALIDATION: EMPTY RENAME PATH
// =========================
        for (const rule of this.rules) {
            if (rule.deleted === true) {
                continue;
            }
            const fromPath = (rule.path || '').trim();
            const toPath = (rule.targetPath || '').trim();

            const isRenamed = fromPath && (toPath !== fromPath);

            if (isRenamed && !toPath) {
                const nodeName = fromPath || 'بدون نام';

                this.notifierService.showError({
                    detail: `لطفا مسیر نود جدید برای "${nodeName}" وارد نمایید!`,
                    life: 4000,
                });

                return; // ⛔ جلوگیری از save
            }
        }

        // =========================
// 🔴 VALIDATION: JS CODE REQUIRED
// =========================
        for (const rule of this.rules) {
            debugger
            if (rule.deleted === true) {
                continue;
            }
            if (rule.action == 2) {

                const jsCode = (rule.jsCode || '').trim();

                if (!jsCode) {

                    const nodeName =
                        (rule.targetPath || rule.path || 'بدون نام');

                    this.notifierService.showError({
                        detail: `لطفا کد جاوا اسکریپت رو برای "${nodeName}" وارد نمایید!`,
                        life: 4000,
                    });

                    return; // ⛔ جلوگیری از save
                }
            }
        }
        // =========================
// 🔴 VALIDATION: MAPPING بدون مقدار
// =========================
        for (const rule of this.rules) {
            if (rule.deleted === true) {
                continue;
            }

            if (rule.action == 1) {

                const mapValue = (rule.mapTo || '').trim();

                if (!mapValue) {

                    const nodeName =
                        (rule.path || '').trim() ||
                        (rule.targetPath || '').trim() ||
                        'بدون نام';

                    this.notifierService.showError({
                        detail: `لطفا مقدار جدید رو برای "${nodeName}" جهت mapping وارد نمایید!`,
                        life: 4000,
                    });

                    return; // ⛔ جلوگیری از save
                }
            }
        }
        // =========================
// 🔴 VALIDATION: SERVICE SELECTION (party / module / api)
// =========================
        for (const rule of this.rules) {
            console.log('partyId =>', rule.partyId, typeof rule.partyId);
            if (rule.deleted === true) {
                continue;
            }
            // 🟡 نام مشتری
            if (rule.action == 3 && !rule.partyId) {
                const nodeName = (rule.targetPath || rule.path || 'بدون نام');

                this.notifierService.showError({
                    detail: `لطفا نام مشتری را برای "${nodeName}" انتخاب نمایید!`,
                    life: 4000,
                });

                return;
            }

            // 🟡 ماژول
            if (rule.action == 3 && !rule.moduleId) {
                const nodeName = (rule.targetPath || rule.path || 'بدون نام');

                this.notifierService.showError({
                    detail: `لطفا عنوان ماژول را برای "${nodeName}" انتخاب نمایید!`,
                    life: 4000,
                });

                return;
            }

            // 🟡 سرویس
            if (rule.action == 3 && !rule.apiId) {
                const nodeName = (rule.targetPath || rule.path || 'بدون نام');

                this.notifierService.showError({
                    detail: `لطفا عنوان سرویس را برای "${nodeName}" انتخاب نمایید!`,
                    life: 4000,
                });

                return;
            }
        }
        // =========================
// 🔴 VALIDATION: SERVICE RESPONSE PATH
// =========================
        for (const rule of this.rules) {
            if (rule.deleted === true) {
                continue;
            }
            const responsePath = (rule.serviceResponsePath || '').trim();

            if (rule.action == 3 && !responsePath) {

                const nodeName =
                    (rule.targetPath || rule.path || 'بدون نام');

                this.notifierService.showError({
                    detail: `لطفا مسیر نود ریسپانس سرویس را برای "${nodeName}" وارد نمایید!`,
                    life: 4000,
                });

                return;
            }
        }
        const rep = this.getSaveDialogReport();

        this.saveReportActionItems = rep.actionItems;
        this.saveReportAddedCount = rep.addedCount;
        this.saveReportDeletedCount = rep.deletedCount;

        this.confirmationService.confirm({
            key: 'saveDialog',
            header: 'تایید ثبت اطلاعات',
            icon: 'pi pi-question',
            message: 'آیا برای ثبت اطلاعات اطمینان دارید؟',
            accept: () => this.doSaveNodeMediations(),
            reject: () => this.rejectFunc(),
        });
    }

    private mapSimpleType(type: JsonType): number {
        switch (type) {
            case 'Number':
                return 1;
            case 'String':
                return 0;
            default:
                console.warn('Unsupported type:', type);
                return 0;
        }
    }

    getSaveDialogReport(): {
        actionItems: { label: string; count: number }[];
        addedCount: number;
        deletedCount: number;
    } {
        const stats = this.getOpsStats();

        const actionCounts: Record<number, number> = {};

        for (const r of (this.rules ?? [])) {
            if (r?.deleted === true) continue;

            const ops = this.detectOpsForRule(r);

            // ✅ فقط وقتی هیچ عملیاتی نیست
            if (ops.size === 0) {
                actionCounts[0] = (actionCounts[0] || 0) + 1;
            } else {
                // اگر action واقعی داشت
                if (r.action != null && r.action !== 0) {
                    actionCounts[r.action] = (actionCounts[r.action] || 0) + 1;
                }
            }
        }

        const actionItems = [
            ...this.actionOptions.map(opt => ({
                label: opt.label,
                count: actionCounts[opt.value] ?? 0,
            })),

            {
                label: 'تغییر مسیر نود',
                count: stats.pathChanged,
            },
            {
                label: 'تغییر مقدار نود (prefix/postfix)',
                count: stats.hasAffix,
            },
            {
                label: 'Encoding',
                count: stats.nCoding,
            },
        ];

        const addedCount = stats.added;
        const deletedCount = stats.deleted;

        return { actionItems, addedCount, deletedCount };
    }

    addNewRule() {
        if (!this.jsonInput?.trim() || this.jsonStatus !== 'valid') {
            this.notifierService.showError({
                detail: 'ابتدا جیسون صحیح را وارد کنید!',
                life: 3000,
            });
            return;
        }

        const r = this.createEmptyRule();
        r.isNewlyAdded = true;
        r.kind = 'new';
        r.newType = 'String';
        r.action = 1;
        r.mapTo = '';
        r.path = '';
        r.targetPath = '';
        r.originalType = 'String';
        r.targetPath = this.getUniqueNewNodeName('newNode');
        r.newPath = r.targetPath;
        this.rules.push(r);

        this.notifierService.showInfo({
            detail: 'کادر نود جدید افزوده شد',
            life: 3000,
        });

        this.updateOutputPreview();
    }

    confirm(index) {
        const rule = this.rules[index];
        let nodePath = rule?.path?.trim();
        if (!nodePath) {
            nodePath = rule?.targetPath?.trim();
        }
        if (!nodePath) {
            nodePath = 'بدون مسیر';
        }
        this.confirmationService.confirm({
            message: `آیا از حذف نود ${nodePath} اطمینان دارید؟`,
            header: 'تایید حذف',
            icon: 'pi pi-exclamation-triangle',
            key: 'deleteNodeDialog',
            accept: () => this.onAccept(index),
            reject: () => this.rejectFunc(),
        });
    }

    clearAll() {
        this.confirmationService.confirm({
            message: 'آیا از حذف همه نودها اطمینان دارید؟',
            header: 'تایید حذف',
            icon: 'pi pi-exclamation-triangle',
            key: 'deleteAllDialog',
            accept: () => this.onAcceptDeleteAll(),
            reject: () => this.rejectFunc(),
        });

    }

   private buildValidator(rule: RuleModel) {

        // 🔥 لاگ ورودی (باید اول باشه)
        console.log('🧠 BUILD VALIDATOR INPUT =>', {
            path: rule.path,
            target: rule.targetPath,
            mode: rule.numberConditionMode,
            ruleCondition: rule.ruleCondition,
            compareTargetValue: rule.compareTargetValue,
            range1: rule.rangeValue1,
            range2: rule.rangeValue2,
            stringMode: rule.stringConditionMode,
            stringCondition: rule.stringRuleCondition,
            stringValue: rule.stringCompareValue,
        });

        // =========================
        // 🔥 STRING VALIDATOR
        // =========================
        if (rule.newType !== 'Number') {

            if (
                rule.stringConditionMode === 'single' &&
                rule.stringRuleCondition &&
                rule.stringCompareValue
            ) {

                const result = {
                    sourceNodeValidatorComparatorValue: rule.stringCompareValue ?? null,
                    sourceNodeValidatorOperand: this.mapOperatorToNumber(rule.stringRuleCondition),
                    sourceNodeValidatorComparatorSecondValue: null,
                    sourceNodeValidatorSecondOperand: null,
                    sourceNodeHasValidator: 1,
                };

                console.log('🟣 VALIDATOR RESULT (string single) =>', result);

                return result;
            }

            const result = {
                sourceNodeValidatorComparatorValue: null,
                sourceNodeValidatorOperand: null,
                sourceNodeValidatorComparatorSecondValue: null,
                sourceNodeValidatorSecondOperand: null,
                sourceNodeHasValidator: 0,
            };

            console.log('❌ VALIDATOR RESULT (string none) =>', result);

            return result;
        }

        const mode = rule.numberConditionMode ?? 'none';

        // 🔥 AUTO FIX
        if (
            mode === 'none' &&
            (rule.compareTargetValue || rule.rangeValue1 || rule.rangeValue2)
        ) {
            console.warn('⚠️ mode was none but values exist → auto switch to single');

            rule.numberConditionMode = 'single';
        }

        // =========================
        // NONE
        // =========================
        if (mode === 'none') {

            const result = {
                sourceNodeValidatorComparatorValue: null,
                sourceNodeValidatorOperand: null,
                sourceNodeValidatorComparatorSecondValue: null,
                sourceNodeValidatorSecondOperand: null,
                sourceNodeHasValidator: 0,
            };

            console.log('❌ VALIDATOR RESULT (none) =>', result);

            return result;
        }

        // =========================
        // SINGLE
        // =========================
        if (mode === 'single') {

            const result = {
                sourceNodeValidatorComparatorValue: rule.compareTargetValue ?? null,
                sourceNodeValidatorOperand: this.mapOperatorToNumber(rule.ruleCondition),
                sourceNodeValidatorComparatorSecondValue: null,
                sourceNodeValidatorSecondOperand: null,
                sourceNodeHasValidator: 1,
            };

            console.log('✅ VALIDATOR RESULT (single) =>', result);

            return result;
        }

        // =========================
        // RANGE (فقط Number)
        // =========================
        if (mode === 'range' && rule.newType === 'Number') {

            const result = {
                sourceNodeValidatorComparatorValue: rule.rangeValue1 ?? null,
                sourceNodeValidatorOperand: this.mapOperatorToNumber(rule.rangeCondition1),
                sourceNodeValidatorComparatorSecondValue: rule.rangeValue2 ?? null,
                sourceNodeValidatorSecondOperand: this.mapOperatorToNumber(rule.rangeCondition2),
                sourceNodeHasValidator: 1,
            };

            console.log('📊 VALIDATOR RESULT (range) =>', result);

            return result;
        }

        // =========================
        // FALLBACK
        // =========================
        const result = {
            sourceNodeValidatorComparatorValue: null,
            sourceNodeValidatorOperand: null,
            sourceNodeValidatorComparatorSecondValue: null,
            sourceNodeValidatorSecondOperand: null,
            sourceNodeHasValidator: 0,
        };

        console.log('⚠️ VALIDATOR RESULT (fallback) =>', result);

        return result;
    }

    rejectFunc() {
        console.log('عملیات لغو شد.');
    }

    onAcceptDeleteAll() {
        this.jsonInput = '';
        this.jsonOutput = 'waiting for input...';
        this.jsonStatus = 'empty';
        this.jsonIssue = null;

        this.rules = [];
        this.availablePaths = [];
        this.lastParsedInput = null;
        this.lastJsonFingerprint = '';
        this.updateOutputPreview();

        this.notifierService.showInfo({
            detail: 'همه نودها و مدیشن ها پاک شدند',
            life: 3000,
        });
    }

/*
    private onAccept(index) {
        const rule = this.rules[index];

        let nodePath = rule?.path?.trim();

        if (!nodePath) {
            nodePath = rule?.targetPath?.trim();
        }

        if (!nodePath) {
            nodePath = 'بدون مسیر';
        }


        if (rule.kind === 'new') {
            this.rules.splice(index, 1);
        } else {
            rule.deleted = true;
        }

        this.notifierService.showInfo({
            detail: `نود ${nodePath} حذف گردید!`,
            life: 3000,
        });

        this.updateOutputPreview();
    }
*/

    private onAccept(index: number) {

        const rule = this.rules[index];

        let nodePath = rule?.path?.trim();

        if (!nodePath) {
            nodePath = rule?.targetPath?.trim();
        }

        if (!nodePath) {
            nodePath = 'بدون مسیر';
        }

        // ✅ فقط mark شود
        rule.deleted = true;

        this.notifierService.showInfo({
            detail: `نود ${nodePath} حذف گردید!`,
            life: 3000,
        });

        this.updateOutputPreview();
    }


    removeRule(index: number) {
        this.confirm(index);

    }

    onTabChange(index: number) {
        this.activeTabIndex = index;
        if (this.activeTabIndex === 1) this.updateOutputPreview();
    }

    trackByRule(index: number, r: RuleModel): string {
        return r.id;
    }

 /*   private generateUUID(): string {
        // اگر randomUUID وجود داشت
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }

        // fallback استاندارد
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }*/
    private generateUUID(): string {

        if (
            typeof globalThis !== 'undefined' &&
            globalThis.crypto &&
            !globalThis.crypto.randomUUID
        ) {

            globalThis.crypto.randomUUID = function (): `${string}-${string}-${string}-${string}-${string}` {

                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    .replace(/[xy]/g, (c) => {

                        const r = Math.random() * 16 | 0;

                        const v = c === 'x'
                            ? r
                            : (r & 0x3 | 0x8);

                        return v.toString(16);
                    }) as `${string}-${string}-${string}-${string}-${string}`;
            };
        }

        // Fallback
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x'
                ? r
                : (r & 0x3) | 0x8;

            return v.toString(16);
        });
    }
    createEmptyRule(): RuleModel {
        return {
            id: this.generateUUID(),
            isNewlyAdded: false,
            kind: 'existing',
            stringConditionMode: 'none',
            path: '',
            targetPath: '',
            originalType: 'String',
            serviceResponsePath: '',
            newPath: '',

            newType: 'String',
            action: 0,

            autoDecodeToMapFrom: false,
            jsCode: `const d = new Date();

const result =
  "0543" +
  d.getFullYear().toString() +
  ('0' + (d.getMonth() + 1)).slice(-2) +
  ('0' + d.getDate()).slice(-2) +
  ('0' + d.getHours()).slice(-2) +
  ('0' + d.getMinutes()).slice(-2) +
  ('0' + d.getSeconds()).slice(-2) +
  ('00' + d.getMilliseconds()).slice(-3) +
  ('00' + Math.floor(Math.random() * 1000)).slice(-3);

return result;`,
            serviceName: this.serviceOptions[0],
            encodeMethod: 'Base64',
            decodeMethod: 'Base64',
            numberConditionMode: 'none',

            rangeCondition1: null,
            rangeValue1: '',
            rangeCondition2: null,
            rangeValue2: '',
            mapFrom: '',
            mapTo: '',

            pre: '',
            post: '',
            preUi: '',
            postUi: '',
            sendNodeAsQueryParam: 0,
            partyId: null,
            moduleId: null,
            apiId: null,
            moduleOptions: [{ moduleTitle: '-', moduleId: null }],
            apiOptions: [{ title: '-', apiId: null }],
            partyOptions: [{ title: '-', partyId: null }],
            matchList: [],
            prevActionBeforeAutoDecode: null,
            ruleCondition: null,
            functionTypeNumber: null,
            expressionFlag: false,
            operand2Value: '',
            compareTargetValue: '',
            finalEncode: false,
        };
    }

    getJsonRawValue(rule: RuleModel): string {
        if (!this.lastParsedInput) return '';

        const basePath = (rule.path || '').trim();
        if (!basePath) return '';

        const nodeValue = this.getByPath(this.lastParsedInput, basePath);

        if (nodeValue === undefined) return '';

        if (typeof nodeValue === 'object' && nodeValue !== null) {
            try {
                return JSON.stringify(nodeValue);
            } catch {
                return String(nodeValue);
            }
        }

        return String(nodeValue);
    }

    onChangeParty(rule: RuleModel, event: any) {
        debugger
        debugger
        debugger
        rule.matchList = [];
        rule.apiId = null;
        rule.apiOptions = [{ title: '-', apiId: null }];

        const selectedPartyId = event ?? null;

        if (selectedPartyId != null) {
            rule.partyId = selectedPartyId;

            this._primengProgressBarService.show();
            this.messagesApiFacadeService.moduleSearchByPartyId(selectedPartyId).subscribe(
                (m) => {
                    this._primengProgressBarService.hide();

                    rule.moduleId = null;
                    rule.moduleOptions = [{ moduleTitle: '-', moduleId: null }, ...m].sort();
                },
                () => this._primengProgressBarService.hide(),
            );
        } else {
            rule.partyId = null;

            rule.moduleId = null;
            rule.moduleOptions = [{ moduleTitle: '-', moduleId: null }];

            rule.apiId = null;
            rule.apiOptions = [{ title: '-', apiId: null }];
        }
    }

    onChangeApi(rule: RuleModel, event: any) {
        const selectedApiId = event?.value ?? null;

        if (selectedApiId != null) {
            rule.apiId = selectedApiId;
            const api = (rule.apiOptions || []).find(x => x.apiId === selectedApiId);
            rule.apiTitle = api?.title ?? null;
        } else {
            rule.apiId = null;
            rule.apiTitle = null;
        }

        rule.matchList = [];
        this.updateOutputPreview();
    }

    runJsTransform(rule: RuleModel, value: any, context: any) {
        const code = (rule.jsCode ?? '').trim();
        if (!code) return value;
        const fn = new Function(
            'value',
            'rule',
            'ctx',
            `
    "use strict";
    ${code}
    `,
        );
        return fn(value, rule, context);
    }

    private applyJsRule(rule: RuleModel, baseValue: any): { ok: boolean; value: any; error?: string } {
        try {
            const ctx = {
                json: this.lastParsedInput,            // json ورودی
                path: (rule.path || '').trim(),        // مسیر نود
                targetPath: (rule.targetPath || '').trim(),
                getByPath: (p: string) => this.getByPath(this.lastParsedInput, p),
                // اگر خواستی encode/decode هم بده
                b64Encode: (s: string) => this.b64Encode(s),
                b64Decode: (s: string) => this.b64Decode(s),
            };

            const out = this.runJsTransform(rule, baseValue, ctx);

            // اگر undefined برگردوند، بهتره مقدار قبلی رو نگه داریم
            if (typeof out === 'undefined') {
                return { ok: true, value: baseValue };
            }

            return { ok: true, value: out };
        } catch (e: any) {
            return { ok: false, value: baseValue, error: String(e?.message ?? e) };
        }
    }

    flattenPrimitiveValues(val: any, out: string[] = []): string[] {
        if (val === null || val === undefined) return out;

        if (Array.isArray(val)) {
            for (const item of val) this.flattenPrimitiveValues(item, out);
            return out;
        }

        if (typeof val === 'object') {
            for (const k of Object.keys(val)) this.flattenPrimitiveValues(val[k], out);
            return out;
        }

        // primitive
        out.push(String(val));
        return out;
    }

    formatForDisplay(val: any): string {
        if (val === null || val === undefined) return '';

        if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
            const flat = this.flattenPrimitiveValues(val);
            return flat.join(', '); // ✅ بدون [] و {}
        }

        return String(val);
    }

    onChangeModule(rule: RuleModel, event: any) {
        debugger
        debugger
        debugger
        // هر بار ماژول عوض شد، سرویس‌ها باید ریست شوند
        rule.matchList = [];
        rule.apiId = null;
        rule.apiOptions = [{ title: '-', apiId: null }];

        const selectedModuleId = event.value ?? null;

        if (selectedModuleId != null) {
            rule.moduleId = selectedModuleId;

            this._primengProgressBarService.show();

            this.messagesApiFacadeService.apiNochart(0, 10000, selectedModuleId).subscribe(
                (apis) => {
                    this._primengProgressBarService.hide();

                    rule.apiOptions = [{ title: '-', apiId: null }, ...apis];

                    rule.apiOptions = rule.apiOptions.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

                    rule.apiId = null;
                },
                () => this._primengProgressBarService.hide(),
            );
        } else {
            rule.moduleId = null;
            rule.apiId = null;
            rule.apiOptions = [{ title: '-', apiId: null }];
        }

        this.updateOutputPreview();
    }

    private inferJsonType(val: any): JsonType {
        if (val === null || val === undefined) return 'String';
        switch (typeof val) {
            case 'string':
                return 'String';
            case 'number':
                return 'Number';
            default:
                return 'String';
        }
    }

    private generateRulesFromJson(data: any): RuleModel[] {
        const out: RuleModel[] = [];
        const isObjectOrArray = (v: any) =>
            v !== null && (Array.isArray(v) || typeof v === 'object');

        const walk = (val: any, path: string) => {
            if (path && !isObjectOrArray(val)) {
                const t = this.inferJsonType(val);
                out.push({
                    ...this.createEmptyRule(),
                    path,
                    targetPath: path,
                    originalType: t,
                    newType: t,
                    action: 0,
                    pre: '',
                    post: '',
                });
            }
            if (isObjectOrArray(val)) {
                if (Array.isArray(val)) {
                    val.forEach((item, i) => walk(item, path ? `${path}[${i}]` : `[${i}]`));
                } else {
                    Object.keys(val).forEach((k) => {
                        const nextPath = path ? `${path}.${k}` : k;
                        walk(val[k], nextPath);
                    });
                }
            }
        };

        walk(data, '');
        return out;
    }

    private isProbablyBase64(str: string): boolean {
        if (!str || typeof str !== 'string') return false;
        const s = str.trim();
        if (s.length % 4 !== 0) return false;
        if (!/^[A-Za-z0-9+/=]+$/.test(s)) return false;

        try {
            atob(s);
            return true;
        } catch {
            return false;
        }
    }

    sortInputJson(): void {
        const inputStr = this.jsonInput ?? '';
        if (!inputStr.trim()) return;

        if (this.jsonStatus === 'invalid') return;

        let data: any;
        try {
            data = JSON.parse(inputStr);
        } catch {
            this.jsonStatus = 'invalid';
            return;
        }

        const sorted = this.sortDeepKeysKeepArrays(data, true);
        this.jsonInput = JSON.stringify(sorted, null, 4);
        this.lastJsonFingerprint = this.fingerprint(sorted);
        this.updateOutputPreview();
    }

    sortDeepKeysKeepArrays(x: any, isRoot = false): any {
        if (Array.isArray(x)) {
            return x.map(v => this.sortDeepKeysKeepArrays(v, false));
        }
        if (x && typeof x === 'object') {
            const out: any = {};
            const keys = Object.keys(x);

            const iterKeys = isRoot
                ? keys
                : keys.sort((a, b) => a.localeCompare(b));

            for (const k of iterKeys) {
                out[k] = this.sortDeepKeysKeepArrays(x[k], false);
            }
            return out;
        }
        return x;
    }

    private b64Encode(str: string): string {
        return btoa(unescape(encodeURIComponent(str)));
    }

    getDisplayedOriginalValue(rule: RuleModel): string {
        const rawStr = this.getRawOriginalValue(rule);
        if (!rawStr) return '';
        if (rule.autoDecodeToMapFrom === true) {
            const basePath = (rule.path || '').trim();
            const nodeValue = basePath ? this.getByPath(this.lastParsedInput, basePath) : null;

            if (typeof nodeValue === 'string' && this.isProbablyBase64(nodeValue)) {
                try {
                    return this.b64Decode(nodeValue);
                } catch {
                    return 'DECODE_ERROR';
                }
            }
        }

        return rawStr;
    }

    private b64Decode(str: string): string {
        return decodeURIComponent(escape(atob(str)));
    }

    onAutoDecodeToMapFromToggle(rule: RuleModel, ev: any) {
        rule.autoDecodeToMapFrom = ev?.checked === true;
        this.updateOutputPreview();
    }

    getRawOriginalValue(rule: RuleModel): string {
        if (!this.lastParsedInput) return '';

        const basePath = (rule.path || '').trim();
        if (!basePath) return '';

        const nodeValue = this.getByPath(this.lastParsedInput, basePath);
        if (nodeValue === null || nodeValue === undefined) return '';

        return this.formatForDisplay(nodeValue); // همیشه RAW (بدون decode)
    }

    getServiceTitle(rule: RuleModel): string {
        return (rule as any)?.apiTitle?.trim() ? (rule as any).apiTitle : 'node';
    }

    getFinalPreviewValue(rule: RuleModel, includeAffixes: boolean = true): string {
        const rawBase = this.getRawOriginalValue(rule);
        let v: any = rawBase;

        const allowDecode = rule.autoDecodeToMapFrom === true;

        if (allowDecode) {
            const basePath = (rule.path || '').trim();
            const nodeValue = basePath ? this.getByPath(this.lastParsedInput, basePath) : null;

            if (typeof nodeValue === 'string' && this.isProbablyBase64(nodeValue)) {
                try {
                    v = this.b64Decode(nodeValue);
                } catch {
                    v = 'DECODE_ERROR';
                }
            }
        }

        switch (rule.action) {
            case 1: {
                const to = (rule.mapTo ?? '').trim();
                v = to ? to : this.getDisplayedOriginalValue(rule);
                break;
            }

            case 2:
                v = String(v ?? '');
                break;

            case 3:
                v = 'نتیجه ریسپانس سرویس';
                break;

            case 0:
            default:
                break;
        }

        let out = String(v ?? '');

        if (includeAffixes) {
            out = (rule.pre || '') + out + (rule.post || '');
        }

        if (rule.finalEncode === true) {
            out = this.b64Encode(out);
        }

        return out;
    }

    applyPathTransform(obj: any, fromPath: string, toPath: string, value: any) {

        const isWrap = toPath.startsWith(fromPath + '.');

        // =========================
        // 🧠 CASE 1: WRAP
        // =========================
        if (isWrap) {

            const parentPath = fromPath;
            const parentValue = this.getByPath(obj, parentPath);

            // اگر primitive بود → تبدیل به object
            if (parentValue !== null && typeof parentValue !== 'object') {

                const newObj = {};

                // گرفتن قسمت بعد از fromPath
                const restPath = toPath.slice(fromPath.length + 1);

                this.setByPath(newObj, restPath, parentValue);

                this.setByPath(obj, parentPath, newObj);

                return;
            }
        }

        // =========================
        // 🧠 CASE 2: NORMAL MOVE / RENAME
        // =========================
        this.deleteByPath(obj, fromPath);
        this.setByPath(obj, toPath, value);
    }

    applyDeleteOnOutputJson(rawJson: string, rules: RuleModel[]): string {
        try {
            let obj = new Function(`return (${rawJson})`)();

            for (const rule of rules) {

                const isDeleted = rule.deleted === true;

                if (isDeleted) {

                    const path = (rule.targetPath || rule.path || '').trim();

                    if (!path) continue;

                    this.deleteByPath(obj, path);
                }
            }

            return this.toBackendFormat(JSON.stringify(obj));

        } catch (e) {
            console.error('DELETE APPLY ERROR', e);
            return rawJson;
        }
    }
   updateOutputPreview() {

        if (this.isUpdatingPreview) return;
        this.isUpdatingPreview = true;

        try {

            const inputStr = this.jsonInput ?? '';

            // =========================
            // EMPTY
            // =========================
            if (!inputStr.trim()) {
                this.jsonStatus = 'empty';
                this.jsonOutput = 'waiting for input...';

                if (!this.isEditMode) {
                    this.rules = [];
                    this.availablePaths = [];
                    this.lastParsedInput = null;
                    this.lastJsonFingerprint = '';
                }

                return;
            }

            // =========================
            // PARSE
            // =========================
            let data: any;

            try {
                data = JSON.parse(inputStr);
                this.jsonStatus = 'valid';
            } catch {
                this.jsonStatus = 'invalid';
                this.jsonOutput = 'JSON INVALID';
                return;
            }

            if (this.isEditMode && this.isFirstPreviewAfterLoad) {
                this.isFirstPreviewAfterLoad = false;
                return;
            }

            // =========================
            // 🔥 SAVE ORDER (فقط یکبار)
            // =========================
            if (!this.originalJsonOrder) {
                this.originalJsonOrder = this.extractOrder(data);
            }

            // =========================
            // PREPARE
            // =========================
            this.lastParsedInput = data;
            this.availablePaths = this.buildAvailablePaths();

            const fp = this.fingerprint(data);

            if (this.autoGenerateRules && fp !== this.lastJsonFingerprint) {

                const existingRules = this.rules.filter(r => r.kind !== 'new');
                const newRules = this.rules.filter(r => r.kind === 'new');

                const oldMap = new Map(
                    existingRules.map(r => [this.normalizeName(r.path), r]),
                );

                const fresh = this.generateRulesFromJson(data);

                const merged: RuleModel[] = fresh.map(r => {
                    const old = oldMap.get(this.normalizeName(r.path));

                    if (old) {
                        return {
                            ...r,
                            ...old,
                            path: r.path,
                            mediatorId: old.mediatorId,
                            isNewlyAdded: old.isNewlyAdded ?? false,
                            targetPath: old.targetPath?.trim() ? old.targetPath : r.targetPath,
                            kind: old.mediatorId ? 'existing' : 'new',
                        };
                    }

                    return {
                        ...this.createEmptyRule(),
                        ...r,
                        kind: 'existing',
                    };
                });

                this.rules = [...merged, ...newRules];
                this.lastJsonFingerprint = fp;
            }

            // =========================
            // NO CHANGE
            // =========================
            const hasAnyChange = this.rules.some(r =>
                r.kind === 'new' || this.detectOpsForRule(r).size > 0,
            );

            if (!hasAnyChange && !this.isEditMode) {
                this.jsonOutput = JSON.stringify(data, null, 4);
                return;
            }

            // =========================
            // APPLY RULES
            // =========================
            const result = JSON.parse(JSON.stringify(data));

            for (const rule of this.rules) {

                const ops = this.detectOpsForRule(rule);
                if (rule.action === 0) {
                    rule.pre = '';
                    rule.post = '';
                }
                if (ops.size === 0 && rule.deleted !== true) continue;


                const fromPath = (rule.path || '').trim();
                const toPath =
                    (rule.targetPath || '').trim() ||
                    (rule.newPath || '').trim() ||
                    fromPath;

                // =========================
                // DELETE
                // =========================
            /*    if (rule.deleted === true) {

                    const deletePath =
                        (rule.targetPath || '').trim() ||
                        (rule.path || '').trim();

                    if (deletePath) {
                        this.deleteByPath(result, deletePath);
                    }

                    continue;
                }*/

                if (rule.deleted === true) {

                    const fromPath = (rule.path || '').trim();
                    const toPath = (rule.targetPath || '').trim();

                    // اگر rename شده
                    if (
                        fromPath &&
                        toPath &&
                        fromPath !== toPath
                    ) {

                        this.deleteByPath(result, fromPath);
                        this.deleteByPath(result, toPath);

                    } else {

                        const deletePath = toPath || fromPath;

                        if (deletePath) {
                            this.deleteByPath(result, deletePath);
                        }
                    }

                    continue;
                }
                // =========================
                // NEW NODE
                // =========================
                if (rule.kind === 'new') {

                    let finalValue: any = rule.mapTo ?? '';

                    // 🔥 JS for new node
                    if (rule.action === 2) {
                        const r = this.applyJsRule(rule, finalValue);

                        if (!r.ok) {
                            this.notifierService.showError({
                                detail: `خطا در اجرای JS: ${r.error}`,
                                life: 4000,
                            });
                            return;
                        }

                        finalValue = r.value;
                    }

                    if (rule.action !== 0 && (rule.pre || rule.post)) {
                        finalValue = (rule.pre || '') + String(finalValue) + (rule.post || '');
                    }

                    const prevEncode = rule.finalEncode;

                    if (rule.finalEncode === true) {
                        finalValue = this.b64Encode(String(finalValue));
                    }

                    if (rule.newType === 'Number') {
                        const num = Number(finalValue);
                        if (isNaN(num)) {
                            this.notifierService.showError({
                                detail: `مقدار "${finalValue}" برای فیلد Number معتبر نیست`,
                                life: 3000,
                            });
                            rule.finalEncode = prevEncode;
                            return;
                        }
                        finalValue = num;
                    } else {
                        finalValue = String(finalValue);
                    }

                    this.setByPath(result, toPath, finalValue);
                    continue;
                }

                // =========================
                // EXISTING NODE
                // =========================
                const currentValue = this.getByPath(result, fromPath);

                if (currentValue === undefined) continue;

                let finalValue: any = currentValue;

                // mapping
                if (rule.action === 1 && rule.mapTo) {
                    finalValue = rule.mapTo;
                }

                // 🔥 JS
                if (rule.action === 2) {
                    const r = this.applyJsRule(rule, currentValue);

                    if (!r.ok) {
                        this.notifierService.showError({
                            detail: `خطا در اجرای JS: ${r.error}`,
                            life: 4000,
                        });
                        return;
                    }

                    finalValue = r.value;
                }
// =========================
// SERVICE
// =========================
                if (rule.action === 3) {
                    const serviceName =
                        (rule.apiTitle || '').trim() ||
                        (rule.serviceName || '').trim() ||
                        'نامشخص';

                    finalValue = `ریسپانس سرویس${serviceName}`;
                }
                // affix
                if (rule.pre || rule.post) {
                    finalValue = (rule.pre || '') + String(finalValue) + (rule.post || '');
                }

                // encode
                if (rule.finalEncode === true) {
                    finalValue = this.b64Encode(String(finalValue));
                }

                // type
                if (rule.newType === 'Number') {
                    const num = Number(finalValue);
                    if (isNaN(num)) {
                        this.notifierService.showError({
                            detail: `امکان Encode برای فیلد "${finalValue}" با تایپ Number معتبر نیست! لطفا تایپ را به string تغییر دهید!`,
                            life: 3000,
                        });
                        return;
                    }
                    finalValue = num;
                } else {
                    finalValue = String(finalValue);
                }

                if (rule.action === 0) {
                    rule.pre = '';
                    rule.post = '';
                }

                this.applyPathTransform(result, fromPath, toPath, finalValue);
            }

            // =========================
            // 🔥 APPLY ORIGINAL ORDER
            // =========================
            const orderedResult = this.rebuildWithOrder(this.originalJsonOrder, result);

            this.jsonOutput = JSON.stringify(orderedResult, null, 4);


        } catch (e) {
            console.error(e);
            this.jsonOutput = 'PREVIEW ERROR';
        } finally {
            this.isUpdatingPreview = false;
        }
    }
    copyOutput(): void {

        if (!this.jsonOutput || this.jsonOutput === 'waiting for input...') {

            this.notifierService.showError({
                detail: 'خروجی‌ای برای کپی وجود ندارد',
                life: 3000,
            });

            return;
        }

        // روش جدید
        if (navigator.clipboard && window.isSecureContext) {

            navigator.clipboard.writeText(this.jsonOutput)
                .then(() => {

                    this.notifierService.showSuccess({
                        detail: 'JSON کپی شد',
                        life: 3000,
                    });

                })
                .catch(() => {
                    this.fallbackCopy();
                });

        } else {

            // fallback
            this.fallbackCopy();
        }
    }

    fallbackCopy(): void {

        const textarea = document.createElement('textarea');

        textarea.value = this.jsonOutput;

        // جلوگیری از اسکرول
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {

            const successful = document.execCommand('copy');

            if (successful) {

                this.notifierService.showSuccess({
                    detail: 'JSON کپی شد',
                    life: 3000,
                });

            } else {

                this.notifierService.showError({
                    detail: 'کپی انجام نشد',
                    life: 3000,
                });
            }

        } catch {

            this.notifierService.showError({
                detail: 'خطا در کپی',
                life: 3000,
            });

        }

        document.body.removeChild(textarea);
    }
    getActionLabel(action: number): string {
        const labels: Record<number, string> = {
            0: 'بدون تغییر',
            1: 'mapping',
            2: 'جاوااسکریپت',
            3: 'سرویس',
        };
        return labels[action];
    }

  runJsForPreview(rule: RuleModel) {
        debugger;
      console.log('RUN JS');
        if (!rule) return;

        // =========================
        // 1) تعیین مسیر درست
        // =========================
        const path = rule.kind === 'new'
            ? rule.targetPath
            : rule.path;

        if (!path) {
            this.notifierService.showError({
                detail: 'مسیر نود مشخص نیست',
                life: 4000,
            });
            return;
        }

        // =========================
        // 2) گرفتن JSON فعلی preview (نه input خام)
        // =========================
        let workingJson: any;

        try {
            workingJson = this.jsonOutput
                ? JSON.parse(this.jsonOutput)
                : JSON.parse(this.jsonInput);
        } catch {
            this.notifierService.showError({
                detail: 'JSON نامعتبر است',
                life: 4000,
            });
            return;
        }

        // =========================
        // 3) گرفتن مقدار نود
        // =========================
        let rawValue = this.getByPath(workingJson, path);

        // اگر new node بود و مقدار نداشت → null
        if (rawValue === undefined) {
            rawValue = null;
        }

        // =========================
        // 4) decode اگر لازم بود
        // =========================
        let baseValue = rawValue;

        if (
            rule.autoDecodeToMapFrom === true &&
            typeof baseValue === 'string' &&
            this.isProbablyBase64(baseValue)
        ) {
            try {
                baseValue = this.b64Decode(baseValue);
            } catch {
                baseValue = 'DECODE_ERROR';
            }
        }

        // =========================
        // 5) اجرای JS
        // =========================
        let resultValue: any;

        try {
            const fn = new Function(
                'value',
                `
            ${rule.jsCode || ''}
            return typeof result !== 'undefined' ? result : value;
        `
            );

            resultValue = fn(baseValue);
        } catch (e: any) {
            this.notifierService.showError({
                detail: `خطا در اجرای JS: ${e?.message || e}`,
                life: 5000,
            });
            return;
        }

        // =========================
        // 6) اعمال pre / post / encode
        // =========================
        let finalValue = String(resultValue ?? '');

        finalValue = (rule.pre || '') + finalValue + (rule.post || '');

        if (rule.finalEncode === true) {
            finalValue = this.b64Encode(finalValue);
        }

        // =========================
        // 7) اعمال در JSON (🔥 مهم)
        // =========================
        this.setByPath(workingJson, rule.targetPath, finalValue);

        // اگر rename شده بود → حذف path قدیمی
        if (rule.path && rule.path !== rule.targetPath) {
            this.deleteByPath(workingJson, rule.path);
        }

        // =========================
        // 8) آپدیت preview واقعی
        // =========================
        this.jsonOutput = JSON.stringify(workingJson, null, 4);

        // =========================
        // 9) نمایش نتیجه
        // =========================
      this.notifierService.showInfo({
          detail: `خروجی JS:\n${finalValue}`,
          life: 4000,
      });

        // =========================
        // 10) sync با pipeline اصلی
        // =========================
        this.updateOutputPreview();
    }
    statusLabel(): string {
        if (this.jsonStatus === 'empty') return 'خالی';
        if (this.jsonStatus === 'valid') return 'معتبر';
        return 'نامعتبر';
    }

    statusSeverity(): 'success' | 'danger' | 'info' {
        if (this.jsonStatus === 'valid') return 'success';
        if (this.jsonStatus === 'invalid') return 'danger';
        return 'info';
    }

    parsePath(path: string): (string | number)[] {
        // "a.b[0].c" => ["a","b",0,"c"]
        const tokens = path.match(/[^.[\]]+/g) ?? [];
        return tokens.map(t => (String(+t) === t ? +t : t));
    }
 deleteByPath(obj: any, path: string) {
        if (obj == null) return;

        const parts = this.parsePath(path);
        if (parts.length === 0) return;

        let cur = obj;

        for (let i = 0; i < parts.length - 1; i++) {
            cur = cur?.[parts[i] as any];
            if (cur == null) return;
        }

        const last = parts[parts.length - 1] as any;

        if (Array.isArray(cur) && typeof last === 'number') {
            // ❗ به جای splice
            cur[last] = null;
        } else {
            delete cur[last];
        }
    }
    getByPath(obj: any, path: string) {
        const parts = this.parsePath(path);
        let cur = obj;

        for (const p of parts) {
            if (cur === null || cur === undefined) return undefined;

            if (typeof cur === 'object' && !Array.isArray(cur)) {
                const key = Object.keys(cur).find(
                    k => this.normalizeName(k) === this.normalizeName(String(p)),
                );

                cur = key ? cur[key] : undefined;
            } else {
                cur = cur[p as any];
            }
        }

        return cur;
    }

    setByPath(obj: any, path: string, value: any) {
        const parts = this.parsePath(path);
        let cur = obj;

        for (let i = 0; i < parts.length - 1; i++) {
            const p = parts[i];

            let key = Object.keys(cur).find(
                k => this.normalizeName(k) === this.normalizeName(String(p)),
            );

            if (!key) {
                key = p as string;
                cur[key] = {};
            }

            cur = cur[key];
        }

        cur[parts[parts.length - 1] as any] = value;
    }


   /* detectOpsForRule(rule: RuleModel): Set<OpKey> {
        const ops = new Set<OpKey>();

        const fromPath = (rule.path || '').trim();
        const toPath = ((rule.targetPath || '').trim() || fromPath);

        // 1) نود افزوده شده
        if (rule.isNewlyAdded === true) {
            ops.add('added');
        }

        // 2) نود حذف شده
        if (rule.action === 4) {
            ops.add('deleted');
        }

        // 3) تغییر مسیر
        if (fromPath && toPath && toPath !== fromPath) {
            ops.add('pathChanged');
        }

        // 4) تغییر تایپ
        if (rule.originalType && rule.newType && rule.newType !== rule.originalType) {
            ops.add('typeChanged');
        }

        // 5) شرط و محاسبات
        const numberCondActive =
            rule.newType === 'Number' && rule.numberConditionMode && rule.numberConditionMode !== 'none';

        const nonNumberCondActive =
            rule.newType !== 'Number' && !!(rule.ruleCondition && String(rule.compareTargetValue ?? '').trim());

        if ((numberCondActive || nonNumberCondActive) && rule.action !== 0) {
            ops.add('conditionCalc');
        }

        // 6) Decode
        if (rule.autoDecodeToMapFrom === true /!* || rule.action === X *!/) {
            ops.add('decode');
        }

        // 7) انتخاب action
        if (rule.action == 1) {
            if (rule.mapTo !== undefined) {
                ops.add('actionSelected');
            }
        } else if (rule.action && rule.action != 0) {
            ops.add('actionSelected');
        }

        // 8) prefix / postfix
        if (String(rule.pre || '').trim() || String(rule.post || '').trim()) {
            ops.add('hasAffix');
        }

        // 9) encode
        if (rule.finalEncode === true) {
            ops.add('nCoding');
        }

        return ops;
    }*/
    detectOpsForRule(rule: RuleModel): Set<OpKey> {

        const ops = new Set<OpKey>();

        const fromPath = (rule.path || '').trim();
        const toPath = ((rule.targetPath || '').trim() || fromPath);

        const isDeleted = rule.deleted === true;

        // 1) نود افزوده شده
        // 🔥 قبلاً فقط isNewlyAdded بود
        // الان kind === 'new' هم پشتیبانی میشه
        if (
            rule.isNewlyAdded === true &&
            !isDeleted
        ) {
            ops.add('added');
        }
        // 2) نود حذف شده
        // 🔥 قبلاً action===4 بود
        // الان deleted=true هم پشتیبانی میشه
        if (
            rule.action === 4 ||
            isDeleted
        ) {
            ops.add('deleted');
        }

        // 🔥 اگر حذف شده بود
        // بقیه عملیات حساب نشن
        if (isDeleted) {
            return ops;
        }

        // 3) تغییر مسیر
        if (fromPath && toPath && toPath !== fromPath) {
            ops.add('pathChanged');
        }

        // 4) تغییر تایپ
        if (
            rule.originalType &&
            rule.newType &&
            rule.newType !== rule.originalType
        ) {
            ops.add('typeChanged');
        }

        // 5) شرط و محاسبات
        const numberCondActive =
            rule.newType === 'Number' &&
            rule.numberConditionMode &&
            rule.numberConditionMode !== 'none';

        const nonNumberCondActive =
            rule.newType !== 'Number' &&
            !!(
                rule.ruleCondition &&
                String(rule.compareTargetValue ?? '').trim()
            );

        if (
            (numberCondActive || nonNumberCondActive) &&
            rule.action !== 0
        ) {
            ops.add('conditionCalc');
        }

        // 6) Decode
        if (rule.autoDecodeToMapFrom === true) {
            ops.add('decode');
        }

        // 7) انتخاب action
        if (rule.action == 1) {

            if (rule.mapTo !== undefined) {
                ops.add('actionSelected');
            }

        } else if (rule.action && rule.action != 0) {

            ops.add('actionSelected');
        }

        // 8) prefix / postfix
        if (
            String(rule.pre || '').trim() ||
            String(rule.post || '').trim()
        ) {
            ops.add('hasAffix');
        }

        // 9) encode
        if (rule.finalEncode === true) {
            ops.add('nCoding');
        }

        return ops;
    }
    getTransformedNodesCount(): number {
        let count = 0;
        for (const rule of this.rules) {
            const ops = this.detectOpsForRule(rule);
            if (ops.size > 0) count += 1;
        }
        return count;
    }

    getOpsStats(): OpsStats {
        const stats = this.emptyStats();
        for (const rule of this.rules) {
            const hasAnyPath = !!((rule.path || '').trim() || (rule.targetPath || '').trim() || (rule.newPath || '').trim());
            if (!hasAnyPath && rule.kind !== 'new') continue;

            const ops = this.detectOpsForRule(rule);
            for (const op of ops) stats[op] += 1;
        }

        return stats;
    }

    private emptyStats(): OpsStats {
        return {
            added: 0,
            deleted: 0,
            pathChanged: 0,
            typeChanged: 0,
            conditionCalc: 0,
            decode: 0,
            actionSelected: 0,
            hasAffix: 0,
            nCoding: 0,
        };
    }

    protected readonly ApiGatewayConstants = ApiGatewayConstants;
}

type JsonType = 'String' | 'Number';
type RuleKind = 'existing' | 'new';
type NumberConditionMode = 'none' | 'single' | 'range';
type StringConditionMode = 'none' | 'single';
type OpKey =
    | 'added'
    | 'deleted'
    | 'pathChanged'
    | 'typeChanged'
    | 'conditionCalc'
    | 'decode'
    | 'actionSelected'
    | 'hasAffix' | 'nCoding';

type OpsStats = Record<OpKey, number>;

type Option = {
    title: string;
    partyId?: number | null;
    moduleTitle?: string;
    moduleId?: number | null;
    apiId?: number | null
};

interface RuleModel {
    id: string;

    mediatorId?: number; // ✅ این خطو اضافه کن
    isNewlyAdded?: boolean;
    path: string;
    targetPath: string;
    originalType: JsonType;
    newType: JsonType;
    action: number;
    jsCode: string;
    serviceName: string;
    encodeMethod: 'Base64';
    decodeMethod: 'Base64';
    mapFrom: string;
    mapTo: string;
    pre: string;
    post: string;
    preUi?: string;
    postUi?: string;
    autoDecodeToMapFrom: boolean;
    partyId?: number | null;
    moduleId?: number | null;
    apiId?: number | null;
    moduleOptions?: { moduleTitle: string; moduleId: number | null }[];
    apiOptions?: { title: string; apiId: number | null }[];
    partyOptions?: { title: string; partyId: number | null }[];
    matchList?: any[];
    prevActionBeforeAutoDecode?: number | null;
    functionTypeNumber?: string | null;
    expressionFlag?: boolean;
    kind: RuleKind;
    valueSource?: string;
    newPath?: string;
    operand2Value?: string;
    finalEncode?: boolean;
    sendNodeAsQueryParam?: 0 | 1;
    numberConditionMode?: NumberConditionMode;
    ruleCondition?: string | null;
    compareTargetValue?: string;
    rangeCondition1?: string | null;
    rangeValue1?: string;
    rangeCondition2?: string | null;
    rangeValue2?: string;
    apiTitle?: string | null;
    serviceResponsePath?: string;
    deleted?: boolean;
    stringConditionMode?: StringConditionMode;
    stringRuleCondition?: string | null;
    stringCompareValue?: string;

}

type JsonParseIssue = {
    message: string;
    friendlyMessage?: string;
    position?: number;
    line?: number;
    column?: number;
    nearText?: string;
};
