import {Component, OnInit, ViewChild} from '@angular/core';

import {FuseLoadingService} from '../../../../../@fuse/services/loading';
import {ApiGatewayService} from '../../services/api-gateway.service';
import {ActivatedRoute, Router} from "@angular/router";
import {MessagesApiFacadeService} from '../../services/messages-api-facade.service';
import {Constants} from '../../../shared/constants/Constants';
import {Chart} from "chart.js";
import {ToastService} from '../../../shared/services/ToastService';
import {Toast} from "primeng/toast";
import {BreadcrumbsComponent} from "../../../shared/components/breadcrumbs/breadcrumbs.component";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {PersianCalendarComponent} from "../../../shared/components/persian-calendar/persian-calendar.module";
import {ButtonDirective} from "primeng/button";
import {InputNumber} from "primeng/inputnumber";
import {TranslocoPipe} from "@ngneat/transloco";
import {UIChart} from "primeng/chart";
import {MultipleApisChartComponent} from "./multiple-apis-chart/multiple-apis-chart.component";

@Component({
    selector: 'app-response-rate',
    templateUrl: './response-rate.component.html',
    standalone: true,
    imports: [
        Toast,
        BreadcrumbsComponent,
        NgIf,
        DropdownModule,
        FormsModule,
        PersianCalendarComponent,
        ButtonDirective,
        InputNumber,
        TranslocoPipe,
        UIChart,
        MultipleApisChartComponent

    ],
    styleUrls: ['./response-rate.component.scss']
})
export class ResponseRateComponent implements OnInit {
    @ViewChild('chart') chart: Chart;
    detailsBreadObject = []
    moduleListOptions = [{moduleTitle: '-', moduleId: null}]
    clientListOptions = [{name: '-', clientId: null}]
    clientId = null
    fromdate = null
    todate = null
    delay = null
    moduleid = null
    multipleApiFlag = false
    multipleapiDto: {
        logCount: string,
        apiId: string,
        diffSecond: string,
        diffAvg: string,
        logDate: string,
        typeChart: string,
        name: string,
        title: string,
        delay: string,
    };
    comment=''
    styles = {
        'flex-grow': '1',
        'max-width': '120px',
        'min-width': '80px',
        'text-align': 'center'
    };
    typeChartOption = Constants.typeChart
    typeChart
    chartLineFlag = false
    chartLineDataFlag = true
    chatDataLine
    data = null
    options
    chartWidth
    entries

    constructor(
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private router: Router,
        private route: ActivatedRoute,

    ) {
    }


