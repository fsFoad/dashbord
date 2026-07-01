// @ts-nocheck
import {  Component, OnDestroy, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCommaPipe } from '../../../shared/pipes/add-comma.pipe';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { ApiGatewayService } from '../../services/api-gateway.service';
import {
    FsProgressSpinnerComponent,
} from '../../../shared/components/fs-progress-spinner/fs-progress-spinner.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
    standalone: true,
    template: `
        <app-fs-progress-spinner *ngIf="SpinnerFlag" class="spinner"
                                 [style]="{ width: '50px', height: '50px' }"></app-fs-progress-spinner>
        <div class="log-box" dir="ltr" [innerHTML]="formattedLogs"></div>`,
    imports: [FsProgressSpinnerComponent, NgIf],
    providers: [DialogService, DynamicDialogRef],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AlertDetailList implements OnInit, OnDestroy {
    private approvalStageSubscription: Subscription;
    SpinnerFlag = false;

    constructor(
        public config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        public messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        public apiGatewayService: ApiGatewayService,
    ) {
    }

    formattedLogs: string = '';
    rawLogs: string = ``;

    ngOnInit() {
        debugger;

        this.approvalStageSubscription = this.apiGatewayService.currentApprovalStageAlert.subscribe(
            (res: any) => {
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
            },
        );
    }
    ngOnDestroy() {
        if (this.approvalStageSubscription) {
            this.approvalStageSubscription.unsubscribe();
        }
    }
}
