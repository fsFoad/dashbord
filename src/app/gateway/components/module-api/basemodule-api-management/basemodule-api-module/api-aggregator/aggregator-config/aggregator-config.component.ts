import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    computed, EventEmitter,
    inject, Input, OnInit, Output,
    signal,
} from '@angular/core';

import {
    CommonModule,
} from '@angular/common';

import {
    FormArray,
    FormControl,
    FormGroup,
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
} from '@angular/forms';

import {
    ButtonModule,
} from 'primeng/button';

import {
    DropdownModule,
} from 'primeng/dropdown';

import {
    InputTextModule,
} from 'primeng/inputtext';

import {
    InputTextarea,
} from 'primeng/inputtextarea';

import {
    TableModule,
} from 'primeng/table';

import {
    DialogModule,
} from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { MultiSelect } from 'primeng/multiselect';
import { KeyFilter } from 'primeng/keyfilter';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
    HeaderEndpointRegisterComponent,
} from '../../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { forkJoin } from 'rxjs';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector:
        'app-aggregator-config',

    standalone: true,

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        ButtonModule,
        DropdownModule,
        InputTextModule,
        InputTextarea,
        TableModule,
        DialogModule,
        Toast,
        BreadcrumbsComponent,
        TranslocoPipe,
        MultiSelect,
        KeyFilter,
        ConfirmDialog,
        HeaderEndpointRegisterComponent,
        Checkbox,
    ],

    templateUrl:
        './aggregator-config.component.html',

    styleUrls: [
        './aggregator-config.component.scss',
    ],
    providers: [
        ConfirmationService,
    ],
    changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class AggregatorConfigComponent implements OnInit {


/*    formattedCurlJson = computed(() => {
        const value = this.curlRequestBody();

        if (typeof value === 'string') {
            return value
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
        }

        return JSON.stringify(value, null, 2);
    });*/
    formattedCurlJson = computed(() => {
        const value = this.curlRequestBody();

        if (!value) {
            return '';
        }

        if (typeof value === 'string') {

            const decoded = value
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');

            try {
                return JSON.stringify(
                    JSON.parse(decoded),
                    null,
                    2,
                );
            } catch {
                return decoded;
            }
        }

        return JSON.stringify(value, null, 2);
    });
    sourceElementDialogVisible = false;
    destinationElementDialogVisible = false;
    aggregatorConfigDto: {
        apiId: number,
        someVariable: boolean
    };
    private aggregateDto: any;
    clientConfigs: any[] = [];
    saveDialogVisible = false;
    previousSelections = new Map<string, any>();
    @Input() inputAggregatorConfig: any;
    @Input() isViewMode = false;
    @Output() close = new EventEmitter<string>();
    private readonly fb =
        inject(
            NonNullableFormBuilder,
        );

    curlRequestBody = signal<any>(null);
    readonly organizations = [
        {
            id: 'o1',
            name: 'سازمان مالی',
        },
        {
            id: 'o2',
            name: 'سازمان مشتریان',
        },
    ];
    readonly modules = [
        {
            id: 'm1',
            name: 'حسابداری',
        },
        {
            id: 'm2',
            name: 'انبار',
        },
    ];
    readonly serviceCatalog = [
        {
            id: 's1',
            name: 'احراز هویت',
        },
        {
            id: 's2',
            name: 'ثبت سفارش',
        },
        {
            id: 's3',
            name: 'دریافت موجودی',
        },
    ];
    readonly mappingTypes = [
        {
            label: 'Body',
            value: 'body',
        },
        {
            label: 'Header',
            value: 'header',
        },
        {
            label: 'Query',
            value: 'query',
        },
    ];
    jsonValidation401: Record<number, JsonValidationResult | null> = {};
    jsonValidation500: Record<number, JsonValidationResult | null> = {};
    readonly statusOptions = [
        {
            label: '200 Success',
            value: 200,
        },
        {
            label: '400 Validation',
            value: 400,
        },
        {
            label: '401 Unauthorized',
            value: 401,
        },
        {
            label: '500 Internal Error',
            value: 500,
        },
    ];
    readonly responseModeOptions = [
        {
            label: 'انتقال همه ریسپانس',
            value: 'all',
        },
        {
            label: 'نودهای منتخب',
            value: 'selected',
        },
    ];
    readonly form = this.fb.group({

        aggregatorTitle:
            this.fb.control(''),
        responseMode: this.fb.control('all'),

        clientIds:
            this.fb.control<number[]>([]),

        statusCode:
            this.fb.control(200),
        genElement: this.fb.control(null),

        reqElement: this.fb.control(null),
        services:
            this.fb.array<ServiceForm>([]),

        outputFields:
            this.fb.array<OutputFieldForm>([]),

    });
    apiTitle;
    curlInput = signal('');
    curlError = signal<string | null>(null);
    curlValid = signal(false);
    parsedCurl = signal<any | null>(null);
    readonly curlDialogVisible = signal(false);
    readonly selectedCurlService = signal<string | null>(null);
    readonly services =
        this.form.controls
            .services as FormArray<
            ServiceForm
        >;
    readonly outputFields =
        this.form.controls
            .outputFields as FormArray<
            OutputFieldForm
        >;
    readonly mappingDrafts:
        Record<
            number,
            ConnectionForm
        > = {};

    readonly sourceServices =
        computed(() => {
            this.servicesRefreshSignal();
            return [

                {
                    label:
                        this.apiTitle ||
                        '-',

                    value:
                        null,
                },

                ...this.services.controls.map(
                    (
                        service,
                        index,
                    ) => ({

                        label:
                            this.getSelectedServiceTitle(service),

                        value:
                        service.controls.id.value,

                    }),
                ),
            ];

        });
    readonly targetServices =
        computed(() => {

            return this.services.controls.map(
                (service) => {

                    const selectedApiId =
                        service.controls.service.value;

                    const apiOptions =
                        service.controls.apiOptions.value || [];

                    const selectedApi =
                        apiOptions.find(
                            x => x.apiId === selectedApiId,
                        );

                    return {

                        label:
                            selectedApi?.title || '-',

                        value:
                            selectedApi?.apiId || null,

                    };

                },
            );

        });

    readonly statusCodeSignal =
        signal(200);

    readonly previewJson =
        computed(() => {

            // refresh triggers
            this.outputRefreshSignal();

            this.servicesRefreshSignal();

            this.services.length;

            const statusCode =
                this.statusCodeSignal();

            // =========================
            // SUCCESS MODE (200)
            // =========================
            if (statusCode === 200) {

                const outputValues =
                    this.outputFields.getRawValue();

                const groupedOutputs: any = {};

                outputValues.forEach((value: any) => {

                    const selectedService =
                        this.sourceServices()
                            .find(
                                x => x.value === value.sourceId,
                            );

                    const serviceTitle =
                        selectedService?.label || '-';

                    // create service group
                    if (!groupedOutputs[serviceTitle]) {

                        groupedOutputs[serviceTitle] = {};

                    }

                    // append field
                    groupedOutputs[serviceTitle][
                    value.key || 'field'
                        ] =
                        value.sourcePath
                            ? `{{body.${value.sourcePath}}}`
                            : '';

                });

                return {

                    code: statusCode,

                    output:

                        Object.entries(groupedOutputs)
                            .map(([key, value]) => ({

                                [key]: value,

                            })),

                };

            }

            // =========================
            // ERROR MODE (400 / 500)
            // =========================

            const groupedErrors: any = {};

            this.services.controls.forEach(
                service => {

                    const serviceTitle =
                        this.getSelectedServiceTitle(service);

                    const finalTitle =
                        serviceTitle &&
                        serviceTitle !== 'سرویس'
                            ? serviceTitle
                            : '-';

                    groupedErrors[
                        `سرویس (${finalTitle})`
                        ] = {

                        code: statusCode,

                        output: {

                            response:
                                `ریسپانس سرویس (${finalTitle})`,

                        },

                    };

                },
            );

            return groupedErrors;

        });
    readonly servicesRefreshSignal =
        signal(0);
    readonly outputRefreshSignal =
        signal(0);
    readonly isSuccessResponse =
        computed(() =>
            this.statusCodeSignal() === 200,
        );
    isCreateMode = false;
    targetElementOptions: Record<number, any[]> = {};
    moduleBase;
    apiName;
    moduleTitle;
    partyTitle;
    clientBase;
    clientId;
    accessBase;
    moduleType;
    partyBase;
    clientName;
    apiId;
    endpointNotIsSystemEndpointDetail;
    modeFlag;
    detailsBreadObject = [];
    sourceElementOptions: { label: any; value: any }[] = [];
    private cdr = inject(ChangeDetectorRef);
    partyListOptions = [{ title: '-', partyId: null }];
    curlBodyPreview = signal<any>({});

    constructor(
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private confirmationService: ConfirmationService,
    ) {

    }


    private tryParse(value: string): {
        ok: boolean;
        error?: any;
        parsed?: any;
    } {
        try {
            return {
                ok: true,
                parsed: JSON.parse(value),
            };
        } catch (e) {
            return {
                ok: false,
                error: e,
            };
        }
    }
    private analyzeJsonSyntax(value: string): string[] {

        const errors: string[] = [];

        const keyWithoutQuotes =
            /[{,]\s*([a-zA-Z_$][\w$]*)\s*:/g;

        if (keyWithoutQuotes.test(value)) {
            errors.push('نام کلید باید داخل دابل کوتیشن (") قرار گیرد.');
        }

        const missingComma =
            /"\s*\d+\s+[a-zA-Z_$]/;

        if (missingComma.test(value)) {
            errors.push('احتمالاً بین دو فیلد کاما (,) فراموش شده است.');
        }

        if (value.includes("'")) {
            errors.push('در JSON باید از دابل کوتیشن (") استفاده شود.');
        }

        if (/:\s*[^,{}[\]]+\s+[a-zA-Z_$]/.test(value)) {
            errors.push('احتمالاً بین مقادیر کاما (,) جا افتاده است.');
        }

        return errors;
    }
    private checkBrackets(text: string): string[] {

        let open = 0;

        const errors: string[] = [];

        for (const c of text) {

            if (c === '{') {
                open++;
            }

            if (c === '}') {
                open--;
            }
        }

        if (open > 0) {
            errors.push('اکولاد { بسته نشده است.');
        }

        if (open < 0) {
            errors.push('اکولاد } اضافه وجود دارد.');
        }

        return errors;
    }
    private getLineAndColumn(
        text: string,
        position: number,
    ): {
        line: number;
        column: number;
    } {

        const lines =
            text.substring(0, position)
                .split('\n');

        return {
            line: lines.length,
            column:
                lines[lines.length - 1].length + 1,
        };
    }
    private validateJsonInternal(
        value: string,
    ): JsonValidationResult {

        const result: JsonValidationResult = {
            valid: false,
            errors: [],
            warnings: [],
        };

        if (!value?.trim()) {
            result.valid = true;
            return result;
        }

        const parsed =
            this.tryParse(value);

        if (!parsed.ok) {

            const positionMatch =
                parsed.error?.message?.match(
                    /position\s+(\d+)/i,
                );

            const position =
                positionMatch
                    ? Number(positionMatch[1])
                    : 0;

            const lc =
                this.getLineAndColumn(
                    value,
                    position,
                );

            result.line = lc.line;
            result.column = lc.column;

            result.errors.push(
                'JSON syntax invalid',
            );

            result.errors.push(
                ...this.analyzeJsonSyntax(value),
            );

            result.errors.push(
                ...this.checkBrackets(value),
            );

            return result;
        }

        if (
            typeof parsed.parsed !== 'object' ||
            parsed.parsed === null ||
            Array.isArray(parsed.parsed)
        ) {

            result.errors.push(
                'فقط JSON از نوع object قابل قبول است',
            );

            return result;
        }

        result.valid = true;

        return result;
    }
    private toBase64Unicode(str: string): string {

        return btoa(
            new TextEncoder()
                .encode(str)
                .reduce(
                    (data, byte) =>
                        data + String.fromCharCode(byte),
                    '',
                ),
        );
    }
  /*buildServicesFromCurl(
        curl: string,
    ): {
        services: any[];
        body: any;
    }
    {

        const normalized =
            curl
                .replace(/\\\r?\n/g, ' ')
                .replace(/\^\r?\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();

        const bodyMatch =
            normalized.match(
                /--data(?:-raw|-binary)?\s+(?:'([\s\S]*?)'|"([\s\S]*?)")/,
            );

        const bodyText =
            bodyMatch?.[1]
            ?? bodyMatch?.[2]
            ?? null;

        let body: any = null;

        if (bodyText) {

            try {

                body = JSON.parse(
                    bodyText,
                );

            } catch {

                body = bodyText;

            }

        }

        const services = [
            // منطق فعلی ساخت سرویس‌ها
        ];

        return {
            services,
            body,
        };

    }*/
    buildServicesFromCurl(
        curl: string,
    ): {
        services: any[];
        body: any;
    }
    {

        const decoded = curl
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');

        const normalized = decoded
            .replace(/\\\r?\n/g, ' ')
            .replace(/\r?\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const bodyMatch = decoded.match(
            /(?:^|\s)(?:-d|--data(?:-raw|-binary|-urlencode)?)\s+(["'])([\s\S]*?)\1/
        );

        const bodyText = bodyMatch?.[2] ?? null;

 /*       const bodyText =
            bodyMatch?.[1] ??
            bodyMatch?.[2] ??
            null;*/

        let body: any = null;

        if (bodyText) {
            try {
                body = JSON.parse(bodyText);
            } catch {
                body = bodyText;
            }
        }

        return {
            services: [],
            body,
        };
    }
    loadAggregateForEdit(dto: any): void {
        debugger
        debugger
        if (!dto) {
            return;
        }

        this._primengProgressBarService.show();

        // قبل از پر کردن فرم، کلاینت‌ها و سازمان‌ها باید لود شده باشند
        // تا لیبل‌ها و چک‌باکس‌ها درست رزولو شوند
        forkJoin({
            clients: this.messagesApiFacadeService.fetchallclient(),
            partys: this.messagesApiFacadeService.fetchallparty(),
        }).subscribe({
            next: ({ clients, partys }) => {
                this.clientListOptions = [...clients];
                this.partyListOptions = [
                    { title: '-', partyId: null },
                    ...partys,
                ];
debugger
                this.populateAggregator(dto);

                this._primengProgressBarService.hide();
                this.cdr.markForCheck();
            },
            error: () => {
                this._primengProgressBarService.hide();
            },
        });
    }
  private populateAggregator(dto: any): void {
      console.log('DTO', dto);
      console.log('INPUT CURL', dto?.inputCurl);
      console.log(
          'FULL RESPONSE DTO',
          JSON.stringify(dto, null, 2)
      );
        const list =
            (dto?.aggregateServiceInfoDtoList ?? [])
                .filter((x: any) => x.status === 1);

        if (!list.length) {
            return;
        }
      console.log('DTO INPUT CURL =>', dto.inputCurl);
      console.log('DTO =>', dto);
      // --- inputCurl ---
      if (dto.inputCurl) {

          let decodedCurl =
              this.fromBase64Unicode(
                  dto.inputCurl,
              );

          // اگر رشته stringify شده ذخیره شده بود
          try {

              if (
                  decodedCurl.startsWith('"') &&
                  decodedCurl.endsWith('"')
              ) {

                  decodedCurl =
                      JSON.parse(decodedCurl);

              }

          } catch {
              // ignore
          }

          this.curlInput.set(
              decodedCurl,
          );

          try {
              const parsed =
                  this.buildServicesFromCurl(decodedCurl);
              console.log('DECODED CURL', decodedCurl);
              console.log('PARSED BODY', parsed.body);
              this.curlRequestBody.set(
                  parsed?.body ?? null,
              );

          } catch {

              this.curlRequestBody.set(
                  null,
              );

          }

      } else {

          this.curlInput.set('');
          this.curlRequestBody.set(null);

      }

        // --- کلاینت‌ها: از ایندکس 0 و فقط status === 1 ---
        const firstClients =
            list[0]?.clientInfoList ?? [];

        const checkedClientIds =
            firstClients
                .filter(
                    (c: any) =>
                        c.status === 1,
                )
                .map(
                    (c: any) =>
                        c.clientId,
                );
      this.clientConfigs =
          firstClients.map(c => ({
              configId: c.configId,
              clientId: c.clientId,
              status: c.status
          }));

      this.form.controls.clientIds.setValue(
          firstClients
              .filter(c => c.status === 1)
              .map(c => c.clientId),
          { emitEvent: false }
      );
        this.form.controls.clientIds.setValue(
            checkedClientIds,
            {
                emitEvent: false,
            },
        );

        // --- بازسازی سرویس‌ها ---
        this.services.clear();

        Object.keys(
            this.mappingDrafts,
        ).forEach(
            k => delete this.mappingDrafts[+k],
        );

        // به ازای هر آیتم یک کادر سرویس
        list.forEach(
            (item: any) => {

                this.addService();

            const index =
                this.services.length - 1;

            const serviceForm =
                this.services.at(index);

            this.buildServiceFromDto(
                serviceForm,
                item,
                index,
            );

        },
    );

    this.servicesRefreshSignal.update(
        x => x + 1,
    );

    this.cdr.markForCheck();
}
   /* private populateAggregator(dto: any): void {
        debugger
        console.log(
            '================ POPULATE AGGREGATOR START ================',
        );

        console.log(
            'RAW DTO =>',
            dto,
        );

        console.log(
            'FULL DTO JSON =>',
            JSON.stringify(
                dto,
                null,
                2,
            ),
        );

        const list =
            (dto?.aggregateServiceInfoDtoList ?? [])
                .filter(
                    (x: any) =>
                        x.status === 1,
                );

        console.log(
            'ACTIVE SERVICES COUNT =>',
            list.length,
        );

        list.forEach(
            (
                item: any,
                index: number,
            ) => {

                console.log(
                    `SERVICE[${index}] =>`,
                    item,
                );

                console.log(
                    `SERVICE[${index}] RESPONSES =>`,
                    item.aggregateServiceResponseDtoList,
                );

                console.log(
                    `SERVICE[${index}] RESPONSES JSON =>`,
                    JSON.stringify(
                        item.aggregateServiceResponseDtoList,
                        null,
                        2,
                    ),
                );

                const response200 =
                    item.aggregateServiceResponseDtoList?.filter(
                        (x: any) =>
                            x.responseStatusCode === 200,
                    );

                const response400 =
                    item.aggregateServiceResponseDtoList?.filter(
                        (x: any) =>
                            x.responseStatusCode === 400,
                    );

                const response401 =
                    item.aggregateServiceResponseDtoList?.filter(
                        (x: any) =>
                            x.responseStatusCode === 401,
                    );

                const response500 =
                    item.aggregateServiceResponseDtoList?.filter(
                        (x: any) =>
                            x.responseStatusCode === 500,
                    );

                console.log(
                    `SERVICE[${index}] 200 =>`,
                    response200,
                );

                console.log(
                    `SERVICE[${index}] 400 =>`,
                    response400,
                );

                console.log(
                    `SERVICE[${index}] 401 =>`,
                    response401,
                );

                console.log(
                    `SERVICE[${index}] 500 =>`,
                    response500,
                );

                console.log(
                    `SERVICE[${index}] 200 CONFIG IDS =>`,
                    response200?.map(
                        (x: any) => ({
                            responseConfigId:
                            x.responseConfigId,
                            responsePartType:
                            x.responsePartType,
                            status:
                            x.status,
                        }),
                    ),
                );

                console.log(
                    `SERVICE[${index}] 400 CONFIG IDS =>`,
                    response400?.map(
                        (x: any) => ({
                            responseConfigId:
                            x.responseConfigId,
                            responsePartType:
                            x.responsePartType,
                            status:
                            x.status,
                        }),
                    ),
                );

            },
        );

        console.log(
            '================ POPULATE AGGREGATOR END ================',
        );

        // بقیه کد فعلی متد بدون تغییر
    }*/
    private buildServiceFromDto(
        serviceForm: any,
        item: any,
        index: number,
    ): void {
        console.log(
            'BUILD SERVICE DTO =>',
            item.id,
            item.aggregateServiceResponseDtoList
        );
        const partyId = item.aggregatedPartyId;   // سازمان مقصد
        const moduleId = item.aggregatedModuleId;   // ماژول مقصد
        const apiId = item.aggregatedApiId;      // سرویس مقصد
        serviceForm.patchValue({
            aggregateServiceId: item.id,
            aggregateId: item.aggregateId,
            operationFlag: item.operationFlag ?? 'U',
            status: item.status
        }, {
            emitEvent: false
        });
        serviceForm.controls.org.setValue(partyId, { emitEvent: false });

        if (!partyId) {
            this.buildConnectionsFromDto(serviceForm, item, apiId);
            console.log(
                'CALLING buildResponsesFromDto'
            );
            this.buildResponsesFromDto(
                serviceForm,
                item,
            );
            return;
        }

        // 1) لود ماژول‌های سازمان -> ست کردن ماژول
        this.messagesApiFacadeService
            .moduleSearchByPartyId(partyId)
            .subscribe(modules => {

                serviceForm.patchValue(
                    {
                        moduleOptions: [
                            { moduleTitle: '-', moduleId: null },
                            ...modules,
                        ],
                    },
                    { emitEvent: false },
                );

                serviceForm.controls.module.setValue(moduleId, { emitEvent: false });

                // 2) لود سرویس‌های ماژول -> ست کردن سرویس
                this.messagesApiFacadeService
                    .apiNochart(0, 10000, moduleId)
                    .subscribe(apis => {

                        serviceForm.patchValue(
                            {
                                apiOptions: [
                                    { title: '-', apiId: null },
                                    ...apis,
                                ],
                            },
                            { emitEvent: false },
                        );

                        serviceForm.controls.service.setValue(apiId, { emitEvent: false });

                        // 3) المان‌های مقصد (برای رزولو شدن لیبل مپینگ‌ها)
                        this.searchNotIsSystemByApiId(apiId).subscribe(res => {

                            this.targetElementOptions[apiId] = res.map(it => ({
                                label: it.ouputName,
                                value: it.endpointDetailId,
                            }));

                            const draft = this.mappingDrafts[index];
                            draft?.get('reqServiceId')?.setValue(apiId, { emitEvent: false });

                            serviceForm.patchValue({
                                isArray200: item.isArray200 ?? false,
                                isArray400: item.isArray400 ?? false,
                            }, {
                                emitEvent: false,
                            });
                            // 4) مپینگ‌ها و پاسخ‌دهی بعد از آماده‌شدن آپشن‌ها
                            this.buildConnectionsFromDto(serviceForm, item, apiId);
                            this.buildResponsesFromDto(serviceForm, item);
                            serviceForm.patchValue({
                                outputJsonRootNodeName:
                                    item.outputJsonRootNodeName ?? '',
                            }, {
                                emitEvent: false,
                            });
                            this.servicesRefreshSignal.update(x => x + 1);
                            this.cdr.markForCheck();
                        });
                    });
            });
    }

    private buildConnectionsFromDto(
        serviceForm: any,
        item: any,
        destApiId: number,
    ): void {

        const connections = this.getConnections(serviceForm);
        connections.clear();

        (item.aggregateServiceMapDtoList ?? []).forEach((map: any) => {
            connections.push(
                this.createConnectionForm({
                    inputConfigId: map.inputConfigId,
                    aggregateServiceId: map.aggregateServiceId,
                    status: map.status,
                    genServiceId: this.apiId,

                    genElement: map.srcInputEndpointDetailId,
                    genElementInputName:
                    map.srcInputEndpointDetailInputName,

                    reqServiceId: destApiId,

                    reqElement:
                    map.destInputEndpointDetailId,

                    reqElementInputName:
                    map.destInputEndpointDetailInputName,
                })
            );
        });
    }

    /*    private buildResponsesFromDto(serviceForm: any, item: any): void {

            const responses = item.aggregateServiceResponseDtoList ?? [];

            const cfgMap: Record<number, { mode: string; outputs: string }> = {
                200: { mode: 'responseMode200', outputs: 'outputs200' },
                400: { mode: 'responseMode400', outputs: 'outputs400' },
                401: { mode: 'responseMode401', outputs: 'outputs401' },
                500: { mode: 'responseMode500', outputs: 'outputs500' },
            };

            // گروه‌بندی بر اساس status code
            const byStatus: Record<number, any[]> = {};
            responses.forEach((r: any) => {
                (byStatus[r.responseStatusCode] ??= []).push(r);
            });

            Object.entries(byStatus).forEach(([code, rows]) => {

                const cfg = cfgMap[+code];
                if (!cfg) {
                    return;
                }

                // اگر مسیر/نام نود داشته باشد یعنی «نودهای منتخب»، وگرنه «انتقال کل ریسپانس»
                const selectedRows = rows.filter(
                    r => r.responseNodePath != null || r.responseNewNodeName != null,
                );

                if (selectedRows.length) {

                    serviceForm.controls[cfg.mode].setValue('selected', { emitEvent: false });

                    const outputs = serviceForm.controls[cfg.outputs] as FormArray;
                    outputs.clear();

                    selectedRows.forEach(r => {
                        const field = this.createOutputField();
                        field.patchValue(
                            {
                                sourceId:   serviceForm.controls.id.value,
                                sourcePath: r.responseNodePath ?? '',
                                key:        r.responseNewNodeName ?? '',
                            },
                            { emitEvent: false },
                        );
                        outputs.push(field);
                    });

                } else {
                    serviceForm.controls[cfg.mode].setValue('all', { emitEvent: false });
                }
            });
        }*/
    chooseBread(caseBase: any) {
        debugger
        if (this.modeFlag == 'U') {
            debugger
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
                            label_index3: 'اگریگیتور های سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش اگریگیتور سرویس'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
                    ];
                    break;
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
                            label_index3: 'اگریگیتور های سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش اگریگیتور سرویس'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
                    ];
                    break;
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
                            label_index2: 'اگریگیتور های سرویس',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/limit.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ویرایش اگریگیتور سرویس'),
                            rout_index3: '/registerRule',
                            isActive3: true,
                            img_index3: 'assets/icons/update.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
                    ];
                    break;
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
                            label_index4: 'اگریگیتور های سرویس',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/limit.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ویرایش اگریگیتور سرویس'),
                            rout_index5: '/registerRule',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                    ];
                    break;
                default:
                    return null;
            }
        } else if (this.modeFlag == 'I') {
            debugger
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
                            label_index3: 'اگریگیتور های سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت اگریگیتور سرویس'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
                    ];
                    break;
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
                            label_index3: 'اگریگیتور های سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت اگریگیتور سرویس'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
                    ];
                    break;
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
                            label_index2: 'اگریگیتور های سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/limit.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ثبت اگریگیتور سرویس'),
                            rout_index3: '/registerRule',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
                    ];
                    break;
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
                            label_index4: 'اگریگیتور های سرویس',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/limit.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ثبت اگریگیتور سرویس'),
                            rout_index5: '/registerRule',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                    ];
                    break;
                default:
                    return null;
            }
        }
    }

    closeCurlDialog(): void {
        this.curlDialogVisible.set(false);
    }

    importCurl(): void {

        if (!this.curlValid()) {
            return;
        }
        const parsed = this.buildServicesFromCurl(
            this.curlInput(),
        );

        this.curlRequestBody.set(
            parsed?.body ?? null,
        );

        this.closeCurlDialog();
        const result =
            this.parseCurl(
                this.curlInput(),
            );

        console.log('RESULT', result);
        console.log('BODY', result.body);

        this.curlRequestBody.set(
            result.body,
        );

        console.log(
            'SIGNAL',
            this.curlRequestBody(),
        );
    }

    openSourceElementDialog(): void {
        this.aggregatorConfigDto = {
            'apiId': this.apiId,
            'someVariable': false,
        };
        this.sourceElementDialogVisible = true;
    }

    openDestinationElementDialog(serviceIndex: number): void {

        const selectedApiId =
            this.services
                .at(serviceIndex)
                .controls
                .service
                .value;

        if (!selectedApiId) {

            this.notifierService.showWarning({
                detail:
                    'لطفا سرویس مقصد را انتخاب کرده و مجدد افزودن المان را کلیک کنید!',
                life: 3000,
            });

            return;
        }

        this.aggregatorConfigDto = {
            apiId: selectedApiId,
            someVariable: false,
        };

        this.destinationElementDialogVisible = true;
    }

    onSourceElementDialogClose(event: string): void {
        this.sourceElementDialogVisible = false;

        if (event === 'closeAndCreate') {

            this.searchNotIsSystemByApiId(this.apiId)
                .subscribe(data => {

                    this.endpointNotIsSystemEndpointDetail = data;

                    this.sourceElementOptions =
                        data.map(item => ({
                            label: item.ouputName,
                            value: item.endpointDetailId,
                        }));

                    this.cdr.markForCheck();
                });
        }
    }

    onDestinationElementDialogClose(event: string): void {
        this.destinationElementDialogVisible = false;

        if (event === 'closeAndCreate') {

            this.services.controls.forEach(service => {

                const targetApiId =
                    service.controls.service.value;

                if (!targetApiId) {
                    return;
                }

                this.searchNotIsSystemByApiId(targetApiId)
                    .subscribe(res => {

                        this.targetElementOptions[targetApiId] =
                            res.map(item => ({
                                label: item.ouputName,
                                value: item.endpointDetailId,
                            }));

                        this.cdr.markForCheck();
                    });

            });
        }
    }

   /* curlValidationMessage(): string {

        if (this.curlError()) {
            return this.curlError()!;
        }

        if (this.curlValid()) {

            const parsed = this.parsedCurl();

            return `
Method: ${parsed.method}
Headers: ${parsed.headersCount}
Query Params: ${parsed.queryCount}
`;
        }

        return '';
    }*/
