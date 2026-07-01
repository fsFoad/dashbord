import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HubDto } from '../../../models/hub.Dto';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { Constants } from '../../../../shared/constants/Constants';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DataTypeHubPipe } from '../../../../shared/pipes/dataTypeHub.pipe';
import { EnStatusPipe } from '../../../../shared/pipes/en-status.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ParamTypePipe } from '../../../../shared/pipes/paramType.pipe';
import { Dialog } from 'primeng/dialog';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { MessagesCategoryPipe } from '../../../../shared/pipes/messagesCategory.pipe';
import { Ripple } from 'primeng/ripple';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Fieldset } from 'primeng/fieldset';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { Step, StepList, Stepper } from 'primeng/stepper';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { KeyFilter } from 'primeng/keyfilter';
import { Menu } from 'primeng/menu';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Failover } from '../../../models/failover.Dto';
import { ProtocolsPipe } from '../../../../shared/pipes/protocols.pipe';
import { MessageSelectorComponent, } from '../../../../shared/components/message-selector/message-selector.component';
import { Subject } from 'rxjs';
let RegisterHubComponent = class RegisterHubComponent {
    apiGatewayService;
    notifierService;
    transloco;
    commonValidationsService;
    confirmationService;
    _primengProgressBarService;
    messagesApiFacadeService;
    myForm;
    close = new EventEmitter();
    inputApiHub;
    inputUpdate;
    model;
    update = new EventEmitter();
    statusHost = true;
    tempFailover;
    status;
    name;
    title;
    moduleTitle;
    partyTitle;
    clientName;
    clientBase;
    moduleBase;
    accessBase;
    partyBase;
    apiId;
    dbEngineId;
    previousDbEngineId;
    hubId = null;
    faloverId = null;
    objectName;
    driverName;
    dbName;
    hubTitle;
    commandTypeId = '1';
    detailsBreadObject = [];
    templates = 'SELECT * FROM';
    tempQuery;
    ip = '';
    host = '';
    portHost = '';
    protocolHost = null;
    port = null;
    user = '';
    specialUserName = '';
    specialPassword = '';
    password = '';
    messageId4X = null;
    messageId2X = null;
    messageId5X = null;
    codeMessageDe = null;
    messageIdDe = null;
    titleMessageDe = null;
    tableIdDe = null;
    ipLbl = '';
    lblObjectName = '';
    portLbl = '';
    userLbl = '';
    headerFieldset = 'Register';
    passwordLbl = '';
    queryUser = '';
    concatString;
    hubConstants = Constants;
    paramName;
    paramType = '0';
    aliasOutputParamName;
    paramValue;
    dataType;
    param = '';
    paramsList = [];
    failoverList = [];
    allDbList = [];
    spParamsList = [];
    mapList = [];
    loading;
    loadingButton;
    inputMap;
    outputMap;
    dataTypeMap;
    isEcrypt;
    statusMap;
    headerRegHub = 'ایجاد هاب داده';
    titleFieldset = 'Register Database Info';
    helpFlag = false;
    PoolConnectionFlag = false;
    customQueryParamFlag = false;
    spParamsFlag = false;
    customQueryFlag = false;
    handlSpaseFlag = false;
    spFlag = false;
    textSqlFlag = true;
    resultTestConnectionFlag = false;
    connectionSuccessFlag = false;
    connectionFailedFlag = false;
    nextFlag = true;
    backShowFlag = false;
    nextShowFlag = true;
    FinalRegistrationFlag = false;
    queryFailedFlag = false;
    spTestFlag = true;
    querySuccessFlag = false;
    testConectionFlag = true;
    testFinalFlag = true;
    isFinal = false;
    commitFlag = true;
    addFailoverFlag = true;
    formChanged = false;
    allowCreateConnectionPool = true;
    connectionPoolSize = 10;
    autoCommit;
    icon400_val = '';
    icon500_val = '';
    icon200_val = '';
    tooltipNext = 'ابتدا اطلاعات دیتابیس را ثبت بنمائید';
    tooltipTestSp = 'جهت تست پروسیجر حداقل یک رکورد پارامتر پروسیجر لازم هست!';
    tooltip200 = 'انتخاب پیام برای موفقیت آمیز بودن عملیات ';
    tooltip400 = 'انتخاب پیام برای خطا در عملیات، سمت فرانت اند';
    tooltip500 = 'انتخاب پیام برای خطا در عملیات، سمت  بک اند';
    titleMessage400;
    codeMessage400 = '400';
    textMessage400;
    textENMessage400;
    tableIdMessage400;
    typeMessage400;
    titleMessage200;
    codeMessage200 = '200';
    textMessage200;
    textENMessage200;
    tableIdMessage200;
    typeMessage200;
    titleMessage500;
    codeMessage500 = '500';
    textMessage500;
    textENMessage500;
    tableIdMessage500;
    typeMessage500;
    messageId;
    message200Dto;
    selectedMessageId2XX = null;
    selectedMessageId4XX = null;
    selectedMessageId5XX = null;
    messagesList500 = [];
    messagesList400 = [];
    messagesList200 = [];
    first400 = 0;
    first500 = 0;
    first200 = 0;
    rows200 = 5;
    rows400 = 5;
    rows500 = 5;
    customQuery = null;
    tempCustomQuery = null;
    message200Flag = false;
    message400Flag = false;
    message500Flag = false;
    regTextDBFlag = true;
    dbInfoFlag = true;
    paramFlag = false;
    spParamFlag = false;
    previewFlag = false;
    addFlag = false;
    customQueryInputFlag = false;
    resultTestQueryFlag = false;
    regCheckFlag = false;
    categoryMessages200 = ApiGatewayConstants.categoryMessages;
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    statusCodeOptions200 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions400 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions500 = ApiGatewayConstants.statusCodeHub;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessages200 = ApiGatewayConstants.typeMessages;
    dataTypeOptions = Constants.dataTypeOptions;
    itemsHub = [];
    activeIndex = 0;
    rows = 5;
    nextBtn200Flag = false;
    nextBtn400Flag = false;
    nextBtn500Flag = false;
    pageno = 0;
    pagesize = 10;
    itemsFailover = [];
    accordionValue = ['0'];
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    fieldsetStyles = {
        'background-color': '#9e99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#1c034f',
    };
    primaryStyles = {
        'background-color': '#9e99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#1c034f',
    };
    secondaryStyles = {
        'background-color': '#bf99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#3c034f',
    };
    canCommit;
    clearTriggerForMessageSelector200 = false;
    clearTriggerForMessageSelector400 = false;
    clearTriggerForMessageSelector500 = false;
    messageSelector400Action$ = new Subject();
    constructor(apiGatewayService, notifierService, transloco, commonValidationsService, confirmationService, _primengProgressBarService, messagesApiFacadeService) {
        this.apiGatewayService = apiGatewayService;
        this.notifierService = notifierService;
        this.transloco = transloco;
        this.commonValidationsService = commonValidationsService;
        this.confirmationService = confirmationService;
        this._primengProgressBarService = _primengProgressBarService;
        this.messagesApiFacadeService = messagesApiFacadeService;
    }
    onMessageSelected200(e) {
        debugger;
        debugger;
        debugger;
        const id = e?.messageid ?? e?.messageId ?? null;
        this.messageId2X = id;
        this.selectedMessageId2XX = id;
        this.icon200_val = 'pi pi-check';
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared200(flag) {
        if (!flag)
            return;
        this.messageId2X = null;
        this.icon200_val = null;
    }
    onMessageSelected400(message) {
        debugger;
        const id = message?.messageid ?? message?.messageId;
        this.messageId4X = id;
        this.selectedMessageId4XX = id;
        this.icon400_val = 'pi pi-check';
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared400(flag) {
        if (!flag)
            return;
        this.messageId4X = null;
        this.icon400_val = null;
    }
    onChildSelectionCleared500(flag) {
        if (!flag)
            return;
        this.messageId5X = null;
        this.icon500_val = null;
    }
    onMessageSelected500(message) {
        const id = message?.messageid ?? message?.messageId;
        this.messageId5X = id;
        this.icon500_val = 'pi pi-check';
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    ConnectionPoolChange(e) {
        debugger;
        e.checked == true && this.dbEngineId == '2' ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
    }
    deleteFailover(item) {
        if (item.id) {
            this.notifierService.showError({
                detail: 'برای موارد از پیش ثبت شده امکان حذف وجود ندارد،لطفا از غیرفعالسازی استفاده نمائید!',
                life: 3000,
            });
        }
        else {
            const index = this.failoverList.findIndex((obj) => obj.row === item.row);
            if (index > -1) {
                this.failoverList.splice(index, 1);
                for (let k = 0; k < this.failoverList.length; k++) {
                    this.failoverList[k] = Object.assign(this.failoverList[k], {
                        row: k + 1,
                    });
                }
                this.queryFailedFlag = false;
                this.querySuccessFlag = false;
                this.param = '';
            }
        }
    }
    savePreviousDbEngineId() {
        // این لحظه، مقدار هنوز تغییر نکرده
        this.previousDbEngineId = this.dbEngineId;
    }
    onchangeDbEngine(event) {
        debugger;
        const newValue = event.value;
        if (this.allowCreateConnectionPool && (this.failoverList.length > 0 || this.host)) {
            this.confirmationService.confirm({
                message: 'تغییر dbEngine ممکن است موجب از دست رفتن اطلاعات Failover شود، آیا از تغییر dbEngine اطمینان دارید؟',
                header: 'تغییر dbEngine',
                icon: 'pi pi-exclamation-triangle',
                accept: () => this.onAcceptDbEngine(newValue),
                reject: () => this.rejectFuncDBEngine(),
            });
        }
        newValue == '2' ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
    }
    onAcceptDbEngine(dbEngineId) {
        this.host = '';
        this.portHost = '';
        this.protocolHost = '';
        this.specialUserName = '';
        this.specialPassword = '';
        this.failoverList = [];
        this.dbEngineId = dbEngineId;
        this.accordionValue = ['0'];
    }
    rejectFuncDBEngine() {
        this.dbEngineId = this.previousDbEngineId;
        this.dbEngineId == '2' ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
    }
    concatIp(e) {
        debugger;
        this.ipLbl = e.target.value;
        if (this.ipLbl != '') {
            this.ipLbl += ':';
        }
    }
    validationFailover() {
        debugger;
        if (!this.host) {
            this.notifierService.showError({
                detail: 'لطفا Host Failover را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.commonValidationsService.checkIpOrDomain(this.host)) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا host خود را به فرمت صحیح وارد کنید!',
                life: 3000,
            });
        }
        else if (!this.portHost) {
            this.notifierService.showError({
                detail: 'لطفا Port Number Failover را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.protocolHost) {
            this.notifierService.showError({
                detail: 'لطفا protocol Failover را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    checkDuplicateFailover(arr, newObj) {
        debugger;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].host == newObj.host) {
                return true;
            }
        }
        return false;
    }
    onAccept() {
        this.host = '';
        this.portHost = '';
        this.protocolHost = '';
        this.specialUserName = '';
        this.specialPassword = '';
        this.failoverList = [];
    }
    cleanUp() {
        this.host = '';
        this.portHost = '';
        this.protocolHost = '';
        this.specialUserName = '';
        this.specialPassword = '';
    }
    addFailover() {
        debugger;
        if (this.validationFailover()) {
            if (this.failoverList.length > 0) {
                debugger;
                if (this.checkDuplicateFailover(this.failoverList, {
                    host: this.host,
                    portHost: this.portHost,
                    protocolHost: this.protocolHost,
                    statusHost: this.statusHost,
                    specialUserName: (this.specialUserName == '' || this.specialUserName == ' ' ||
                        this.specialUserName == null || this.specialUserName == undefined) ? this.user : this.specialUserName,
                    specialPassword: (this.specialPassword == '' || this.specialPassword == ' ' ||
                        this.specialPassword == null || this.specialPassword == undefined) ? this.password : this.specialPassword,
                    status: true,
                })) {
                    this.notifierService.showError({
                        detail: 'امکان افزودن اطلاعات تکراری وجود ندارد!',
                    });
                }
                else {
                    debugger;
                    this.failoverList.push({
                        host: this.host,
                        portHost: this.portHost,
                        protocolHost: this.protocolHost,
                        statusHost: this.statusHost,
                        specialUserName: (this.specialUserName == '' || this.specialUserName == ' ' ||
                            this.specialUserName == null || this.specialUserName == undefined) ? this.user : this.specialUserName,
                        specialPassword: (this.specialPassword == '' || this.specialPassword == ' ' ||
                            this.specialPassword == null || this.specialPassword == undefined) ? this.password : this.specialPassword,
                        status: true,
                    });
                    this.host = '';
                    this.portHost = '';
                    this.protocolHost = '';
                    this.specialUserName = '';
                    this.specialPassword = '';
                }
            }
            else {
                debugger;
                this.failoverList.push({
                    host: this.host,
                    portHost: this.portHost,
                    protocolHost: this.protocolHost,
                    statusHost: this.statusHost,
                    specialUserName: (this.specialUserName == '' || this.specialUserName == ' ' ||
                        this.specialUserName == null || this.specialUserName == undefined) ? this.user : this.specialUserName,
                    specialPassword: (this.specialPassword == '' || this.specialPassword == ' ' ||
                        this.specialPassword == null || this.specialPassword == undefined) ? this.password : this.specialPassword,
                    status: true,
                });
                this.host = '';
                this.portHost = '';
                this.protocolHost = '';
                this.specialUserName = '';
                this.specialPassword = '';
            }
            for (let k = 0; k < this.failoverList.length; k++) {
                if ('row' in this.failoverList) {
                }
                else {
                    this.failoverList[k] = Object.assign(this.failoverList[k], {
                        row: k + 1,
                    });
                }
            }
            console.log('this.failoverList', this.failoverList);
        }
    }
    deleteSpParam(param) {
        debugger;
        const index = this.spParamsList.findIndex((obj) => obj.row === param.row);
        if (index > -1) {
            this.spParamsList.splice(index, 1);
            for (let k = 0; k < this.spParamsList.length; k++) {
                this.spParamsList[k] = Object.assign(this.spParamsList[k], {
                    row: k + 1,
                    id: k + 1,
                });
            }
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }
    ngOnChanges(changes) {
        debugger;
    }
    concatPort(e) {
        debugger;
        this.portLbl = e.target.value;
        if (this.portLbl != '') {
            this.portLbl += ';';
        }
    }
    concatUser(e) {
        debugger;
        this.userLbl = e.target.value;
        if (this.userLbl != '') {
            this.userLbl += ';';
        }
    }
    concatPassword(e) {
        const inputElement = e.target;
        const newPasswordValue = inputElement.value;
        // به‌روزرسانی مقدار passwordLbl با * برای هر کاراکتر وارد شده
        this.passwordLbl = '*'.repeat(newPasswordValue.length);
        //this.passwordLbl = e.target.value
        if (this.passwordLbl != '') {
            this.passwordLbl += ';';
        }
    }
    getClassByTitle(resultTestTitle) {
        if (resultTestTitle === 'Error') {
            return 'text-red-800 bg-red-300';
        }
        else if (resultTestTitle === 'Success') {
            return 'text-green-800 bg-green-300';
        }
        return '';
    }
    testConnectionMethod() {
        debugger;
        const tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
        debugger;
        if (tempObjHub != null) {
            debugger;
            if (this.hubId != undefined && this.hubId != null) {
                this._primengProgressBarService.show();
                this.loadingButton = true;
                for (let k = 0; k < this.allDbList.length; k++) {
                    this.messagesApiFacadeService.testconnection(this.allDbList[k].hubId).subscribe((j) => {
                        debugger;
                        Object.assign(this.allDbList[k], { resultTest: (j.text), resultTestTitle: j.title });
                        this.loadingButton = false;
                        this._primengProgressBarService.hide();
                        this.resultTestConnectionFlag = true;
                        this.connectionSuccessFlag = true;
                        this.connectionFailedFlag = false;
                        this.nextFlag = false;
                        console.log('this.allDbList', this.allDbList);
                    }, (error) => {
                        debugger;
                        Object.assign(this.allDbList[k], {
                            resultTest: (error.error.text),
                            resultTestTitle: error.error.title,
                        });
                        this.loadingButton = false;
                        this._primengProgressBarService.hide();
                        this.resultTestConnectionFlag = true;
                        this.connectionFailedFlag = true;
                        this.connectionSuccessFlag = false;
                        this.nextFlag = true;
                        this.tooltipNext = 'تست کانکشن باموفقیت انجام نشده است!';
                    });
                }
            }
        }
    }
    editFailover(failover) {
        const updatedFailover = {
            host: this.host,
            portHost: this.portHost,
            protocolHost: this.protocolHost,
            statusHost: this.statusHost,
            specialUserName: (this.specialUserName == '' || this.specialUserName == ' ' ||
                this.specialUserName == null || this.specialUserName == undefined) ? this.user : this.specialUserName,
            specialPassword: (this.specialPassword == '' || this.specialPassword == ' ' ||
                this.specialPassword == null || this.specialPassword == undefined) ? this.password : this.specialPassword,
            status: true,
        };
        const isDuplicate = this.failoverList.some(f => f !== failover &&
            f.host === updatedFailover.host &&
            f.portHost === updatedFailover.portHost &&
            f.protocolHost === updatedFailover.protocolHost &&
            f.statusHost === updatedFailover.statusHost &&
            f.specialUserName === updatedFailover.specialUserName &&
            f.specialPassword === updatedFailover.specialPassword);
        if (isDuplicate) {
            this.notifierService.showError({
                detail: 'امکان افزودن اطلاعات تکراری وجود ندارد!',
            });
        }
        else {
            debugger;
            const index = this.failoverList.indexOf(failover);
            if (index !== -1) {
                this.failoverList[index] = updatedFailover;
                // اختیاری: اگر لیست در UI reactive نیست
                this.failoverList = [...this.failoverList]; // برای اینکه Angular تغییر رو بفهمه
            }
            for (let k = 0; k < this.failoverList.length; k++) {
                this.failoverList[k] = Object.assign(this.failoverList[k], {
                    row: k + 1,
                });
            }
            /*   this.failoverList.push({
                   host: this.host,
                   portHost: this.portHost,
                   protocolHost: this.protocolHost,
                   statusHost: this.statusHost,
                   specialUserName: (this.specialUserName == '' || this.specialUserName == ' ' ||
                       this.specialUserName == null || this.specialUserName == undefined) ? this.user : this.specialUserName,
                   specialPassword: (this.specialPassword == '' || this.specialPassword == ' ' ||
                       this.specialPassword == null || this.specialPassword == undefined) ? this.password : this.specialPassword,
                   status: true,
               });*/
            this.addFailoverFlag = true;
            this.host = '';
            this.portHost = '';
            this.protocolHost = '';
            this.specialUserName = '';
            this.specialPassword = '';
        }
        // registerDataBase
    }
    register(flag) {
        debugger;
        if (flag == 1) {
            debugger;
            const tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
            if (tempObjHub != null) {
                debugger;
                const hubObj = new HubDto();
                this.hubId != null ? (hubObj.hubId = +this.hubId) : undefined;
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                if (this.port == '') {
                    hubObj.portNumber = null;
                }
                hubObj.userName = this.user;
                hubObj.password = this.password;
                /*  if (+this.selectedMessageId4XX == 0) {
                      hubObj.messageId4X = null;
                  }
                  else {
                      hubObj.messageId4X = +this.selectedMessageId4XX;
                  }
                  if (+this.selectedMessageId5XX == 0) {
                      hubObj.messageId5X = null;
                  }
                  else {
                      hubObj.messageId5X = +this.selectedMessageId5XX;
                  }
                  if (+this.selectedMessageId2XX == 0) {
                      hubObj.messageId2X = null;
                  }
                  else {
                      hubObj.messageId2X = +this.selectedMessageId2XX;
                  }*/
                this.connectionSuccessFlag == true
                    ? (hubObj.isTestConnection = 1)
                    : this.connectionSuccessFlag;
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                window.localStorage.setItem('hubObj', JSON.stringify(hubObj));
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe((ne) => {
                    debugger;
                    this.updateByHubId(this.hubId, hubObj);
                    this._primengProgressBarService.hide();
                    this.notifierService.showSuccess({
                        detail: 'ثبت اطلاعات دیتابیس باموفقیت انجام شد!',
                        life: 3000,
                    });
                    const tempfaloverObjsList = JSON.parse(window.localStorage.getItem('faloverObjsList'));
                    if (tempfaloverObjsList != null) {
                        debugger;
                        let failover;
                        const faloverObj = new Failover();
                        failover = tempfaloverObjsList.map(item => ({
                            id: item.id,
                            hubId: ne.hubId,
                            protocol: item.protocolHost === '1' ? 'tcp' : 'tcp',
                            host: item.host,
                            portNumber: item.portNumber,
                            specialUserName: item.specialUserName,
                            specialPassword: item.specialPassword,
                            status: item.status ? 1 : 0,
                        }));
                        debugger;
                        this.messagesApiFacadeService.registerallFailover(failover).subscribe(response => {
                            debugger;
                            console.log('respons', response);
                            this.failoverList = [];
                            this.failoverList = response.map(item => ({
                                id: item.id,
                                hubId: item.hubId,
                                protocolHost: item.protocol === '1' ? 'tcp' : 'tcp',
                                host: item.host,
                                portHost: item.portNumber,
                                specialUserName: item.specialUserName,
                                specialPassword: item.specialPassword,
                                status: item.status ? 1 : 0,
                            }));
                            for (let k = 0; k < this.failoverList.length; k++) {
                                this.failoverList[k] = Object.assign(this.failoverList[k], {
                                    row: k + 1,
                                });
                            }
                            localStorage.setItem('faloverObjsList', JSON.stringify(response));
                        });
                        console.log('failover', failover);
                    }
                    else {
                        debugger;
                        let failover;
                        failover = this.failoverList.map(item => ({
                            hubId: ne.hubId,
                            protocol: item.protocolHost === '1' ? 'tcp' : 'tcp',
                            host: item.host,
                            portNumber: item.portHost,
                            specialUserName: item.specialUserName,
                            specialPassword: item.specialPassword,
                            status: item.status ? 1 : 0,
                            id: item.id,
                        }));
                        debugger;
                        this.messagesApiFacadeService.registerallFailover(failover).subscribe(response => {
                            debugger;
                            console.log('respons', response);
                            this.failoverList = [];
                            this.failoverList = response.map(item => ({
                                id: item.id,
                                hubId: item.hubId,
                                protocolHost: item.protocol === '1' ? 'tcp' : 'tcp',
                                host: item.host,
                                portHost: item.portNumber,
                                specialUserName: item.specialUserName,
                                specialPassword: item.specialPassword,
                                status: item.status ? 1 : 0,
                            }));
                            for (let k = 0; k < this.failoverList.length; k++) {
                                this.failoverList[k] = Object.assign(this.failoverList[k], {
                                    row: k + 1,
                                });
                            }
                            localStorage.setItem('faloverObjsList', JSON.stringify(response));
                        });
                    }
                    this.headerFieldset = 'Edit';
                    this.hubId = ne.hubId;
                    this.nextFlag = false;
                    this.connectionSuccessFlag = false;
                    this.connectionFailedFlag = false;
                    this.resultTestConnectionFlag = false;
                    this.testConectionFlag = false;
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
            else {
                debugger;
                const hubObj = new HubDto();
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                hubObj.userName = this.user;
                hubObj.password = this.password;
                if (+this.selectedMessageId4XX == 0) {
                    hubObj.messageId4X = null;
                }
                else {
                    hubObj.messageId4X = +this.selectedMessageId4XX;
                }
                if (+this.selectedMessageId5XX == 0) {
                    hubObj.messageId5X = null;
                }
                else {
                    hubObj.messageId5X = +this.selectedMessageId5XX;
                }
                if (+this.selectedMessageId2XX == 0) {
                    hubObj.messageId2X = null;
                }
                else {
                    hubObj.messageId2X = +this.selectedMessageId2XX;
                }
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.connectionFailedFlag == true
                    ? (hubObj.isTestConnection = 0)
                    : this.connectionFailedFlag;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe((ne) => {
                    this._primengProgressBarService.hide();
                    this.notifierService.showSuccess({
                        detail: 'اطلاعات دیتابیس باموفقیت ثبت شد!',
                        life: 3000,
                    });
                    const tempfaloverObjsList = JSON.parse(window.localStorage.getItem('faloverObjsList'));
                    if (tempfaloverObjsList != null) {
                        debugger;
                        let failover;
                        const faloverObj = new Failover();
                        failover = tempfaloverObjsList.map(item => ({
                            id: item.id,
                            hubId: this.hubId,
                            protocol: item.protocolHost === '1' ? 'tcp' : 'tcp',
                            host: item.host,
                            portNumber: item.portNumber,
                            specialUserName: item.specialUserName,
                            specialPassword: item.specialPassword,
                            status: item.status ? 1 : 0,
                        }));
                        debugger;
                        this.messagesApiFacadeService.registerallFailover(failover).subscribe(response => {
                            debugger;
                            console.log('respons', response);
                            this.failoverList = [];
                            this.failoverList = response.map(item => ({
                                id: item.id,
                                hubId: item.hubId,
                                protocolHost: item.protocol === '1' ? 'tcp' : 'tcp',
                                host: item.host,
                                portHost: item.portNumber,
                                specialUserName: item.specialUserName,
                                specialPassword: item.specialPassword,
                                status: item.status ? 1 : 0,
                            }));
                            for (let k = 0; k < this.failoverList.length; k++) {
                                this.failoverList[k] = Object.assign(this.failoverList[k], {
                                    row: k + 1,
                                });
                            }
                            localStorage.setItem('faloverObjsList', JSON.stringify(response));
                        });
                        console.log('failover', failover);
                    }
                    else {
                        debugger;
                        let failover;
                        failover = this.failoverList.map(item => ({
                            hubId: this.hubId,
                            protocol: item.protocolHost === '1' ? 'tcp' : 'tcp',
                            host: item.host,
                            portNumber: item.portHost,
                            specialUserName: item.specialUserName,
                            specialPassword: item.specialPassword,
                            status: item.status ? 1 : 0,
                            id: item.id,
                        }));
                        debugger;
                        this.messagesApiFacadeService.registerallFailover(failover).subscribe(response => {
                            debugger;
                            console.log('respons', response);
                            this.failoverList = [];
                            this.failoverList = response.map(item => ({
                                id: item.id,
                                hubId: item.hubId,
                                protocolHost: item.protocol === '1' ? 'tcp' : 'tcp',
                                host: item.host,
                                portHost: item.portNumber,
                                specialUserName: item.specialUserName,
                                specialPassword: item.specialPassword,
                                status: item.status ? 1 : 0,
                            }));
                            for (let k = 0; k < this.failoverList.length; k++) {
                                this.failoverList[k] = Object.assign(this.failoverList[k], {
                                    row: k + 1,
                                });
                            }
                            localStorage.setItem('faloverObjsList', JSON.stringify(response));
                        });
                    }
                    this.headerFieldset = 'Edit';
                    this.hubId = ne.hubId;
                    this.connectionSuccessFlag = false;
                    this.connectionFailedFlag = false;
                    this.resultTestConnectionFlag = false;
                    this.testConectionFlag = false;
                    this.nextFlag = false;
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
        }
        else if (flag == 0) {
            debugger;
            const tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
            if (tempObjHub != null) {
                debugger;
                const hubObj = new HubDto();
                this.hubId != null ? (hubObj.hubId = +this.hubId) : undefined;
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                if (this.port == '') {
                    hubObj.portNumber = null;
                }
                hubObj.userName = this.user;
                hubObj.password = this.password;
                if (+this.selectedMessageId4XX == 0) {
                    hubObj.messageId4X = null;
                }
                else {
                    hubObj.messageId4X = +this.selectedMessageId4XX;
                }
                if (+this.selectedMessageId5XX == 0) {
                    hubObj.messageId5X = null;
                }
                else {
                    hubObj.messageId5X = +this.selectedMessageId5XX;
                }
                if (+this.selectedMessageId2XX == 0) {
                    hubObj.messageId2X = null;
                }
                else {
                    hubObj.messageId2X = +this.selectedMessageId2XX;
                }
                this.connectionSuccessFlag == true
                    ? (hubObj.isTestConnection = 1)
                    : this.connectionSuccessFlag;
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                window.localStorage.setItem('hubObj', JSON.stringify(hubObj));
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe((ne) => {
                    debugger;
                    this.updateByHubId(this.hubId, hubObj);
                    this._primengProgressBarService.hide();
                    this.notifierService.showSuccess({
                        detail: 'ثبت اطلاعات دیتابیس باموفقیت انجام شد!',
                        life: 3000,
                    });
                    this.headerFieldset = 'Edit';
                    this.hubId = ne.hubId;
                    this.nextFlag = false;
                    this.connectionSuccessFlag = false;
                    this.connectionFailedFlag = false;
                    this.resultTestConnectionFlag = false;
                    this.testConectionFlag = false;
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
            else {
                debugger;
                const hubObj = new HubDto();
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                hubObj.userName = this.user;
                hubObj.password = this.password;
                if (+this.selectedMessageId4XX == 0) {
                    hubObj.messageId4X = null;
                }
                else {
                    hubObj.messageId4X = +this.selectedMessageId4XX;
                }
                if (+this.selectedMessageId5XX == 0) {
                    hubObj.messageId5X = null;
                }
                else {
                    hubObj.messageId5X = +this.selectedMessageId5XX;
                }
                if (+this.selectedMessageId2XX == 0) {
                    hubObj.messageId2X = null;
                }
                else {
                    hubObj.messageId2X = +this.selectedMessageId2XX;
                }
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.connectionFailedFlag == true
                    ? (hubObj.isTestConnection = 0)
                    : this.connectionFailedFlag;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe((ne) => {
                    this._primengProgressBarService.hide();
                    this.notifierService.showSuccess({
                        detail: 'اطلاعات دیتابیس باموفقیت ثبت شد!',
                        life: 3000,
                    });
                    this.headerFieldset = 'Edit';
                    this.hubId = ne.hubId;
                    this.connectionSuccessFlag = false;
                    this.connectionFailedFlag = false;
                    this.resultTestConnectionFlag = false;
                    this.testConectionFlag = false;
                    this.nextFlag = false;
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
        }
    }
    registerDataBase() {
        debugger;
        if (this.validationDataBaseInfo()) {
            if (this.allowCreateConnectionPool && this.dbEngineId == '2' && this.failoverList.length > 0) {
                this.register(1);
            }
            else {
                this.register(0);
            }
        }
    }
    testQuery() {
        debugger;
        const tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
        debugger;
        if (tempObjHub != undefined && tempObjHub != null) {
            if (this.hubId != null) {
                debugger;
                if (this.commandTypeId == '3') {
                    this.tempQuery = this.customQuery;
                }
                debugger;
                this.resultTestQueryFlag = true;
                this.queryFailedFlag = true;
                this.querySuccessFlag = false;
                this.nextFlag = true;
                this.tooltipNext = 'تست کوئری با موفقیت انجام نشده است!';
                debugger;
            }
        }
    }
    parseQuery() {
        this.param = '';
        this.lblObjectName = this.objectName;
        for (let k = 0; k < this.paramsList.length; k++) {
            this.paramsList.length > 0 && k != 0
                ? (this.param += ' AND ')
                : this.param;
            /* if ( this.dataType==0) {*/
            this.param +=
                this.paramsList[k].paramName +
                    ' = ' +
                    this.paramsList[k].paramValue +
                    ' ';
        }
        if (this.paramsList.length > 0) {
            debugger;
            this.param = ' WHERE ' + this.param;
            this.tempQuery =
                this.templates + ' ' + this.lblObjectName + this.param;
            debugger;
        }
        else {
            this.tempQuery = this.templates + ' ' + this.lblObjectName;
            debugger;
        }
    }
    checkDuplicate(arr, paramName, newObj) {
        debugger;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].paramName == newObj.paramName) {
                return false;
            }
        }
        return true;
    }
    checkSpDuplicate(arr, paramName, newObj) {
        debugger;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == newObj.name) {
                return false;
            }
        }
        return true;
    }
    fakeRegister() {
        debugger;
        if (this.validationParam()) {
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
            if (this.paramsList.length > 0) {
                if (this.checkDuplicate(this.paramsList, 'paramName', {
                    paramName: this.paramName,
                    paramValue: this.paramValue,
                    dataType: this.dataType,
                    status: this.status == true
                        ? (this.status = true)
                        : (this.status = false),
                })) {
                    this.paramsList.push({
                        paramName: this.paramName,
                        paramValue: this.paramValue,
                        dataType: this.dataType,
                        status: this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                    });
                    this.nextFlag = false;
                    this.paramName = null;
                    this.paramValue = null;
                }
                else {
                    this.notifierService.showError({
                        detail: 'امکان افزودن Param Name تکراری وجود ندارد!',
                    });
                }
            }
            else {
                this.paramsList.push({
                    paramName: this.paramName,
                    paramValue: this.paramValue,
                    dataType: this.dataType,
                    status: this.status == true
                        ? (this.status = true)
                        : (this.status = false),
                });
                this.paramName = null;
                this.paramValue = null;
                this.nextFlag = false;
            }
            // this.paramsList= [...new Set(this.paramsList)]
            //this.paramsList = Array.from(new Set(this.paramsList))
            for (let k = 0; k < this.paramsList.length; k++) {
                if ('row' in this.paramsList) {
                }
                else {
                    this.paramsList[k] = Object.assign(this.paramsList[k], {
                        row: k + 1,
                    });
                }
            }
        }
    }
    fakeParamSpRegister() {
        debugger;
        if (this.validationSpParam()) {
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
            if (this.spParamsList.length > 0) {
                if (this.checkSpDuplicate(this.spParamsList, 'paramName', {
                    name: this.paramName,
                    testValue: this.paramValue,
                    dataType: this.dataType,
                    paramType: +this.paramType,
                    endpintdetailId: null,
                    customParamId: null,
                    aliasOutputParamName: this.aliasOutputParamName,
                    status: this.status == true
                        ? (this.status = true)
                        : (this.status = false),
                })) {
                    this.spParamsList.push({
                        name: this.paramName,
                        testValue: this.paramValue,
                        dataType: this.dataType,
                        paramType: +this.paramType,
                        endpintdetailId: null,
                        customParamId: null,
                        aliasOutputParamName: this.aliasOutputParamName,
                        status: this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                    });
                    console.log('spList', this.spParamsList);
                    this.nextFlag = false;
                    this.paramName = null;
                    this.paramValue = null;
                    this.aliasOutputParamName = null;
                }
                else {
                    this.notifierService.showError({
                        detail: 'امکان افزودن Param Name تکراری وجود ندارد!',
                    });
                }
            }
            else {
                this.spParamsList.push({
                    name: this.paramName,
                    testValue: this.paramValue,
                    dataType: this.dataType,
                    paramType: +this.paramType,
                    endpintdetailId: null,
                    customParamId: null,
                    aliasOutputParamName: this.aliasOutputParamName,
                    status: this.status == true
                        ? (this.status = true)
                        : (this.status = false),
                });
                this.paramName = null;
                this.paramValue = null;
                this.aliasOutputParamName = null;
                this.nextFlag = false;
            }
            // this.paramsList= [...new Set(this.paramsList)]
            //this.paramsList = Array.from(new Set(this.paramsList))
            for (let k = 0; k < this.spParamsList.length; k++) {
                if ('row' in this.spParamsList) {
                }
                else {
                    this.spParamsList[k] = Object.assign(this.spParamsList[k], {
                        row: k + 1,
                        id: k + 1,
                    });
                }
            }
            console.log('spList', this.spParamsList);
        }
    }
    openMessage200() {
        this.message200Flag = true;
    }
    openMessage400() {
        this.message400Flag = true;
    }
    openMessage500() {
        this.message500Flag = true;
    }
    back() {
        this.commandTypeId != '1' && this.commandTypeId != null
            ? (this.commitFlag = false)
            : (this.commitFlag = true);
        this.activeIndex != 0 ? (this.activeIndex -= 1) : this.activeIndex;
        this.activeIndex != 0
            ? ((this.regTextDBFlag = false), (this.backShowFlag = true))
            : ((this.regTextDBFlag = true), (this.backShowFlag = false));
        if (this.activeIndex == 1) {
            this.titleFieldset = 'Test Database Info';
            this.regTextDBFlag = false;
            this.backShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.nextShowFlag = true;
            this.resultTestConnectionFlag = false;
            this.FinalRegistrationFlag = false;
            this.nextFlag = true;
            this.allDbList = [];
            //  this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
        }
        else if (this.activeIndex == 0) {
            this.titleFieldset = 'Register Database Info';
            this.fieldsetStyles = this.secondaryStyles;
            this.fieldsetStyles = this.primaryStyles;
            this.regTextDBFlag = true;
            this.backShowFlag = false;
            this.nextShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.FinalRegistrationFlag = false;
            this.connectionSuccessFlag = false;
            this.connectionFailedFlag = false;
            this.resultTestConnectionFlag = false;
            this.nextFlag = false;
        }
    }
    onContinuation() {
        debugger;
        this.commandTypeId != '1' && this.commandTypeId != null ? (this.commitFlag = false) :
            (this.commitFlag = true);
        this.activeIndex != 5 ? (this.activeIndex += 1) : this.activeIndex;
        this.activeIndex != 0 ? ((this.regTextDBFlag = false), (this.backShowFlag = true)) :
            ((this.regTextDBFlag = true), (this.backShowFlag = false));
        debugger;
        if (this.activeIndex == 0) {
            debugger;
            this.titleFieldset = 'Register Database Info';
            this.regTextDBFlag = true;
            this.backShowFlag = false;
            this.nextShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.previewFlag = false;
            this.nextFlag = false;
            this.resultTestConnectionFlag = false;
            this.FinalRegistrationFlag = false;
            this.fieldsetStyles = this.primaryStyles;
            debugger;
        }
        else if (this.activeIndex == 1) {
            debugger;
            this.nextShowFlag = false;
            if (this.validationDataBaseInfo()) {
                debugger;
                if (this.failoverList.length > 0) {
                    const allHaveHubId = this.failoverList.every(item => item.hubId !== undefined && item.hubId !== null);
                    if (allHaveHubId) {
                        debugger;
                        this.titleFieldset = 'Test Database Info';
                        this.fieldsetStyles = this.secondaryStyles;
                        this.regTextDBFlag = false;
                        this.backShowFlag = true;
                        this.nextFlag = true;
                        this.dbInfoFlag = true;
                        this.paramFlag = false;
                        this.previewFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.nextShowFlag = false;
                        debugger;
                        console.log(' this.allDbList1', this.allDbList);
                        console.log(' this.failoverList1', this.failoverList);
                        this.allDbList = this.failoverList.map(db => ({ ...db }));
                        const hasMain = this.allDbList.some(item => item.type === 'main');
                        debugger;
                        if (!hasMain) {
                            if (this.allDbList.length > 0) {
                                this.allDbList.unshift({
                                    hubId: this.hubId,
                                    protocolHost: '1',
                                    host: this.ip,
                                    portHost: this.port,
                                    specialUserName: this.user,
                                    specialPassword: this.password,
                                    type: 'main',
                                    status: true,
                                    id: 0,
                                });
                            }
                        }
                        let failoverCounter = 1;
                        for (let k = 0; k < this.allDbList.length; k++) {
                            const isMain = this.allDbList[k].type === 'main';
                            this.allDbList[k] = Object.assign(this.allDbList[k], {
                                row: k + 1,
                                type: isMain ? 'main' : `failover ${failoverCounter}`,
                            });
                            if (this.allDbList[k]) {
                                Object.assign(this.allDbList[k], { resultTest: '', resultTestTitle: '' });
                            }
                            if (!isMain) {
                                failoverCounter++;
                            }
                        }
                        console.log(' this.allDbList2', this.allDbList);
                        console.log(' this.failoverList2', this.failoverList);
                    }
                    else {
                        this.activeIndex -= 1;
                        this.regTextDBFlag = true;
                        this.backShowFlag = false;
                        this.nextShowFlag = true;
                        this.dbInfoFlag = true;
                        this.paramFlag = false;
                        this.previewFlag = false;
                        this.nextFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.notifierService.showError({
                            detail: 'لطفا ابتدا دیتا را ثبت نمائید!',
                        });
                    }
                }
                else if (this.allDbList.length == 0) {
                    this.titleFieldset = 'Test Database Info';
                    this.fieldsetStyles = this.secondaryStyles;
                    this.regTextDBFlag = false;
                    this.backShowFlag = true;
                    this.nextFlag = true;
                    this.dbInfoFlag = true;
                    this.paramFlag = false;
                    this.previewFlag = false;
                    this.resultTestConnectionFlag = false;
                    this.FinalRegistrationFlag = false;
                    this.nextShowFlag = false;
                    console.log(' this.allDbList1', this.allDbList);
                    console.log(' this.failoverList1', this.failoverList);
                    this.allDbList.push({
                        row: 1,
                        hubId: this.hubId,
                        protocolHost: '1',
                        host: this.ip,
                        portHost: this.port,
                        specialUserName: this.user,
                        specialPassword: this.password,
                        type: 'main',
                        status: true,
                        id: 0,
                    });
                }
                debugger;
            }
            else {
                this.activeIndex = 0;
                this.regTextDBFlag = true;
                this.backShowFlag = false;
                this.nextShowFlag = true;
                this.dbInfoFlag = true;
                this.paramFlag = false;
                this.previewFlag = false;
                this.nextFlag = false;
                this.resultTestConnectionFlag = false;
                this.FinalRegistrationFlag = false;
            }
            debugger;
        }
        /*  switch (this.commandTypeId) {
              case '1':
                  this.commitFlag = true

                  if (this.activeIndex == 2) {
                      this.regTextDBFlag = false;
                      this.nextFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = false
                      this.paramFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      if (this.inputUpdate != undefined) {
                          debugger
                          this.paramsList = this.inputUpdate.dataHubStaticElementDomains
                      }
                      this.nextFlag = false
                  }
                  else if (this.activeIndex == 3) {
                      this.resultTestConnectionFlag = false;
                      this.paramFlag = true
                      this.regTextDBFlag = false;
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = false
                      this.addFlag = false
                      this.previewFlag = false;
                      this.resultTestQueryFlag = false
                      //  this.resultTestQueryFlag == false ?this.nextFlag = true: this.nextFlag = false
                      this.querySuccessFlag == false ? (this.nextFlag = true , this.tooltipNext = "ابتدا کوئری را ایجاد و تست بنمائید") : this.nextFlag = false
                      this.FinalRegistrationFlag = false
                     /!* if (this.inputUpdate != undefined) {
                          debugger
                          this.parseQuery()
                          this.testQuery()
                      }*!/
                  } else if (this.activeIndex == 4) {
                      this.resultTestConnectionFlag = true;
                      this.paramFlag = false
                      this.paramFlag = true
                      this.addFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = true
                      this.regTextDBFlag = false;
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.spParamFlag = false
                  this.customQueryParamFlag = false
                  break;
              case '2':
                  if (this.activeIndex == 0) {
                      debugger
                      this.regTextDBFlag = true;
                      this.backShowFlag = false;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = true
                      this.paramFlag = false
                      this.previewFlag = false;
                      this.nextFlag = false
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      debugger
                  }
                  else if (this.activeIndex == 1) {
                      debugger
                      if (this.validationDataBaseInfo()) {
                          debugger
                          this.regTextDBFlag = false;
                          this.backShowFlag = true;
                          this.nextShowFlag = true;
                          this.nextFlag = false
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.resultTestConnectionFlag = false;
                          this.connectionSuccessFlag == false
                          this.connectionFailedFlag == false
                          this.FinalRegistrationFlag = false
                          this.customQueryFlag = false
                          this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
                          debugger
                      } else {
                          this.activeIndex = 0
                          this.regTextDBFlag = true;
                          this.backShowFlag = false;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.nextFlag = false
                          this.customQueryFlag = false
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                      }
                      debugger
                  }
                  else if (this.activeIndex == 2) {
                      this.resultTestConnectionFlag = false;
                      this.spTestFlag = true
                      this.spParamFlag = true;
                      this.nextShowFlag = false;
                      this.backShowFlag = true;
                      this.dbInfoFlag = false
                      this.regTextDBFlag = false;
                      this.previewFlag = false;
                      this.nextFlag=true
                      this.tooltipNext='ابتدا پروسیجر را تست بنمائید!'
                      this.resultTestQueryFlag = false
                      this.querySuccessFlag == false
                      this.queryFailedFlag == false
                     /!* if (this.inputUpdate != undefined) {
                          debugger
                          this.testQuery()
                      }*!/
                      this.FinalRegistrationFlag = false
                  }
                  else if (this.activeIndex == 3) {
                      this.spTestFlag=false
                      this.resultTestConnectionFlag = true;
                      this.paramFlag = false
                      this.addFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = true
                      this.regTextDBFlag = false;
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.paramFlag = false
                  this.customQueryParamFlag = false
                  break;
              case '3':
                  if (this.activeIndex == 0) {
                      this.regTextDBFlag = false;
                      this.backShowFlag = true;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = false
                      this.paramFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      this.customQueryInputFlag = false
                  } else if (this.activeIndex == 1) {
                      if (this.validationDataBaseInfo()) {
                          this.regTextDBFlag = false;
                          this.backShowFlag = true;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                          this.nextFlag = true
                          this.customQueryInputFlag = false
                        //   this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
                      } else {
                          this.activeIndex = 0
                          this.regTextDBFlag = true;
                          this.backShowFlag = false;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.nextFlag = false
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                          this.customQueryInputFlag = false
                      }
                      debugger
                  } else if (this.activeIndex == 2) {
                      debugger
                      this.regTextDBFlag = false;
                      this.nextFlag = true
                      this.customQueryInputFlag = true
                      this.tooltipNext = "تست کوئری با موفقیت انجام نشده است!"
                      this.backShowFlag = true;
                      this.dbInfoFlag = false
                      this.customQueryParamFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      this.resultTestQueryFlag = false
                      this.nextShowFlag = false;
                      /!*if (this.inputUpdate != undefined) {
                          this.customQuery = this.inputUpdate.objectName
                          debugger
                          this.testQuery();

                      }
  *!/
                  } else if (this.activeIndex == 3) {
                      this.nextShowFlag = false
                      this.dbInfoFlag = true
                      this.resultTestConnectionFlag = true;
                      this.regTextDBFlag = false;
                      this.paramFlag = false
                      this.addFlag = false
                      this.customQueryInputFlag = true
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.spParamFlag = false
                  this.paramFlag = false
                  break
          }*/
    }
    updateByHubId(hubId, changes) {
        this.allDbList = [];
        console.log(' this.allDbList1 ', this.allDbList);
        this.allDbList = this.allDbList.map(x => x.hubId === hubId ? { ...x, ...changes } : x);
        console.log(' this.allDbList2 ', this.allDbList);
    }
    validationDataBaseInfo() {
        if (!this.hubTitle) {
            this.notifierService.showError({
                detail: 'لطفا عنوان هاب را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.dbEngineId) {
            this.notifierService.showError({
                detail: 'لطفا dbEngine را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.dbName) {
            this.notifierService.showError({
                detail: 'لطفا dbName را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.ip) {
            this.notifierService.showError({
                detail: 'لطفا ip را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.commonValidationsService.checkIpOrDomain(this.ip)) {
            this.notifierService.showError({
                detail: 'لطفا IP یا دامنه خود را به فرمت صحیح وارد کنید!',
                life: 3000,
            });
        }
        else if (!this.user) {
            this.notifierService.showError({
                detail: 'لطفا user را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.password) {
            this.notifierService.showError({
                detail: 'لطفا password را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    validationfailover() {
        if (!this.hubTitle) {
            this.notifierService.showError({
                detail: 'لطفا عنوان هاب را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.dbEngineId) {
            this.notifierService.showError({
                detail: 'لطفا dbEngine را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.dbName) {
            this.notifierService.showError({
                detail: 'لطفا dbName را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.ip) {
            this.notifierService.showError({
                detail: 'لطفا ip را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.user) {
            this.notifierService.showError({
                detail: 'لطفا user را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.password) {
            this.notifierService.showError({
                detail: 'لطفا password را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    validationParam() {
        if (!this.paramName) {
            this.notifierService.showError({
                detail: 'لطفا paramName را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.paramValue) {
            this.notifierService.showError({
                detail: 'لطفا paramValue را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    validationSpParam() {
        debugger;
        if (!this.paramName) {
            this.notifierService.showError({
                detail: 'لطفا paramName را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.paramValue) {
            this.notifierService.showError({
                detail: 'لطفا paramValue را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.aliasOutputParamName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان خروجی را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    activeFailover(failover) {
        if (failover?.id == undefined || failover?.id == null) {
            const index = this.failoverList.findIndex(item => item.row === failover.row);
            if (index !== -1) {
                failover.status = true;
                Object.assign(this.failoverList[index], failover);
                this.failoverList = [...this.failoverList];
            }
        }
        else {
            this.messagesApiFacadeService.failoverStatus(failover?.id, 1).subscribe(s => {
                this.messagesApiFacadeService.getFailover(this.inputUpdate.hubId).subscribe(respons => {
                    this.failoverList = respons;
                    this.failoverList = this.failoverList.map(item => ({
                        hubId: item.hubId,
                        protocolHost: item.protocol === 'tcp' ? '1' : 'tcp',
                        host: item.host,
                        portHost: item.portNumber,
                        specialUserName: item.specialUserName,
                        specialPassword: item.specialPassword,
                        status: item.status === 1,
                        id: item.id,
                    }));
                    this.failoverList.length > 0 ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
                    for (let k = 0; k < this.failoverList.length; k++) {
                        this.failoverList[k] = Object.assign(this.failoverList[k], {
                            row: k + 1,
                        });
                    }
                });
            });
        }
    }
    dactiveFailover(failover) {
        if (failover?.id == undefined || failover?.id == null) {
            const index = this.failoverList.findIndex(item => item.row === failover.row);
            if (index !== -1) {
                failover.status = false;
                Object.assign(this.failoverList[index], failover);
                this.failoverList = [...this.failoverList];
            }
        }
        else {
            this.messagesApiFacadeService.failoverStatus(failover?.id, 0).subscribe(s => {
                this.messagesApiFacadeService.getFailover(this.inputUpdate.hubId).subscribe(respons => {
                    this.failoverList = respons;
                    this.failoverList = this.failoverList.map(item => ({
                        hubId: item.hubId,
                        protocolHost: item.protocol === 'tcp' ? '1' : 'tcp',
                        host: item.host,
                        portHost: item.portNumber,
                        specialUserName: item.specialUserName,
                        specialPassword: item.specialPassword,
                        status: item.status === 1,
                        id: item.id,
                    }));
                    this.failoverList.length > 0 ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
                    for (let k = 0; k < this.failoverList.length; k++) {
                        this.failoverList[k] = Object.assign(this.failoverList[k], {
                            row: k + 1,
                        });
                    }
                });
            });
        }
    }
    showUpdate(failover) {
        // const index = this.failoverList.findIndex(item => item.row === failover.row);
        // if (index !== -1) {
        this.addFailoverFlag = false;
        this.host = failover.host;
        this.portHost = failover.portHost;
        this.protocolHost = failover.protocolHost;
        this.protocolHost = failover.protocolHost;
        this.specialUserName = failover.specialUserName;
        this.specialPassword = failover.specialPassword;
        // this.status=failover.status
        // this.failoverList[index] = { ...failover };
        // this.failoverList = [...this.failoverList];
        // }
    }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        debugger;
        localStorage.removeItem('faloverObjsList');
        //  this.apiGatewayService.updateApprovalObjHub({})
        this.hubId = null;
        this.commitFlag = true;
        this.itemsFailover = [
            {
                items: [
                    {
                        label: 'حذف',
                        command: () => {
                            this.deleteFailover(this.tempFailover);
                        },
                    }, {
                        label: 'فعالسازی',
                        command: () => {
                            this.activeFailover(this.tempFailover);
                        },
                    },
                    {
                        label: 'غیرفعالسازی',
                        command: () => {
                            this.dactiveFailover(this.tempFailover);
                        },
                    },
                ],
            },
            {
                separator: true
            },
            {
                items: [
                    {
                        label: this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.itemsHub = [
            {
                label: 'ثبت اطلاعات دیتابیس',
                content: 'فرم وارد کردن اطلاعات دیتابیس',
                command: () => {
                    this.activeIndex = 0;
                },
            },
            {
                label: 'تست اتصال به دیتابیس',
                content: 'نتیجه‌ی تست اتصال به دیتابیس نمایش داده خواهد شد',
                command: () => {
                    this.activeIndex = 1;
                },
            },
        ];
        if (this.inputUpdate != undefined) {
            debugger;
            this.headerFieldset = 'Edit';
            this.detailsBreadObject = this.chooseBread('updateHubBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.headerRegHub = 'ویرایش هاب داده';
            this.nextShowFlag = true;
            this.backShowFlag = false;
            this.nextFlag = false;
            this.hubId = this.inputUpdate.hubId;
            this.dbEngineId =
                this.inputUpdate.dbEngineId != null
                    ? this.inputUpdate.dbEngineId.toString()
                    : this.inputUpdate.dbEngineId;
            this.commandTypeId =
                this.inputUpdate.commandTypeId != null
                    ? this.inputUpdate.commandTypeId.toString()
                    : null;
            debugger;
            switch (this.commandTypeId) {
                case '1':
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به پایگاه داده با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'لیست پارامترهای کوئری',
                            content: 'نمایش لیست پارامترهای مورد استفاده در کوئری',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: 'تست کوئری',
                            content: 'اجرای کوئری و نمایش نتیجه برای بررسی صحت',
                            command: () => {
                                this.activeIndex = 3;
                            },
                        },
                    ];
                    this.commitFlag = true;
                    this.objectName = this.inputUpdate.objectName;
                    this.customQueryFlag = false;
                    this.handlSpaseFlag = false;
                    this.textSqlFlag = true;
                    this.spFlag = false;
                    break;
                case '2':
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست پروسیجر',
                            content: 'اجرای پروسیجر و نمایش نتایج آن',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    this.commitFlag = false;
                    this.objectName = this.inputUpdate.objectName;
                    this.customQueryFlag = false;
                    this.handlSpaseFlag = true;
                    this.textSqlFlag = false;
                    this.spFlag = true;
                    break;
                case '3':
                    debugger;
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست کوئری',
                            content: 'اجرای کوئری و نمایش نتیجه برای بررسی صحت',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    debugger;
                    this.commitFlag = false;
                    this.tempCustomQuery = this.inputUpdate.objectName;
                    this.customQuery = '';
                    this.customQueryFlag = true;
                    this.objectName = ' ';
                    this.textSqlFlag = false;
                    this.spFlag = false;
                    this.handlSpaseFlag = false;
                    break;
                case null:
                    break;
            }
            this.dbName = this.inputUpdate.dbName;
            this.ip = this.inputUpdate.ip;
            this.inputUpdate.portNumber != undefined
                ? (this.port = this.inputUpdate.portNumber.toString())
                : this.inputUpdate.portNumber;
            this.user = this.inputUpdate.userName;
            this.hubTitle = this.inputUpdate.hubTitle;
            this.password = this.inputUpdate.password;
            this.passwordLbl = '*'.repeat(this.inputUpdate.password.length);
            this.driverName = '-';
            this.inputUpdate.autoCommit === 1
                ? (this.autoCommit = true)
                : (this.autoCommit = false);
            this.connectionPoolSize = this.inputUpdate.connectionPoolSize;
            this.inputUpdate.allowCreateConnectionPool === 1
                ? (this.allowCreateConnectionPool = true)
                : (this.allowCreateConnectionPool = false);
            this.ipLbl = this.ip + ':';
            this.portLbl = this.port + ';';
            this.userLbl = this.user + ';';
            if (this.inputUpdate.messageId2X != null && this.inputUpdate.messageId2X != 0) {
                debugger;
                this.icon200_val = 'pi pi-check';
                this.messageId2X = this.inputUpdate.messageId2X;
                this.selectedMessageId2XX = this.inputUpdate;
            }
            else {
                this.icon200_val = null;
            }
            if (this.inputUpdate.messageId4X != null && this.inputUpdate.messageId4X != 0) {
                debugger;
                this.icon400_val = 'pi pi-check';
                this.messageId4X = this.inputUpdate.messageId4X;
                this.selectedMessageId4XX = this.inputUpdate;
            }
            else {
                debugger;
                this.icon400_val = null;
            }
            if (this.inputUpdate.messageId5X != null && this.inputUpdate.messageId5X != 0) {
                debugger;
                this.icon500_val = 'pi pi-check';
                this.messageId5X = this.inputUpdate.messageId5X;
                this.selectedMessageId5XX = this.inputUpdate;
            }
            else {
                this.icon500_val = null;
            }
            debugger;
            debugger;
            debugger;
            window.localStorage.setItem('hubObj', JSON.stringify(this.inputUpdate));
            this.selectedMessageId2XX != undefined &&
                this.selectedMessageId2XX != null
                ? (this.icon200_val = 'pi pi-check')
                : (this.icon200_val = null);
            this.selectedMessageId4XX != undefined &&
                this.selectedMessageId4XX != null
                ? (this.icon400_val = 'pi pi-check')
                : (this.icon400_val = null);
            this.selectedMessageId5XX != undefined &&
                this.selectedMessageId5XX != null
                ? (this.icon500_val = 'pi pi-check')
                : (this.icon500_val = null);
            debugger;
            this.nextFlag = false;
            this.messagesApiFacadeService.getFailover(this.inputUpdate.hubId).subscribe(respons => {
                this.failoverList = respons;
                this.failoverList = this.failoverList.map(item => ({
                    hubId: item.hubId,
                    protocolHost: item.protocol === 'tcp' ? '1' : 'tcp',
                    host: item.host,
                    portHost: item.portNumber,
                    specialUserName: item.specialUserName,
                    specialPassword: item.specialPassword,
                    status: item.status === 1,
                    id: item.id,
                }));
                this.failoverList.length > 0 ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
                for (let k = 0; k < this.failoverList.length; k++) {
                    this.failoverList[k] = Object.assign(this.failoverList[k], {
                        row: k + 1,
                    });
                }
            });
        }
        else {
            this.dbEngineId = null;
            this.commandTypeId = '1';
            this.dbName = null;
            this.driverName = '-';
            this.ip = null;
            this.port = null;
            this.user = null;
            this.password = null;
            this.objectName = null;
            //  this.canCommit = null
            this.autoCommit = null;
            this.connectionPoolSize = 10;
            this.allowCreateConnectionPool = null;
            this.nextFlag = true;
            this.tooltipNext = 'ابتدا اطلاعات دیتابیس را ثبت بنمائید';
            this.ipLbl = '';
            this.portLbl = '';
            this.userLbl = '';
            this.passwordLbl = '';
            this.detailsBreadObject = this.chooseBread('addHubBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.failoverList.length > 0 ? this.accordionValue = ['0', '1'] : this.accordionValue = ['0'];
            for (let k = 0; k < this.failoverList.length; k++) {
                this.failoverList[k] = Object.assign(this.failoverList[k], {
                    row: k + 1,
                });
            }
        }
    }
    deleteParam(param) {
        const index = this.paramsList.findIndex((obj) => obj.row === param.row);
        if (index > -1) {
            this.paramsList.splice(index, 1);
            for (let k = 0; k < this.paramsList.length; k++) {
                this.paramsList[k] = Object.assign(this.paramsList[k], {
                    row: k + 1,
                });
            }
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'addHubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.addDataHub'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'updateHubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.editDataHub'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
    onClose(e) {
        this.close.emit('close');
    }
    setRecord(failover) {
        this.tempFailover = failover;
    }
    testSp() {
    }
};
__decorate([
    ViewChild('myForm', { static: true })
], RegisterHubComponent.prototype, "myForm", void 0);
__decorate([
    Output()
], RegisterHubComponent.prototype, "close", void 0);
__decorate([
    Input()
], RegisterHubComponent.prototype, "inputApiHub", void 0);
__decorate([
    Input()
], RegisterHubComponent.prototype, "inputUpdate", void 0);
__decorate([
    Input('ngModel')
], RegisterHubComponent.prototype, "model", void 0);
__decorate([
    Output('ngModelChange')
], RegisterHubComponent.prototype, "update", void 0);
RegisterHubComponent = __decorate([
    Component({
        selector: 'app-register-hub',
        templateUrl: './register-hub.component.html',
        styleUrls: ['./register-hub.component.scss'],
        standalone: true,
        imports: [
            ProtocolsPipe,
            BreadcrumbsComponent,
            Panel,
            FormsModule,
            InputText,
            Tooltip,
            ButtonDirective,
            DropdownModule,
            Checkbox,
            NgStyle,
            Password,
            Message,
            NgIf,
            NgClass,
            TableModule,
            DataTypeHubPipe,
            EnStatusPipe,
            MatTooltip,
            TranslocoPipe,
            MatIcon,
            ParamTypePipe,
            Dialog,
            MoreChar19Pipe,
            MessagesCategoryPipe,
            Ripple,
            ToggleSwitch,
            Fieldset,
            Toast,
            Textarea,
            Stepper,
            StepList,
            Step,
            NgForOf,
            Accordion,
            AccordionContent,
            AccordionHeader,
            AccordionPanel,
            KeyFilter,
            Menu,
            ConfirmDialog,
            MessageSelectorComponent,
        ],
        providers: [ConfirmationService],
    })
], RegisterHubComponent);
export { RegisterHubComponent };
