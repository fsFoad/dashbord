import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { DetailList } from "./detailList";
import moment from 'jalali-moment';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgIf, NgStyle } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CastToDateTimePipe } from '../../../shared/pipes/cast-to-date-time.pipe';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { SuccessfulPipe } from '../../../shared/pipes/successful.pipe';
import { Ripple } from 'primeng/ripple';
import { TranslocoPipe } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
let LogReportsComponent = class LogReportsComponent {
    route;
    transloco;
    messagesApiFacadeService;
    _primengProgressBarService;
    apiGatewayService;
    notifierService;
    dialogService;
    messageService;
    ref;
    inputChartCallApiReport;
    inputBillStore;
    inputHomeBase;
    close = new EventEmitter();
    clientListOptions = [{ name: '-', clientId: null }];
    partyListOptions = [{ title: '-', partyId: null }];
    moduleListOptions = [{ moduleTitle: '-', moduleId: null }];
    apiListOptionsFirst = [{ title: '-', apiId: null }];
    moduleId = null;
    apiId = null;
    clientId = null;
    partyId = null;
    onlyFromdate = "";
    fromdate = "";
    todate = "";
    onlyTodate = "";
    onlyToTime = "";
    onlyFromTime = "";
    tblFlag = false;
    logList = [];
    logBase = false;
    detailsBreadObject = [];
    first = 0;
    rows = 10;
    pageno = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 }, { name: 20, code: 20 },
        { name: 30, code: 30 }, { name: 40, code: 40 }, { name: 50, code: 50 }
    ];
    nextBtnFlag = false;
    inputChartCallApiReportAPIID;
    apiTitle;
    delayDailySpinnerFlag = false;
    constructor(route, transloco, messagesApiFacadeService, _primengProgressBarService, apiGatewayService, notifierService, dialogService, messageService, ref) {
        this.route = route;
        this.transloco = transloco;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiGatewayService = apiGatewayService;
        this.notifierService = notifierService;
        this.dialogService = dialogService;
        this.messageService = messageService;
        this.ref = ref;
    }
    OnchangeParty(event) {
        this.moduleListOptions = [];
        this.apiListOptionsFirst = [{ title: '-', apiId: null }];
        if (event.value != null) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(m => {
                debugger;
                this._primengProgressBarService.hide();
                this.moduleListOptions = [...this.moduleListOptions, ...m];
                this.moduleListOptions.unshift({ moduleTitle: '-', moduleId: null });
                this.moduleListOptions = this.moduleListOptions.sort((a, b) => a.moduleTitle.localeCompare(b.moduleTitle));
                debugger;
                console.log('options:', this.moduleListOptions);
                console.log('moduleId:', this.moduleId);
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
        else {
            this.moduleId = null;
        }
    }
    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    BeforeButton() {
        this.close.emit('close');
    }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        this.scrollTop();
        if (this.inputChartCallApiReport != undefined) {
            debugger;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallparty().subscribe(a => {
                debugger;
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.fetchallclient().subscribe(s => {
                    debugger;
                    debugger;
                    debugger;
                    this._primengProgressBarService.hide();
                    this.clientListOptions.push(...s);
                    this.clientListOptions = this.clientListOptions.sort();
                    let partyId;
                    let moduleId;
                    if (this.inputChartCallApiReport.partyId != undefined) {
                        partyId = this.inputChartCallApiReport.partyId;
                    }
                    else if (this.inputChartCallApiReport.PARTYID != undefined) {
                        partyId = this.inputChartCallApiReport.PARTYID;
                        moduleId = this.inputChartCallApiReport.MODULEID;
                    }
                    if (this.inputChartCallApiReport.APIID != undefined) {
                        this.inputChartCallApiReportAPIID = this.inputChartCallApiReport.APIID;
                    }
                    if (this.inputChartCallApiReport.chartFlag) {
                        debugger;
                        this.detailsBreadObject = this.chooseBread('chartBase');
                        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                    }
                    else if (!this.inputChartCallApiReport.chartFlag) {
                        debugger;
                        this.detailsBreadObject = this.chooseBread('callApiBase');
                        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                    }
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.moduleSearchByPartyId(partyId).subscribe(m => {
                        debugger;
                        debugger;
                        this._primengProgressBarService.hide();
                        this.moduleListOptions.push(...m);
                        this.moduleListOptions = this.moduleListOptions.sort();
                        if (this.inputChartCallApiReport.chartFlag) {
                            moduleId = this.inputChartCallApiReport.moduleId;
                            debugger;
                            this.apiId = this.inputChartCallApiReport.apiid;
                        }
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService.apibymoduleidv2(moduleId).subscribe(d => {
                            debugger;
                            this._primengProgressBarService.hide();
                            this.apiListOptionsFirst = [{ title: '-', apiId: null }];
                            if (Array.isArray(d)) {
                                this.apiListOptionsFirst = d;
                            }
                            else {
                                this.apiListOptionsFirst.push(d);
                            }
                            this.apiListOptionsFirst = this.apiListOptionsFirst.sort();
                        }, error => {
                            this._primengProgressBarService.hide();
                        });
                        if (this.inputChartCallApiReport.chartFlag) {
                            debugger;
                            debugger;
                            const datepic = moment();
                            datepic.locale('fa');
                            datepic.format('YY-MM-DD'); // it would be in jalali system
                            let date;
                            date = datepic.format('YYYYMMDD');
                            this.onlyFromdate = date;
                            this.onlyTodate = date;
                            this.moduleId = this.inputChartCallApiReport.moduleId;
                            this.partyId = this.inputChartCallApiReport.partyId;
                            this.clientId = this.inputChartCallApiReport.clientid;
                            debugger;
                            this.detailsBreadObject = [];
                            this.detailsBreadObject = this.chooseBread('chartBase');
                            debugger;
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                            this.search(null, null, null, null, null, null, null, this.apiId);
                        }
                        else if (!this.inputChartCallApiReport.chartFlag) {
                            debugger;
                            this.onlyFromdate = this.inputChartCallApiReport.fromdate;
                            this.onlyTodate = this.inputChartCallApiReport.todate;
                            this.moduleId = this.inputChartCallApiReport.MODULEID;
                            this.clientId = this.inputChartCallApiReport.CLIENTID;
                            this.partyId = this.inputChartCallApiReport.PARTYID;
                            debugger;
                            this.apiId = this.inputChartCallApiReport.APIID;
                            this.search(null, null, null, null, null, null, null, this.apiId);
                            //this.clientId =؟
                            this.detailsBreadObject = [];
                            debugger;
                            this.detailsBreadObject = this.chooseBread('callApiBase');
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                            debugger;
                        }
                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                }, error => { this._primengProgressBarService.hide(); });
            }, error => {
                this._primengProgressBarService.hide();
            });
            debugger;
            this.detailsBreadObject = this.chooseBread('logBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.inputHomeBase != undefined) {
            debugger;
            debugger;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallparty().subscribe(a => {
                debugger;
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.fetchallclient().subscribe(s => {
                    debugger;
                    debugger;
                    debugger;
                    this._primengProgressBarService.hide();
                    this.clientListOptions.push(...s);
                    this.clientListOptions = this.clientListOptions.sort();
                    let partyId;
                    let moduleId;
                    if (this.inputHomeBase.partyId != undefined) {
                        debugger;
                        partyId = this.inputHomeBase.partyId;
                    }
                    else if (this.inputHomeBase.PARTYID != undefined) {
                        debugger;
                        partyId = this.inputHomeBase.PARTYID;
                        moduleId = this.inputHomeBase.MODULEID;
                    }
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.moduleSearchByPartyId(partyId).subscribe(m => {
                        debugger;
                        debugger;
                        this._primengProgressBarService.hide();
                        this.moduleListOptions.push(...m);
                        this.moduleListOptions = this.moduleListOptions.sort();
                        if (this.inputHomeBase.homeBase) {
                            moduleId = this.inputHomeBase.moduleId;
                            debugger;
                            this.apiId = this.inputHomeBase.apiid;
                        }
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService.apibymoduleidv2(moduleId).subscribe(d => {
                            debugger;
                            this._primengProgressBarService.hide();
                            this.apiListOptionsFirst = [{ title: '-', apiId: null }];
                            if (Array.isArray(d)) {
                                this.apiListOptionsFirst = d;
                            }
                            else {
                                this.apiListOptionsFirst.push(d);
                            }
                            this.apiListOptionsFirst = this.apiListOptionsFirst.sort();
                            this.apiTitle = this.inputHomeBase.apiTtile;
                            this.detailsBreadObject = this.chooseBread('homeBase');
                            debugger;
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                        }, error => {
                            this._primengProgressBarService.hide();
                        });
                        if (this.inputHomeBase.homeBase) {
                            debugger;
                            debugger;
                            const datepic = moment();
                            datepic.locale('fa');
                            datepic.format('YY-MM-DD'); // it would be in jalali system
                            let date;
                            date = datepic.format('YYYYMMDD');
                            this.onlyFromdate = date;
                            this.onlyTodate = date;
                            this.moduleId = this.inputHomeBase.moduleId;
                            this.partyId = this.inputHomeBase.partyId;
                            this.clientId = this.inputHomeBase.clientid;
                            debugger;
                            this.detailsBreadObject = [];
                            this.detailsBreadObject = this.chooseBread('homeBase');
                            debugger;
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                            this.search(null, null, null, null, null, null, null, this.apiId);
                        }
                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                }, error => { this._primengProgressBarService.hide(); });
            }, error => {
                this._primengProgressBarService.hide();
            });
            debugger;
            this.detailsBreadObject = this.chooseBread('homeBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else {
            debugger;
            this.onlyFromdate = "";
            this.onlyTodate = "";
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallparty().subscribe(a => {
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.fetchallclient().subscribe(s => {
                    this._primengProgressBarService.hide();
                    this.clientListOptions.push(...s);
                    this.clientListOptions = this.clientListOptions.sort();
                }, error => {
                    this._primengProgressBarService.hide();
                });
            }, error => {
                this._primengProgressBarService.hide();
            });
            debugger;
            this.detailsBreadObject = [];
            this.detailsBreadObject = this.chooseBread('logReportsBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
    }
    chooseBread(caseBase) {
        debugger;
        switch (caseBase) {
            case 'homeBase':
                debugger;
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.home'),
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dayCalls'),
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/chart.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.servicePerformanceReport'),
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: "assets/icons/log.png", isActive2: true,
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    {
                        label_index5: null,
                        label_Detail_index5: null
                    },
                    { label_index6: null, label_Detail_index6: null }
                ];
            case 'logBase':
                debugger;
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: "گزارش ریز کارکرد سرویس", rout_index1: "", isActive1: true,
                        img_index1: "assets/icons/log.png"
                    },
                    { label_index2: null, label_Detail_index2: null }, {
                        label_index3: null,
                        label_Detail_index3: null
                    },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null
                    },
                    { label_index6: null, label_Detail_index6: null }
                ];
            case 'chartBase':
                debugger;
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: "گزارش نموداری", rout_index1: "", isActive1: false,
                        img_index1: "assets/icons/log.png"
                    },
                    {
                        index: 2, label_index2: "گزارش ریز کارکرد سرویس", rout_index2: "", isActive2: true,
                        img_index2: "assets/icons/log.png"
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null
                    },
                    { label_index6: null, label_Detail_index6: null }
                ];
            case 'callApiBase':
                debugger;
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: "گزارش فراخوانی تجمیعی سرویس ها", rout_index1: "", isActive1: false,
                        img_index1: "assets/icons/log.png"
                    },
                    {
                        index: 2, label_index2: "گزارش ریز کارکرد سرویس", rout_index2: "", isActive2: true,
                        img_index2: "assets/icons/log.png"
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null
                    },
                    { label_index6: null, label_Detail_index6: null }
                ];
            case 'logReportsBase':
                debugger;
                return [
                    {
                        index: 0,
                        label_index0: 'گزارشات',
                        img_index0: 'assets/icons/reports.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: "گزارش ریز کارکرد سرویس", rout_index1: "", isActive1: true,
                        img_index1: "assets/icons/log.png"
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null }, {
                        label_index5: null,
                        label_Detail_index5: null
                    },
                    { label_index6: null, label_Detail_index6: null }
                ];
            default:
                return null;
        }
    }
    show(log) {
        debugger;
        this.delayDailySpinnerFlag = true;
        this.apiGatewayService.updateApprovalRequestlogid(log.REQUESTID);
        this.ref = this.dialogService.open(DetailList, {
            header: 'جزئیات لاگ',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true,
            data: {
                onLoadingComplete: () => {
                    debugger;
                    this.delayDailySpinnerFlag = false;
                    console.log('delayDailySpinnerFlag:', this.delayDailySpinnerFlag);
                }
            }
        });
        /*  this.apiGatewayService.updateApprovalRequestlogid(log.REQUESTID);
          setTimeout(() => {
              this.ref = this.dialogService.open(DetailList, {
                  header: 'جزئیات لاگ',
                  width: '60%',
                  contentStyle: { "overflow": "auto" },
                  baseZIndex: 10000,
                  maximizable: true,
                  closable: true
              });
  
          this.delayDailySpinnerFlag = false; // پنهان‌سازی اسپینر بعد از باز شدن دیالوگ
      }, 0);*/
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
    downloadData() {
        if (this.validation()) {
            if (this.logList.length != 0) {
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.downloadReportLog(this.pageno, this.pagesize, this.fromdate, this.todate, this.clientId, this.partyId, this.moduleId, this.apiId).subscribe(b => {
                    this._primengProgressBarService.hide();
                }, error => {
                    this._primengProgressBarService.hide();
                });
            }
            else {
                this.notifierService.showError({ detail: this.transloco.translate('logReports.message.downloadNotFound'), life: 3000 });
                return false;
            }
        }
    }
    onchangeModule(event) {
        if (event.value != null) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidv2(event.value).subscribe(a => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiListOptionsFirst = [{ title: '-', apiId: null }];
                this.apiListOptionsFirst.push(...a);
                this.apiListOptionsFirst = this.apiListOptionsFirst.sort();
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
        else {
            debugger;
            this.apiId = null;
        }
    }
    search(pageno, pagesize, fromdate, todate, clientId, partyId, moduleId, apiId) {
        debugger;
        debugger;
        if (this.validation()) {
            debugger;
            this.onlyTodate = this.onlyTodate.replace(/[/]/g, '');
            this.onlyTodate = this.onlyTodate.replace(/[' ']/g, '');
            this.onlyToTime = this.onlyToTime.replace(/[:]/g, '');
            this.onlyToTime = this.onlyToTime.replace(/[.]/g, '');
            this.onlyFromdate = this.onlyFromdate.replace(/[/]/g, '');
            this.onlyFromdate = this.onlyFromdate.replace(/[' ']/g, '');
            this.onlyFromTime = this.onlyFromTime.replace(/[:]/g, '');
            this.onlyFromTime = this.onlyFromTime.replace(/[.]/g, '');
            this.todate = this.onlyTodate;
            // if (this.todate.length < 14) {
            //     this.todate = this.todate + "59999"
            // }
            this.fromdate = this.onlyFromdate;
            // if (this.fromdate.length < 14) {
            //     this.fromdate = this.fromdate + "00000"
            // }
            let startRow;
            this.pageno != 0 ? startRow = ((this.pageno) * this.pagesize) : startRow = 0;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.reportLog(0, this.pageno, this.pagesize, this.fromdate, this.todate, this.clientId, this.partyId, this.moduleId, apiId ? apiId : this.apiId).subscribe(b => {
                this._primengProgressBarService.hide();
                debugger;
                debugger;
                this.logList = [];
                this.logList = b;
                if (Array.isArray(b)) {
                    this.logList = b;
                }
                else {
                    this.logList.push(b);
                }
                apiId != undefined ? this.apiId = apiId : this.apiId;
                this.logList.map(x => (x.STATUS === 1 ? x.STATUS = true : x.STATUS = false));
                this.tblFlag = true;
                for (let k = 0; k < this.logList.length; k++) {
                    this.logList[k] = Object.assign(this.logList[k], { expanded: false });
                    /*(this.partyList[k].row = (k+1))*/
                }
                if (this.pageno != 0 && this.pageno != 1) {
                    for (let u = 0; u < this.logList.length; u++) {
                        this.logList[u] = Object.assign(this.logList[u], { row: (u + startRow + 1) });
                    }
                }
                else if (this.pageno == 1) {
                    for (let u = 0; u < this.logList.length; u++) {
                        this.logList[u] = Object.assign(this.logList[u], { row: (u + this.pagesize + 1) });
                    }
                }
                else {
                    for (let u = 0; u < this.logList.length; u++) {
                        this.logList[u] = Object.assign(this.logList[u], { row: (u + 1) });
                    }
                }
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
    }
    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (1);
        //if()
        this.search();
    }
    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(null, null, null, null, null, null, null, this.apiId);
    }
    onKeydown(event) {
        const self = this;
        if (event.key === "Enter") {
            self.search(null, null, null, null, null, null, null, this.apiId);
        }
    }
    clear() {
        debugger;
        this.onlyFromdate = "";
        this.onlyTodate = "";
        this.onlyFromTime = "";
        this.onlyToTime = "";
        this.clientId = null;
        this.partyId = null;
        this.moduleId = null;
        this.logList = [];
        this.tblFlag = false;
        this.rows = 10;
        this.pageno = 0;
        this.pagesize = 10;
        if (this.inputChartCallApiReport != undefined) {
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallparty().subscribe(a => {
                this._primengProgressBarService.hide();
                this.partyListOptions.push(...a);
                this.partyListOptions = this.partyListOptions.sort();
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.fetchallclient().subscribe(s => {
                    this._primengProgressBarService.hide();
                    this.clientListOptions.push(...s);
                    this.clientListOptions = this.clientListOptions.sort();
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.moduleSearchByPartyId(this.inputChartCallApiReport.partyId).subscribe(m => {
                        this._primengProgressBarService.hide();
                        debugger;
                        this.moduleListOptions.push(...m);
                        this.moduleListOptions = this.moduleListOptions.sort();
                        if (this.inputChartCallApiReport.chartApiFlag != undefined) {
                            debugger;
                            const datepic = moment();
                            datepic.locale('fa');
                            datepic.format('YY-MM-DD'); // it would be in jalali system
                            let date;
                            date = datepic.format('YYYYMMDD');
                            this.onlyFromdate = date;
                            this.onlyTodate = date;
                            this.detailsBreadObject = this.chooseBread('chartBase');
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                        }
                        else if (this.inputChartCallApiReport.callApiFlag != undefined) {
                            debugger;
                            this.onlyFromdate = this.inputChartCallApiReport.fromdate;
                            this.onlyTodate = this.inputChartCallApiReport.toDate;
                            this.detailsBreadObject = this.chooseBread('callApiBase');
                            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                        }
                        debugger;
                        this.moduleId = this.inputChartCallApiReport.moduleId;
                        this.partyId = this.inputChartCallApiReport.partyId;
                        this.clientId = this.inputChartCallApiReport.clientid;
                        debugger;
                        this.search();
                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                }, error => {
                    this._primengProgressBarService.hide();
                });
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
        else {
            this.detailsBreadObject = this.chooseBread('logBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
    }
    validation() {
        debugger;
        if (!this.onlyFromdate) {
            this.notifierService.showError({ detail: "لطفا تاریخ شروع را وارد کنید!", life: 3000 });
            return false;
        }
        else if (!this.onlyTodate) {
            this.notifierService.showError({ detail: "لطفا تاریخ پایان را وارد کنید!", life: 3000 });
            return false;
        }
        if (this.onlyFromdate > this.onlyTodate) {
            this.notifierService.showError({
                detail: "لطفا بازه تاریخ معتبر را وارد کنید!",
                life: 3000
            });
            return false;
        }
        else {
            return true;
        }
    }
    expandTheRow(row) {
        row.expanded = !row.expanded;
    }
    expandTheRowEvent(event) {
        event.data.expanded = !event.data.expanded;
    }
};
__decorate([
    Input()
], LogReportsComponent.prototype, "inputChartCallApiReport", void 0);
__decorate([
    Input()
], LogReportsComponent.prototype, "inputBillStore", void 0);
__decorate([
    Input()
], LogReportsComponent.prototype, "inputHomeBase", void 0);
__decorate([
    Output()
], LogReportsComponent.prototype, "close", void 0);
LogReportsComponent = __decorate([
    Component({
        selector: 'app-log-reports',
        templateUrl: './log-reports.component.html',
        styleUrls: ['./log-reports.component.scss'],
        standalone: true,
        providers: [DialogService, MessageService, DynamicDialogRef],
        imports: [
            BreadcrumbsComponent,
            DropdownModule,
            FormsModule,
            ButtonDirective,
            TableModule,
            NgIf,
            CastToDateTimePipe,
            Tooltip,
            MoreChar19Pipe,
            NgStyle,
            SuccessfulPipe,
            Ripple,
            TranslocoPipe,
            Toast,
            PersianCalendarComponent,
        ],
    })
], LogReportsComponent);
export { LogReportsComponent };
