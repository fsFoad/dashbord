import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FsProgressSpinnerComponent, } from '../../../shared/components/fs-progress-spinner/fs-progress-spinner.component';
import { NgIf } from '@angular/common';
let AlertDetailList = class AlertDetailList {
    config;
    ref;
    messagesApiFacadeService;
    _primengProgressBarService;
    apiGatewayService;
    approvalStageSubscription;
    SpinnerFlag = false;
    constructor(config, ref, messagesApiFacadeService, _primengProgressBarService, apiGatewayService) {
        this.config = config;
        this.ref = ref;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiGatewayService = apiGatewayService;
    }
    formattedLogs = '';
    rawLogs = ``;
    ngOnInit() {
        debugger;
        this.approvalStageSubscription = this.apiGatewayService.currentApprovalStageAlert.subscribe((res) => {
            let respons = res.output;
            let collectionFromDateShamsi = res.collectionFromDateShamsi;
            let collectionToDateShamsi = res.collectionToDateShamsi;
            const headerText = `
<div style="direction: rtl; text-align: right; font-size:14px; line-height:1.8; margin-bottom:10px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <strong>شروع تاریخ جمع‌آوری اطلاعات:</strong>
    <span dir="ltr" style="display:inline-block;">${collectionFromDateShamsi}</span>
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <strong>پایان تاریخ جمع‌آوری اطلاعات:</strong>
    <span dir="ltr" style="display:inline-block;">${collectionToDateShamsi}</span>
  </div>
</div>

      <hr style="border:1px solid #ccc; margin:10px 0;">
    `;
            this.formattedLogs = headerText + respons.replace(/#/g, '<br>');
        }, (err) => {
            this.SpinnerFlag = false;
            console.error('❌ Error loading alarm detail:', err);
            this.ref.close();
        });
    }
    ngOnDestroy() {
        if (this.approvalStageSubscription) {
            this.approvalStageSubscription.unsubscribe();
        }
    }
};
AlertDetailList = __decorate([
    Component({
        standalone: true,
        template: `
        <app-fs-progress-spinner *ngIf="SpinnerFlag" class="spinner"
                                 [style]="{ width: '50px', height: '50px' }"></app-fs-progress-spinner>
        <div class="log-box" dir="ltr" [innerHTML]="formattedLogs"></div>`,
        imports: [FsProgressSpinnerComponent, NgIf],
        providers: [DialogService, DynamicDialogRef],
    })
], AlertDetailList);
export { AlertDetailList };
