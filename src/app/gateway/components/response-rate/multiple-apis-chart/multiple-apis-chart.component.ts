import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {ApiGatewayService} from "../../../services/api-gateway.service";
import {ToastService} from '../../../../shared/services/ToastService';
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {BreadcrumbsComponent} from "../../../../shared/components/breadcrumbs/breadcrumbs.component";
import {NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {Toast} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {UIChart} from "primeng/chart";
import {DetailResponseRateComponent} from "../detail-response-rate/detail-response-rate.component";

@Component({
    selector: 'app-multiple-apis-chart',
    templateUrl: './multiple-apis-chart.component.html',
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        TableModule,
        NgIf,
        Toast,
        FormsModule,
        UIChart,
        DetailResponseRateComponent,
    ],
    styleUrls: ['./multiple-apis-chart.component.scss']
})
export class MultipleApisChartComponent implements OnInit {
    @Input() inputMultipleApies;
    @ViewChild('chart') chart: Chart;
    @ViewChild('chart2') chart2: Chart;
    @Output() close = new EventEmitter<string>();
    dt: string = null
    delay: string = null
    apiId: string = null
    chartBarFlag = false
    detailsFlag = false
    chartLineFlag = false
    detailsBreadObject = []
    barWidth
    data
    options
    options2
    entries
    comment = ' برای دسترسی به جزئیات، روی نمودار کلیک کنید.'
    headerTitle = ''
    widthCondition = false

