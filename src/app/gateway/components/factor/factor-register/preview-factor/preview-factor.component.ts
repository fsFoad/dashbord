import {Component, Input, OnInit} from '@angular/core';
import { PrintService } from '../../../../../shared/services/print.service';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { CastToDatePipe } from '../../../../../shared/pipes/cast-to-date.pipe';
import { AddCommaPipe } from '../../../../../shared/pipes/add-comma.pipe';
import { ButtonDirective } from 'primeng/button';


@Component({
    selector: 'app-preview-factor',
    templateUrl: './preview-factor.component.html',
    standalone: true,
    styleUrls: ['./preview-factor.component.scss'],
    imports: [
        Panel,
        TableModule,
        NgStyle,
        Tooltip,
        MoreChar19Pipe,
        CastToDatePipe,
        AddCommaPipe,
        ButtonDirective,
    ],
})
export class PreviewFactorComponent implements OnInit {
    @Input() inputRegister;

    billList = [];
    showLoading;
    issuanceApiService;
    exeactFileId;
    actionId;
    stateId;
    formPrinted;
    showNextStepBtn;
    hidePrint = true;

    constructor(private print: PrintService) {}

    ngOnInit(): void {
        debugger;
        debugger;
        debugger;
        if (this.inputRegister != undefined) {
            debugger;
            this.billList = this.inputRegister.billList;
        }
    }

    onPrint() {}
}
