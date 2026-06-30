import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesApiFacadeService } from '../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../@fuse/services/loading';
import { ApiGatewayService } from '../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgIf } from '@angular/common';
import { UIChart } from 'primeng/chart';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { LogReportsComponent } from '../components/log-reports/log-reports.component';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FsProgressSpinnerComponent } from '../../shared/components/fs-progress-spinner/fs-progress-spinner.component';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../shared/pipes/moreChar19.pipe';
import { BlurOverlayComponent } from '../../shared/components/blur-overlay/blur-overlay.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { NormalizeJalaliPipe } from '../../shared/pipes/fix-jalali.pipe';
import * as Sentry from "@sentry/angular";
import { SentryContextService } from '../../../core/sentry/sentry-context.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    providers: [DialogService, DynamicDialogRef],
    imports: [
        BreadcrumbsComponent,
        NgIf,
        UIChart,
        ButtonDirective,
        TableModule,
        Menu,
        Ripple,
        LogReportsComponent,
        TranslocoPipe,
        FsProgressSpinnerComponent,
        Tooltip,
        TranslocoDirective,
        MoreChar19Pipe,
        Toast,
        BlurOverlayComponent,
        MultiSelect,
        FormsModule,
        NormalizeJalaliPipe,
    ],
})
export class HomeComponent implements OnInit {
    @ViewChild('myChart') myChart!: UIChart;
    a = true;
    loading = true;
    valueOfDelayDaily = [];
    valueOfLastFailTable = [];
    valueOfDailyTable = [];
    detailsBreadObject: any = null;
    itemsDaily: any[] = [];
    itemsSuccess: any[] = [];
    itemsFail: any[] = [];
    apiListDaily: any[] = [];
    apiListSuccess: any[] = [];
    apiListfailed: any[] = [];
    apiListDailyCount: any[] = [];
    apiListSuccessCount: any[] = [];
    apiListfailedCount: any[] = [];
    lastJobRunn: any;
    tempLog;
    serviceLog;
    dataLog;
    chartDataLineDaily;
    labelOptions;
    selectedLabels;
    chartBarDelayDaily;
    chartBarDelayYesterday;
    chatDataPieDaily;
    chatDataBarfailed;
    chatDataBarSuccess;
    barOptionDaily;
    PieOptionDaily;
    barOptionfailed;
    barOptionSuccess;
    sumSuccess;
    entries;
    emptyDailyFlag = false;
    emptyDelayDailyFlag = false;
    emptyDelayYesterdayFlag = false;
    chartFlag = true;
    DailyCallFlag = false;
    successCallFlag = false;
    dailyCallSpinnerFlag = false;
    delayDailySpinnerFlag = false;
    showBackButtonFlag = false;
    delayDailyYesterdaySpinnerFlag = false;
    failCallFlag = false;
    logDto;
    chartDelayYesterdayOptions;
    chartBarDelayDailyOptions;
    day = 7;
    private isLoading = false;
    private destroy$ = new Subject<void>();
    private click$ = new Subject<void>();
    loadInProgress = false;
    private loadTrigger$ = new Subject<void>();
    private isLoading$ = new BehaviorSubject<boolean>(false);
    hiddenIndexes: number[] = [];
    originalData
    private sentry =
        inject(SentryContextService);
    constructor(private route: ActivatedRoute,
                private messagesApiFacadeService: MessagesApiFacadeService,
                private _primengProgressBarService: FuseLoadingService,
                private transloco: TranslocoService,
                private apiGatewayService: ApiGatewayService,
                private dialogService: DialogService,
                private messageService: MessageService,
                private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef) {
      /*  this.click$
            .pipe(
                takeUntil(this.destroy$),
                exhaustMap(() => {
                    this.dailyCallSpinnerFlag = true;
                    return this.messagesApiFacadeService.getstatistictoday().pipe(
                        finalize(() => (this.dailyCallSpinnerFlag = false))
                    );
                })
            )
            .subscribe({
                next: (response: any[]) => {
                    this.valueOfDailyTable = response;

                    let sumSuccessDaily = 0;
                    let sumfailedDaily = 0;
                    this.apiListDaily = [];
                    this.apiListDailyCount = [];

                    this.emptyDailyFlag = this.valueOfDailyTable.length === 0;

                    for (let i = 0; i < this.valueOfDailyTable.length; i++) {
                        this.apiListDaily.push(this.valueOfDailyTable[i].apiTtile);

                        const temp =
                            this.valueOfDailyTable[i].successcount +
                            this.valueOfDailyTable[i].failedcount;

                        sumfailedDaily += this.valueOfDailyTable[i].failedcount;
                        sumSuccessDaily += this.valueOfDailyTable[i].successcount;

                        this.apiListDailyCount[i] = temp;
                    }

                    this.chatDataPieDaily = {
                        labels: ['موفق', 'ناموفق'],
                        datasets: [
                            {
                                data: [sumSuccessDaily, sumfailedDaily],
                                backgroundColor: ['#A8C799', '#c56f73'],
                                hoverBackgroundColor: ['#81C784', '#c54535'],
                            },
                        ],
                    };

                    this.chartDataLineDaily = {
                        labels: this.apiListDaily,
                        datasets: [
                            {
                                label: 'موفق',
                                data: this.apiListDailyCount,
                                backgroundColor: '#773ec5',
                            },
                        ],
                    };

                    this.barOptionDaily = {
                        plugins: { legend: { display: false } },
                    };
                },
                error: (err) => {
                    console.error('API error:', err);
                },
            });*/

    }
    toggleLabel(index: number) {
        if (this.hiddenIndexes.includes(index)) {
            // اگر قبلاً مخفی بوده → برگردون
            this.hiddenIndexes = this.hiddenIndexes.filter(i => i !== index);
        } else {
            // اضافه به لیست مخفی‌ها
            this.hiddenIndexes.push(index);
        }

        // برو روی دیتاست و مقدار رو null کن تا نمودار خطش رو نکشه
        const dataset = this.chartDataLineDaily.datasets[0];
        dataset.data = dataset.data.map((val, i) =>
            this.hiddenIndexes.includes(i) ? null : val
        );

        // آپدیت نمودار
        this.chartDataLineDaily?.chart.update();
    }
    calChartWeekly(condition) {
        if (condition == 1) {
            this.day = this.day + 1;
        } else {
            this.day = this.day - 1;
        }
        this.delayDailySpinnerFlag = true;
        this.messagesApiFacadeService.compareToDay(this.day).subscribe(response => {
            debugger

            if (response.length == 0) {
                debugger
                this.delayDailySpinnerFlag = false;
                this.emptyDelayDailyFlag = true;
            } else {
                this.entries = response;
                this.delayDailySpinnerFlag = this.entries.length === 0;
                const barThicknessty = 20; /*= response.length > 10 ? 10 : 20;*/
                const maxBarThicknessty = 10;/*= response.length > 10 ? 5 : 10;*/
                this.chartBarDelayDaily = {
                    labels: response.map(entry => `${entry.title} `),  // لیبل‌ها
                    datasets: [
                        {
                            type: 'line',
                            label: 'میانگین پاسخ دهی امروز',
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueOne),
                            borderColor: '#b96fc9',
                            backgroundColor: '#cb8dd9',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                        {
                            type: 'line',
                            label: 'میانگین پاسخ دهی' + this.day + ' روز گذشته',
                            fill: false,
                            borderWidth: 2,
                            data: response.map(entry => entry.valueTwo),
                            borderColor: '#c9ba6f',
                            backgroundColor: '#d9c18d',
                            barThickness: barThicknessty,
                            maxBarThickness: maxBarThicknessty,
                        },
                    ],
                };
                console.log('Mapped valueTwo:', response.map(entry => entry.valueTwo)); // بررسی مقدار valueTwo
                this.chartBarDelayDailyOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            categoryPercentage: 0.2,  // فضای بین ستون‌ها
                            barPercentage: 0.2,  // عرض ستون‌ها
                        },
                    },
                };
                this.delayDailySpinnerFlag = false;
            }

        }, error => {
            this.delayDailySpinnerFlag = false;
        });
    }

    showLog(log) {
        this.dataLog = {

            apiTtile: '',
            apiid: null,
            chartFlag: null,
            clientid: null,
            failedcount: null,
            moduleId: null,
            moduleTitle: '',
            partyId: null,
            partyTtile: '',
            successcount: null,
            homeBase: null,
        };
        this.dataLog = log;
        this.dataLog.homeBase = true;


        this.serviceLog = true;

    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    onClose(event: any) {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('dayCalls');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

        this.showBackButtonFlag = true;
        if (event == 'close') {
            this.serviceLog = false;
        }
        this.valueOfLastFailTable = [];
        this.valueOfDelayDaily = [];
        this.valueOfDailyTable = [];
        /*   this.messagesApiFacadeService.lastSucess().subscribe(response => {
               this.valueOfLastSuccessTable = response
           })*/

        /* this.messagesApiFacadeService.lastFail().subscribe(response => {
             this.valueOfLastFailTable = response
         })*/
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getstatistictoday().subscribe(response => {
            this._primengProgressBarService.hide();
            this.valueOfDailyTable = response;
        }, error => {
            this._primengProgressBarService.hide();
        });
    }

    setRecordDaily(log) {
        this.tempLog = log;
    }

    setRecordSuccess(log) {
        this.tempLog = log;
    }

    setRecordFail(log) {
        this.tempLog = log;
    }

    BeforeButton() {
        this.detailsBreadObject = this.chooseBread('home');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.showBackButtonFlag = false;
        this.DailyCallFlag = false;
        this.successCallFlag = false;
        this.failCallFlag = false;
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'home':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.home'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: true,
                    },

                    { label_index1: null, label_Detail_index1: null },
                    { label_index2: null, label_Detail_index2: null }, {
                        label_index3: null,
                        label_Detail_index3: null,
                    },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null,
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'dayCalls':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.home'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dayCalls'),
                        rout_index1: '',
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

    /* handleChartClick(event: any) {
         debugger


         /!*  if (this.chart && (this.chart as any).chart) {
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
           }*!/
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

     }*/
    handleChartClick(e) {
        this.detailsBreadObject = this.chooseBread('dayCalls');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

        this.showBackButtonFlag = true;
        this.DailyCallFlag = true;

    }

    showSuccessCall() {
        this.successCallFlag = true;
    }

    showFailedCall() {
        this.failCallFlag = true;
    }
    testSentry(): void {
        throw new Error('Sentry Works!');
    }
    ngOnInit() {
        debugger
     /*   this.testSentry()
        Sentry.captureException(
            new Error('MANUAL SENTRY TEST')
        );
        Sentry.captureMessage('HELLO SENTRY');*/
     /*   this.loadTrigger$
            .pipe(
                filter(() => !this.isLoading$.value), // فقط وقتی لودینگ false باشه
                tap(() => this.isLoading$.next(true)),
                exhaustMap(() =>
                    this.messagesApiFacadeService.getstatistictoday()
                        .pipe(finalize(() => this.isLoading$.next(false)))
                )
            )
            .subscribe({
                next: (response) => {
                    this.valueOfDailyTable = response;
                },
                error: (err) => console.error(err),
            });
*/
        this.dailyCallSpinnerFlag = true;
        this.apiGatewayService.getDataStatistictoday().subscribe(res => {
            console.log("📥 HomeComponent got data:", res);
            this.valueOfDailyTable = res;
            let sumSuccessDaily = 0;
            let sumfailedDaily = 0;

            this.emptyDailyFlag = this.valueOfDailyTable.length === 0;
            for (let i = 0; (i < this.valueOfDailyTable.length); i++) {
                this.apiListDaily.push(this.valueOfDailyTable[i].apiTtile);
                const temp = this.valueOfDailyTable[i].successcount + this.valueOfDailyTable[i].failedcount;
                sumfailedDaily = sumfailedDaily + this.valueOfDailyTable[i].failedcount;
                sumSuccessDaily = sumSuccessDaily + this.valueOfDailyTable[i].successcount;
                this.apiListDailyCount[i] = temp;
            }
            this.chatDataPieDaily = {
                labels: ['موفق', 'ناموفق'],
                datasets: [
                    {
                        data: [sumSuccessDaily, sumfailedDaily],
                        fill: false,
                        borderColor: [

                            '#367c5c',
                            '#c5593d',
                        ],
                        backgroundColor: [

                            '#A8C799',
                            '#c56f73',
                        ],
                        hoverBackgroundColor: [
                            '#81C784',
                            '#c54535',
                        ],
                        tension: .4,
                    },

                ],
            };
            this.PieOptionDaily = {
                plugins: {
                    legend: {
                        labels: {
                            color: '#ebedef',
                        },
                    },
                },
            };
         /*   this.chartDataLineDaily = {
                labels: this.apiListDaily,
                datasets: [
                    // {
                    //      label: null,
                    //     data: this.apiListDailyCount,
                    //     fill: false,
                    //     borderColor: '#53347c',
                    //     backgroundColor: '#773ec5',
                    //     tension: .4
                    // },
                    {
                        label: 'موفق',
                        data: this.apiListDailyCount,
                        fill: false,
                        borderColor: '#53347c',
                        backgroundColor: '#773ec5',
                        tension: .4,
                    },

                ],
            };*/
            this.chartDataLineDaily = {
                labels: [...this.apiListDaily],
                datasets: [
                    {
                        label: 'تعداد',
                        data: [...this.apiListDailyCount],
                        fill: false,
                        borderColor: '#53347c',
                        backgroundColor: '#773ec5',
                        tension: .4,
                    }
                ]
            };
            this.barOptionDaily = {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true, // بجای مربع، دایره کنار عنوان‌ها
                            boxWidth: 12,
                        },
                    },

                },
                scales: {

                    x: {
                        offset: true,
                        ticks: {
                            color: '#495057',
                            minRotation: 90,
                            maxRotation: 90,
                        },
                        grid: {
                            color: '#ebedef',
                        },
                        font: {
                            size: 5,
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

            this.originalData = {
                labels: [...this.apiListDaily],
                datasets: [{
                    label: 'موفق',
                    data: [...this.apiListDailyCount],
                    fill: false,
                    borderColor: '#53347c',
                    backgroundColor: '#773ec5',
                    tension: .4,
                }]
            };
            this.originalData = JSON.parse(JSON.stringify(this.chartDataLineDaily));

// MultiSelect
            this.originalData = JSON.parse(JSON.stringify(this.chartDataLineDaily));

            // گزینه‌های MultiSelect (اولیش انتخاب همه)
            const baseOptions = this.apiListDaily.map((l, i) => ({ label: l, value: i }));
            this.labelOptions = baseOptions;

            // حالت اولیه → همه انتخاب
            this.selectedLabels = this.apiListDaily.map((_, i) => i);

            this.barOptionDaily = {
                plugins: { legend: { display: true } }
            };

            /*  this.labelOptions = this.originalData.labels.map((l: string, i: number) => ({ label: l, value: i }));
              this.labelOptions = [{ label: 'انتخاب همه', value: -1 }, ...baseOptions];
              this.selectedLabels = this.apiListDaily.map((_, i) => i);
              this.chartDataLineDaily = JSON.parse(JSON.stringify(this.originalData));*/


            this.dailyCallSpinnerFlag = false;
        }, error => {
            this.dailyCallSpinnerFlag = false;
        });
        // بار اول
        this.loadTrigger$.next();
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        this.detailsBreadObject = this.chooseBread('home');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.valueOfLastFailTable = [];
        this.valueOfDelayDaily = [];
        this.valueOfDailyTable = [];
        this.delayDailySpinnerFlag = false;
        this.emptyDelayYesterdayFlag = false;

        this.messagesApiFacadeService.config().subscribe(x => {
            this.lastJobRunn = x.lastJobRunn;
        });

        /*  this.messagesApiFacadeService.getstatistictoday().subscribe(response => {
              this.valueOfDailyTable = response;
              let sumSuccessDaily = 0;
              let sumfailedDaily = 0;

              this.emptyDailyFlag = this.valueOfDailyTable.length === 0;
              for (let i = 0; (i < this.valueOfDailyTable.length); i++) {
                  this.apiListDaily.push(this.valueOfDailyTable[i].apiTtile);
                  const temp = this.valueOfDailyTable[i].successcount + this.valueOfDailyTable[i].failedcount;
                  sumfailedDaily = sumfailedDaily + this.valueOfDailyTable[i].failedcount;
                  sumSuccessDaily = sumSuccessDaily + this.valueOfDailyTable[i].successcount;
                  this.apiListDailyCount[i] = temp;
              }
              this.chatDataPieDaily = {
                  labels: ['موفق', 'ناموفق'],
                  datasets: [
                      {
                          data: [sumSuccessDaily, sumfailedDaily],
                          fill: false,
                          borderColor: [

                              '#367c5c',
                              '#c5593d',
                          ],
                          backgroundColor: [

                              '#A8C799',
                              '#c56f73',
                          ],
                          hoverBackgroundColor: [
                              '#81C784',
                              '#c54535',
                          ],
                          tension: .4,
                      },

                  ],
              };
              this.PieOptionDaily = {
                  plugins: {
                      legend: {
                          labels: {
                              color: '#ebedef',
                          },
                      },
                  },
              };
              this.chartDataLineDaily = {
                  labels: this.apiListDaily,
                  datasets: [
                      // {
                      //      label: null,
                      //     data: this.apiListDailyCount,
                      //     fill: false,
                      //     borderColor: '#53347c',
                      //     backgroundColor: '#773ec5',
                      //     tension: .4
                      // },
                      {
                          label: 'موفق',
                          data: this.apiListDailyCount,
                          fill: false,
                          borderColor: '#53347c',
                          backgroundColor: '#773ec5',
                          tension: .4,
                      },

                  ],
              };
              this.barOptionDaily = {
                  plugins: {
                      legend: {
                          display: false,
                      },

                  },
                  scales: {

                      x: {
                          offset: true,
                          ticks: {
                              color: '#495057',
                              minRotation: 90,
                              maxRotation: 90,
                          },
                          grid: {
                              color: '#ebedef',
                          },
                          font: {
                              size: 5,
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
              this.dailyCallSpinnerFlag = false;
          }, error => {
              this.dailyCallSpinnerFlag = false;
          });*/

        //موقتا کامنت شد تا اصلاح گردد
        /*   this.messagesApiFacadeService.compareToDay(this.day).subscribe(response => {
               debugger

               if (response.length == 0) {
                   debugger
                   this.delayDailySpinnerFlag = false;
                   this.emptyDelayDailyFlag = true;
               } else {
                   this.entries = response;
                   this.delayDailySpinnerFlag = this.entries.length === 0;
                   const barThicknessty = 20; /!*= response.length > 10 ? 10 : 20;*!/
                   const maxBarThicknessty = 10;/!*= response.length > 10 ? 5 : 10;*!/
                   this.chartBarDelayDaily = {
                       labels: response.map(entry => `${entry.title} `),  // لیبل‌ها
                       datasets: [
                           {
                               type: 'line',
                               label: this.transloco.translate('home.chart.averageResponseToday'),
                               fill: false,
                               borderWidth: 2,
                               data: response.map(entry => entry.valueOne),
                               borderColor: '#b96fc9',
                               backgroundColor: '#cb8dd9',
                               barThickness: barThicknessty,
                               maxBarThickness: maxBarThicknessty,
                           },
                           {
                               type: 'line',
                               label: this.transloco.translate('home.chart.averageResponseToday') + this.day + this.transloco.translate('home.chart.Yesterday'),
                               fill: false,
                               borderWidth: 2,
                               data: response.map(entry => entry.valueTwo),
                               borderColor: '#c9ba6f',
                               backgroundColor: '#d9c18d',
                               barThickness: barThicknessty,
                               maxBarThickness: maxBarThicknessty,
                           },
                       ],
                   };
                   console.log('Mapped valueTwo:', response.map(entry => entry.valueTwo));
                   this.chartBarDelayDailyOptions = {
                       responsive: true,
                       maintainAspectRatio: false,
                       scales: {
                           x: {
                               categoryPercentage: 0.2,  // فضای بین ستون‌ها
                               barPercentage: 0.2,  // عرض ستون‌ها
                           },
                       },
                   };
                   this.delayDailySpinnerFlag = false;
               }

           }, error => {
               this.delayDailySpinnerFlag = false;
           });*/


        this.delayDailyYesterdaySpinnerFlag = true;


        this.itemsDaily = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
        this.itemsFail = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
        this.itemsSuccess = [
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.servicePerformanceReport'),
                        icon: '',
                        command: (): void => {
                            this.showLog(this.tempLog);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }],
            },
        ];
        this.sentry.setTag(
            'feature',
            'home'
        );
    }
    onSelectChange(e: any) {
        console.log('[onSelectChange] raw value:', e?.value);

        if (!e?.value || e.value.length === 0) {
            console.log('بینگو');
            this.selectedLabels = [];
        } else {
            this.selectedLabels = [...e.value];
        }

        console.log('[onSelectChange] selectedLabels =>', this.selectedLabels);
        this.filterChart();
    }

    filterChart() {
        const activeIndexes = this.selectedLabels || [];
        console.log('[filterChart] activeIndexes:', activeIndexes);

        if (activeIndexes.length === 0) {
            // ✅ وقتی هیچ چیزی انتخاب نشده، کل نمودار خالی میشه
            this.chartDataLineDaily = { labels: [], datasets: [] };
            const chart = this.myChart?.chart as any;
            if (chart) {
                chart.data.labels = [];
                chart.data.datasets = [];
                chart.update();
            }
            console.log('[filterChart] chartDataLineDaily EMPTY');
            return;
        }

        const filteredLabels = this.originalData.labels.filter((_: any, i: number) =>
            activeIndexes.includes(i)
        );
        const filteredDatasets = this.originalData.datasets.map((ds: any) => ({
            ...ds,
            data: ds.data.filter((_: any, i: number) => activeIndexes.includes(i))
        }));

        this.chartDataLineDaily = {
            labels: filteredLabels,
            datasets: filteredDatasets
        };

        const chart = this.myChart?.chart as any;
        if (chart) {
            chart.data.labels = [...filteredLabels];
            chart.data.datasets = filteredDatasets.map((ds: any) => ({
                ...ds,
                data: [...ds.data]
            }));
            chart.update();
        }

        console.log('[filterChart] chartDataLineDaily:', this.chartDataLineDaily);
    }



    /*
        loadDailyStatistics() {
            // اگر هنوز درخواست قبلی تموم نشده باشه، کال جدید رد می‌شه
            if (this.loadInProgress) {
                console.log('⏳ درخواست قبلی هنوز تموم نشده، کال جدید رد شد.');
                return;
            }

            this.loadInProgress = true;          // شروع درخواست
            this.dailyCallSpinnerFlag = true;    // نمایش لودینگ

            this.messagesApiFacadeService.getstatistictoday()
                .pipe(
                    finalize(() => {
                        // بعد از تموم شدن درخواست چه با خطا چه موفق
                        this.dailyCallSpinnerFlag = false;
                        this.loadInProgress = false;
                    })
                )
                .subscribe({
                    next: (response: any[]) => {
                        this.valueOfDailyTable = response;

                        let sumSuccessDaily = 0;
                        let sumfailedDaily = 0;
                        this.apiListDaily = [];
                        this.apiListDailyCount = [];

                        this.emptyDailyFlag = this.valueOfDailyTable.length === 0;

                        for (let i = 0; i < this.valueOfDailyTable.length; i++) {
                            this.apiListDaily.push(this.valueOfDailyTable[i].apiTtile);

                            const temp =
                                this.valueOfDailyTable[i].successcount +
                                this.valueOfDailyTable[i].failedcount;

                            sumfailedDaily += this.valueOfDailyTable[i].failedcount;
                            sumSuccessDaily += this.valueOfDailyTable[i].successcount;

                            this.apiListDailyCount[i] = temp;
                        }

                        // Pie chart
                        this.chatDataPieDaily = {
                            labels: ['موفق', 'ناموفق'],
                            datasets: [
                                {
                                    data: [sumSuccessDaily, sumfailedDaily],
                                    backgroundColor: ['#A8C799', '#c56f73'],
                                    hoverBackgroundColor: ['#81C784', '#c54535'],
                                },
                            ],
                        };

                        // Bar/Line chart
                        this.chartDataLineDaily = {
                            labels: this.apiListDaily,
                            datasets: [
                                {
                                    label: 'موفق',
                                    data: this.apiListDailyCount,
                                    backgroundColor: '#773ec5',
                                },
                            ],
                        };

                        this.barOptionDaily = {
                            plugins: { legend: { display: false } },
                        };
                    },
                    error: (err) => {
                        console.error('API error:', err);
                    },
                });
        }*/

 /*   ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }*/

}
