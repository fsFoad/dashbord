import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {TranslocoPipe} from '@ngneat/transloco';
import {ButtonDirective} from 'primeng/button';
import {saveAs} from 'file-saver-es';
import {NgForOf, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../shared/services/ToastService';
import {UIChart} from 'primeng/chart';


@Component({
    selector: 'app-party-chart-details',
    templateUrl: './party-chart-details.component.html',
    standalone: true,
    styleUrls: ['./party-chart-details.component.scss'],
    imports: [
        DropdownModule,
        FormsModule,
        TranslocoPipe,
        ButtonDirective,
        NgIf,
        TableModule,
        NgForOf,
        UIChart,
    ],
})
export class PartyChartDetailsComponent implements OnInit, OnChanges {
    @Input() SelectedNumberOfDay: string;

    partysData: any;
    selectedPartyId: string;
    piChartData: any;
    JSONForExport: any = [];
    showPieCharts = false;
    showBarCharts = false;
    showTable = false;
    chooseTypeOfChart = false;
    cols: any;
    partyDataForCharts: any;
    callTheService = false;
    chartPlugins: any;
    responsiveChartOptions: any;

    constructor(
        private chartsService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private translateService: ToastService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.SelectedNumberOfDay && this.callTheService) {
            this.selectedParty();
        }
    }

    /*ngOnInit(): void {
        this.responsiveChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.chartPlugins = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
        };
        this.callTheService = true;

        this.partyDataForCharts = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#42A5F5',
                        '#66BB6A',
                        '#FFA726',
                        '#AB47BC',
                        '#26A69A',
                        '#FF7043',
                        '#EC407A',
                        '#5C6BC0',
                        '#8D6E63',
                        '#78909C',
                    ],
                    hoverBackgroundColor: [
                        '#64B5F6',
                        '#81C784',
                        '#FFB74D',
                        '#BA68C8',
                        '#4DB6AC',
                        '#FF8A65',
                        '#F06292',
                        '#7986CB',
                        '#A1887F',
                        '#90A4AE',
                    ],
                },
            ],
        };
        this._primengProgressBarService.show();

        this._primengProgressBarService.show();
        this.chartsService.getFetchAllParty().subscribe(
            (response) => {
                this._primengProgressBarService.hide();
                this.partysData = response;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }
*/
   /* ngOnInit(): void {
        this.responsiveChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };

        this.chartPlugins = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        };

        this.callTheService = true;

        this.partyDataForCharts = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#26A69A',
                        '#FF7043', '#EC407A', '#5C6BC0', '#8D6E63', '#78909C'
                    ],
                    hoverBackgroundColor: [
                        '#64B5F6', '#81C784', '#FFB74D', '#BA68C8', '#4DB6AC',
                        '#FF8A65', '#F06292', '#7986CB', '#A1887F', '#90A4AE'
                    ]
                }
            ]
        };

        this._primengProgressBarService.show();

        this.chartsService.getFetchAllParty().subscribe(
            (response) => {
                this._primengProgressBarService.hide();
                this.partysData = response;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }*/
    ngOnInit(): void {
        this.responsiveChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };

        this.chartPlugins = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        };

        this.callTheService = true;

        this.partyDataForCharts = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#42A5F5',
                        '#66BB6A',
                        '#FFA726',
                        '#AB47BC',
                        '#26A69A',
                        '#FF7043',
                        '#EC407A',
                        '#5C6BC0',
                        '#8D6E63',
                        '#78909C'
                    ],
                    hoverBackgroundColor: [
                        '#64B5F6',
                        '#81C784',
                        '#FFB74D',
                        '#BA68C8',
                        '#4DB6AC',
                        '#FF8A65',
                        '#F06292',
                        '#7986CB',
                        '#A1887F',
                        '#90A4AE'
                    ]
                }
            ]
        };

        this._primengProgressBarService.show();

        // بدون ترنسلیت مستقیم هدرها را مشخص می‌کنیم
        this.cols = [
            { field: 'index', header: 'ردیف' },
            { field: 'MODULETITLE', header: 'نام ماژول' },
            { field: 'PERCENTAGE', header: 'درصد' }
        ];

        this._primengProgressBarService.show();
        this.chartsService.getFetchAllParty().subscribe(
            (response) => {
                this._primengProgressBarService.hide();
                this.partysData = response;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }
    selectedParty() {
        this._primengProgressBarService.show();
        this.chartsService
            .getModulePieChartByParty(
                this.selectedPartyId,
                this.SelectedNumberOfDay
            )
            .subscribe(
                (response) => {
                    this._primengProgressBarService.hide();
                    this.partyDataForCharts.labels = [];
                    this.partyDataForCharts.datasets[0].data = [];
                    this.piChartData = response;
                    if (this.piChartData?.length>0){
                        for (let i = 0; i < this.piChartData.length; ++i) {
                            this.partyDataForCharts.labels.push(
                                this.piChartData[i].MODULETITLE
                            );
                            this.partyDataForCharts.datasets[0].data.push(
                                this.piChartData[i].PERCENTAGE
                            );
                        }
                        this.partyDataForCharts = { ...this.partyDataForCharts };
                        this.showPieCharts = true;
                        for (let i = 0; i < this.piChartData.length; ++i) {
                            this.piChartData[i] = {
                                index: i + 1,
                                ...this.piChartData[i],
                            };
                            this.piChartData[i].PERCENTAGE =
                                Math.round(this.piChartData[i].PERCENTAGE * 100) /
                                100;
                        }
                        for (let i = 0; i < this.piChartData.length; ++i) {
                            this.JSONForExport.push({
                                'ردیف': this.piChartData[i].index,
                                'نام ماژول': this.piChartData[i].MODULETITLE,
                                'درصد': this.piChartData[i].PERCENTAGE,
                            });
                        }
                        this.chooseTypeOfChart = true;
                        // this.showPieCharts = true;
                        // this.showBarCharts = false;
                        // this.showTable = false;
                    }else {
                        this.chooseTypeOfChart=false
                        this.showPieCharts = false;
                        this.showBarCharts = false;
                        this.showTable = false;
                    }

                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }
    setView(mode: 'pie' | 'bar' | 'table') {
        this.showPieCharts = mode === 'pie';
        this.showBarCharts = mode === 'bar';
        this.showTable = mode === 'table';
    }
    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.JSONForExport);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, "products");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}
