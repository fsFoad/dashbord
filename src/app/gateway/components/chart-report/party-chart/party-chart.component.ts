// @ts-nocheck
import { Component, Input, OnInit, SimpleChanges, OnChanges, NO_ERRORS_SCHEMA } from '@angular/core';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { ButtonDirective } from 'primeng/button';
// import { UIChart } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { NgForOf, NgIf } from '@angular/common';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import { UIChart } from 'primeng/chart';
import { saveAs } from 'file-saver-es';
@Component({
    selector: 'app-party-chart',
    templateUrl: './party-chart.component.html',
    standalone: true,
    styleUrls: ['./party-chart.component.scss'],
    imports: [
        ButtonDirective,
        TableModule,
        NgIf,
        NgForOf,
        TranslocoPipe,
        UIChart,
    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PartyChartComponent implements OnInit, OnChanges {
    @Input() SelectedNumberOfDay: string;

    piChartData: any;
    JSONForExport: any = [];
    showPieCharts = true;
    showBarCharts = false;
    showTable = false;
    contextMenuItems: any;
    cols: any;
    data: any;
    callTheService = false;
    buttonChartShow = true;
    chartPlugins: any;
    responsiveChartOptions: any;

    constructor(
        private chartsService: MessagesApiFacadeService,
        private translateService: TranslocoService,
        private _primengProgressBarService: FuseLoadingService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.SelectedNumberOfDay && this.callTheService) {
            this._primengProgressBarService.show();
            this.chartsService.getPiChart(this.SelectedNumberOfDay).subscribe(
                (response) => {
                    this._primengProgressBarService.hide();
                    this.piChartData = response;
                    this.data = {
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
                    for (let i = 0; i < this.piChartData.length; ++i) {
                        this.data.labels.push(this.piChartData[i].PARTYTITLE);
                        this.data.datasets[0].data.push(
                            this.piChartData[i].PERCENTAGE
                        );
                        this.piChartData[i] = {
                            index: i + 1,
                            ...this.piChartData[i],
                        };
                        this.piChartData[i].PERCENTAGE =
                            Math.round(this.piChartData[i].PERCENTAGE * 100) /
                            100;
                        this.JSONForExport.push({
                            'ردیف': this.piChartData[i].index,
                            'نام': this.piChartData[i].PARTYTITLE,
                            'درصد': this.piChartData[i].PERCENTAGE,
                        });
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        }
    }
/*    ngOnInit(): void {
        this.callTheService = true
        this.responsiveChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        }
        this.chartPlugins = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
        this._primengProgressBarService.show()
        this.translateService.get([
            'pie.charts',
            'bar.charts',
            'party.table',
            'row.table',
            'name.table',
            'percent.table'
        ]).subscribe((translations) => {
            this._primengProgressBarService.hide()
            this.contextMenuItems = [
                {
                    label: translations['pie.charts'],
                    icon: 'pi pi-chart-pie',
                    command: () => {
                        this.showPieCharts = true
                        this.showBarCharts = false
                        this.showTable = false
                    }
                },
                {
                    label: translations['bar.charts'],
                    icon: 'pi pi-chart-bar',
                    command: () => {
                        this.showPieCharts = false
                        this.showBarCharts = true
                        this.showTable = false
                    }
                },
                {
                    label: translations['party.table'],
                    icon: 'pi pi-bars',
                    command: () => {
                        this.showPieCharts = false
                        this.showBarCharts = false
                        this.showTable = true
                    }
                }
            ]
            this.cols = [
                {field: 'index', header: translations['row.table']},
                {field: 'PARTYTITLE', header: translations['name.table']},
                {field: 'PERCENTAGE', header: translations['percent.table']}
            ]
        }, error => {
            this._primengProgressBarService.hide()
        })
        this._primengProgressBarService.show()
        this.chartsService.getPiChart(this.SelectedNumberOfDay).subscribe(
            (response) => {
                this._primengProgressBarService.hide()
                this.piChartData = response
                this.data = {
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
                }
                for (let i = 0; i < this.piChartData.length; ++i) {
                    this.data.labels.push(this.piChartData[i].PARTYTITLE)
                    this.data.datasets[0].data.push(this.piChartData[i].PERCENTAGE)
                    this.piChartData[i] = {index: i + 1, ...this.piChartData[i]}
                    this.piChartData[i].PERCENTAGE = Math.round(this.piChartData[i].PERCENTAGE * 100) / 100
                    this.JSONForExport.push(
                        {
                            'ردیف': this.piChartData[i].index,
                            'نام': this.piChartData[i].PARTYTITLE,
                            'درصد': this.piChartData[i].PERCENTAGE
                        }
                    )
                }
            }, error => {
                this._primengProgressBarService.hide()
            })
    }*/
    ngOnInit(): void {
        debugger
        this.callTheService = true
        this.responsiveChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        }
        this.chartPlugins = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
        this._primengProgressBarService.show()
        this.callTheService = true;

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

        this._primengProgressBarService.show();

        // مقداردهی مستقیم گزینه‌های منو
        this.contextMenuItems = [
            {
                label: 'نمودار دایره‌ای',
                icon: 'pi pi-chart-pie',
                command: () => this.setView('pie')
            },
            {
                label: 'نمودار میله‌ای',
                icon: 'pi pi-chart-bar',
                command: () => this.setView('bar')
            },
            {
                label: 'جدول اطلاعات',
                icon: 'pi pi-bars',
                command: () => this.setView('table')
            }
        ];

        this.cols = [
            { field: 'index', header: 'ردیف' },
            { field: 'PARTYTITLE', header: 'نام' },
            { field: 'PERCENTAGE', header: 'درصد' }
        ];

        this._primengProgressBarService.show();

        this.chartsService.getPiChart(this.SelectedNumberOfDay).subscribe(
            (response) => {
                this._primengProgressBarService.hide();
                this.piChartData = response;

                this.data = {
                    labels: [],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: [
                                '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
                                '#26A69A', '#FF7043', '#EC407A', '#5C6BC0',
                                '#8D6E63', '#78909C'
                            ],
                            hoverBackgroundColor: [
                                '#64B5F6', '#81C784', '#FFB74D', '#BA68C8',
                                '#4DB6AC', '#FF8A65', '#F06292', '#7986CB',
                                '#A1887F', '#90A4AE'
                            ]
                        }
                    ]
                };

                for (let i = 0; i < this.piChartData.length; ++i) {
                    this.data.labels.push(this.piChartData[i].PARTYTITLE);
                    this.data.datasets[0].data.push(this.piChartData[i].PERCENTAGE);
                    this.piChartData[i] = { index: i + 1, ...this.piChartData[i] };
                    this.piChartData[i].PERCENTAGE = Math.round(this.piChartData[i].PERCENTAGE * 100) / 100;

                    this.JSONForExport.push({
                        'ردیف': this.piChartData[i].index,
                        'نام': this.piChartData[i].PARTYTITLE,
                        'درصد': this.piChartData[i].PERCENTAGE
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        this.chartsService.getPiChart(this.SelectedNumberOfDay).subscribe(
            (response) => {
                debugger
                this._primengProgressBarService.hide();
                this.piChartData = response;
                if (this.piChartData.length > 0) {
                    this.buttonChartShow=true
                    this.data = {
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
                    for (let i = 0; i < this.piChartData.length; ++i) {
                        this.data.labels.push(this.piChartData[i].PARTYTITLE);
                        this.data.datasets[0].data.push(
                            this.piChartData[i].PERCENTAGE
                        );
                        this.piChartData[i] = {
                            index: i + 1,
                            ...this.piChartData[i],
                        };
                        this.piChartData[i].PERCENTAGE =
                            Math.round(this.piChartData[i].PERCENTAGE * 100) / 100;
                        this.JSONForExport.push({
                            'ردیف': this.piChartData[i].index,
                            'نام': this.piChartData[i].PARTYTITLE,
                            'درصد': this.piChartData[i].PERCENTAGE,
                        });
                    }
                }
                else {
                    debugger
                    this.showTable=false
                    this.buttonChartShow=false
                }

            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.JSONForExport);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'products');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        saveAs.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }
    setView(mode: 'pie' | 'bar' | 'table') {
        this.showPieCharts = mode === 'pie';
        this.showBarCharts = mode === 'bar';
        this.showTable = mode === 'table';
    }
}
