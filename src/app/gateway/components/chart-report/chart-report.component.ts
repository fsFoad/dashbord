import {Component, OnInit} from '@angular/core';


import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService, PrimeTemplate} from "primeng/api";
import {ApiGatewayService} from '../../services/api-gateway.service';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../@fuse/services/loading';
import {BreadcrumbsComponent} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {TabsModule} from 'primeng/tabs';
import {PartyChartComponent} from './party-chart/party-chart.component';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {PartyChartDetailsComponent} from './party-chart-details/party-chart-details.component';
import {NgIf} from '@angular/common';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-chart-report',
    templateUrl: './chart-report.component.html',
    styleUrls: ['./chart-report.component.scss'],
    standalone: true,
    providers: [DialogService, MessageService, DynamicDialogRef],
    imports: [
        BreadcrumbsComponent,
        TranslocoPipe,
        TabsModule,
        PartyChartComponent,
        SelectButton,
        FormsModule,
        PartyChartDetailsComponent,
        NgIf,
        PrimeTemplate,
        Toast,
    ],
})
export class ChartReportComponent implements OnInit {
    showPartyCharts = true;
    showPartyChartsDetails = false;
    numberOfDay: any;
    selectedNumberOfDay = '1';
    detailsBreadObject: any[] = [];

    constructor(
        private translateService: TranslocoService,
        private apiGatewayService: ApiGatewayService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService
    ) {}

    ngOnInit(): void {
        // FUSEFS

        // this._primengProgressBarService.show();
        /*this.translateService.get(['1D', '7D', '30D', '60D', '90D']).subscribe(
            (translations) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.numberOfDay = [
                    { name: translations['90D'], value: '90' },
                    { name: translations['60D'], value: '60' },
                    { name: translations['30D'], value: '30' },
                    { name: translations['7D'], value: '7' },
                    { name: translations['1D'], value: '1' },
                ];
            },
            (error) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            }
        );*/
        this.detailsBreadObject = this.chooseBread('chartReport');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }
    onTabChange(event: any) {
        const activeIndex = event.index;
        if (activeIndex === 0) {
            this.showPartyCharts = true;
            this.showPartyChartsDetails = false;
        } else if (activeIndex === 1) {
            this.showPartyChartsDetails = true;
            this.showPartyCharts = false;
        }
    }
    chooseBread(caseBase: string) {
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
}
