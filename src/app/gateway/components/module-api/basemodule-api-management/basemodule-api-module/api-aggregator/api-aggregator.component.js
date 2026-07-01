import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Paginator } from 'primeng/paginator';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { AggregatorConfigComponent } from './aggregator-config/aggregator-config.component';
import { finalize } from 'rxjs';
import { FsProgressSpinnerComponent } from '../../../../../../shared/components/fs-progress-spinner/fs-progress-spinner.component';
let ApiAggregatorComponent = class ApiAggregatorComponent {
    fb;
    notifierService;
    messagesApiFacadeService;
    apiGatewayService;
    route;
    transloco;
    inputAggregatorConfig;
    close = new EventEmitter();
    aggregators = [];
    pageSize = 6;
    currentPage = 0;
    totalRecords = 0;
    selectedAggregator;
    tempAggregator;
    loading = false;
    menuItems = [
        {
            label: 'ویرایش',
            icon: 'pi pi-pencil',
            command: () => this.editAggregator(this.tempAggregator)
        },
        {
            label: 'حذف',
            icon: 'pi pi-trash',
            command: () => this.removeAggregator(this.tempAggregator)
        },
        {
            separator: true
        },
        {
            label: 'انصراف',
            icon: 'pi pi-times',
        }
    ];
    constructor(fb, notifierService, messagesApiFacadeService, apiGatewayService, route, transloco) {
        this.fb = fb;
        this.notifierService = notifierService;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiGatewayService = apiGatewayService;
        this.route = route;
        this.transloco = transloco;
        this.initialize();
    }
    setRecord(aggregator) {
        debugger;
        this.tempAggregator = aggregator;
    }
    currentPages;
    modules = [
        {
            id: 'm1',
            name: 'حسابداری'
        },
        {
            id: 'm2',
            name: 'انبار'
        }
    ];
    serviceOptions = [
        {
            id: 's1',
            name: 'احراز هویت'
        },
        {
            id: 's2',
            name: 'دریافت موجودی'
        },
        {
            id: 's3',
            name: 'ثبت سفارش'
        }
    ];
    types = [
        {
            label: 'Body',
            value: 'body'
        },
        {
            label: 'Header',
            value: 'header'
        },
        {
            label: 'Query',
            value: 'query'
        }
    ];
    statuses = [
        {
            label: '200 Success',
            value: '200'
        },
        {
            label: '400 Error',
            value: '400'
        },
        {
            label: '500 Error',
            value: '500'
        }
    ];
    moduleBase;
    accessBase;
    clientBase;
    partyBase;
    isViewMode = false;
    isCreateMode = false;
    aggregatorDto;
    registerAggregatorFlag = false;
    detailsBreadObject = [];
    clientName;
    apiId;
    title;
    aggregateId;
    moduleTitle;
    partyTitle;
    form;
    get pagedAggregators() {
        const start = this.currentPage * this.pageSize;
        return this.aggregators.slice(start, start + this.pageSize);
    }
    onPageChange(event) {
        this.currentPage = event.page;
        this.loadAggregators();
    }
    get services() {
        return this.form.get('services');
    }
    get outputs() {
        return this.form.get('outputs');
    }
    createAggregator() {
        this.aggregatorDto = {
            ...this.inputAggregatorConfig,
            operationFlag: 'I'
        };
        this.registerAggregatorFlag = true;
        this.isCreateMode = true;
        this.isViewMode = false;
    }
    openMenu(event, menu, aggregator) {
        this.selectedAggregator = aggregator;
        menu.toggle(event);
    }
    editAggregator(aggregator) {
        debugger;
        debugger;
        debugger;
        this.aggregatorDto = {
            inputAggregatorConfig: null,
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
            aggregateId: null,
            operationFlag: 'U'
        };
        debugger;
        this.aggregatorDto = {
            ...this.inputAggregatorConfig,
            operationFlag: 'U',
            aggregateId: aggregator.aggregateId,
        };
        this.isViewMode = false;
        this.registerAggregatorFlag = true;
    }
    removeAggregator(aggregator) {
        debugger;
        debugger;
        debugger;
        this.messagesApiFacadeService.deleteAggregate(aggregator.aggregateId)
            .pipe(finalize(() => this.loadAggregators())).subscribe({
            next: (res) => {
                this.notifierService.showInfo({
                    detail: 'عملیات حذف باموفقیت انجام شد',
                    life: 3000,
                });
            }
        });
    }
    cancelAggregator() { }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        if (this.inputAggregatorConfig != undefined) {
            this.moduleBase = this.inputAggregatorConfig.moduleBase;
            this.clientBase = this.inputAggregatorConfig.clientBase;
            this.accessBase = this.inputAggregatorConfig.accessBase;
            this.partyTitle = this.inputAggregatorConfig.partyTitle;
            this.moduleTitle = this.inputAggregatorConfig.moduleTitle;
            this.clientName = this.inputAggregatorConfig.clientName;
            this.apiId = this.inputAggregatorConfig.apiId;
            this.title = this.inputAggregatorConfig.title;
            this.aggregateId = this.inputAggregatorConfig.aggregateId;
        }
        this.loadAggregators();
        if (this.clientBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.moduleBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.accessBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.partyTitle != undefined && this.partyTitle != '') {
            debugger;
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        /*     this.currentPages = this.aggregators.map(() => 0);*/
    }
    loadAggregators() {
        this.loading = true;
        this.messagesApiFacadeService
            .getAggregateCards(this.apiId, this.pageSize, this.currentPage)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
            next: (res) => {
                this.aggregators = (res.body || [])
                    .filter(item => item.status === 1);
                this.totalRecords = this.aggregators.length;
            }
        });
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase) {
        debugger;
        switch (caseBase) {
            case 'clientBase':
                debugger;
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
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/aggregator.png',
                    },
                    { label_index5: null },
                    { label_index4: null },
                    { label_index6: null },
                ];
                break;
            case 'moduleBase':
                debugger;
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
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/aggregator.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
            case 'accessBase':
                debugger;
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
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/aggregator.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
            case 'partyBase':
                debugger;
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
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/aggregator.png',
                    },
                    { label_index5: null },
                ];
                break;
            default:
                return null;
        }
    }
    BeforeButton() {
        this.close.emit('close');
    }
    onClose(e) {
        debugger;
        debugger;
        debugger;
        if (e == 'closeAndCreate') {
            this.loadAggregators();
        }
        if (this.clientBase) {
            debugger;
            this.detailsBreadObject =
                this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.moduleBase) {
            debugger;
            this.detailsBreadObject =
                this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.accessBase) {
            debugger;
            this.detailsBreadObject =
                this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.partyTitle != undefined && this.partyTitle != '') {
            debugger;
            this.partyBase = true;
            this.detailsBreadObject =
                this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        this.registerAggregatorFlag = false;
    }
    getPagedServices(aggregator, aggregatorIndex) {
        const page = this.currentPages[aggregatorIndex] ?? 0;
        const start = page * this.pageSize;
        return aggregator.services.slice(start, start + this.pageSize);
    }
    prevPage(aggregatorIndex) {
        if (this.currentPages[aggregatorIndex] > 0) {
            this.currentPages[aggregatorIndex]--;
        }
    }
    nextPage(aggregator, aggregatorIndex) {
        const lastPage = this.getPageCount(aggregator) - 1;
        if (this.currentPages[aggregatorIndex] <
            lastPage) {
            this.currentPages[aggregatorIndex]++;
        }
    }
    getPageCount(aggregator) {
        return Math.ceil(aggregator.services.length / this.pageSize);
    }
    changePage(aggregatorIndex, pageIndex) {
        this.currentPages[aggregatorIndex] = pageIndex;
    }
    get serviceSelector() {
        return [
            {
                label: 'Global Request',
                value: 'global'
            },
            ...this.services.controls.map((_, index) => ({
                label: `Service ${index + 1}`,
                value: index + 1
            }))
        ];
    }
    initialize() {
        this.form = this.fb.group({
            status: ['200'],
            services: this.fb.array([]),
            outputs: this.fb.array([])
        });
        this.addService();
        this.addOutput();
    }
    createService() {
        return this.fb.group({
            org: [''],
            mod: [''],
            srv: [''],
            connections: [[]]
        });
    }
    createOutput() {
        return this.fb.group({
            key: [''],
            sourceId: ['global'],
            sourceType: ['body'],
            sourcePath: ['']
        });
    }
    addService() {
        this.services.push(this.createService());
    }
    removeService(index) {
        if (this.services.length === 1) {
            return;
        }
        this.services.removeAt(index);
    }
    addOutput() {
        this.outputs.push(this.createOutput());
    }
    addConnection(serviceIndex) {
        const service = this.services.at(serviceIndex);
        const connections = service.get('connections')
            ?.value || [];
        connections.push({
            genType: 'body',
            reqType: 'body',
            genServiceId: 'global',
            reqServiceId: serviceIndex + 1,
            genPath: '',
            reqPath: ''
        });
        service
            .get('connections')
            ?.setValue(connections);
    }
    removeConnection(serviceIndex, rowIndex) {
        const service = this.services.at(serviceIndex);
        const connections = service.get('connections')
            ?.value || [];
        connections.splice(rowIndex, 1);
        service
            .get('connections')
            ?.setValue(connections);
    }
    getServiceName(id) {
        return this.serviceOptions.find(x => x.id === id)?.name || 'سرویس';
    }
    previewJson() {
        const result = {};
        this.outputs.controls.forEach((control) => {
            const value = control.value;
            result[value.key || 'field'] =
                `{{${value.sourceId}.${value.sourceType}.${value.sourcePath}}}`;
        });
        return result;
    }
    copyPreview() {
        navigator.clipboard.writeText(JSON.stringify(this.previewJson(), null, 2));
    }
    openCurlDialog() {
        console.log('open dialog');
    }
};
__decorate([
    Input()
], ApiAggregatorComponent.prototype, "inputAggregatorConfig", void 0);
__decorate([
    Output()
], ApiAggregatorComponent.prototype, "close", void 0);
ApiAggregatorComponent = __decorate([
    Component({
        selector: 'app-api-aggregator',
        imports: [
            CommonModule,
            JsonPipe,
            InputText,
            DropdownModule,
            ReactiveFormsModule,
            TableModule,
            ButtonDirective,
            Card,
            Tag,
            ButtonModule,
            CardModule,
            TagModule,
            InputTextModule,
            BreadcrumbsComponent,
            Toast,
            Paginator,
            Tooltip,
            Menu,
            AggregatorConfigComponent,
            FsProgressSpinnerComponent,
        ],
        standalone: true,
        templateUrl: './api-aggregator.component.html',
        styleUrl: './api-aggregator.component.scss'
    })
], ApiAggregatorComponent);
export { ApiAggregatorComponent };
