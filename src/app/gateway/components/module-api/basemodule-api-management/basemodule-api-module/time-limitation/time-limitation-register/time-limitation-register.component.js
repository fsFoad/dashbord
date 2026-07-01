import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from "../../../../../../constants/ApiGatewayConstants";
import { TranslocoPipe } from '@ngneat/transloco';
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { ToggleSwitch } from "primeng/toggleswitch";
import { PersianCalendarComponent } from "../../../../../../../shared/components/persian-calendar/persian-calendar.module";
import { ButtonDirective } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
let TimeLimitationRegisterComponent = class TimeLimitationRegisterComponent {
    route;
    transloco;
    messagesApiFacadeService;
    _primengProgressBarService;
    apiGatewayService;
    notifierService;
    translate;
    close = new EventEmitter();
    inputUpdate;
    limitTypeOptions = ApiGatewayConstants.limitType;
    limitType = null;
    status = null;
    limitId = null;
    fromDate = "";
    fromTime = "";
    toDate = "";
    toTime = "";
    fullToDateTime = null;
    fullFromDateTime = null;
    formFieldsClass;
    repeatedly = true;
    headerLimit = 'headerLimit';
    repeatedlyDisabledFlag = false;
    updateFlag = false;
    objectTimeLimitation = {
        fromDateTime: null,
        toDateTime: null,
        limitType: null,
        apiId: null,
        status: null,
        limitId: null,
        repeatedly: null
    };
    clientName;
    apiTitle;
    moduleTitle;
    partyTitle;
    moduleBase;
    clientBase;
    accessBase;
    partyBase;
    detailsBreadObject = [];
    constructor(route, transloco, messagesApiFacadeService, _primengProgressBarService, apiGatewayService, notifierService, translate) {
        this.route = route;
        this.transloco = transloco;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiGatewayService = apiGatewayService;
        this.notifierService = notifierService;
        this.translate = translate;
    }
    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase) {
        if (this.updateFlag) {
            switch (caseBase) {
                case 'clientBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/client',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '/api-gateway/access-list',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                            label_Detail_index1: '(' + this.clientName + ')',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(لیست دسترسی)',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'محدودیت زمانی سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش محدودیت زمانی'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
                    ];
                    break;
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
                            label_index1: 'ماژول',
                            rout_index1: '/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'محدودیت زمانی سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ویرایش محدودیت زمانی'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null },
                    ];
                    break;
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            img_index1: 'assets/icons/api.png',
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 2,
                            label_index2: 'محدودیت زمانی سرویس',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/limit.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ویرایش محدودیت زمانی'),
                            rout_index3: '/registerRule',
                            isActive3: true,
                            img_index3: 'assets/icons/update.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
                    ];
                    break;
                case 'partyBase':
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
                            label_index1: 'سازمان',
                            rout_index1: '/party',
                            isActive1: false,
                            img_index1: 'assets/icons/party.png',
                        },
                        {
                            index: 2,
                            label_index2: 'ماژول',
                            rout_index2: '/module',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: '/api',
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'محدودیت زمانی سرویس',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/limit.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ویرایش محدودیت زمانی'),
                            rout_index5: '/registerRule',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                    ];
                    break;
                default:
                    return null;
            }
        }
        else {
            switch (caseBase) {
                case 'clientBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'کلاینت',
                            rout_index0: '/client',
                            isActive0: false,
                            img_index0: 'assets/icons/client.png',
                        },
                        {
                            index: 1,
                            label_index1: 'لیست دسترسی',
                            rout_index1: '/api-gateway/access-list',
                            isActive1: false,
                            img_index1: 'assets/icons/access.png',
                            label_Detail_index1: '(' + this.clientName + ')',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(لیست دسترسی)',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'محدودیت زمانی سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت محدودیت زمانی'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
                        { label_index6: null },
                    ];
                    break;
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
                            label_index1: 'ماژول',
                            rout_index1: '/module',
                            isActive1: false,
                            img_index1: 'assets/icons/module.png',
                        },
                        {
                            index: 2,
                            label_index2: 'سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.moduleTitle + ')',
                            img_index2: 'assets/icons/api.png',
                        },
                        {
                            index: 3,
                            label_index3: 'محدودیت زمانی سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/limit.png',
                        },
                        {
                            index: 4,
                            label_index4: this.transloco.translate('ثبت محدودیت زمانی'),
                            rout_index4: '/registerRule',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null },
                    ];
                    break;
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '/api-gateway/access-list',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            img_index1: 'assets/icons/api.png',
                            label_Detail_index1: '(' + this.moduleTitle + ')',
                        },
                        {
                            index: 2,
                            label_index2: 'محدودیت زمانی سرویس',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/limit.png',
                        },
                        {
                            index: 3,
                            label_index3: this.transloco.translate('ثبت محدودیت زمانی'),
                            rout_index3: '/registerRule',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_index4: null },
                        { label_index5: null },
                    ];
                    break;
                case 'partyBase':
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
                            label_index1: 'سازمان',
                            rout_index1: '/party',
                            isActive1: false,
                            img_index1: 'assets/icons/party.png',
                        },
                        {
                            index: 2,
                            label_index2: 'ماژول',
                            rout_index2: '/module',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: '/api',
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'محدودیت زمانی سرویس',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/limit.png',
                        },
                        {
                            index: 5,
                            label_index5: this.transloco.translate('ثبت محدودیت زمانی'),
                            rout_index5: '/registerRule',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                    ];
                    break;
                default:
                    return null;
            }
        }
    }
    ngOnInit() {
        debugger;
        this.scrollTop();
        this.updateFlag = this.inputUpdate.updateFlag;
        this.headerLimit = this.inputUpdate.headerLimit;
        if (this.inputUpdate.updateFlag) {
            debugger;
            this.moduleBase = this.inputUpdate.moduleBase;
            this.clientBase = this.inputUpdate.clientBase;
            this.accessBase = this.inputUpdate.accessBase;
            this.partyTitle = this.inputUpdate.partyTitle;
            this.moduleTitle = this.inputUpdate.moduleTitle;
            this.clientName = this.inputUpdate.clientName;
            this.partyBase = this.inputUpdate.partyBase;
            this.apiTitle = this.inputUpdate.apiTitle;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            this.clientName = this.inputUpdate.clientName;
            this.apiTitle = this.inputUpdate.apiTitle;
            this.moduleTitle = this.inputUpdate.moduleTitle;
            this.partyTitle = this.inputUpdate.partyTitle;
            if (!this.inputUpdate.repeatedly) {
                this.fromTime = this.inputUpdate.fromDateTime.substring(11);
                this.fromDate = this.inputUpdate.fromDateTime.substring(0, 11);
                this.toTime = this.inputUpdate.toDateTime.substring(11);
                this.toDate = this.inputUpdate.toDateTime.substring(0, 11);
                this.inputUpdate.status == 1 ? this.status = true : this.status = false;
                this.inputUpdate.repeatedly == 1 ? this.repeatedly = true : this.repeatedly = false;
                this.inputUpdate.limitType != null ? this.limitType = (this.inputUpdate.limitType).toString() :
                    this.limitType = null;
                this.limitId = this.inputUpdate.limitId;
            }
            else {
                this.fromTime = this.inputUpdate.fromDateTime;
                this.fromDate = "";
                this.toTime = this.inputUpdate.toDateTime;
                this.toDate = "";
                this.inputUpdate.status == 1 ? this.status = true : this.status = false;
                this.inputUpdate.repeatedly == 1 ? this.repeatedly = true : this.repeatedly = false;
                this.inputUpdate.limitType != null ? this.limitType = (this.inputUpdate.limitType).toString() :
                    this.limitType = null;
                this.limitId = this.inputUpdate.limitId;
            }
            this.repeatedly == true ? this.repeatedlyDisabledFlag = true : this.repeatedlyDisabledFlag = false;
            this.repeatedly == true ? this.fromDate = "" : this.repeatedlyDisabledFlag = false;
            this.repeatedly == true ? this.toDate = "" : this.repeatedlyDisabledFlag = false;
        }
        else {
            debugger;
            this.status = true;
            this.repeatedly = false;
            this.clientName = this.inputUpdate.clientName;
            this.apiTitle = this.inputUpdate.apiTitle;
            this.moduleTitle = this.inputUpdate.moduleTitle;
            this.partyTitle = this.inputUpdate.partyTitle;
            this.moduleBase = this.inputUpdate.moduleBase;
            this.clientBase = this.inputUpdate.clientBase;
            this.accessBase = this.inputUpdate.accessBase;
            this.partyTitle = this.inputUpdate.partyTitle;
            this.moduleTitle = this.inputUpdate.moduleTitle;
            this.clientName = this.inputUpdate.clientName;
            this.partyBase = this.inputUpdate.partyBase;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
    }
    onCancel() {
        this.close.emit('close');
    }
    onChangRepeatedly() {
        this.repeatedly == true ? this.repeatedlyDisabledFlag = true : this.repeatedlyDisabledFlag = false;
        this.repeatedly == true ? this.fromDate = "" : this.repeatedlyDisabledFlag = false;
        this.repeatedly == true ? this.toDate = "" : this.repeatedlyDisabledFlag = false;
    }
    onKeydown(event) {
        const self = this;
        if (event.key === "Enter") {
            self.onRegister();
        }
    }
    resetTime() {
        this.fromTime = "000000000";
        this.toTime = "235959999";
    }
    onRegister() {
        if (this.validationLimit()) {
            this.fullFromDateTime = null;
            this.fullToDateTime = null;
            this.formFieldsClass = 'elementHasError';
            const testArray = document.getElementsByClassName('ng-invalid');
            for (let i = 0; i < testArray.length; i++) {
                testArray[i].className += " ng-dirty";
            }
            this._primengProgressBarService.show();
            this.apiGatewayService.currentApprovalStageApiId.subscribe(res => {
                this._primengProgressBarService.hide();
                this.objectTimeLimitation.apiId = res;
            }, error => {
                this._primengProgressBarService.hide();
            });
            if (this.toDate != "" && this.toDate != null) {
                this.toDate = this.toDate.replace(/[/]/g, '');
                this.toDate = this.toDate.replace(/[' ']/g, '');
            }
            if (this.fromDate != "" && this.fromDate != null) {
                this.fromDate = this.fromDate.replace(/[/]/g, '');
                this.fromDate = this.fromDate.replace(/[' ']/g, '');
            }
            if (this.toTime != "" && this.toTime != null) {
                this.toTime = this.toTime.replace(/[:]/g, '');
                this.toTime = this.toTime.replace(/[.]/g, '');
            }
            if (this.fromTime != "" && this.fromTime != null) {
                this.fromTime = this.fromTime.replace(/[:]/g, '');
                this.fromTime = this.fromTime.replace(/[.]/g, '');
            }
            if (this.toTime == "") {
                this.toTime = "000000000";
            }
            this.fullToDateTime = this.toDate + this.toTime;
            if (this.toTime.length == 9) {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime;
            }
            else if (this.fullToDateTime.length < 14) {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime + "59999";
            }
            else {
                this.objectTimeLimitation.toDateTime = this.fullToDateTime;
            }
            if (this.fromTime == "") {
                this.fromTime = "000000000";
            }
            this.fullFromDateTime = this.fromDate + this.fromTime;
            if (this.fromTime.length == 9) {
                this.objectTimeLimitation.fromDateTime = this.fullFromDateTime;
            }
            else if (this.fullFromDateTime.length < 14) {
                this.objectTimeLimitation.fromDateTime = this.fullFromDateTime + "00000";
            }
            else {
                this.objectTimeLimitation.fromDateTime = this.fromDate + this.fromTime;
            }
            this.objectTimeLimitation.limitType = Number(this.limitType);
            this.status == true ? this.objectTimeLimitation.status = 1 : this.objectTimeLimitation.status = 0;
            this.repeatedly == true ? this.objectTimeLimitation.repeatedly = 1 : this.objectTimeLimitation.repeatedly = 0;
            if (this.inputUpdate.updateFlag) {
                this.objectTimeLimitation.limitId = this.limitId;
            }
            else {
                delete this.objectTimeLimitation.limitId;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.savelimit(this.objectTimeLimitation).subscribe(a => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
    }
    validationLimit() {
        if (this.toDate != "" && this.toDate != null) {
            this.toDate = this.toDate.replace(/[/]/g, '');
            this.toDate = this.toDate.replace(/[' ']/g, '');
        }
        if (this.fromDate != "" && this.fromDate != null) {
            this.fromDate = this.fromDate.replace(/[/]/g, '');
            this.fromDate = this.fromDate.replace(/[' ']/g, '');
        }
        if (this.toTime != "" && this.toTime != null) {
            this.toTime = this.toTime.replace(/[:]/g, '');
        }
        if (this.fromTime != "" && this.fromTime != null) {
            this.fromTime = this.fromTime.replace(/[:]/g, '');
        }
        if ((this.limitType == "") || (this.limitType == null)) {
            this.notifierService.showError({
                detail: "لطفا نوع محدودیت را وارد کنید!",
                life: 3000
            });
            return false;
        }
        if (this.limitType == '1' && !this.repeatedly) {
            if ((this.fromDate == null || this.fromDate == "")) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ شروع را وارد کنید!",
                    life: 3000
                });
                return false;
            }
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false;
            }
        }
        if (this.repeatedly) {
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false;
            }
            if (this.toTime == null || this.toTime == "") {
                this.notifierService.showError({
                    detail: "لطفا ساعت پایان را وارد کنید!",
                    life: 3000
                });
                return false;
            }
        }
        if (this.limitType == '2' && !this.repeatedly) {
            if ((this.fromDate == null || this.fromDate == "")) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ شروع را وارد کنید!",
                    life: 3000
                });
                return false;
            }
            if ((this.toDate == null || this.toDate == "") && !this.repeatedly) {
                this.notifierService.showError({
                    detail: "لطفا تاریخ پایان را وارد کنید!",
                    life: 3000
                });
                return false;
            }
            if (this.fromTime == "" || this.fromTime == null) {
                this.notifierService.showError({
                    detail: "لطفا ساعت شروع را وارد کنید!",
                    life: 3000
                });
                return false;
            }
            if (this.toTime == null || this.toTime == "") {
                this.notifierService.showError({
                    detail: "لطفا ساعت پایان را وارد کنید!",
                    life: 3000
                });
                return false;
            }
        }
        if (this.fromDate > this.toDate) {
            this.notifierService.showError({
                detail: "لطفا بازه تاریخ معتبر را وارد کنید!",
                life: 3000
            });
            return false;
        }
        if ((this.toDate == this.fromDate)) {
            if (this.fromTime > this.toTime) {
                this.notifierService.showError({
                    detail: "لطفا بازه ساعت معتبر را وارد کنید!",
                    life: 3000
                });
                return false;
            }
        }
        if (this.repeatedly) {
            if ((this.fromTime == "" || this.toTime == "") ||
                (this.fromTime == "00000000" || this.toTime == "00000000")) {
                this.notifierService.showError({
                    detail: "لطفا بازه ساعت معتبر را وارد کنید!",
                    life: 3000
                });
                return false;
            }
        }
        return true;
    }
};
__decorate([
    Output()
], TimeLimitationRegisterComponent.prototype, "close", void 0);
__decorate([
    Input()
], TimeLimitationRegisterComponent.prototype, "inputUpdate", void 0);
TimeLimitationRegisterComponent = __decorate([
    Component({
        selector: 'app-time-limitation-register',
        templateUrl: './time-limitation-register.component.html',
        styleUrls: ['./time-limitation-register.component.scss'],
        standalone: true,
        imports: [
            DropdownModule,
            FormsModule,
            ToggleSwitch,
            PersianCalendarComponent,
            ButtonDirective,
            InputText,
            TranslocoPipe,
            BreadcrumbsComponent,
            Toast,
        ],
    })
], TimeLimitationRegisterComponent);
export { TimeLimitationRegisterComponent };