    handleChartClick(event: any) {
        debugger


        /*  if (this.chart && (this.chart as any).chart) {
              const chartInstance = (this.chart as any).chart;
              const canvas = chartInstance.canvas;
              const rect = canvas.getBoundingClientRect();

              // محاسبه مختصات نسبی نسبت به canvas
              const eventX = event.clientX - rect.left;
              const eventY = event.clientY - rect.top;

              // ایجاد شیء event سفارشی با مختصات درست
              const adjustedEvent = Object.assign({}, event, {
                  offsetX: eventX,
                  offsetY: eventY
              });

              const elements = chartInstance.getElementsAtEventForMode(
                  adjustedEvent,
                  'nearest',
                  { intersect: true },
                  true
              );

              console.log('Found elements:', elements);

              if (elements.length > 0) {
                  debugger
                  const datasetIndex = elements[0].datasetIndex;
                  const dataIndex = elements[0].index;
                  const dataPoint = chartInstance.data.datasets[datasetIndex].data[dataIndex];
                  console.log('داده نقطه کلیک شده:', dataPoint);
                  alert(`مقدار این نقطه: ${dataPoint}`);
              } else {
                  console.warn('هیچ نقطه‌ای در نزدیکی کلیک یافت نشد.');
              }
          } else {
              console.error('Chart instance is not available.');
          }*/
        if (this.chart && (this.chart as any).chart) {
            const chartInstance = (this.chart as any).chart;
            const elements = chartInstance.getElementsAtEventForMode(event, 'nearest', {intersect: true}, true);
            if (elements.length > 0) {
                const dataIndex = elements[0].index;
                const selectedEntry = this.entries[dataIndex];
                console.log('داده نقطه کلیک شده:', selectedEntry);
                debugger
                debugger
                debugger
                debugger
                this.multipleapiDto = {
                    logCount: selectedEntry.logCount,
                    apiId: selectedEntry.apiId,
                    diffSecond: selectedEntry.diffSecond,
                    diffAvg: selectedEntry.diffAvg,
                    typeChart: this.typeChart,
                    delay:selectedEntry.diffSecond,
                    logDate : selectedEntry.logDate.replace(/-/g, ""),
                  //  logDate: '14031128',
                    name: selectedEntry.name,
                    title: selectedEntry.title,
                };
                debugger
                debugger
                debugger
                debugger
                this.multipleApiFlag = true
            } else {
                console.warn('هیچ نقطه‌ای در نزدیکی کلیک یافت نشد.');
            }
        } else {
            console.error('Chart instance is not available.');
        }

    }
    validationRate(): boolean {
        debugger
        if (!this.typeChart) {
            this.notifierService.showError(
                {detail: 'لطفا نوع گزارش را وارد نمائید! '},
                );
            return false;
        } else  if (!this.fromdate) {
            this.notifierService.showError(
                {detail: 'لطفا تاریخ شروع را وارد نمائید! '},
                 );
        } else  if (!this.todate) {
            this.notifierService.showError(
                {detail: 'لطفا تاریخ پایان را وارد نمائید! '},
                );
        }else if (this.fromdate > this.todate) {
            this.notifierService.showError({
                detail: "لطفا بازه تاریخ معتبر را وارد کنید!",
                life: 3000
            });
            return false
        } else  if (!this.clientId) {
            this.notifierService.showError({
                detail: "لطفا نام کلاینت را وارد کنید!",
                life: 3000
            });
            return false
        }  else  if (this.delay==null||this.delay==undefined||this.delay<0) {
            this.notifierService.showError({
                detail: "لطفا میزان پاسخ‌دهی را وارد کنید!",
                life: 3000
            });
            return false
        } else {
            return true;
        }
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'responsRate':
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: "میزان پاسخ‌دهی", rout_index1: "", isActive1: true,
                        img_index1: "assets/icons/respons.png"
                    },
                    {label_index2: null, label_Detail_index2: null}, {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null}, {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            default:
                return null
        }
    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f)
            console.log(element)
            if (element) element.scrollIntoView(true)
        })
    }

    ngOnInit() {
        debugger
        this.messagesApiFacadeService.fetchallmodule().subscribe(n=>{
            if (Array.isArray(n)) {

                this.moduleListOptions = n

            } else {

                this.moduleListOptions.push(...n)
            }
            this.moduleListOptions.unshift({moduleTitle: '-', moduleId: null});

        })
        this.detailsBreadObject = this.chooseBread('responsRate')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.data = this.data || {};
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.options = {
            onClick: this.handleChartClick.bind(this),
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
                            const value = tooltipItem.raw; // مقدار عددی

                            if (label) {
                                label += ': ';
                            }

                            // ترکیب مقدار و متن با خط جدید
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
                    offset: true,
                    ticks: {
                        // color: textColorSecondary,
                        minRotation: 90,
                        maxRotation: 90,
                    },
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
                        text: this.typeChart=='1'? 'میزان پاسخ‌دهی':(this.typeChart=='2'?'میانگین تاخیر':''),
                        font: {
                            size: 14
                        }
                    }
                },
            },
        };
        let dataLength = null
        dataLength = this.data?.labels?.length;
        this.chartWidth = `${Math.max(200, dataLength * 50)}px`;
        debugger
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallclient().subscribe(i => {
            debugger
            this._primengProgressBarService.hide()
            if (Array.isArray(i)) {
                this.clientListOptions = i
            } else {
                this.clientListOptions.push(...i)
            }
            this.clientListOptions.unshift({name: '-', clientId: null,});
        }, error => {
            this._primengProgressBarService.hide()
        })
    }

    showChart() {
        debugger
        this.notifierService.showWarning({ detail: 'این بخش در حال توسعه است!', life: 3000 });
        /*کامنت موقت */
      /*  this.chartLineDataFlag = true
        if(this.validationRate()){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.options = {
            onClick: this.handleChartClick.bind(this),
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
                            const value = tooltipItem.raw; // مقدار عددی

                            if (label) {
                                label += ': ';
                            }

                            // ترکیب مقدار و متن با خط جدید
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
                        // color: textColorSecondary,
                        minRotation: 90,
                        maxRotation: 90,
                    },
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
                        text: this.typeChart=='1'? 'میزان پاسخ‌دهی':(this.typeChart=='2'?'میانگین تاخیر':''),
                        font: {
                            size: 14
                        }
                    }
                },
            },
        };
        this.typeChart=='1'?this.comment=' برای دسترسی به تعداد فراخوانی سرویس‌ها در یک روز بخصوص، روی نمودار کلیک کنید.':
            ( this.typeChart=='2'?   this.comment=' برای دسترسی به تعداد فراخوانی سرویس ها براساس میزان پاسخ دهی در یک روز بخصوص، روی نمودار کلیک کنید.':null)


            this.chartLineFlag = true
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.responsedelay(this.clientId, this.fromdate, this.todate, this.delay,this.moduleid).subscribe(e => {
                debugger
                if (e.length == 0) {
                    this.chartLineDataFlag = false
                }
                this.entries = e;
                const tempThis = this
                if (this.typeChart == '1') {
                    this.data = null
                    this.data = {
                        labels: e.map(entry => `${entry.title} - (${entry.name})`),

                        datasets: [
                            {
                                type: 'line',
                                label: 'Max delay',
                                fill: false,
                                tension: 0.2,
                                borderWidth: 2,
                                data: e.map(entry => entry.diffSecond),
                                borderColor: '#a81616',
                                backgroundColor: '#a81616',
                                pointStyle: 'circle',
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem: any) {

                                            const entry = e[tooltipItem.dataIndex];
                                            return [
                                                'Max delay :' + `${entry.diffSecond}` + ' s',
                                                `Number of total service calls in a day:${entry.logCount}` + '',
                                                `` + tempThis.dashToSlash(entry.logDate),

                                            ];
                                        }
                                    }
                                }
                            },
                        ],
                    };
                }
                else if (this.typeChart == '2') {
                    this.data = null
                    this.data = {
                        labels: e.map(entry => `${entry.title} - (${entry.name})`),
                        datasets: [
                            {
                                type: 'line',
                                label: 'Average Delay',
                                fill: false,
                                tension: 0.2,
                                borderWidth: 2,
                                data: e.map(entry => entry.diffAvg),
                                borderColor: '#d74672',
                                backgroundColor: '#d74672',
                                pointStyle: 'circle',
                                pointRadius: 4,
                                pointHoverRadius: 7,
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem: any) {
                                            const entry = e[tooltipItem.dataIndex];
                                            return [
                                                'Average Delay:' + `${entry.diffAvg}` + ' s',
                                                `Number of total service calls in a day: ${entry.logCount}` + '',
                                                `` + tempThis.dashToSlash(entry.logDate),
                                            ];
                                        }
                                    }
                                }
                            },
                        ],

                    };
                }
                this._primengProgressBarService.hide();
            },error => {
                this._primengProgressBarService.hide();
            })
        }*/


    }

    dashToSlash(value: string): string {
        debugger

        if (!value) return '';
        const parts = value.split('-');
        if (parts.length !== 3) {
            return value;
        }
        const [year, month, day] = parts;
        const a = `${year}/${month}/${day}`
        debugger

        return a;
    }

    clear() {
        this.notifierService.showWarning({ detail: 'این بخش در حال توسعه است!', life: 3000 });
        /*کامنت موقت */
      /*  this.chartLineFlag = false
        this.clientId = null
        this.fromdate = null
        this.todate = null
        this.delay = null
        this.typeChart = null
        this.moduleid = null*/
    }

    onClose(e) {
        this.detailsBreadObject = this.chooseBread('responsRate')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (e == 'close') {

            this.multipleApiFlag = false
        }
    }
}

interface LogEntry {
    diffSecond: number;
    diffavg: number;
    fromDateTime: string;
    toDateTime: string;
    logCount: number;
    name: string;
    title: string;
    logDate: string;
}
