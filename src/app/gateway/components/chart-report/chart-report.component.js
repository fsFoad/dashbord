import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService, PrimeTemplate } from "primeng/api";
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { TabPanel, TabView } from 'primeng/tabview';
import { PartyChartComponent } from './party-chart/party-chart.component';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { PartyChartDetailsComponent } from './party-chart-details/party-chart-details.component';
import { NgIf } from '@angular/common';
import { Toast } from 'primeng/toast';
let ChartReportComponent = class ChartReportComponent {
    translateService;
    apiGatewayService;
    _primengProgressBarService;
    showPartyCharts = true;
    showPartyChartsDetails = false;
    numberOfDay;
    selectedNumberOfDay = '1';
    detailsBreadObject = [];
    constructor(translateService, apiGatewayService, _primengProgressBarService) {
        this.translateService = translateService;
        this.apiGatewayService = apiGatewayService;
        this._primengProgressBarService = _primengProgressBarService;
    }
    ngOnInit() {
        this._primengProgressBarService.show();
        /*this.translateService.get(['1D', '7D', '30D', '60D', '90D']).subscribe(
            (translations) => {
                this._primengProgressBarService.hide();
                this.numberOfDay = [
                    { name: translations['90D'], value: '90' },
                    { name: translations['60D'], value: '60' },
                    { name: translations['30D'], value: '30' },
                    { name: translations['7D'], value: '7' },
                    { name: translations['1D'], value: '1' },
                ];
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );*/
        this.detailsBreadObject = this.chooseBread('chartReport');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    onTabChange(event) {
        const activeIndex = event.index;
        if (activeIndex === 0) {
            this.showPartyCharts = true;
            this.showPartyChartsDetails = false;
        }
        else if (activeIndex === 1) {
            this.showPartyChartsDetails = true;
            this.showPartyCharts = false;
        }
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'chartReport':
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'گزارش نموداری',
                        rout_index1: '/reportChart',
                        isActive1: true,
                        img_index1: 'assets/icons/chart.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
};
ChartReportComponent = __decorate([
    Component({
        selector: 'app-chart-report',
        templateUrl: './chart-report.component.html',
        styleUrls: ['./chart-report.component.scss'],
        standalone: true,
        providers: [DialogService, MessageService, DynamicDialogRef],
        imports: [
            BreadcrumbsComponent,
            TranslocoPipe,
            TabView,
            TabPanel,
            PartyChartComponent,
            SelectButton,
            FormsModule,
            PartyChartDetailsComponent,
            NgIf,
            PrimeTemplate,
            Toast,
        ],
    })
], ChartReportComponent);
export { ChartReportComponent };
