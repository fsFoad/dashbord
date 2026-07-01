// @ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import {ApiGatewayConstants} from "../../../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import {FuseLoadingService} from '@fuse/services/loading';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {BreadcrumbsComponent} from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {TranslocoService} from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
// import { UIChart } from 'primeng/chart';
import {UIChart} from 'primeng/chart';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-chart-api',
    templateUrl: './chart-api.component.html',
    standalone: true,
    styleUrls: ['./chart-api.component.scss'],
    imports: [
        BreadcrumbsComponent,
        DropdownModule,
        RadioButtonModule,
        NgIf,
        FormsModule,
        UIChart,
        Toast,
    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChartApiComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputChart;
    @ViewChild('chart') chart: any;
    dayOptions = ApiGatewayConstants.day;
    day = null;
    apiId;
    chatOptions;
    barOption;
    chatDataLine;
    chatDataBar;
    statusList = [];
    successDataList = [];
    unSuccessDataList = [];
    clientName;
    apiTitle;
    moduleTitle;
    partyTitle;
    clientBase;
    moduleBase;
    accessBase;
    partyBase;
    detailsBreadObject = [];
    chartFlag = false;
    chartLineFlag = true;
    chartComboFlag = false;
    chartBarFlag = false;
    selectedValue1 = 'val1';

    chartType: string;

    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private transloco :TranslocoService,
        private apiGatewayService: ApiGatewayService
    ) {}

    onFocus(type) {
        switch (type) {
            case 'val1':
                this.chartLineFlag = true;
                this.chartComboFlag = false;
                this.chartBarFlag = false;
                break;
            case 'val2':
                this.chartLineFlag = false;
                this.chartComboFlag = true;
                this.chartBarFlag = false;
                break;
        }
    }

    chooseBread(caseBase: any) {
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
                        label_index3: 'نمودار سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/chart.png',
                    },

                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
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
                        label_index3: 'نمودار سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/chart.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        label_index2: 'نمودار سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/chart.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        label_index4: 'نمودار سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/chart.png',
                    },
                    { label_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
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
        if (this.inputChart != undefined) {
            this.apiId = this.inputChart.apiId;
            this.clientName = this.inputChart.clientName;
            this.apiTitle = this.inputChart.title;
            this.moduleTitle = this.inputChart.moduleTitle;
            this.partyTitle = this.inputChart.partyTitle;
            this.clientBase = this.inputChart.clientBase;
            this.moduleBase = this.inputChart.moduleBase;
            this.accessBase = this.inputChart.accessBase;
            this.partyBase = this.inputChart.partyBase;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
            }
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }

    onChange(e) {
        if (this.day != null) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getapistatistict(this.apiId, this.day)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.chartFlag = true;

                        this.statusList[0] = a;
                        this.successDataList =
                            this.statusList[0].successData.map(
                                (data) => data.count
                            );
                        this.unSuccessDataList =
                            this.statusList[0].unSuccessData.map(
                                (data) => data.count
                            );
                        console.log(this.successDataList, 'successDataList');
                        console.log(
                            this.unSuccessDataList,
                            'unSuccessDataList'
                        );
                        this.chatDataLine = {
                            labels: this.statusList[0].days,
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: this.successDataList,
                                    fill: false,
                                    borderColor: '#1b7c50',
                                    backgroundColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: this.unSuccessDataList,
                                    fill: true,
                                    borderColor: '#a81616',
                                    backgroundColor: 'rgba(255,84,84,0.3)',
                                    tension: 0.4,
                                },
                            ],
                        };
                        this.chatDataBar = {
                            labels: this.statusList[0].days,
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: this.successDataList,
                                    fill: false,
                                    borderColor: '#1b7c50',
                                    backgroundColor: '#21c57b',
                                    tension: 0.4,
                                },
                                {
                                    label: 'ناموفق',
                                    data: this.unSuccessDataList,
                                    fill: true,
                                    borderColor: '#a81616',
                                    backgroundColor: 'rgb(255,84,84)',
                                    tension: 0.4,
                                },
                            ],
                        };
                        console.log(this.chatDataLine, 'chatData');
                        this.chatOptions = {
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                        };
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.barOption = {
                indexAxis: 'x',
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057',
                        },
                        grid: {
                            color: '#ebedef',
                        },
                    },
                    y: {
                        ticks: {
                            color: '#495057',
                        },
                        grid: {
                            color: '#ebedef',
                        },
                    },
                },
            };
        } else {
            this.notifierService.showError({
                detail: 'لطفا تعداد روز درست انتخاب کنید!',
                life: 3000,
            });
        }
    }
}
