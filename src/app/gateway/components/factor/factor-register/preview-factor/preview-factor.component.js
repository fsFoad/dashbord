import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { CastToDatePipe } from '../../../../../shared/pipes/cast-to-date.pipe';
import { AddCommaPipe } from '../../../../../shared/pipes/add-comma.pipe';
import { ButtonDirective } from 'primeng/button';
let PreviewFactorComponent = class PreviewFactorComponent {
    print;
    inputRegister;
    billList = [];
    showLoading;
    issuanceApiService;
    exeactFileId;
    actionId;
    stateId;
    formPrinted;
    showNextStepBtn;
    hidePrint = true;
    constructor(print) {
        this.print = print;
    }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        if (this.inputRegister != undefined) {
            debugger;
            this.billList = this.inputRegister.billList;
        }
    }
    onPrint() { }
};
__decorate([
    Input()
], PreviewFactorComponent.prototype, "inputRegister", void 0);
PreviewFactorComponent = __decorate([
    Component({
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
], PreviewFactorComponent);
export { PreviewFactorComponent };
