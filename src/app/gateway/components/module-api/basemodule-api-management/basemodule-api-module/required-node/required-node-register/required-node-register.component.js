import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from "../../../../../../constants/ApiGatewayConstants";
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TranslocoPipe } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
let RequiredNodeRegisterComponent = class RequiredNodeRegisterComponent {
    messagesApiFacadeService;
    notifierService;
    apiGatewayService;
    transloco;
    _primengProgressBarService;
    requiredInput;
    close = new EventEmitter();
    constructor(messagesApiFacadeService, notifierService, apiGatewayService, transloco, _primengProgressBarService) {
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this._primengProgressBarService = _primengProgressBarService;
    }
    headerTypeGroup = ApiGatewayConstants.headerTypeGroup;
    nodeName = null;
    nodePath = '';
    staticTextAfter = null;
    staticTextBefore = null;
    nodePlace = null;
    requiredId = null;
    apiId = '';
    items;
    tempProduced;
    clientName;
    moduleTitle;
    partyTitle;
    apiTitle;
    clientBase;
    accessBase;
    moduleBase;
    partyBase;
    detailsBreadObject = [];
    ngOnInit() {
        debugger;
        if (this.requiredInput != undefined) {
            debugger;
            if (this.requiredInput.nodeName != undefined) {
                debugger;
                this.nodeName = this.requiredInput.nodeName;
                if (this.requiredInput.nodePlace != null) {
                    this.nodePlace = this.requiredInput.nodePlace.toString();
                }
                if (this.requiredInput.nodePath != null) {
                    this.nodePath = this.requiredInput.nodePath.toString();
                }
                if (this.requiredInput.staticTextBefore != null) {
                    this.staticTextBefore =
                        this.requiredInput.staticTextBefore.toString();
                }
                if (this.requiredInput.staticTextAfter != null) {
                    this.staticTextAfter =
                        this.requiredInput.staticTextAfter.toString();
                }
            }
            debugger;
            this.requiredId = this.requiredInput.requiredId;
            this.clientBase = this.requiredInput?.clientBase;
            this.moduleBase = this.requiredInput?.moduleBase;
            this.accessBase = this.requiredInput?.accessBase;
            this.partyBase = this.requiredInput?.partyBase;
            this.apiTitle = this.requiredInput?.apiTitle;
            this.apiId = this.requiredInput?.apiId;
            this.clientBase = this.requiredInput?.clientBase;
            this.moduleBase = this.requiredInput?.moduleBase;
            this.accessBase = this.requiredInput?.accessBase;
            this.clientBase = this.requiredInput?.clientBase;
            this.partyTitle = this.requiredInput?.partyTitle;
            this.moduleTitle = this.requiredInput?.moduleTitle;
            this.clientName = this.requiredInput?.clientName;
            debugger;
            if (!this.requiredInput?.sequenceBase) {
                if (this.clientBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.moduleBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.accessBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.partyBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
            }
            else {
                if (this.clientBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.moduleBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.accessBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.partyBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
            }
        }
    }
    chooseBreadWithSequence(caseBase) {
        debugger;
        if (this.requiredInput.nodeName != undefined) {
            switch (caseBase) {
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                            label_Detail_index0: null,
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            label_Detail_index1: '(' + this.clientName + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 2,
                            label_index2: ' جریان پردازشی',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/flow.png',
                        },
                        {
                            index: 3,
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: true,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        {
                            index: 4,
                            label_index4: 'ویرایش نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index1: null,
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
                            label_index3: ' جریان پردازشی',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/flow.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ویرایش نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            label_index3: ' جریان پردازشی',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/flow.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ویرایش نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: ' جریان پردازشی',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/flow.png',
                        },
                        {
                            index: 5,
                            label_index5: 'نود های مورد نیاز',
                            rout_index5: null,
                            isActive5: false,
                            label_Detail_index5: '(' + this.apiTitle + ')',
                            img_index5: 'assets/icons/node.png',
                        },
                        {
                            index: 6,
                            label_index6: 'ویرایش نود مورد نیاز',
                            rout_index6: '/register',
                            isActive6: true,
                            img_index6: 'assets/icons/update.png',
                        },
                    ];
                default:
                    return null;
            }
        }
        else {
            switch (caseBase) {
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                            label_Detail_index0: null,
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            label_Detail_index1: '(' + this.clientName + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 2,
                            label_index2: ' جریان پردازشی',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/flow.png',
                        },
                        {
                            index: 3,
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        {
                            index: 4,
                            label_index4: 'ثبت نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index1: null,
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
                            label_index3: ' جریان پردازشی',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/flow.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ثبت نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            label_index3: ' جریان پردازشی',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/flow.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ثبت نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: ' جریان پردازشی',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/flow.png',
                        },
                        {
                            index: 5,
                            label_index5: 'نود های مورد نیاز',
                            rout_index5: null,
                            isActive5: false,
                            label_Detail_index5: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 6,
                            label_index6: 'ثبت نود مورد نیاز',
                            rout_index6: '/register',
                            isActive6: true,
                            img_index6: 'assets/icons/save.png',
                        },
                    ];
                default:
                    return null;
            }
        }
    }
    chooseBread(caseBase) {
        debugger;
        if (this.requiredInput.nodeName != undefined) {
            switch (caseBase) {
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                            label_Detail_index0: null,
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            label_Detail_index1: '(' + this.clientName + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 2,
                            label_index2: 'نود های مورد نیاز',
                            rout_index2: null,
                            isActive2: true,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/node.png',
                        },
                        {
                            index: 3,
                            label_index3: 'ویرایش نود مورد نیاز',
                            rout_index3: '/register',
                            isActive3: false,
                            img_index3: 'assets/icons/update.png',
                        },
                        { label_index4: null, label_Detail_index4: null },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index1: null,
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
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        {
                            index: 4,
                            label_index4: 'ویرایش نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        {
                            index: 4,
                            label_index4: 'ویرایش نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/update.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ویرایش نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/update.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
                default:
                    return null;
            }
        }
        else {
            switch (caseBase) {
                case 'accessBase':
                    return [
                        {
                            index: 0,
                            label_index0: 'لیست دسترسی',
                            rout_index0: '',
                            isActive0: false,
                            img_index0: 'assets/icons/access.png',
                            label_Detail_index0: null,
                        },
                        {
                            index: 1,
                            label_index1: 'سرویس',
                            rout_index1: null,
                            isActive1: false,
                            label_Detail_index1: '(' + this.clientName + ')',
                            img_index1: 'assets/icons/api.png',
                        },
                        {
                            index: 2,
                            label_index2: 'نود های مورد نیاز',
                            rout_index2: null,
                            isActive2: false,
                            label_Detail_index2: '(' + this.apiTitle + ')',
                            img_index2: 'assets/icons/node.png',
                        },
                        {
                            index: 3,
                            label_index3: 'ثبت نود مورد نیاز',
                            rout_index3: '/register',
                            isActive3: true,
                            img_index3: 'assets/icons/save.png',
                        },
                        { label_index4: null, label_Detail_index4: null },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index1: null,
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
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        {
                            index: 4,
                            label_index4: 'ثبت نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            label_index3: 'نود های مورد نیاز',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.apiTitle + ')',
                            img_index3: 'assets/icons/node.png',
                        },
                        { index: 4,
                            label_index4: 'ثبت نود مورد نیاز',
                            rout_index4: '/register',
                            isActive4: true,
                            img_index4: 'assets/icons/save.png',
                        },
                        { label_index5: null, label_Detail_index5: null },
                        { label_index6: null, label_Detail_index6: null },
                    ];
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
                            rout_index2: '',
                            isActive2: false,
                            label_Detail_index2: '(' + this.partyTitle + ')',
                            img_index2: 'assets/icons/module.png',
                        },
                        {
                            index: 3,
                            label_index3: 'سرویس',
                            rout_index3: null,
                            isActive3: false,
                            label_Detail_index3: '(' + this.moduleTitle + ')',
                            img_index3: 'assets/icons/api.png',
                        },
                        {
                            index: 4,
                            label_index4: 'نود های مورد نیاز',
                            rout_index4: null,
                            isActive4: false,
                            label_Detail_index4: '(' + this.apiTitle + ')',
                            img_index4: 'assets/icons/node.png',
                        },
                        {
                            index: 5,
                            label_index5: 'ثبت نود مورد نیاز',
                            rout_index5: '/register',
                            isActive5: true,
                            img_index5: 'assets/icons/save.png',
                        },
                        { label_index6: null, label_Detail_index6: null },
                    ];
                default:
                    return null;
            }
        }
    }
    onRegister() {
        debugger;
        if (this.validation()) {
            debugger;
            debugger;
            let obj;
            if (this.requiredInput != undefined) {
                if (this.requiredInput.requiredId != undefined) {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        requiredId: null,
                        staticTextAfter: null,
                        staticTextBefore: null,
                    };
                    debugger;
                    if (this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != '') {
                        const firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }
                    this.nodePath = this.nodePath.trim();
                    if (this.nodePath && !this.nodePath.endsWith('/')) {
                        this.nodePath = this.nodePath + '/';
                    }
                    obj.nodePlace = +this.nodePlace;
                    obj.nodePath = this.nodePath;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.requiredInput.apiId;
                    obj.requiredId = this.requiredInput.requiredId;
                    this.staticTextAfter == ''
                        ? (obj.staticTextAfter = null)
                        : (obj.staticTextAfter = this.staticTextAfter);
                    this.staticTextBefore == ''
                        ? (obj.staticTextBefore = null)
                        : (obj.staticTextBefore = this.staticTextBefore);
                }
                else {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        staticTextAfter: null,
                        staticTextBefore: null,
                    };
                    debugger;
                    if (this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != '') {
                        const firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }
                    debugger;
                    obj.nodePlace = +this.nodePlace;
                    obj.nodePath = this.nodePath;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.requiredInput.apiId;
                    obj.apiId = this.requiredInput.apiId;
                    this.staticTextAfter == ''
                        ? (obj.staticTextAfter = null)
                        : (obj.staticTextAfter = this.staticTextAfter);
                    this.staticTextBefore == ''
                        ? (obj.staticTextBefore = null)
                        : (obj.staticTextBefore = this.staticTextBefore);
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .requirednodeRegister(obj)
                    .subscribe((n) => {
                    this._primengProgressBarService.hide();
                    obj.nodeName = null;
                    obj.nodePlace = null;
                    obj.nodePath = null;
                    obj.apiId = null;
                    obj.requiredId = null;
                    obj.staticTextAfter = null;
                    obj.staticTextBefore = null;
                    this.close.emit('closeAndCreate');
                    debugger;
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
        }
    }
    validation() {
        if (!this.nodeName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان نود را وارد نمائید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.nodePlace) {
            this.notifierService.showError({
                detail: 'لطفا گروه بندی را وارد نمائید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    onCancel() {
        this.close.emit('close');
    }
};
__decorate([
    Input()
], RequiredNodeRegisterComponent.prototype, "requiredInput", void 0);
__decorate([
    Output()
], RequiredNodeRegisterComponent.prototype, "close", void 0);
RequiredNodeRegisterComponent = __decorate([
    Component({
        selector: 'app-required-node-register',
        templateUrl: './required-node-register.component.html',
        styleUrls: ['./required-node-register.component.scss'],
        standalone: true,
        imports: [
            FormsModule,
            InputText,
            DropdownModule,
            ButtonDirective,
            TranslocoPipe
        ],
    })
], RequiredNodeRegisterComponent);
export { RequiredNodeRegisterComponent };