    detailsDto: {
        logCount: string,
        apiId: string,
        diffSecond: string,
        diffAvg: string,
        logDate: string,
        typeChart: string,
        name: string,
        title: string,
        delay: string,
        typeChart1Td:string
        typeChart2Title:string
        typeChart2Name:string
    };

    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private progressBarService: FuseLoadingService
    ) {
    }

    onClose(e) {
        this.detailsBreadObject = this.chooseBread('responsRate')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (e == 'close') {
            this.detailsFlag = false
        }
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'responsRate':
                if (this.inputMultipleApies != undefined && this.inputMultipleApies != null) {
                    if (this.inputMultipleApies.typeChart == '1') {
                        return [
                            {
                                index: 0,
                                label_index0: 'گزارشات',
                                img_index0: 'assets/icons/reports.png',
                                rout_index0: '/home',
                                isActive0: false,
                            },
                            {
                                index: 1, label_index1: "میزان پاسخ‌دهی", rout_index1: "", isActive1: false,
                                img_index1: "assets/icons/respons.png"
                            },
                            {
                                index: 2,
                                label_index2: "میزان پاسخ‌دهی در تاریخ",
                                rout_index2: "",
                                isActive2: true,
                                img_index2: "assets/icons/respons.png",
                                label_Detail_index2: '(' + this.castToDate(this.dt) + ')'
                            },
                            {label_index3: null, label_Detail_index3: null},
                            {label_index4: null, label_Detail_index4: null}, {
                                label_index5: null,
                                label_Detail_index5: null
                            },
                            {label_index6: null, label_Detail_index6: null}
                        ]
                    } else if (this.inputMultipleApies.typeChart == '2') {
                        return [
                            {
                                index: 0,
                                label_index0: 'گزارشات',
                                img_index0: 'assets/icons/reports.png',
                                rout_index0: '/home',
                                isActive0: false,
                            },
                            {
                                index: 1, label_index1: "میزان پاسخ‌دهی", rout_index1: "", isActive1: false,
                                img_index1: "assets/icons/respons.png"
                            },
                            {
                                index: 2,
                                label_index2: "میزان پاسخ‌دهی سرویس",
                                rout_index2: "",
                                isActive2: true,
                                img_index2: "assets/icons/respons.png",
                                label_Detail_index2: '(' + this.inputMultipleApies.title + '-' + this.inputMultipleApies.name + ')'
                            },
                            {label_index3: null, label_Detail_index3: null},
                            {label_index4: null, label_Detail_index4: null}, {
                                label_index5: null,
                                label_Detail_index5: null
                            },
                            {label_index6: null, label_Detail_index6: null}
                        ]
                    }
                }

            default:
                return null
        }
    }

    ngOnInit(): void {

        if (this.inputMultipleApies != undefined && this.inputMultipleApies != null) {
            debugger
            debugger
            debugger
            debugger

            debugger
            console.log('inputMultipleApies', this.inputMultipleApies)
            this.widthCondition = this.inputMultipleApies.typeChart == '2'
            this.dt = this.inputMultipleApies.logDate
            this.delay = this.inputMultipleApies.delay
            this.apiId = this.inputMultipleApies.apiId
            debugger
            // const barWidth = chartData.length < 5 ? 0.5 : 1;


            this.detailsBreadObject = this.chooseBread('responsRate')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.headerTitle = 'میزان پاسخ‌دهی سرویس ها در تاریخ  ' + this.castToDate(this.dt)
        }
        this.showChart()

    }

    validationRate(): boolean {
        if (!this.delay) {
            this.notifierService.showError({
                detail: "لطفا میزان پاسخ‌دهی را وارد کنید!",
                life: 3000
            });
            return false
        } else {
            return true;
        }
    }

    clear() {
        this.chartBarFlag = false
        this.delay = null
    }

    handleChartClick(event: any) {
        debugger


        if (this.chart && (this.chart as any).chart) {
            const chartInstance = (this.chart as any).chart;
            const elements = chartInstance.getElementsAtEventForMode(
                event.originalEvent,
                'nearest',
                {intersect: true},
                true
            );

            if (elements.length > 0) {
                const dataIndex = elements[0].index;
                const datasetIndex = elements[0].datasetIndex;
                const value = this.data.datasets[datasetIndex].data[dataIndex];
                const label = this.data.labels[dataIndex];

                const selectedEntry = this.entries ? this.entries[dataIndex] : null;
                this.detailsDto = {
                    logCount: selectedEntry.logCount,
                    apiId: selectedEntry.apiId,
                    diffSecond: selectedEntry.diffSecond,
                    diffAvg: selectedEntry.diffAvg,
                    typeChart: this.inputMultipleApies.typeChart,
                    delay: selectedEntry.diffSecond,
                    logDate: selectedEntry.logDate.replace(/-/g, ""),
                    //logDate: '14031128',
                    name: selectedEntry.name,
                    title: selectedEntry.title,
                    typeChart1Td:this.dt,
                    typeChart2Title:this.inputMultipleApies.title,
                    typeChart2Name:this.inputMultipleApies.name
                };
                this.detailsFlag = true;
            } else {
                console.warn('هیچ ستونی انتخاب نشده است.');
            }
            // this.showChart()
        }


    }

    BeforeButton() {
        this.close.emit('close');
    }

    showChart() {
        debugger
        debugger
        debugger
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.chartBarFlag = true

        if (this.inputMultipleApies != undefined && this.inputMultipleApies != null) {
            debugger
            if (this.inputMultipleApies.typeChart == '1') {
                debugger
                this.progressBarService.show();
                this.messagesApiFacadeService.responsedelayMultipleservice(this.dt).subscribe(e => {
                    debugger
                    debugger
                    this.entries = e;
                    const tempThis = this
                    this.data = null
                    this.data = {
                        labels: e.map(entry => `${entry.title} (${entry.name})`),
                        datasets: [
                            {
                                type: 'bar',
                                label: 'Max call',
                                fill: false,
                                tension: 0.2,
                                borderWidth: 2,
                                data: e.map(entry => entry.diffSecond),
                                borderColor: '#c96f6f',
                                backgroundColor: '#d98d8d',
                                barThickness: 60,
                                maxBarThickness: 25,
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem: any) {

                                            const entry = e[tooltipItem.dataIndex];
                                            return [
                                                'Max delay: ' + `${entry.diffSecond}` + ' s',
                                                `Max call :${entry.logCount}` + '',
                                                `` + tempThis.dashToSlash(entry.logDate),

                                            ];
                                        }
                                    }
                                }
                            },
                        ],
                    };
                    this.progressBarService.hide();
                }, error => {
                    this.progressBarService.hide();
                })
            } else if (this.inputMultipleApies.typeChart == '2') {
                debugger
                this.progressBarService.show();
                this.messagesApiFacadeService.responsedelaySingularservice(this.dt, this.delay, this.apiId).subscribe(e => {
                    debugger
                    debugger
                    this.entries = e;

                    const tempThis = this
                    this.data = null
                    this.data = {
                        labels: e.map(entry => entry.diffSecond),
                        datasets: [
                            {
                                type: 'bar',
                                // label: e.map(entry => entry.diffSecond),
                                label: '',
                                fill: false,
                                tension: 0.2,
                                borderWidth: 2,
                                data: e.map(entry => entry.logCount),
                                borderColor: '#c96f6f',
                                backgroundColor: '#d98d8d',
                                barThickness: 60,
                                maxBarThickness: 25,
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem: any) {
                                            const entry = e[tooltipItem.dataIndex];
                                            return [
                                                'Max delay:' + `${entry.diffSecond}` + ' s',
                                                'Max call: ' + `${entry.logCount}` + '',
                                                `` + tempThis.dashToSlash(entry.logDate),

                                            ];
                                        }
                                    }
                                }
                            },
                        ],
                    };
                    this.barWidth = this.data.length < 5 ? 0.1 : 1;
                    if (this.widthCondition) {
                        debugger
                        this.options = {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: textColor,
                                    },
                                },
                                tooltip: {
                                    enabled: true,
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            let label = tooltipItem.dataset.label || '';
                                            const value = tooltipItem.raw;
                                            if (label) {
                                                label += ': ';
                                            }
                                            return [`${value}${label}`, '', ''];
                                        }
                                    },
                                    external: function (tooltipModel) {
                                        if (tooltipModel.body) {
                                            tooltipModel.body = tooltipModel.body.map(function (body) {
                                                return body.replace(/<br>/g, '<br/>');  // تنظیم خط جدید
                                            });
                                        }
                                    }
                                },
                            },
                            scales: {
                                x: {
                                    barThickness: 1,
                                    barPercentage: 0.4,
                                    maxBarThickness: 1,
                                    ticks: {
                                        minRotation: 90,
                                        maxRotation: 90,
                                        align: 'end'
                                    },
                                    grid: {
                                        color: surfaceBorder,
                                    },
                                    title: {
                                        display: true,
                                        text: 'میزان پاسخ‌دهی',
                                        font: {
                                            size: 12
                                        }
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        color: textColorSecondary,
                                    },
                                    grid: {
                                        color: surfaceBorder,
                                    },
                                    title: {
                                        display: true,
                                        text: 'تعداد فراخوانی',
                                        font: {
                                            size: 14
                                        }
                                    }
                                },
                            },
                        };

                    } else {
                        debugger
                        this.options = {
                            //  onClick: this.handleChartClick.bind(this),
                            maintainAspectRatio: false,
                            aspectRatio: 1.2,
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: textColor,
                                    },
                                },
                                tooltip: {
                                    enabled: true,
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            let label = tooltipItem.dataset.label || '';
                                            const value = tooltipItem.raw;
                                            if (label) {
                                                label += ': ';
                                            }
                                            return [`${value}${label}`, '', ''];
                                        }
                                    },
                                    external: function (tooltipModel) {
                                        if (tooltipModel.body) {
                                            tooltipModel.body = tooltipModel.body.map(function (body) {
                                                return body.replace(/<br>/g, '<br/>');  // تنظیم خط جدید
                                            });
                                        }
                                    }
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        minRotation: 90,
                                        maxRotation: 90,
                                        align: 'end'                                    },
                                    grid: {
                                        color: surfaceBorder,
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: textColorSecondary,
                                    },
                                    grid: {
                                        color: surfaceBorder,
                                    },
                                    title: {
                                        display: true,
                                        text: 'تعداد فراخوانی',
                                        font: {
                                            size: 14
                                        }
                                    }
                                },
                            },

                        };

                    }
                    debugger
                    this.progressBarService.hide();
                }, error => {
                    this.progressBarService.hide();
                })
            }

        }


    }

    dashToSlash(value: string): string {

        if (!value) return '';
        if (!value.includes('-')) {
            if (value.length === 8) {
                return `${value.substring(0, 4)}/${value.substring(4, 6)}/${value.substring(6, 8)}`;
            }
            return value;
        }
        const parts = value.split('-');
        if (parts.length !== 3) {
            return value;
        }
        const [year, month, day] = parts;
        const a = `${year}/${month}/${day}`;

        return a;
    }

    castToDate(args) {
        if (args)
            if (args.toString().length === 8) {

                let tempArgs8: string;
                tempArgs8 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8);
                return tempArgs8;
            } else if (args.toString().length >= 15 && args.toString().length <= 17) {
                let tempArgs17: string;
                tempArgs17 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8)
                    + " " + args.toString().slice(8, 10) + ":" + args.toString().slice(10, 12) + ":" + args.toString().slice(12, 14) + ":" +
                    args.toString().slice(14, args.length);
                return tempArgs17;
            } else {
                return args;
            }
    }
}