/*    curlValidationMessage(): string {

        if (this.curlError()) {
            return this.curlError()!;
        }

        if (this.curlValid()) {

            const parsed = this.parsedCurl();

            const bodyMessage =
                parsed.body
                    ? 'Body Detected'
                    : 'cURL Body ندارد';

            return `
Method: ${parsed.method}
Headers: ${parsed.headersCount}
Query Params: ${parsed.queryCount}
${bodyMessage}
`;
        }

        return '';
    }*/
    curlValidationMessage(): string {

        if (this.curlError()) {
            return this.curlError()!;
        }

        if (this.curlValid()) {

            const parsed = this.parsedCurl();

            return parsed.body
                ? 'cURL معتبر است'
                : 'cURL Body ندارد';
        }

        return '';
    }
    validateCurlLive(value: string): void {

        this.curlInput.set(value);

        if (!value?.trim()) {

            this.curlError.set('cURL را وارد کنید');
            this.curlValid.set(false);

            return;
        }

        try {

            const parsed = this.parseCurl(value);

            this.parsedCurl.set(parsed);

            this.curlError.set(null);

            this.curlValid.set(true);

        } catch (error: any) {

            this.curlValid.set(false);

            this.curlError.set(
                error?.message || 'فرمت cURL نامعتبر است',
            );
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }

    searchNotIsSystemByApiId(apiId: number) {
        return this.messagesApiFacadeService
            .endpointdetailByApi(
                apiId,
                0,
                110000,
                0,
                {
                    skipEmptyCheck: true,
                },
            )
            .pipe(
                map((response: HttpResponse<any>) => {
                    let data: any[] = [];
                    if (Array.isArray(response.body)) {
                        data = response.body;
                    } else if (
                        response.body?.data &&
                        Array.isArray(response.body.data)
                    ) {
                        data = response.body.data;
                    }
                    return data.filter(
                        item =>
                            item.status === 1 &&
                            item.actionType === 3 &&
                            item.detailType === 2,
                    );
                }),
            );
    }

    ngOnInit(): void {
        debugger
        debugger
        debugger

        if (this.inputAggregatorConfig?.operationFlag !== 'U') {
            debugger
            this.loadClients();
            this.loadPartys();

        }
        if (!this.inputAggregatorConfig) {
            return;
        }
        debugger
        debugger
        this.moduleBase = this.inputAggregatorConfig.moduleBase;
        this.apiName = this.inputAggregatorConfig.name;
        this.apiTitle = this.inputAggregatorConfig.title;
        this.apiId = this.inputAggregatorConfig.apiId;
        this.moduleTitle = this.inputAggregatorConfig.moduleTitle;
        this.partyTitle = this.inputAggregatorConfig.partyTitle;
        this.clientBase = this.inputAggregatorConfig.clientBase;
        this.clientName = this.inputAggregatorConfig.clientName;
        this.clientId = this.inputAggregatorConfig.clientId;
        this.accessBase = this.inputAggregatorConfig.accessBase;
        this.moduleType = this.inputAggregatorConfig.moduleType;
        this.partyBase = this.inputAggregatorConfig.partyBase;
        this.modeFlag = this.inputAggregatorConfig.operationFlag;
        this.form.controls.statusCode.valueChanges.subscribe(value => {
            this.statusCodeSignal.set(value);
        });
        debugger
        if (this.clientBase) {
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
        this.outputFields.valueChanges
            .subscribe(() => {

                this.outputRefreshSignal.update(
                    x => x + 1,
                );
            });
        if (this.inputAggregatorConfig != undefined) {
            debugger
            if (this.inputAggregatorConfig.operationFlag === 'U') {
                debugger
                this.messagesApiFacadeService.getAggregate(this.inputAggregatorConfig.aggregateId).subscribe(res => {
                    this.aggregateDto = res.body;
                    debugger
                    this.loadAggregateForEdit(
                        this.aggregateDto,
                    );

                });
            }
        }
        this.searchNotIsSystemByApiId(this.apiId)
            .subscribe(data => {

                this.endpointNotIsSystemEndpointDetail = data;
                this.sourceElementOptions =
                    data.map(item => ({
                        label: item.ouputName,
                        value: item.endpointDetailId,
                    }));

                if (this.services.length === 0) {
                    this.initialize();
                }

                this.cdr.markForCheck();
            });

    }

    ngOnChanges() {
        if (this.isViewMode) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    storePreviousValue(
        serviceForm: any,
        controlName: string,
    ): void {

        const formId =
            serviceForm.controls.id.value;

        const key =
            `${formId}_${controlName}`;

        this.previousSelections.set(
            key,
            serviceForm.controls[controlName].value,
        );

    }

    addOutput200(serviceIndex: number): void {

        const service =
            this.services.at(serviceIndex);

        const output =
            this.createOutputField();

        output.patchValue({
            sourceId: service.controls.id.value
            // یا اگر باید apiId باشد:
            // sourceId: service.controls.service.value
        });

        this.getOutputs200(service)
            .push(output);

        this.servicesRefreshSignal.update(
            x => x + 1,
        );
    }
   /* removeOutput200(
        serviceIndex: number,
        outputIndex: number,
    ): void {

        const outputs =
            this.getOutputs200(
                this.services.at(serviceIndex),
            );

        const output =
            outputs.at(outputIndex);

        if (
            this.modeFlag === 'U' &&
            output.get('responseConfigId')?.value
        ) {

            output.patchValue({
                status: 0,
            });

            this.servicesRefreshSignal.update(
                x => x + 1,
            );

            return;
        }

        outputs.removeAt(outputIndex);
    }*/
    removeOutput200(
        serviceIndex: number,
        outputIndex: number,
    ): void {

        const service =
            this.services.at(serviceIndex);

        if (!service) {
            return;
        }

        const outputs =
            this.getOutputs200(service);

        if (!outputs) {
            return;
        }

        const output =
            outputs.at(outputIndex);

        if (!output) {
            console.warn(
                'Output not found',
                serviceIndex,
                outputIndex,
            );
            return;
        }

        if (
            this.modeFlag === 'U' &&
            output.get('responseConfigId')?.value
        ) {

            output.patchValue(
                {
                    status: 0,
                    operationFlag: 'D',
                },
                {
                    emitEvent: false,
                },
            );

            this.servicesRefreshSignal.update(
                x => x + 1,
            );

            this.cdr.markForCheck();

            return;
        }

        outputs.removeAt(outputIndex);

        this.servicesRefreshSignal.update(
            x => x + 1,
        );

        this.cdr.markForCheck();
    }
    removeOutput400(
        serviceIndex: number,
        outputIndex: number,
    ): void {

        const service =
            this.services.at(serviceIndex);

        if (!service) {
            return;
        }

        const outputs =
            this.getOutputs400(service);

        if (!outputs) {
            return;
        }

        const output =
            outputs.at(outputIndex);

        if (!output) {
            return;
        }

        // Edit Mode => Soft Delete
        if (
            this.modeFlag === 'U'
        ) {

            output.patchValue(
                {
                    status: 0,
                    operationFlag: 'D',
                },
                {
                    emitEvent: false,
                },
            );

            this.servicesRefreshSignal.update(
                x => x + 1,
            );

            this.cdr.markForCheck();

            return;
        }

        // Register Mode => Physical Delete
        outputs.removeAt(outputIndex);

        this.servicesRefreshSignal.update(
            x => x + 1,
        );

        this.cdr.markForCheck();
    }
    getOutputs200(service: any) {
        return service.controls.outputs200;
    }
    getOutputs400(service: any) {
        return service.controls.outputs400;
    }
    getVisibleOutputs400(service: any): any[] {

        return this.getOutputs400(service)
            .controls
            .filter(
                x => x.get('status')?.value !== 0
            );
    }

    getOutputs401(service: any) {
        return service.controls.outputs401;
    }

    getOutputs500(service: any) {
        return service.controls.outputs500;
    }

    getTargetElementOptions(apiId: number) {

        if (!apiId) {
            return [];
        }

        return this.targetElementOptions[apiId] ?? [];

    }

    getElementTitleById(
        elementId: number,
        apiId?: number,
    ): string {

        if (!elementId) {
            return '-';
        }

        // مبدا
        const sourceElement =
            this.sourceElementOptions.find(
                x => x.value === elementId,
            );

        if (sourceElement) {
            return sourceElement.label;
        }

        // مقصد
        if (apiId) {

            const targetElement =
                (this.targetElementOptions[apiId] || [])
                    .find(
                        x => x.value === elementId,
                    );

            if (targetElement) {
                return targetElement.label;
            }
        }

        return String(elementId);
    }

    initialize(): void {

        this.addService();
        this.services.getRawValue();
        this.addOutputField();

    }

    onChangeModule(serviceForm: any, event: any): void {

        const selectedModuleId =
            event.value ?? event;

        const formId =
            serviceForm.controls.id.value;

        const previousModuleId =
            this.previousSelections.get(
                `${formId}_module`,
            );
        const previousServiceId =
            serviceForm.controls.service.value;

        const previousApiOptions =
            serviceForm.controls.apiOptions.value;

        const serviceIndex =
            this.services.controls.findIndex(
                x => x === serviceForm,
            );

        const selectedModule =
            serviceForm.controls.moduleOptions.value.find(
                x => x.moduleId === selectedModuleId,
            );

        const applyChange = () => {
            const draft = this.mappingDrafts[serviceIndex];

            const sourceValues = {
                genServiceId: draft?.get('genServiceId')?.value,
                genElement: draft?.get('genElement')?.value,
                genPath: draft?.get('genPath')?.value,
            };
            this.clearMappings(
                serviceForm,
                serviceIndex,
            );
            draft?.patchValue(sourceValues);
            serviceForm.patchValue({
                module: selectedModuleId,
                service: null,
                apiOptions: [
                    {
                        title: '-',
                        apiId: null,
                    },
                ],
            });

            if (!selectedModuleId) {
                return;
            }

            this._primengProgressBarService.show();

            this.messagesApiFacadeService
                .apiNochart(
                    0,
                    10000,
                    selectedModuleId,
                )
                .subscribe({
                    next: apis => {

                        serviceForm.patchValue({
                            apiOptions: [
                                {
                                    title: '-',
                                    apiId: null,
                                },
                                ...apis,
                            ],
                        });

                        this._primengProgressBarService.hide();

                    },
                    error: () => {

                        this._primengProgressBarService.hide();

                    },
                });

        };

        if (this.hasMappings(serviceForm)) {

            this.confirmationService.confirm({

                key: 'mappingResetDialog',

                header: 'تغییر ماژول',

                message:
                    `تغییر ماژول موجب از دست رفتن اطلاعات Mapping Engine می‌شود.`,

                accept: () => {

                    applyChange();

                },

                reject: () => {

                    serviceForm
                        .get('module')
                        ?.setValue(
                            previousModuleId,
                            {
                                emitEvent: false,
                            },
                        );

                    serviceForm
                        .get('service')
                        ?.setValue(
                            previousServiceId,
                            {
                                emitEvent: false,
                            },
                        );

                    serviceForm.patchValue({
                        apiOptions: previousApiOptions,
                    });

                },

            });

            return;

        }

        applyChange();

    }

    loadPartys(): void {
        this.messagesApiFacadeService.fetchallparty().subscribe(partys => {
            this.partyListOptions = [...partys];
            this.partyListOptions.unshift({ title: '-', partyId: null });
        });
    }

    loadClients(): void {

        this.messagesApiFacadeService.fetchallclient().subscribe(clients => {

            this.clientListOptions = [
                ...clients,
            ];

        });

    }

    getSelectedServiceTitle(
        serviceForm: any,
    ): string {

        const selectedApiId =
            serviceForm.controls.service.value;

        const apiOptions =
            serviceForm.controls.apiOptions.value || [];

        const selectedApi =
            apiOptions.find(
                x => x.apiId === selectedApiId,
            );

        return (
            (!selectedApi?.title || selectedApi?.title == '-') ? 'سرویس' : selectedApi?.title
        );

    }

    onChangeParty(serviceForm: any, event: any): void {

        const selectedPartyId =
            event.value ?? event;

        const formId =
            serviceForm.controls.id.value;

        const previousPartyId =
            this.previousSelections.get(
                `${formId}_org`,
            );
        const previousModuleId =
            serviceForm.controls.module.value;

        const previousServiceId =
            serviceForm.controls.service.value;

        const previousModuleOptions =
            serviceForm.controls.moduleOptions.value;

        const previousApiOptions =
            serviceForm.controls.apiOptions.value;

        const serviceIndex =
            this.services.controls.findIndex(
                x => x === serviceForm,
            );

        const selectedParty =
            this.partyListOptions.find(
                x => x.partyId === selectedPartyId,
            );

        const applyChange = () => {

            const draft = this.mappingDrafts[serviceIndex];

            const sourceValues = {
                genServiceId: draft?.get('genServiceId')?.value,
                genElement: draft?.get('genElement')?.value,
                genPath: draft?.get('genPath')?.value,
            };
            this.clearMappings(
                serviceForm,
                serviceIndex,
            );
            draft?.patchValue(sourceValues);
            serviceForm.patchValue({
                org: selectedPartyId,
                module: null,
                service: null,
                apiOptions: [
                    {
                        title: '-',
                        apiId: null,
                    },
                ],
            });

            this.messagesApiFacadeService
                .moduleSearchByPartyId(selectedPartyId)
                .subscribe(modules => {

                    serviceForm.patchValue({
                        moduleOptions: [
                            {
                                moduleTitle: '-',
                                moduleId: null,
                            },
                            ...modules,
                        ],
                    });

                });

        };

        if (this.hasMappings(serviceForm)) {

            this.confirmationService.confirm({

                key: 'mappingResetDialog',

                header: 'تغییر سازمان',

                message:
                    `تغییر سازمان موجب از دست رفتن اطلاعات Mapping Engine می‌شود.`,

                accept: () => {

                    applyChange();

                },

                reject: () => {

                    serviceForm
                        .get('org')
                        ?.setValue(
                            previousPartyId,
                            {
                                emitEvent: false,
                            },
                        );

                    serviceForm
                        .get('module')
                        ?.setValue(
                            previousModuleId,
                            {
                                emitEvent: false,
                            },
                        );

                    serviceForm
                        .get('service')
                        ?.setValue(
                            previousServiceId,
                            {
                                emitEvent: false,
                            },
                        );

                    serviceForm.patchValue({
                        moduleOptions: previousModuleOptions,
                        apiOptions: previousApiOptions,
                    });

                },

            });

            return;

        }

        applyChange();

    }

    onChangeApi(serviceForm: any, event: any): void {

        const formId =
            serviceForm.controls.id.value;

        const previousApiId =
            this.previousSelections.get(
                `${formId}_service`,
            );

        const selectedApiId =
            event.value ?? event;

        // جلوگیری از انتخاب سرویس تکراری
        const duplicated =
            selectedApiId &&
            this.services.controls.some(
                service =>
                    service !== serviceForm &&
                    service.controls.service.value === selectedApiId,
            );

        if (duplicated) {

            this.notifierService.showError({
                detail:
                    'امکان انتخاب این سرویس نیست، این سرویس قبلا انتخاب شده است!',
                life: 3000,
            });

            serviceForm
                .get('service')
                ?.setValue(
                    previousApiId,
                    {
                        emitEvent: false,
                    },
                );

            return;
        }

        const serviceIndex =
            this.services.controls.findIndex(
                x => x === serviceForm,
            );

        if (serviceIndex === -1) {
            return;
        }

        const applyChange = () => {

            const draft =
                this.mappingDrafts[serviceIndex];

            const genElement =
                draft?.get('genElement')?.value;

            const genPath =
                draft?.get('genPath')?.value;

            this.clearMappings(
                serviceForm,
                serviceIndex,
            );

            draft?.patchValue({
                genElement,
                genPath,
            });

            serviceForm.patchValue({
                service: selectedApiId,
            });

            this.servicesRefreshSignal.update(
                x => x + 1,
            );

            this.searchNotIsSystemByApiId(selectedApiId)
                .subscribe(res => {

                    const options =
                        res.map(item => ({
                            label: item.ouputName,
                            value: item.endpointDetailId,
                        }));

                    this.targetElementOptions[selectedApiId] =
                        options;

                    this.cdr.markForCheck();

                });

            if (!draft) {
                return;
            }

            draft.patchValue({
                reqServiceId: selectedApiId,
            });

        };

        if (this.hasMappings(serviceForm)) {

            this.confirmationService.confirm({

                key: 'mappingResetDialog',

                header: 'تغییر سرویس',

                message:
                    'تغییر سرویس موجب از دست رفتن اطلاعات Mapping Engine می‌شود.',

                accept: () => {

                    applyChange();

                },

                reject: () => {

                    serviceForm
                        .get('service')
                        ?.setValue(
                            previousApiId,
                            {
                                emitEvent: false,
                            },
                        );

                },

            });

            return;

        }

        applyChange();

    }

    createServiceForm() {

        return this.fb.group({
            id: this.fb.control(this.generateId()),
            aggregateServiceId: this.fb.control(null),
            aggregateId: this.fb.control(null),
            operationFlag: this.fb.control('I'),
            status: this.fb.control(1),
            org: this.fb.control(null),
            outputJsonRootNodeName: this.fb.control(''),

            module: this.fb.control(null),
            service: this.fb.control(null),

            moduleOptions: this.fb.control<any[]>([
                {
                    moduleTitle: '-',
                    moduleId: null,
                },
            ]),

            apiOptions: this.fb.control<any[]>([
                {
                    title: '-',
                    apiId: null,
                },
            ]),

            responseMode200: this.fb.control('all'),
            responseMode400: this.fb.control('all'),
            responseConfigId200: this.fb.control(null),
            responseConfigId400: this.fb.control(null),
            responseConfigId401: this.fb.control(null),
            responseConfigId500: this.fb.control(null),
            isArray200: this.fb.control(false),
            isArray400: this.fb.control(false),
            outputs200: this.fb.array([]),
            outputs400: this.fb.array([]),

            // جدید
            outputStaticJson401: this.fb.control(''),
            outputStaticJson500: this.fb.control(''),


            outputs401: this.fb.array([]),
            outputs500: this.fb.array([]),

            connections: this.fb.array([]),


        });

    }

    private generateId(): string {

        if (globalThis.crypto?.randomUUID) {
            return globalThis.crypto.randomUUID();
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, c => {

                const r =
                    Math.random() * 16 | 0;

                const v =
                    c === 'x'
                        ? r
                        : (r & 0x3 | 0x8);

                return v.toString(16);

            });

    }

    clientListOptions: any[] = [];

    createConnectionForm(
        data?: any,
    ) {

        return this.fb.group({

            // ===== Edit Fields =====
            inputConfigId: this.fb.control(
                data?.inputConfigId ?? null,
            ),

            aggregateServiceId: this.fb.control(
                data?.aggregateServiceId ?? null,
            ),

            status: this.fb.control(
                data?.status ?? 1,
            ),

            // ===== Mapping Fields =====
            genType: this.fb.control({
                value: 'body',
                disabled: true,
            }),

            genServiceId: this.fb.control(
                data?.genServiceId || 'global',
            ),

            // Id مبدا
            genElement: this.fb.control(
                data?.genElement || '',
            ),

            // نام المان مبدا
            genElementInputName: this.fb.control(
                data?.genElementInputName ?? null,
            ),

            genPath: this.fb.control(
                data?.genPath || '',
            ),

            reqType: this.fb.control({
                value: 'body',
                disabled: true,
            }),

            reqServiceId: this.fb.control(
                data?.reqServiceId || '',
            ),

            // Id مقصد
            reqElement: this.fb.control(
                data?.reqElement || '',
            ),

            // نام المان مقصد
            reqElementInputName: this.fb.control(
                data?.reqElementInputName ?? null,
            ),

            reqPath: this.fb.control(
                data?.reqPath || '',
            ),

        });

    }


    clearServices(): void {

        this.services.clear();

        Object.keys(this.mappingDrafts)
            .forEach(key => {
                delete this.mappingDrafts[+key];
            });

        this.addService();
        this.services.getRawValue();
    }

    createDraftForm() {

        return this.fb.group({
            inputConfigId: this.fb.control(null),

            aggregateServiceId: this.fb.control(null),

            status: this.fb.control(1),

            genType: this.fb.control('body'),

            genServiceId: this.fb.control({
                value: this.apiId ?? null,
                disabled: true,
            }),

            // Id مبدا
            genElement: this.fb.control(''),

            // نام المان مبدا
            genElementInputName: this.fb.control(null),

            genPath: this.fb.control(''),

            reqType: this.fb.control('body'),

            reqServiceId: this.fb.control({
                value: null,
                disabled: true,
            }),

            // Id مقصد
            reqElement: this.fb.control(''),

            // نام المان مقصد
            reqElementInputName: this.fb.control(null),

            reqPath: this.fb.control(''),

        });

    }

    hasMappings(serviceForm: any): boolean {

        return this.getConnections(serviceForm)
            .controls.length > 0;

    }

    clearMappings(serviceForm: any, serviceIndex: number): void {

        this.getConnections(serviceForm).clear();

        const draft =
            this.mappingDrafts[serviceIndex];

        if (!draft) {
            return;
        }

        draft.reset({
            genType: 'body',
            genServiceId: this.apiId,

            genElement: '',
            genElementInputName: null,

            genPath: '',

            reqType: 'body',
            reqServiceId: null,

            reqElement: '',
            reqElementInputName: null,

            reqPath: '',
        });

        draft.get('reqType')?.disable();
        draft.get('genType')?.disable();

    }
    private validateBeforeSave(): boolean {
debugger
        // =========================
        // Client
        // =========================
        const clientIds =
            this.form.controls.clientIds.value;

        if (!clientIds?.length) {

            this.notifierService.showError({
                detail: 'هیچ کلاینتی جهت اعمال کانفیگ اگیریگیتور انتخاب نشده است!',
                life: 4000,
            });

            return false;
        }

        // =========================
        // Services
        // =========================
        for (
            let index = 0;
            index < this.services.length;
            index++
        ) {

            const service =
                this.services.at(index);

            const serviceNo =
                index + 1;

            // سازمان مقصد
            if (!service.controls.org.value) {

                this.notifierService.showError({
                    detail:
                        `لطفا سازمان مقصد را برای سرویس شماره ${serviceNo} وارد نمایید!`,
                    life: 4000,
                });

                return false;
            }

            // ماژول مقصد
            if (!service.controls.module.value) {

                this.notifierService.showError({
                    detail:
                        `لطفا ماژول مقصد را برای سرویس شماره ${serviceNo} را وارد نمایید!`,
                    life: 4000,
                });

                return false;
            }

            // سرویس مقصد
            if (!service.controls.service.value) {

                this.notifierService.showError({
                    detail:
                        `لطفا سرویس مقصد را برای سرویس شماره ${serviceNo} را وارد نمایید!`,
                    life: 4000,
                });

                return false;
            }

// =========================
// Main Service CURL
// =========================

            const curl = this.curlInput();

            if (!curl?.trim()) {

                this.notifierService.showError({
                    detail: 'لطفا کرل سرویس اصلی را وارد نمائید!',
                    life: 4000,
                });

                return false;
            }
// =========================
// Target Elements Validation
// =========================

            const targetApiId =
                service.controls.service.value;

            const allElements =
                this.targetElementOptions[targetApiId] ?? [];

            const remainingElements =
                this.getAvailableTargetElements(
                    service,
                    targetApiId,
                );

            if (
                allElements.length > 0 &&
                remainingElements.length > 0
            ) {

                this.notifierService.showError({
                    detail:
                        `سرویس شماره ${serviceNo} المان مپ نشده دارد، لطفا المان را به لیست مپینگ اضافه کنید!`,
                    life: 4000,
                });

                return false;
            }
            // =========================
// Mapping Validation
// =========================

            const mappings =
                this.getConnections(service)
                    .controls
                    .filter(
                        x => x.get('status')?.value !== 0
                    );

            if (!mappings.length) {

                this.notifierService.showError({
                    detail:
                        `هیچ مشخصاتی برای مپ‌کردن المان‌ها برای سرویس شماره ${serviceNo} وارد نشده است.`,
                    life: 4000,
                });

                return false;
            }
            // =========================
            // Output Root Node
            // =========================

            if (
                !service.controls
                    .outputJsonRootNodeName
                    .value?.trim()
            ) {

                this.notifierService.showError({
                    detail:
                        `لطفا نام روت خروجی سرویس شماره ${serviceNo} را وارد کنید!`,
                    life: 4000,
                });

                return false;
            }

            // =========================
            // 401
            // =========================

            if (
                !service.controls
                    .outputStaticJson401
                    .value?.trim()
            ) {

                this.notifierService.showError({
                    detail:
                        `لطفا برای خروجی وضعیت 401 سرویس شماره ${serviceNo} خروجی جیسون استاندارد وارد کنید!`,
                    life: 4000,
                });

                return false;
            }

            // =========================
            // 500
            // =========================

            if (
                !service.controls
                    .outputStaticJson500
                    .value?.trim()
            ) {

                this.notifierService.showError({
                    detail:
                        `لطفا برای خروجی وضعیت 500 سرویس شماره ${serviceNo} خروجی جیسون استاندارد وارد کنید!`,
                    life: 4000,
                });

                return false;
            }

            // =========================
            // 200 Selected
            // =========================

            if (
                service.controls.responseMode200.value
                === 'selected'
            ) {

                const outputs200 =
                    this.getOutputs200(service);

                if (!outputs200.length) {

                    this.notifierService.showError({
                        detail:
                            `لطفا یک نود منتخب وضعیت 200 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }

            /*    const invalidPath =
                    outputs200.controls.find(
                        (x: any) =>
                            !x.controls.sourcePath.value?.trim(),
                    );

                if (invalidPath) {

                    this.notifierService.showError({
                        detail:
                            `لطفا مسیر نود منتخب وضعیت 200 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }*/


                const invalidIndex =
                    outputs200.controls.findIndex(
                        (x: any) =>
                            !x.controls.sourcePath.value?.trim(),
                    );

                if (invalidIndex !== -1) {

                    this.notifierService.showError({
                        detail:
                            `لطفا مسیر نود منتخب شماره ${invalidIndex + 1} وضعیت 200 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }
            }

            // =========================
            // 400 Selected
            // =========================

            if (
                service.controls.responseMode400.value
                === 'selected'
            ) {

                const outputs400 =
                    this.getOutputs400(service);

                if (!outputs400.length) {

                    this.notifierService.showError({
                        detail:
                            `لطفا یک نود منتخب وضعیت 400 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }

       /*         const invalidPath =
                    outputs400.controls.find(
                        (x: any) =>
                            !x.controls.sourcePath.value?.trim(),
                    );

                if (invalidPath) {

                    this.notifierService.showError({
                        detail:
                            `لطفا مسیر نود منتخب وضعیت 400 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }*/

                const invalidIndex =
                    outputs400.controls.findIndex(
                        (x: any) =>
                            !x.controls.sourcePath.value?.trim(),
                    );

                if (invalidIndex !== -1) {

                    this.notifierService.showError({
                        detail:
                            `لطفا مسیر نود منتخب شماره ${invalidIndex + 1} وضعیت 400 برای سرویس شماره ${serviceNo} وارد کنید!`,
                        life: 4000,
                    });

                    return false;
                }
            }
        }

        return true;
    }
    addService(): void {

        const serviceForm =
            this.createServiceForm();

        this.services.push(
            serviceForm,
        );

        const index =
            this.services.length - 1;

        this.mappingDrafts[index] =
            this.createDraftForm();

        this.mappingDrafts[index]
            .get('genType')
            ?.disable();

        this.mappingDrafts[index]
            .get('reqType')
            ?.disable();

        const control =
            this.mappingDrafts[index]
                .get('genServiceId');

        control?.setValue(this.apiId);
        control?.disable();

        this.servicesRefreshSignal.update(
            x => x + 1,
        );

    }

    removeService(index: number) {
        const service = this.services.at(index);

        if (!service) {
            return;
        }


        if (
            this.modeFlag === 'U' &&
            service.get('aggregateServiceId')?.value
        ) {

            service.patchValue(
                {
                    status: 0,
                    operationFlag: 'D'
                },
                {
                    emitEvent: false
                });

            this.servicesRefreshSignal.update(
                x => x + 1,
            );
            this.cdr.markForCheck();
            return;
        }

        this.services.removeAt(index);

        delete this.mappingDrafts[index];
    }

    /*    addConnection(
            serviceIndex: number,
        ): void {

            const draft =
                this.mappingDrafts[
                    serviceIndex
                    ];

            if (!draft) {
                return;
            }

            const value =
                draft.getRawValue();

            this.getConnections(
                this.services.at(
                    serviceIndex,
                ),
            ).push(
                this.createConnectionForm(
                    value,
                ),
            );

            const currentServiceId =
                this.services
                    .at(serviceIndex)
                    .controls.service.value;

            draft.reset({
                genType: 'body',
                genServiceId: this.apiId,

                genElement: '',
                genElementInputName: null,

                genPath: '',

                reqType: 'body',
                reqServiceId: currentServiceId,

                reqElement: '',
                reqElementInputName: null,

                reqPath: '',
            });

            draft.get('reqType')?.disable();
            draft.get('genType')?.disable();
        }*/
    addConnection(
        serviceIndex: number,
    ): void {

        const draft =
            this.mappingDrafts[
                serviceIndex
                ];

        if (!draft) {
            return;
        }

        const value =
            draft.getRawValue();

        // ==========================
        // Source Element Name
        // ==========================
        const sourceElement =
            this.sourceElementOptions.find(
                x => x.value === value.genElement,
            );

        // ==========================
        // Target Element Name
        // ==========================
        const targetElement =
            (
                this.targetElementOptions[
                    value.reqServiceId
                    ] || []
            ).find(
                x => x.value === value.reqElement,
            );

        const connectionValue = {
            ...value,

            genElementInputName:
                sourceElement?.label ?? null,

            reqElementInputName:
                targetElement?.label ?? null,
        };

        this.getConnections(
            this.services.at(
                serviceIndex,
            ),
        ).push(
            this.createConnectionForm(
                connectionValue,
            ),
        );

        const currentServiceId =
            this.services
                .at(serviceIndex)
                .controls
                .service
                .value;

        draft.reset({
            genType: 'body',
            genServiceId: this.apiId,

            genElement: '',
            genElementInputName: null,

            genPath: '',

            reqType: 'body',
            reqServiceId: currentServiceId,

            reqElement: '',
            reqElementInputName: null,

            reqPath: '',
        });

        draft.get('reqType')?.disable();
        draft.get('genType')?.disable();
    }

    getServiceTitleById(apiId: any): string {

        // سورس اصلی (global api)
        if (apiId === this.apiId) {
            return this.apiTitle || '-';
        }

        for (const service of this.services.controls) {

            const apiOptions =
                service.controls.apiOptions.value || [];

            const found =
                apiOptions.find(
                    x => x.apiId === apiId,
                );

            if (found) {
                return found.title;
            }

        }

        return '-';

    }

    /*  private buildResponsesFromDto(
          serviceForm: any,
          item: any
      ): void {

          const responses =
              (item.aggregateServiceResponseDtoList ?? [])
                  .filter((x: any) => x.status === 1);

          const outputs200 =
              serviceForm.controls.outputs200 as FormArray;

          const outputs400 =
              serviceForm.controls.outputs400 as FormArray;

          outputs200.clear();
          outputs400.clear();

          const successRows =
              responses.filter(
                  (x: any) => x.responseStatusCode === 200
              );

          const validationRows =
              responses.filter(
                  (x: any) => x.responseStatusCode === 400
              );

          // -------------------
          // 200 Success
          // -------------------

          if (successRows.length) {

              serviceForm.controls.responseMode200.setValue(
                  'selected',
                  { emitEvent: false }
              );

              successRows.forEach((row: any) => {

                  const field =
                      this.createOutputField();

                  field.patchValue(
                      {
                          sourceId:
                          serviceForm.controls.id.value,

                          sourcePath:
                              row.responseNodePath ?? '',

                          key:
                              row.responseNewNodeName ?? ''
                      },
                      { emitEvent: false }
                  );

                  outputs200.push(field);

              });

          }

          // -------------------
          // 400 Validation
          // -------------------

          if (validationRows.length) {

              serviceForm.controls.responseMode400.setValue(
                  'selected',
                  { emitEvent: false }
              );

              validationRows.forEach((row: any) => {

                  const field =
                      this.createOutputField();

                  field.patchValue(
                      {
                          sourceId:
                          serviceForm.controls.id.value,

                          sourcePath:
                              row.responseNodePath ?? '',

                          key:
                              row.responseNewNodeName ?? ''
                      },
                      { emitEvent: false }
                  );

                  outputs400.push(field);

              });

          }

          this.cdr.markForCheck();

      }*/

/*    private buildResponsesFromDto(
        serviceForm: any,
        item: any,
    ): void {

        const responses =
            (item.aggregateServiceResponseDtoList ?? [])
                .filter((x: any) => x.status === 1);

        // =========================
        // 200
        // =========================

        const outputs200 =
            serviceForm.controls.outputs200 as FormArray;

        outputs200.clear();

        const rows200 =
            responses.filter(
                (x: any) =>
                    x.responseStatusCode === 200,
            );

        const selected200 =
            rows200.some(
                (x: any) =>
                    x.responsePartType === 1,
            );

        serviceForm.controls.responseMode200
            .setValue(
                selected200
                    ? 'selected'
                    : 'all',
                {
                    emitEvent: false,
                },
            );

        if (selected200) {

            rows200.forEach((row: any) => {

                const field =
                    this.createOutputField();

                field.patchValue(
                    {
                        sourceId:
                        serviceForm.controls.id.value,

                        sourcePath:
                            row.responseNodePath ?? '',

                        key:
                            row.responseNewNodeName ?? '',

                        isArray:
                            row.isArray === 1,
                    },
                    {
                        emitEvent: false,
                    },
                );

                outputs200.push(field);

            });

        }

        // =========================
        // 400
        // =========================

        const outputs400 =
            serviceForm.controls.outputs400 as FormArray;

        outputs400.clear();

        const rows400 =
            responses.filter(
                (x: any) =>
                    x.responseStatusCode === 400,
            );

        const selected400 =
            rows400.some(
                (x: any) =>
                    x.responsePartType === 1,
            );

        serviceForm.controls.responseMode400
            .setValue(
                selected400
                    ? 'selected'
                    : 'all',
                {
                    emitEvent: false,
                },
            );

        if (selected400) {

            rows400.forEach((row: any) => {

                const field =
                    this.createOutputField();

                field.patchValue(
                    {
                        sourceId:
                        serviceForm.controls.id.value,

                        sourcePath:
                            row.responseNodePath ?? '',

                        key:
                            row.responseNewNodeName ?? '',

                        isArray:
                            row.isArray === 1,
                    },
                    {
                        emitEvent: false,
                    },
                );

                outputs400.push(field);

            });

        }

        // =========================
        // 401
        // =========================
        const response401 =
            responses.find(
                x => x.responseStatusCode === 401,
            );

        if (response401?.outputStaticJson) {

            serviceForm.patchValue(
                {
                    outputStaticJson401:
                        this.fromBase64Unicode(
                            response401.outputStaticJson,
                        ),
                },
                {
                    emitEvent: false,
                },
            );

        }

        // =========================
        // 500
        // =========================

        const response500 =
            responses.find(
                x => x.responseStatusCode === 500,
            );

        if (response500?.outputStaticJson) {

            serviceForm.patchValue(
                {
                    outputStaticJson500:
                        this.fromBase64Unicode(
                            response500.outputStaticJson,
                        ),
                },
                {
                    emitEvent: false,
                },
            );

        }

        // =========================
        // validate loaded json
        // =========================

        const serviceIndex =
            this.services.controls.findIndex(
                x => x === serviceForm,
            );

        if (serviceIndex !== -1) {

            this.jsonValidation401[serviceIndex] =
                this.validateJsonInternal(
                    serviceForm.controls
                        .outputStaticJson401
                        .value,
                );

            this.jsonValidation500[serviceIndex] =
                this.validateJsonInternal(
                    serviceForm.controls
                        .outputStaticJson500
                        .value,
                );

        }

        this.cdr.markForCheck();
    }*/
    private buildResponsesFromDto(
        serviceForm: any,
        item: any,
    ): void {
        console.log('CALLING buildResponsesFromDto');
        console.log(
            'ENTER buildResponsesFromDto',
            item.aggregateServiceResponseDtoList,
        );

        const responses =
            (item.aggregateServiceResponseDtoList ?? [])
                .filter((x: any) => x.status === 1);

        // =========================
        // 200
        // =========================

        const outputs200 =
            serviceForm.controls.outputs200 as FormArray;

        outputs200.clear();

        const rows200 =
            responses.filter(
                (x: any) =>
                    x.responseStatusCode === 200,
            );

        const selected200 =
            rows200.some(
                (x: any) =>
                    x.responsePartType === 1,
            );
        const row200ConfigId =
            rows200.find((x: any) => x.responseConfigId != null)
                ?.responseConfigId ?? null;

        serviceForm.controls.responseConfigId200
            .setValue(row200ConfigId, { emitEvent: false });
        console.log('ROWS200', rows200);
        console.log('SELECTED200', selected200);
        serviceForm.controls.responseMode200
            .setValue(
                selected200
                    ? 'selected'
                    : 'all',
                {
                    emitEvent: false,
                },
            );

        serviceForm.controls.isArray200
            .setValue(
                rows200.some(
                    (x: any) => x.isArray === 1,
                ),
                {
                    emitEvent: false,
                },
            );

        if (selected200) {

            rows200.forEach((row: any) => {

                const field =
                    this.createOutputField();
                console.log(
                    'ROW 200 =>',
                    row
                );
                field.patchValue(
                    {
                        sourceId:
                        serviceForm.controls.id.value,
                        responseConfigId: row.responseConfigId,
                        aggregateServiceId: row.aggregateServiceId,
                        status: row.status,
                        sourcePath:
                            row.responseNodePath ?? '',

                        key:
                            row.responseNewNodeName ?? '',
                    },
                    {
                        emitEvent: false,
                    },
                );
                console.log(
                    '200FIELD AFTER PATCH =>',
                    field.getRawValue()
                );
                outputs200.push(field);

            });

        }

        // =========================
        // 400
        // =========================

        const outputs400 =
            serviceForm.controls.outputs400 as FormArray;

        outputs400.clear();

        const rows400 =
            responses.filter(
                (x: any) =>
                    x.responseStatusCode === 400,
            );

        const selected400 =
            rows400.some(
                (x: any) =>
                    x.responsePartType === 1,
            );
        const row400ConfigId =
            rows400.find((x: any) => x.responseConfigId != null)
                ?.responseConfigId ?? null;

        serviceForm.controls.responseConfigId400
            .setValue(row400ConfigId, { emitEvent: false });
        serviceForm.controls.responseMode400
            .setValue(
                selected400
                    ? 'selected'
                    : 'all',
                {
                    emitEvent: false,
                },
            );

        serviceForm.controls.isArray400
            .setValue(
                rows400.some(
                    (x: any) => x.isArray === 1,
                ),
                {
                    emitEvent: false,
                },
            );

        if (selected400) {

            rows400.forEach((row: any) => {

                const field =
                    this.createOutputField();
                console.log(
                    'ROW 400 =>',
                    row
                );
                field.patchValue(
                    {
                        sourceId:
                        serviceForm.controls.id.value,

                        responseConfigId:
                        row.responseConfigId,

                        aggregateServiceId:
                        row.aggregateServiceId,

                        status:
                        row.status,

                        sourcePath:
                            row.responseNodePath ?? '',

                        key:
                            row.responseNewNodeName ?? '',
                    },
                    {
                        emitEvent: false,
                    },
                );
                console.log(
                    '400FIELD AFTER PATCH =>',
                    field.getRawValue()
                );
                outputs400.push(field);
                console.log(
                    'RESPONSES =>',
                    item.aggregateServiceResponseDtoList
                );
            });

        }

        // =========================
        // 401
        // =========================


        const response401 =
            responses.find(x => x.responseStatusCode === 401);

        serviceForm.patchValue({
            responseConfigId401: response401?.responseConfigId ?? null,
            outputStaticJson401: response401?.outputStaticJson
                ? this.fromBase64Unicode(response401.outputStaticJson)
                : '',
        }, { emitEvent: false });
        if (response401?.outputStaticJson) {

            serviceForm.patchValue(
                {
                    outputStaticJson401:
                        this.fromBase64Unicode(
                            response401.outputStaticJson,
                        ),
                },
                {
                    emitEvent: false,
                },
            );

        }

        // =========================
        // 500
        // =========================

        const response500 =
            responses.find(x => x.responseStatusCode === 500);

        serviceForm.patchValue({
            responseConfigId500: response500?.responseConfigId ?? null,
            outputStaticJson500: response500?.outputStaticJson
                ? this.fromBase64Unicode(response500.outputStaticJson)
                : '',
        }, { emitEvent: false });
        if (response500?.outputStaticJson) {

            serviceForm.patchValue(
                {
                    outputStaticJson500:
                        this.fromBase64Unicode(
                            response500.outputStaticJson,
                        ),
                },
                {
                    emitEvent: false,
                },
            );

        }

        const serviceIndex =
            this.services.controls.findIndex(
                x => x === serviceForm,
            );

        if (serviceIndex !== -1) {

            this.jsonValidation401[serviceIndex] =
                this.validateJsonInternal(
                    serviceForm.controls
                        .outputStaticJson401
                        .value,
                );

            this.jsonValidation500[serviceIndex] =
                this.validateJsonInternal(
                    serviceForm.controls
                        .outputStaticJson500
                        .value,
                );

        }
        console.log(
            'ALL RESPONSES =>',
            item.aggregateServiceResponseDtoList,
        );

        console.log(
            'ROWS200 =>',
            rows200,
        );

        console.log(
            'ROWS400 =>',
            rows400,
        );

        console.log(
            'SELECTED200 =>',
            selected200,
        );

        console.log(
            'SELECTED400 =>',
            selected400,
        );
        this.cdr.markForCheck();
    }
    validateJson401(
        value: string,
        index: number,
    ): void {

        this.jsonValidation401[index] =
            this.validateJsonInternal(value);

        this.cdr.markForCheck();
    }

    validateJson500(
        value: string,
        index: number,
    ): void {

        this.jsonValidation500[index] =
            this.validateJsonInternal(value);

        this.cdr.markForCheck();
    }
    /*createOutputField() {
        return this.fb.group({
            key: this.fb.control(''),

            sourceId: this.fb.control({
                value: 'global',
                disabled: true
            }),

            sourceType: this.fb.control({
                value: 'body',
                disabled: true,
            }),

            sourcePath: this.fb.control(''),

            isArray: this.fb.control(false)
        });
    }*/
    createOutputField() {

        return this.fb.group({
            responseConfigId: this.fb.control(null),
            aggregateServiceId: this.fb.control(null),
            status: this.fb.control(1),
            key: this.fb.control(''),

            sourceId: this.fb.control({
                value: 'global',
                disabled: true,
            }),

            sourceType: this.fb.control({
                value: 'body',
                disabled: true,
            }),

            sourcePath: this.fb.control(''),

            isArray: this.fb.control(false),

        });

    }

/*    removeConnection(
        serviceIndex: number,
        connectionIndex: number,
    ): void {

        const connections =
            this.getConnections(
                this.services.at(serviceIndex) as any,
            );

        const connection =
            connections.at(connectionIndex);

        if (
            this.modeFlag === 'U' &&
            connection.get('inputConfigId')?.value
         ) {

            connection.patchValue({
                status: 0,
            });

            return;
        }

        connections.removeAt(connectionIndex);
    }*/
   /* removeConnection(
        serviceIndex: number,
        connectionIndex: number,
    ): void {

        const service =
            this.services.at(serviceIndex);

        if (!service) {
            return;
        }

        const connections =
            this.getConnections(service as any);

        const connection =
            connections.at(connectionIndex);

        if (!connection) {
            return;
        }

        // Edit Mode => Soft Delete
        if (
            this.modeFlag === 'U' &&
            connection.get('inputConfigId')?.value
        ) {

            connection.patchValue(
                {
                    status: 0,
                },
                {
                    emitEvent: false,
                },
            );

            this.servicesRefreshSignal.update(
                x => x + 1,
            );

            this.cdr.markForCheck();

            return;
        }

        // Register Mode => Physical Delete
        connections.removeAt(connectionIndex);

        this.servicesRefreshSignal.update(
            x => x + 1,
        );

        this.cdr.markForCheck();
    }*/

    removeConnection(
        serviceIndex: number,
        connection: any,
    ): void {

        if (!connection) {
            return;
        }

        if (
            this.modeFlag === 'U' &&
            connection.get('inputConfigId')?.value
        ) {

            connection.patchValue(
                {
                    status: 0,
                    operationFlag: 'D'
                },
                {
                    emitEvent: false
                }
            );

            this.servicesRefreshSignal.update(
                x => x + 1
            );

            return;
        }

        const connections =
            this.getConnections(
                this.services.at(serviceIndex)
            );

        const realIndex =
            connections.controls.indexOf(connection);

        if (realIndex >= 0) {
            connections.removeAt(realIndex);
        }
    }
    getVisibleConnections(service: any): any[] {

        return this.getConnections(service)
            .controls
            .filter(
                control =>
                    control.get('status')?.value !== 0
            );
    }
    addOutputField():
        void {

        this.outputFields.push(
            this.createOutputField(),
        );

    }


/*    addOutput400(serviceIndex: number) {

        const outputs =
            this.getOutputs400(
                this.services.at(serviceIndex),
            );

        outputs.push(
            this.createOutputField(),
        );

        this.servicesRefreshSignal.update(
            x => x + 1,
        );
    }*/
    addOutput400(serviceIndex: number): void {

        const service =
            this.services.at(serviceIndex);

        const output =
            this.createOutputField();

        output.patchValue({
            sourceId:
            service.controls.id.value,
            // اگر dropdown بر اساس apiId کار می‌کند:
            // sourceId: service.controls.service.value
        });

        this.getOutputs400(service)
            .push(output);

        this.servicesRefreshSignal.update(
            x => x + 1,
        );
    }

    getConnections(form: any): FormArray<ConnectionForm> {
        return form.controls.connections;
    }

    openCurlDialog():
        void {

        this.curlDialogVisible.set(
            true,
        );

    }
    getAvailableSourceElements(service: FormGroup) {

        const usedElements =
            this.getConnections(service).controls
                .map(x => x.get('genElement')?.value);

        return this.sourceElementOptions.filter(
            x => !usedElements.includes(x.value)
        );
    }
    getAvailableTargetElements(
        service: FormGroup,
        serviceId: number
    ) {

        const usedElements =
            this.getConnections(service).controls
                .map(x => x.get('reqElement')?.value);

        return (
            this.targetElementOptions[serviceId] || []
        ).filter(
            x => !usedElements.includes(x.value)
        );
    }
    saveAggregator(): void {
debugger
        console.log('CHECK >>> modeFlag =', this.modeFlag);
        if (!this.validateBeforeSave()) { return; }

        this.services.controls.forEach((service, index) => {

            console.log(
                `Service ${index} - 401 JSON =>`,
                service.controls.outputStaticJson401.value,
            );

            console.log(
                `Service ${index} - 500 JSON =>`,
                service.controls.outputStaticJson500.value,
            );

        });

        const dto: any = {

            operationFlag:
                this.modeFlag === 'U'
                    ? 'U'
                    : 'I',

            apiId:
            this.apiId,

            inputCurl:
                this.curlInput()
                    ? this.toBase64Unicode(
                        this.curlInput(),
                    )
                    : null,

            aggregateServiceInfoDtoList:
                this.services.controls.map(service => {

                    const isUpdate =
                        !!service.controls.aggregateServiceId.value;
                    console.log(
                        'OUTPUTS200 RAW',
                        service.controls.outputs200.getRawValue()
                    );

                    console.log(
                        'OUTPUTS400 RAW',
                        service.controls.outputs400.getRawValue()
                    );
                    const serviceDto: any = {

                        operationFlag:
                            isUpdate
                                ? 'U'
                                : 'I',

                        status:
                        service.controls.status.value,

                        aggregatedApiId:
                        service.controls.service.value,

                        aggregatedModuleId:
                        service.controls.module.value,

                        aggregatedPartyId:
                        service.controls.org.value,

                        outputJsonRootNodeName:
                        service.controls
                            .outputJsonRootNodeName
                            .value,

                        clientInfoList:
                            this.form.controls.clientIds.value.map(
                                clientId => {

                                    const serviceInfo =
                                        this.aggregateDto
                                            ?.aggregateServiceInfoDtoList
                                            ?.find(
                                                x =>
                                                    x.id ===
                                                    service.controls.aggregateServiceId.value,
                                            );

                                    const existingClient =
                                        serviceInfo
                                            ?.clientInfoList
                                            ?.find(
                                                c =>
                                                    c.clientId ===
                                                    clientId,
                                            );

                                    return {

                                        configId:
                                            existingClient?.configId ?? null,

                                        clientId,

                                        status: 1,

                                    };

                                },
                            ),

                        aggregateServiceMapDtoList:
                            this.getConnections(service)
                                .controls
                                .map(connection => ({

                                    inputConfigId:
                                    connection.controls.inputConfigId.value,

                                    aggregateServiceId:
                                    connection.controls.aggregateServiceId.value,

                                    status:
                                        connection.controls.status.value ?? 1,

                                    srcInputEndpointDetailId:
                                    connection.controls.genElement.value,

                                    destInputEndpointDetailId:
                                    connection.controls.reqElement.value,

                                    srcInputEndpointDetailTypeId: 2,

                                    destInputEndpointDetailTypeId: 2,

                                })),

                        aggregateServiceResponseDtoList:

                            this.buildResponseDto(service)
                                .map(response => ({
                                    ...response,
                                })),
                    };

                    if (isUpdate) {

                        serviceDto.id =
                            service.controls.aggregateServiceId.value;

                        serviceDto.aggregateId =
                            service.controls.aggregateId.value;
                    }

                    return serviceDto;

                }),
        };

        if (this.modeFlag === 'U') {

            dto.aggregateId =
                this.inputAggregatorConfig?.aggregateId;

        } else {

            dto.status = 1;
        }

        console.log(
            'CLIENT INFO LIST =>',
            JSON.stringify(
                dto.aggregateServiceInfoDtoList.map(
                    x => x.clientInfoList,
                ),
                null,
                2,
            ),
        );

        console.log(
            'DTO BEFORE SEND =>',
            JSON.stringify(
                dto,
                null,
                2,
            ),
        );

/*        this._primengProgressBarService.show();

        this.messagesApiFacadeService
            .registerAggregate(dto)
            .subscribe({

                next: () => {

                    this._primengProgressBarService.hide();

                    this.notifierService.showSuccess({
                        detail:
                            'ثبت اطلاعات با موفقیت انجام شد',
                        life: 3000,
                    });

                    this.close.emit(
                        'closeAndCreate',
                    );
                },

                error: error => {

                    this._primengProgressBarService.hide();

                    console.error(
                        'REGISTER ERROR =>',
                        error,
                    );
                },

            });*/
        this._primengProgressBarService.show();
        const aggregateId =
            this.inputAggregatorConfig?.aggregateId;
        const request$ =
            this.modeFlag === 'U'
                ? this.messagesApiFacadeService.updateAggregate(
                    aggregateId,
                    dto,
                )
                : this.messagesApiFacadeService.registerAggregate(
                    dto,
                );
        request$.subscribe({

            next: () => {

                this._primengProgressBarService.hide();

                this.notifierService.showSuccess({
                    detail:
                        this.modeFlag === 'U'
                            ? 'ویرایش اطلاعات با موفقیت انجام شد'
                            : 'ثبت اطلاعات با موفقیت انجام شد',
                    life: 3000,
                });

                this.close.emit(
                    'closeAndCreate',
                );
            },

            error: error => {

                this._primengProgressBarService.hide();

                console.error(
                    this.modeFlag === 'U'
                        ? 'UPDATE ERROR =>'
                        : 'REGISTER ERROR =>',
                    error,
                );
            },

        });

    }
    private buildResponseDto(service: any): any[] {

        const result: any[] = [];

        const buildRows = (
            outputs: FormArray,
            responseStatusCode: number,
            responsePartType: number,
            isArray: boolean,
        ) => {

            outputs.controls.forEach((output: any) => {

                result.push({

                    responseConfigId:
                        output.controls.responseConfigId?.value ?? null,

                    aggregateServiceId:
                        output.controls.aggregateServiceId?.value ?? null,

                    responseStatusCode,

                    responsePartType,

                    responseNodePath:
                        output.controls.sourcePath.value || null,

                    responseNewNodeName:
                        output.controls.key.value || null,

                    isArray:
                        isArray ? 1 : 0,

                    status:
                        output.controls.status?.value ?? 1,

                    outputStaticJson:
                        output.controls.outputStaticJson?.value ?? null,

                });

            });

        };

        // =========================
        // 200
        // =========================

        const responsePartType200 =
            service.controls.responseMode200.value === 'selected'
                ? 1
                : 0;

        if (responsePartType200 === 1) {

            buildRows(
                service.controls.outputs200,
                200,
                responsePartType200,
                service.controls.isArray200.value,
            );

        } else {

            result.push({

                responseConfigId:
                    service.controls.responseConfigId200?.value ?? null,

                aggregateServiceId:
                    service.controls.aggregateServiceId?.value ?? null,

                responseStatusCode: 200,

                responsePartType: 0,

                responseNodePath: null,

                responseNewNodeName: null,

                isArray: 0,

                status: 1,

                outputStaticJson: null,

            });

        }

        // =========================
        // 400
        // =========================

        const responsePartType400 =
            service.controls.responseMode400.value === 'selected'
                ? 1
                : 0;

        if (responsePartType400 === 1) {

            buildRows(
                service.controls.outputs400,
                400,
                responsePartType400,
                service.controls.isArray400.value,
            );

        } else {

            result.push({

                responseConfigId:
                    service.controls.responseConfigId400?.value ?? null,

                aggregateServiceId:
                    service.controls.aggregateServiceId?.value ?? null,

                responseStatusCode: 400,

                responsePartType: 0,

                responseNodePath: null,

                responseNewNodeName: null,

                isArray: 0,

                status: 1,

                outputStaticJson: null,

            });

        }

        // =========================
        // 401
        // =========================

        result.push({

            responseConfigId:
                service.controls.responseConfigId401?.value ?? null,

            aggregateServiceId:
                service.controls.aggregateServiceId?.value ?? null,

            responseStatusCode: 401,

            responsePartType: 0,

            responseNodePath:
                service.controls.responseNodePath401?.value ?? null,

            responseNewNodeName: null,

            isArray: 0,

            status: 1,

            outputStaticJson:
                service.controls.outputStaticJson401.value
                    ? this.toBase64Unicode(
                        service.controls.outputStaticJson401.value,
                    )
                    : null,

        });

        // =========================
        // 500
        // =========================

        result.push({

            responseConfigId:
                service.controls.responseConfigId500?.value ?? null,

            aggregateServiceId:
                service.controls.aggregateServiceId?.value ?? null,

            responseStatusCode: 500,

            responsePartType: 0,

            responseNodePath:
                service.controls.responseNodePath500?.value ?? null,

            responseNewNodeName: null,

            isArray: 0,

            status: 1,

            outputStaticJson:
                service.controls.outputStaticJson500.value
                    ? this.toBase64Unicode(
                        service.controls.outputStaticJson500.value,
                    )
                    : null,

        });

        return result;
    }

    private fromBase64Unicode(
        value: string,
    ): string {

        if (!value?.trim()) {
            return '';
        }

        try {

            const binary =
                atob(value);

            const bytes =
                Uint8Array.from(
                    binary,
                    char => char.charCodeAt(0),
                );

            return new TextDecoder(
                'utf-8',
            ).decode(bytes);

        } catch {

            // اگر مقدار Base64 نبود
            // همان مقدار خام برگردد
            return value;

        }

    }
    private parseCurl(curl: string) {

        const urlMatch = curl.match(
            /(https?:\/\/[^\s'"]+)/i,
        );

        if (!urlMatch) {
            throw new Error('URL یافت نشد');
        }

        const url = urlMatch[1];

        const methodMatch =
            curl.match(
                /(?:--request|-X)\s+([A-Z]+)/i,
            );

        const method =
            methodMatch?.[1]?.toUpperCase() ?? 'GET';

        const headers =
            [
                ...curl.matchAll(
                    /(?:--header|-H)\s+(?:'([^']*)'|"([^"]*)")/g,
                ),
            ]
                .map(x => x[1] ?? x[2])
                .filter(Boolean);

        const contentType =
            headers
                .find(
                    h =>
                        h.toLowerCase()
                            .startsWith('content-type:')
                )
                ?.split(':')
                ?.slice(1)
                ?.join(':')
                ?.trim()
                ?.toLowerCase();

        const bodyMatch = curl.match(
            /(?:-d|--data(?:-raw|-binary|-urlencode)?)\s+'([\s\S]*?)'/m,
        );

        let body: any = null;

        if (bodyMatch?.[1]) {

            const bodyText = bodyMatch[1];

            console.log('BODY TEXT', bodyText);

            if (
                contentType?.includes('application/json')
            ) {

                try {

                    body = JSON.parse(bodyText);

                } catch {

                    body = bodyText;

                }

            } else {

                body = bodyText;

            }
        }

        return {
            url,
            method,
            headers,
            body,
            headersCount: headers.length,
            queryCount: new URL(url).searchParams.size,
        };
    }
}

type ConnectionForm =
    ReturnType<
        AggregatorConfigComponent['createConnectionForm']
    >;

type ServiceForm =
    ReturnType<
        AggregatorConfigComponent['createServiceForm']
    >;

type OutputFieldForm =
    ReturnType<
        AggregatorConfigComponent['createOutputField']
    >;
interface JsonValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
    line?: number;
    column?: number;
    parsed?:any;
}
