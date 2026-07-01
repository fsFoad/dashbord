// @ts-nocheck
import {  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ToastService } from '../../../../shared/services/ToastService';
import { ConfirmationService } from 'primeng/api';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { MatTooltip } from '@angular/material/tooltip';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Checkbox } from 'primeng/checkbox';
import { CommonValidationsService } from '../../../../shared/validators/common-validations.service';
import { Dialog } from 'primeng/dialog';
import { InputTextarea } from 'primeng/inputtextarea';
import { EncodingServiceService } from '../../../../shared/services/encoding-service.service';

@Component({
    selector: 'app-test-run-condition',
    imports: [
        FormsModule,
        MatTabGroup,
        MatTab,
        NgForOf,
        Card,
        Divider,
        DropdownModule,
        MatTabLabel,
        InputText,
        ButtonDirective,
        NgClass,
        NgIf,
        TranslocoPipe,
        ConfirmDialog,
        MatTooltip,
        BreadcrumbsComponent,
        Toast,
        Checkbox,
        Dialog,
        InputTextarea,
    ],
    providers: [ConfirmationService],
    templateUrl: './test-run-condition.component.html',
    styleUrl: './test-run-condition.component.scss',
  schemas: [NO_ERRORS_SCHEMA],
})

export class TestRunConditionComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate;
    methodOptions = [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
    ];
    url = '';
    headers: KV[] = [];
    body: KV[] = [];
    query: KV[] = [];
    ruleConditionsList: any[] = [];
    headerList: any[] = [];
    bodyList: any[] = [];
    queryList: any[] = [];
    curlHeaders = [];
    curlBody = [];
    curlQuery = [];
    sending = false;
    ruleName: string;
    errorCode: string;
    templateOptions = [
        { label: 'داخلی', value: 0 },
        { label: 'خارجی', value: 1 },
    ];
    curlBackup: CurlBackup = {
        headers: [],
        body: [],
        query: [],
    };

    lastChangedItem: LastChangedItem = null;
    ruleTemplate: number;
    errorMessage: string;
    curlDialog = false;
    curlInput: string = '';
    curlDialogVisible = false;
    method: string = 'POST';
    serviceHeaders
    serviceBody
    serviceQuery
    curlHeaderList: any[] = [];
    curlBodyList: any[] = [];
    curlQueryList: any[] = [];
    isCurlInvalid: boolean = false;
    clientName
    apiTitle
    moduleTitle
    partyTitle
    clientBase
    moduleBase
    accessBase
    ruleBase
    partyBase
    detailsBreadObject = [];
    constructor(private router: Router,
                private route: ActivatedRoute,
                private messagesApiFacadeService: MessagesApiFacadeService,
                private transloco: TranslocoService,
                private notifierService: ToastService,
                private validationsService: CommonValidationsService,
                private confirmationService: ConfirmationService,
                private encod: EncodingServiceService,
                private apiGatewayService: ApiGatewayService,
                private cdr: ChangeDetectorRef,
                private _primengProgressBarService: FuseLoadingService,
    ) {
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
                        label_Detail_index1: '(' + this.ruleName + ')',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.testRun'),
                        rout_index2: '/',
                        isActive2: true,
                        img_index2: 'assets/icons/testrun.png',
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
                        label_index4: this.transloco.translate('menu.testRun'),
                        rout_index4: '/',
                        isActive4: true,
                        img_index4: 'assets/icons/testrun.png',
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
                        label_index4: this.transloco.translate('menu.testRun'),
                        rout_index4: '/',
                        isActive4: true,
                        img_index4: 'assets/icons/testrun.png',
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
                        index: 4,
                        label_index4: this.transloco.translate('menu.testRun'),
                        rout_index4: '/',
                        isActive4: true,
                        img_index4: 'assets/icons/testrun.png',
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
                        label_index5: this.transloco.translate('menu.testRun'),
                        rout_index5: '/',
                        isActive5: true,
                        img_index5: 'assets/icons/testrun.png',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    BeforeButton() {
        this.close.emit('close');
    }
    openCurlDialog() {
        this.curlDialogVisible = true;
    }
    extractQueryFromRaw(rawUrl: string): any[] {
        const list = [];

        if (!rawUrl.includes('?')) return list;

        const queryString = rawUrl.split('?')[1];
        if (!queryString) return list;

        queryString.split('&').forEach(p => {
            const [k, v] = p.split('=');
            if (k && v !== undefined) {
                const decodedVal = decodeURIComponent(v);
                list.push({
                    key: decodeURIComponent(k),
                    value: this.autoType(decodedVal),
                    enabled: true,
                });
            }
        });

        return list;
    }

    get fullUrl(): string {
        if (!this.url || !this.url.trim()) {
            return '';
        }
        return this.url.trim();
    }
    mergeQueryLists() {
        const merged = [];

        // فقط آیتم‌های سرویس وارد سمت راست شوند
        this.serviceQuery.forEach(item => {
            merged.push({
                key: item.key,
                value: item.value,
                enabled: false,   // سرویس خاموش
                source: 'service'
            });
        });

        // آیتم‌های cURL سمت چپ هستند و وارد merged نمی‌شوند
        // فقط در curlQueryList نگه‌داری می‌شوند

        this.queryList = merged;
    }

    processCurl() {
        this.isCurlInvalid = false;
        if (!this.curlInput.trim()) return;

        const curl = this.normalizeCurl(this.curlInput);

        this.method = this.extractMethod(curl);
        const rawUrl = this.extractUrl(curl);
        this.url = rawUrl;

        // فقط سمت cURL را به‌روزرسانی کن
        this.curlQueryList  = this.extractQueryFromRaw(rawUrl);
        this.curlHeaderList = this.extractHeaders(curl);
        this.curlBodyList   = this.extractBodyList(curl);
        console.log('curlBodyList', this.curlBodyList);
        this.curlBackup = {
            headers: JSON.parse(JSON.stringify(this.curlHeaderList)),
            body:    JSON.parse(JSON.stringify(this.curlBodyList)),
            query:   JSON.parse(JSON.stringify(this.curlQueryList)),
        };

        // ❌ این سه خط دیگر لازم نیست (چک‌باکس‌ها را ریست می‌کرد)
        // this.headerList = [...this.serviceHeaders];
        // this.bodyList   = [...this.serviceBody];
        // this.queryList  = [...this.serviceQuery];
        // this.mergeQueryLists();

        // اینجا فقط برای sync شدن preview اگر لازم بود:
        this.syncLists();          // بدون initFlag

        this.curlDialogVisible = false;

        // ❌ این سه خط هم حتماً برداشته شوند:
        // this.headerList.forEach(h => h.enabled = false);
        // this.bodyList.forEach(b => b.enabled = false);
        // this.queryList.forEach(q => q.enabled = false);
    }

    restoreCurlItem(key: string, type: 'header' | 'body' | 'query') {
        let backupList = [];

        if (type === 'header') backupList = this.curlBackup.headers;
        if (type === 'body')   backupList = this.curlBackup.body;
        if (type === 'query')  backupList = this.curlBackup.query;

        const original = backupList.find(x => x.key === key);
        if (!original) return;

        if (type === 'header') {
            const idx = this.curlHeaderList.findIndex(x => x.key === key);
            if (idx >= 0) this.curlHeaderList[idx] = { ...original };
            this.curlHeaderList = [...this.curlHeaderList];
        }

        if (type === 'body') {
            const idx = this.curlBodyList.findIndex(x => x.key === key);
            if (idx >= 0) this.curlBodyList[idx] = { ...original };
            this.curlBodyList = [...this.curlBodyList];
        }

        if (type === 'query') {
            const idx = this.curlQueryList.findIndex(x => x.key === key);
            if (idx >= 0) this.curlQueryList[idx] = { ...original };
            this.curlQueryList = [...this.curlQueryList];
        }
    }

    normalizeCurl(curl: string): string {
        return curl
            .replace(/\\\s*\n/g, ' ')  // حذف continuation "\"
            .replace(/\n+/g, ' ')      // حذف newline
            .trim();
    }

    closeCurlDialog(): void {
        this.curlDialogVisible = false;
    }

    private extractMethod(curl: string): string {
        const match = curl.match(/-X\s+(\w+)/i);
        // if (match) return match[1].toUpperCase();
        if (match) return match[1];
        if (curl.includes('--data')) return 'POST';

        return 'GET';
    }

    extractUrl(curl: string): string {
        let m = curl.match(/curl\s+.*?["'](https?:\/\/[^"']+)["']/i);
        if (m) return m[1];
        m = curl.match(/curl\s+(https?:\/\/\S+)/i);
        if (m) return m[1];

        return '';
    }
    autoType(raw: string): any {
        if (raw == null) return raw;

        let trimmed = raw.trim();

        // ۱) اگر با " یا ' شروع و تمام شود → یعنی کاربر خودش string خواسته
        if (
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ) {
            // کوتیشن بیرونی رو بردار، خود متن بمونه
            return trimmed.slice(1, -1);
        }

        // ۲) boolean بدون کوتیشن
        if (trimmed === 'true') return true;
        if (trimmed === 'false') return false;

        // ۳) عدد (int / float)
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
            const num = Number(trimmed);
            if (!Number.isNaN(num)) {
                return num;
            }
        }

        // ۴) JSON object یا array
        if (
            (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
            (trimmed.startsWith('[') && trimmed.endsWith(']'))
        ) {
            try {
                return JSON.parse(trimmed);
            } catch {
                // اگر parse نشد، همون raw رو نگه می‌داریم
            }
        }

        // ۵) در بقیه موارد همون رشته رو برگردون
        return raw;
    }

    extractHeaders(curl: string): any[] {
        const result: any[] = [];

        const regex = /(?:-H|--header)\s+(['"])([\s\S]*?)\1/gi;
        let m;
        while ((m = regex.exec(curl)) !== null) {
            const headerLine = m[2].trim();
            const [key, ...rest] = headerLine.split(':');
            const rawValue = rest.join(':').trim();

            if (key && rawValue !== undefined) {
                result.push({
                    key: key.trim(),
                    value: this.autoType(rawValue),
                    enabled: true,
                });
            }
        }

        return result;
    }
  /*  extractBodyList(curl: string): any[] {
        const result: any[] = [];

        // رشته کوتیشن‌دار با ساپورت escape: \" یا \'
        const dataPattern =
            /(?:-d|--data-raw|--data-urlencode|--data-binary|--data-ascii|--data)\s+(("([^"\\]|\\.)*"|'([^'\\]|\\.)*'))/gi;

        const bodies: string[] = [];
        let m: RegExpExecArray | null;

        while ((m = dataPattern.exec(curl)) !== null) {
            const fullQuoted = m[1];          // مثلا: "{ \"username\": \"ali\", \"age\": 25 }"
            const inner = fullQuoted.slice(1, -1); // حذف کوتیشن‌های اول و آخر
            bodies.push(inner.trim());
        }

        if (!bodies.length) return result;

        for (let bodyStr of bodies) {

            // ❶ اول سعی کن همینو JSON کنی
            let parsed: any;
            let parsedOK = false;

            try {
                parsed = JSON.parse(bodyStr);
                parsedOK = true;
            } catch {
                // ❷ اگر شکست خورد، احتمال زیاد cURL-escape بوده → \"
                const unescaped = bodyStr.replace(/\\(.)/g, '$1'); // تبدیل { \"user\" } → { "user" }

                try {
                    parsed = JSON.parse(unescaped);
                    parsedOK = true;
                } catch {
                    // هیچی، میریم سراغ url-encoded یا raw
                }
            }

            if (parsedOK) {
                // اگر یک آبجکت ساده بود (نه آرایه)
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    Object.keys(parsed).forEach(k => {
                        result.push({
                            key: k,
                            value: parsed[k],
                            enabled: true,
                        });
                    });
                } else {
                    // مثلا اگر JSON یه آرایه بود
                    result.push({
                        key: 'raw',
                        value: parsed,
                        enabled: true,
                    });
                }
                continue;
            }

            // حالت فرم url-encoded
            if (bodyStr.includes('=')) {
                bodyStr.split('&').forEach(pair => {
                    const [k, v] = pair.split('=');
                    if (k && v !== undefined) {
                        const decodedKey = decodeURIComponent(k);
                        const decodedVal = decodeURIComponent(v);
                        result.push({
                            key: decodedKey,
                            value: this.autoType(decodedVal),
                            enabled: true,
                        });
                    }
                });
                continue;
            }

            // fallback نهایی: raw
            result.push({
                key: 'raw',
                value: bodyStr,
                enabled: true,
            });
        }

        return result;
    }
*/
    extractBodyList(curl: string): any[] {

        const result: any[] = [];

        // گرفتن body کامل
        const match = curl.match(
            /(?:--data-raw|--data|-d)\s+'([\s\S]*?)'/
        );

        if (!match) {
            return result;
        }

        let bodyStr = match[1].trim();

        // اگر escape شده بود
        bodyStr = bodyStr.replace(/\\"/g, '"');

        try {

            const parsed = JSON.parse(bodyStr);

            // object
            if (
                parsed &&
                typeof parsed === 'object' &&
                !Array.isArray(parsed)
            ) {

                Object.keys(parsed).forEach(k => {

                    result.push({
                        key: k,
                        value: parsed[k],
                        enabled: true,
                    });

                });

            }

            // array
            else if (Array.isArray(parsed)) {

                result.push({
                    key: 'raw',
                    value: parsed,
                    enabled: true,
                });

            }

        } catch (e) {

            console.error('BODY PARSE ERROR', e);

            // fallback
            result.push({
                key: 'raw',
                value: bodyStr,
                enabled: true,
            });
        }

        return result;
    }
    ngOnInit(): void {
        this.clientBase = this.inputUpdate.clientBase;
        this.moduleBase = this.inputUpdate.moduleBase;
        this.accessBase = this.inputUpdate.accessBase;
        this.ruleBase = this.inputUpdate.ruleBase;
        this.partyBase = this.inputUpdate.partyBase;
        this.clientName = this.inputUpdate.clientName;
        this.apiTitle = this.inputUpdate.apiTitle;
        this.moduleTitle = this.inputUpdate.moduleTitle;
        this.ruleName = this.inputUpdate.name;
        this.partyTitle = this.inputUpdate.partyTitle;
        this.ruleTemplate = this.inputUpdate.ruleTemplate;
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
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        this.messagesApiFacadeService.getbyruleid(this.inputUpdate.ruleId).subscribe({
            next: (res) => {
                this._primengProgressBarService.hide();
                this.ruleConditionsList = Array.isArray(res) ? res : [res];

                /** ابتدا فقط داده سرویس را در لیست‌های راست بریز */
                let serviceHeaders = [];
                let serviceBody = [];
                let serviceQuery = [];

                for (const condition of this.ruleConditionsList) {

                    const item = {
                        id: condition.ruleConditionId,          // برای trackBy اگر خواستی
                        key: condition.conditionName,          // این اسمیه که باید در cURL پیدا بشه
                        value: condition.functionStr,          // متن expression که تو UI نمایش می‌دی
                        conditionName: condition.conditionName,// برای خواناتر شدن
                        functionStr: condition.functionStr,    // اگر بعداً خواستی جدا داشته باشی
                        enabled: condition.status === 1,
                        bodyNodePath: condition.bodyNodePath
                    };


                    if (condition.conditionType === 1) serviceBody.push(item);
                    if (condition.conditionType === 2) serviceHeaders.push(item);
                    if (condition.conditionType === 3) serviceQuery.push(item);
                }
                this.serviceHeaders=serviceHeaders
                this.serviceBody=serviceBody
                this.serviceQuery=serviceQuery

                this.headerList = [...this.serviceHeaders];
                this.bodyList   = [...this.serviceBody];
                this.queryList  = [...this.serviceQuery];
                this.syncLists(true);
            },
            error: () => this._primengProgressBarService.hide()
        });
    }
    trackByKey(index: number, item: any) {
        return item.key;
    }

    get headersAsHtml(): string {
        const valid = this.curlHeaderList.filter(h => h.key && h.value);
        if (!valid.length) {
            return `<span style="color:#94a3b8; direction: rtl; unicode-bidi: plaintext;">هیچ <span dir="ltr">Header</span> فعالی وجود ندارد</span>`;
        }

        const rows = valid
            .map(h => `--header '${this.escape(h.key)}: ${this.escape(h.value)}' \\`)
            .join('<br>');

        return `<div style="margin-right:1rem; color:#a5f3fc;">${rows}</div>`;
    }

    get bodyAsHtml(): string {
        const valid = this.curlBodyList.filter(
            b => b.key && b.value !== null && b.value !== undefined
        );

        if (!valid.length) {
            return '<span style="color:#94a3b8">فعالی وجود ندارد Body هیچ </span>';
        }

        const rows = valid
            .map(b => {
                const key = this.escape(b.key);

                // اگر مقدار string بود
                if (typeof b.value === 'string') {
                    const valStr = `"${this.escape(b.value)}"`;
                    return `"${key}": ${valStr}`;
                }

                // اگر object/array/number/boolean بود
                let pretty: string;
                try {
                    // JSON قشنگ با اینتنت
                    pretty = JSON.stringify(b.value, null, 2);
                } catch {
                    // اگر stringify شکست خورد
                    pretty = String(b.value);
                }

                // escape برای امنیت
                let valStr = this.escape(pretty);
                // newline ها رو به <br> تبدیل کن که قشنگ نمایش داده بشه
                valStr = valStr.replace(/\n/g, '<br>');

                // برای raw کل JSON رو بدون "raw:" نشان بده
                if (b.key === 'raw') {
                    return valStr;
                }

                return `"${key}": ${valStr}`;
            })
            .join(',<br>');

        return `{<div style="margin-right:1rem">${rows}</div>}`;
    }


    findInCurl(key: string, type: 'header' | 'body' | 'query') {
        let list = [];

        if (type === 'header') list = this.curlHeaderList;
        if (type === 'body')   list = this.curlBodyList;
        if (type === 'query')  list = this.curlQueryList;

        return list.find(x => x.key === key);
    }

    syncLists(initFlag?) {

        const handleItem = (item, type) => {

            // مقدار اولیه
            if (initFlag) {
                item.prevEnabled = item.enabled;   // مقدار اولیه checkbox
                return;
            }

            // اگر تیک شد (false -> true)
            if (item.enabled && item.prevEnabled === false) {

                const curlItem = this.findInCurl(item.key, type);
                if (curlItem) {
                    curlItem.value = item.value;       // مقدار سرویس روی CURE
                }

                item.prevEnabled = true;
                return;
            }

            // اگر تیک برداشته شد (true -> false)
            if (!item.enabled && item.prevEnabled === true) {

                // بازگرداندن مقدار اولیه cURL از backup
                this.restoreCurlItem(item.key, type);

                item.prevEnabled = false;
                return;
            }
        };

        // اعمال روی هر لیست
        this.headerList.forEach(i => handleItem(i, 'header'));
        this.bodyList.forEach(i => handleItem(i, 'body'));
        this.queryList.forEach(i => handleItem(i, 'query'));

        // سمت راست
        this.headers = this.headerList.filter(i => i.enabled).map(i => ({ key: i.key, value: i.value }));
        this.body    = this.bodyList  .filter(i => i.enabled).map(i => ({ key: i.key, value: i.value }));
        this.query   = this.queryList .filter(i => i.enabled).map(i => ({ key: i.key, value: i.value }));

        // سمت چپ (UI update)
        this.curlHeaderList = [...this.curlHeaderList];
        this.curlBodyList   = [...this.curlBodyList];
        this.curlQueryList  = [...this.curlQueryList];
    }

    private escape(v: any) {
        const s = v === null || v === undefined ? '' : String(v);

        return s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;');
    }

    clearAll() {

        this.confirmationService.confirm({
            message: 'آیا از پاک کردن همه اطلاعات مطمئن هستید؟',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.onAcceptDbEngine(),
            reject: () => this.rejectFuncDBEngine(),
        });
    }

    onAcceptDbEngine() {
        this.method = 'POST';
        this.url = null;
    }

    rejectFuncDBEngine() {

    }

    copyCurlToClipboard() {
        const url = this.fullUrl || this.url;
        const method = this.method;

        // شروع دستور
        let curl = `curl --location '${url}'`;

        // افزودن headers
        const validHeaders = this.headers.filter(h => h.key && h.value);
        if (validHeaders.length) {
            curl += ' \\\n' + validHeaders
                .map(h => `--header '${this.escape(h.key)}: ${this.escape(h.value)}'`)
                .join(' \\\n');
        }

        // افزودن body فقط اگر متد POST، PUT یا DELETE باشد
        if (method !== 'GET') {
            const validBody = this.body.filter(
                b => b.key && b.value !== null && b.value !== undefined
            );

            if (validBody.length) {
                const bodyJson = validBody.reduce((acc, cur) => {
                    acc[cur.key] = cur.value;
                    return acc;
                }, {});

                curl += ` \\\n--data '${JSON.stringify(bodyJson)}'`;
            }
        }

        navigator.clipboard.writeText(curl).then(() => {
            // this.notifierService.success('دستور cURL در کلیپ‌برد کپی شد');
        }).catch(() => {
            // this.notifierService.error('خطا در کپی به کلیپ‌برد');
        });
    }
/*    validateCurlBeforeSend(): boolean {
        debugger
        // 1) بررسی اینکه cURL وارد شده یا نه
        if (!this.curlInput || !this.curlInput.trim()) {
            this.notifierService.showError('لطفا ابتدا cURL را وارد و پردازش نمایید!');
            return false;
        }




        return true;
    }*/
    getValueByPath(obj: any, path: string): any {

        if (!obj || !path) return undefined;

        // /accinfo[0]/nationalcode
        const normalized = path.replace(/^\//, '');

        const segments = normalized.split('/');

        let current = obj;

        for (const segment of segments) {

            // accinfo[0]
            const match = segment.match(/^([^\[\]]+)(?:\[(\d+)])?$/);

            if (!match) {
                return undefined;
            }

            const key = match[1];
            const index = match[2];

            current = current?.[key];

            if (current === undefined || current === null) {
                return undefined;
            }

            // اگر array index داشت
            if (index !== undefined) {

                if (!Array.isArray(current)) {
                    return undefined;
                }

                current = current[Number(index)];

                if (current === undefined) {
                    return undefined;
                }
            }
        }

        return current;
    }
   /* validateCurlBeforeSend(): boolean {
        debugger;
        // 1) بررسی اینکه cURL وارد شده یا نه
        if (!this.curlInput || !this.curlInput.trim()) {
            this.notifierService.showError('لطفا ابتدا cURL را وارد و پردازش نمایید!');
            return false;
        }

        // 2) اولین Header تیک‌خورده‌ای که در cURL وجود ندارد
        const missingHeader = this.headerList
            .filter(h => h.enabled) // فقط موارد تیک‌خورده سمت راست
            .find(item =>
                !this.curlHeaderList.some(c => c.key === item.key) // item.key همان conditionName است
            );

        if (missingHeader) {
            debugger
            this.notifierService.showError(
                `فیلد هدر '${missingHeader.key}' در cURL یافت نشد`
            );
            return false; // همینجا متوقف شو، بقیه خطاها را بعداً کاربر می‌بیند
        }

        // 3) اولین Body تیک‌خورده‌ای که در cURL وجود ندارد
/!*        const missingBody = this.bodyList
            .filter(b => b.enabled)
            .find(item =>
                !this.curlBodyList.some(c => c.key === item.key)
            );*!/
        const bodyJson = this.curlBodyList
            .filter(b => b.key && b.value !== null && b.value !== undefined)
            .reduce((acc, cur) => {

                acc[cur.key] = cur.value;

                return acc;

            }, {} as any);

        const missingBody = this.bodyList
            .filter(b => b.enabled)
            .find(item => {

                // مثلا:
                /!*
                /accinfo[0]/nationalcode
                *!/

                const value = this.getValueByPath(
                    bodyJson,
                    item.bodyNodePath
                );

                return value === undefined;
            });
        if (missingBody) {
            missingBody
            this.notifierService.showError(
                `فیلد body '${missingBody.key}' در cURL یافت نشد`
            );
            return false;
        }

        // 4) اولین Query تیک‌خورده‌ای که در cURL وجود ندارد
        const missingQuery = this.queryList
            .filter(q => q.enabled)
            .find(item =>
                !this.curlQueryList.some(c => c.key === item.key)
            );

        if (missingQuery) {
            this.notifierService.showError(
                `فیلد query string '${missingQuery.key}' در cURL یافت نشد`
            );
            return false;
        }

        // اگر تا اینجا خطایی نبود
        return true;
    }*/

    validateCurlBeforeSend(): boolean {

        debugger;

        // 1) بررسی اینکه cURL وارد شده یا نه
        if (!this.curlInput || !this.curlInput.trim()) {

            this.notifierService.showError(
                'لطفا ابتدا cURL را وارد و پردازش نمایید!'
            );

            return false;
        }

        // 2) اولین Header تیک‌خورده‌ای که در cURL وجود ندارد
        const missingHeader = this.headerList
            .filter(h => h.enabled)
            .find(item =>
                !this.curlHeaderList.some(c => c.key === item.key)
            );

        if (missingHeader) {

            this.notifierService.showError(
                `فیلد هدر '${missingHeader.key}' در cURL یافت نشد`
            );

            return false;
        }

        // 3) ساخت JSON از body سمت چپ (cURL)
        const bodyJson = this.curlBodyList
            .filter(
                b =>
                    b.key &&
                    b.value !== null &&
                    b.value !== undefined
            )
            .reduce((acc, cur) => {

                acc[cur.key] = cur.value;

                return acc;

            }, {} as any);

        // 4) اولین Body تیک‌خورده‌ای که در cURL وجود ندارد
        const missingBody = this.bodyList
            .filter(b => b.enabled)
            .find(item => {

                // اگر NodePath خالی بود
                // مستقیم در Root JSON دنبال conditionName بگرد
                if (
                    !item.bodyNodePath ||
                    item.bodyNodePath === '-' ||
                    item.bodyNodePath.trim() === ''
                ) {

                    return !Object.prototype.hasOwnProperty.call(
                        bodyJson,
                        item.key
                    );
                }

                // اگر NodePath داشت
                const value = this.getValueByPath(
                    bodyJson,
                    item.bodyNodePath
                );

                return value === undefined;
            });

        if (missingBody) {

            this.notifierService.showError(
                `فیلد body '${missingBody.key}' در cURL یافت نشد`
            );

            return false;
        }

        // 5) اولین Query تیک‌خورده‌ای که در cURL وجود ندارد
        const missingQuery = this.queryList
            .filter(q => q.enabled)
            .find(item =>
                !this.curlQueryList.some(c => c.key === item.key)
            );

        if (missingQuery) {

            this.notifierService.showError(
                `فیلد query string '${missingQuery.key}' در cURL یافت نشد`
            );

            return false;
        }

        // اگر تا اینجا خطایی نبود
        return true;
    }
    send() {

        debugger
        // اگر cURL معتبر نیست => خروج
        // اگر cURL معتبر نیست => خروج
        if (!this.validateCurlBeforeSend()) {
            debugger
            this.sending = false;
            return;
        }

        this.sending = true;
        const base64Url = this.url ? this.encod.toBase64(this.url) : null;

        // Base64 کردن URL
        debugger
        let requestBody = null;

        if (this.curlBodyList && this.curlBodyList.length > 0) {
            const bodyJson = this.curlBodyList
                .filter(b => b.key && b.value !== null && b.value !== undefined)
                .reduce((acc, cur) => {
                    acc[cur.key] = cur.value;
                    return acc;
                }, {} as any);

            if (Object.keys(bodyJson).length > 0) {
                requestBody = this.encod.toBase64(JSON.stringify(bodyJson));
            }
        }

        // ------------ ساخت headers از کل curlHeaderList (سمت چپ) ------------
        const headersToSend = (this.curlHeaderList || [])
            .filter(h => h.key && h.value)
            .map(h => ({
                key: h.key,
                value: h.value
            }));

        // ------------ ساخت payload نهایی ------------
        const payload = {
            url: base64Url,
            body: requestBody,
            testRunConditionHeaders: headersToSend
        };

        this.sending = true;
        this.messagesApiFacadeService.testrun(this.inputUpdate.ruleId,payload).subscribe(res=>{
            debugger
            console.log('res',res)
                this.sending = false;
                this.notifierService.showSuccess('عملیات با موفقیت انجام شد!');
        },error => {
            this.sending = false;

        })
    }
}

type KV = { key: string; value: any  };

export interface KeyValueItem {
    key: string;
    value: any;
    enabled: boolean;
}
interface CurlBackup {
    headers: any[];
    body: any[];
    query: any[];
}

type LastChangedItem =
    | {
    ref: any;
    key: string;
    type: 'header' | 'body' | 'query';
}
    | null;
