import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from "../../../../../constants/ApiGatewayConstants";
import { ConfirmationService } from "primeng/api";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TranslocoPipe } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilter } from 'primeng/keyfilter';
import { ToggleSwitch } from 'primeng/toggleswitch';
let BasemoduleApiAddComponent = class BasemoduleApiAddComponent {
    route;
    messagesApiFacadeService;
    _primengProgressBarService;
    apiFacadeService;
    notifierService;
    apiGatewayService;
    transloco;
    confirmationService;
    close = new EventEmitter();
    inputParty;
    moduleDto = {
        partyId: null,
        moduleTitle: '',
        moduleType: null,
        moduleGroup: null,
        moduleAuthMode: null,
        esbMode: null,
        status: null,
        description: '',
        retryCount: null,
        delayRetryTime: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
    };
    authenticationMethodOptions = ApiGatewayConstants.authenticationMethod;
    moduleTypeOptions = ApiGatewayConstants.moduleType;
    status;
    moduleTypeValue;
    moduleTitle;
    moduleGroup;
    moduleAuthMode;
    esbMode;
    description;
    retryCount;
    delayRetryTime;
    limitForPeriod;
    limitRefreshPeriod;
    partyId;
    title;
    temp;
    varChangeFlag = false;
    detailsBreadObject = [];
    constructor(route, messagesApiFacadeService, _primengProgressBarService, apiFacadeService, notifierService, apiGatewayService, transloco, confirmationService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiFacadeService = apiFacadeService;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this.confirmationService = confirmationService;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.module'),
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/module.png',
                    },
                    { index: 2,
                        label_index2: this.transloco.translate('registerModule.header.registerModule'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png'
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    confirmDialog() {
        this.confirmationService.confirm({
            message: 'وضعیت این ماژول غیر فعال است، آیا از غیرفعالسازی این ماژول اطمینان دارید؟',
            accept: () => {
                debugger;
                this.moduleDto.esbMode = 0;
                this.moduleDto.moduleGroup = 0;
                this.moduleDto.partyId = Number(this.partyId);
                this.moduleDto.moduleTitle = this.moduleTitle;
                this.moduleDto.moduleType = this.moduleTypeValue;
                this.moduleDto.moduleAuthMode = this.moduleAuthMode;
                this.description != null
                    ? (this.moduleDto.description = this.description)
                    : (this.moduleDto.description = null);
                this.retryCount != null
                    ? (this.moduleDto.retryCount = this.retryCount)
                    : (this.moduleDto.retryCount = null);
                this.delayRetryTime != null
                    ? (this.moduleDto.delayRetryTime = this.delayRetryTime)
                    : (this.moduleDto.delayRetryTime = null);
                this.limitForPeriod != null
                    ? (this.moduleDto.limitForPeriod = this.limitForPeriod)
                    : (this.moduleDto.limitForPeriod = null);
                this.limitRefreshPeriod != null
                    ? (this.moduleDto.limitRefreshPeriod =
                        this.limitRefreshPeriod)
                    : (this.moduleDto.limitRefreshPeriod = null);
                this.status == true
                    ? (this.moduleDto.status = 1)
                    : (this.moduleDto.status = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.registerModule(this.moduleDto).subscribe((Moduleresponse) => {
                    this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
                //Actual logic to perform a confirmation
            },
            reject: () => {
                debugger;
                // this.status=true
            },
        });
    }
    changeFlag() {
        debugger;
        this.varChangeFlag = true;
    }
    ngOnInit() {
        this.scrollTop();
        this.status = true;
        this.varChangeFlag = false;
        this.detailsBreadObject = this.chooseBread('moduleBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        this.partyId = this.inputParty.partyId;
        this.title = this.inputParty.title;
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    onCancel() {
        this.close.emit('close');
    }
    validation() {
        if (!this.moduleTitle) {
            this.notifierService.showError({
                detail: 'لطفا عنوان ماژول را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.moduleTypeValue) {
            this.notifierService.showError({
                detail: 'لطفا نوع ماژول را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.moduleAuthMode) {
            this.notifierService.showError({
                detail: 'لطفا شیوه احراز هویت را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    onRegister() {
        debugger;
        if (this.validation()) {
            debugger;
            if (this.varChangeFlag && this.status == false) {
                debugger;
                this.confirmDialog();
            }
            else {
                debugger;
                this.moduleDto.esbMode = 0;
                this.moduleDto.moduleGroup = 0;
                this.moduleDto.partyId = Number(this.partyId);
                this.moduleDto.moduleTitle = this.moduleTitle;
                this.moduleDto.moduleType = this.moduleTypeValue;
                this.moduleDto.moduleAuthMode = this.moduleAuthMode;
                this.description != null
                    ? (this.moduleDto.description = this.description)
                    : (this.moduleDto.description = null);
                this.retryCount != null
                    ? (this.moduleDto.retryCount = this.retryCount)
                    : (this.moduleDto.retryCount = null);
                this.delayRetryTime != null
                    ? (this.moduleDto.delayRetryTime = this.delayRetryTime)
                    : (this.moduleDto.delayRetryTime = null);
                this.limitForPeriod != null
                    ? (this.moduleDto.limitForPeriod = this.limitForPeriod)
                    : (this.moduleDto.limitForPeriod = null);
                this.limitRefreshPeriod != null
                    ? (this.moduleDto.limitRefreshPeriod =
                        this.limitRefreshPeriod)
                    : (this.moduleDto.limitRefreshPeriod = null);
                this.status == true
                    ? (this.moduleDto.status = 1)
                    : (this.moduleDto.status = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerModule(this.moduleDto)
                    .subscribe((Moduleresponse) => {
                    this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                });
            }
        }
    }
};
__decorate([
    Output()
], BasemoduleApiAddComponent.prototype, "close", void 0);
__decorate([
    Input()
], BasemoduleApiAddComponent.prototype, "inputParty", void 0);
BasemoduleApiAddComponent = __decorate([
    Component({
        selector: 'app-basemodule-api-add',
        templateUrl: './basemodule-api-add.component.html',
        styleUrls: ['./basemodule-api-add.component.scss'],
        providers: [ConfirmationService],
        standalone: true,
        imports: [
            TableModule,
            BreadcrumbsComponent,
            FormsModule,
            ButtonDirective,
            InputText,
            TranslocoPipe,
            ConfirmDialog,
            DropdownModule,
            KeyFilter,
            ToggleSwitch,
        ],
    })
], BasemoduleApiAddComponent);
export { BasemoduleApiAddComponent };
