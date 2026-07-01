import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../../constants/ApiGatewayConstants';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { NgIf } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { TranslocoPipe } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { MatTooltip } from '@angular/material/tooltip';
import { Checkbox } from 'primeng/checkbox';
import { TableIdPipe } from '../../../../../shared/pipes/tableId.pipe';
import { MessagesCategoryPipe } from '../../../../../shared/pipes/messagesCategory.pipe';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { KeyFilter } from 'primeng/keyfilter';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { MessageSelectorComponent } from '../../../../../shared/components/message-selector/message-selector.component';
let ApiRuleConditionRegisterComponent = class ApiRuleConditionRegisterComponent {
    route;
    messagesApiFacadeService;
    transloco;
    apiGatewayService;
    _primengProgressBarService;
    validatorService;
    notifierService;
    close = new EventEmitter();
    inputreg;
    cust_alphanumEn = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa = ApiGatewayConstants.cust_alphanumFa;
    conditionTypeOptions = ApiGatewayConstants.conditionType;
    conditionFieldTypeOptions = ApiGatewayConstants.conditionFieldType;
    ruleConditionOptions = ApiGatewayConstants.conditions;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    functionTypeOptions = [{ name: '-', code: null }];
    functionType = null;
    conditionType = null;
    conditionName = null;
    conditionFieldType = null;
    conditionValue = null;
    comparableFieldTypeForFinalValue = null;
    endIndex = null;
    startIndex = null;
    conditionValuePKeyFilter = null;
    messageId = null;
    status;
    nodePath;
    messageDetailFlag = false;
    ruleCondition = null;
    dialogMessageFlag = false;
    messagesList = [];
    title;
    tableId;
    text;
    codeMessage = null;
    titleMessage = null;
    tableIdMessage = null;
    typeMessage = null;
    textMessage = null;
    textENMessage = null;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    removeMessage = false;
    registerMessageTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
        messageId: null,
    };
    registerRulConditionObject = {
        ruleId: null,
        ruleCondition: null,
        conditionValue: '',
        conditionType: null,
        conditionName: '',
        conditionFieldType: null,
        messageId: null,
        status: null,
        functionType: null,
        conditionValue2: '',
        functionStr: '',
        comparableFieldTypeForFinalValue: null,
        isUsed: null,
        bodyNodePath: null,
    };
    expressionNeedRebuild = true;
    first = 0;
    rows = 10;
    paginationLabel = this.transloco.translate('label.pagination.table');
    detailsBreadObject = [];
    clientName;
    ruleName;
    apiName;
    moduleTitle;
    apiTitle;
    partyTitle;
    partyBase;
    clientBase;
    accessBase;
    moduleBase;
    functionStr;
    conditionValue2;
    expressionFlag = false;
    substringFlag = false;
    mathFlag = true;
    lengthFlag = false;
    splitFlag = false;
    conditionValueTypeDisabled = false;
    ruleConditionFlag = true;
    nodePathFlag = false;
    constructor(route, messagesApiFacadeService, transloco, apiGatewayService, _primengProgressBarService, validatorService, notifierService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.transloco = transloco;
        this.apiGatewayService = apiGatewayService;
        this._primengProgressBarService = _primengProgressBarService;
        this.validatorService = validatorService;
        this.notifierService = notifierService;
    }
    onChildSelectionCleared(flag) {
        if (!flag)
            return;
        this.removeMessage = true;
        this.messageId = null;
        this.title = null;
        this.text = null;
        this.tableId = null;
    }
    onMessageSelected(message) {
        debugger;
        debugger;
        debugger;
        console.log('✅ LAST SELECTED MESSAGE:', message);
        this.codeMessage = message.code;
        this.messageId = message.messageid;
        this.titleMessage = message.title;
        this.title = message.title;
        this.tableIdMessage = message.tableid;
        this.tableId = message.tableid;
        this.messageId = message.messageid;
        this.text = message.text;
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    changeNodePath() {
        if (this.nodePathFlag != true) {
            this.nodePath = null;
        }
        else {
            this.functionType = null;
            this.functionStr = null;
            this.substringFlag = false;
            this.splitFlag = false;
            this.expressionFlag = false;
            this.conditionValue = null;
            this.conditionValue2 = null;
            this.startIndex = null;
            this.endIndex = null;
            this.conditionFieldType == '2' ? this.comparableFieldTypeForFinalValue = null : this.comparableFieldTypeForFinalValue;
        }
    }
    chooseBread(caseBase) {
        debugger;
        switch (caseBase) {
            case 'rulesBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/bulletin.png',
                        rout_index0: '/home',
                        isActive0: false,
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.rule'),
                        rout_index1: '/rule',
                        isActive1: false,
                        img_index1: 'assets/icons/rule.png',
                        label_Detail_index1: null,
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.registerRulesCondition'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'ruleClientBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.clients'),
                        rout_index0: '',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.clients.rule'),
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.registerRulesCondition'),
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
                        label_index0: this.transloco.translate('menu.clients'),
                        rout_index0: '',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.accessList'),
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.module.api'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.transloco.translate('menu.accessList') + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.oneRule'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.registerRulesCondition'),
                        rout_index5: '/register',
                        isActive5: true,
                        img_index5: 'assets/icons/save.png',
                    },
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
                        label_index1: this.transloco.translate('menu.module'),
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.api'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.oneRule'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.registerRulesCondition'),
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
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.party'),
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                        label_Detail_index1: null,
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.module'),
                        rout_index2: '/api-gateway/home/party/module',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        isActive2: false,
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.module.api'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.rule'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index5: null,
                        isActive5: false,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 6,
                        label_index6: this.transloco.translate('breadcrumbs.registerRulesCondition'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/save.png',
                    },
                ];
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.accessList'),
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.module.api'),
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.rulesApi'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/rule.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.ruleName + ')',
                        img_index3: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('breadcrumbs.registerRulesCondition'),
                        rout_index4: '/register',
                        isActive4: true,
                        img_index4: 'assets/icons/save.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientEndpointBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/bulletin.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.clients'),
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.module.api'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.clients'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.clients.rule'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.clientName + ')',
                        img_index4: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 6,
                        label_index6: this.transloco.translate('breadcrumbs.registerRulesCondition'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/save.png',
                    },
                ];
            default:
                return null;
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        debugger;
        if (this.inputreg != undefined) {
            debugger;
            if (this.inputreg.ruleBase) {
                debugger;
                this.ruleName = this.inputreg?.ruleName;
                this.partyTitle = this.inputreg?.partyTitle;
                this.moduleTitle = this.inputreg?.moduleTitle;
                this.apiTitle = this.inputreg?.apiTitle;
                this.apiName = this.inputreg?.apiName;
                this.detailsBreadObject = this.chooseBread('rulesBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else {
                debugger;
                this.partyBase = this.inputreg?.partyBase;
                this.clientBase = this.inputreg?.clientBase;
                this.accessBase = this.inputreg?.accessBase;
                this.moduleBase = this.inputreg?.moduleBase;
                this.ruleName = this.inputreg?.ruleName;
                this.partyTitle = this.inputreg?.partyTitle;
                this.moduleTitle = this.inputreg?.moduleTitle;
                this.apiTitle = this.inputreg?.apiTitle;
                this.clientName = this.inputreg?.clientName;
                this.apiName = this.inputreg?.apiName;
                if (this.partyBase) {
                    this.detailsBreadObject = this.chooseBread('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.moduleBase) {
                    this.detailsBreadObject = this.chooseBread('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.clientBase) {
                    this.detailsBreadObject = this.chooseBread('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
                else if (this.accessBase) {
                    this.detailsBreadObject = this.chooseBread('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
                }
            }
        }
        this.scrollTop();
        this.tableIdMessage = '8';
        this.status = true;
        if (this.title != undefined) {
            if (this.title.length > 22) {
                this.widthTitle = 100;
            }
        }
        if (this.tableId != undefined) {
            if (this.tableId.length > 22) {
                this.widthTableId = 100;
            }
        }
        if (this.text != undefined) {
            if (this.text.length > 22) {
                this.widthText = 100;
            }
        }
        if (this.messageId != undefined) {
            if (this.messageId.toString().length > 22) {
                this.widthMessageId = 100;
            }
        }
        if (this.inputreg != undefined) {
            debugger;
            if (this.inputreg?.ruleBase) {
                this.detailsBreadObject = this.inputreg.detailsBreadObject;
            }
            else {
                this.detailsBreadObject = this.inputreg.detailsBreadObject;
            }
        }
    }
    onChangeConditionFieldType(event) {
        this.markExpressionDirty();
        this.functionStr = '';
        this.expressionFlag = false;
        if (event.value == '1') {
            this.mathFlag = true;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeNumberOptions;
            this.comparableFieldTypeForFinalValue = '1';
            this.conditionValueTypeDisabled = true;
        }
        else if (event.value == '2') {
            this.mathFlag = false;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeStringOptions;
            this.comparableFieldTypeForFinalValue = null;
            this.conditionValueTypeDisabled = false;
        }
        else {
            this.functionTypeOptions = [];
            this.comparableFieldTypeForFinalValue = null;
            this.conditionValueTypeDisabled = false;
        }
        this.functionType = null;
    }
    fillExpression() {
        debugger;
        // اگر نام شرط وارد نشده، از مقدار پیش‌فرض استفاده می‌کنیم تا خطا ندهد
        const varName = this.conditionName?.trim() || 'value';
        const funcType = this.functionType != null ? String(this.functionType) : null; // 👈 تبدیل به string
        const operator = this.ruleCondition ?? null;
        const compareValue = this.conditionValue ?? '';
        const startIndex = this.startIndex ?? 0;
        const endIndex = this.endIndex ?? '';
        const conditionValueType = this.comparableFieldTypeForFinalValue;
        const conditionValue2 = this.conditionValue2;
        console.log('🟦 [DEBUG fillExpression] Inputs =>', {
            varName,
            funcType,
            operator,
            compareValue,
            startIndex,
            endIndex,
            conditionValueType,
            conditionValue2: conditionValue2,
        });
        // ساخت رشته نهایی با استفاده از تابع اصلی
        this.functionStr = this.buildStringExpression(varName, funcType, operator, compareValue, conditionValueType, startIndex, endIndex, conditionValue2);
        this.expressionNeedRebuild = false;
    }
    markExpressionDirty() {
        if (this.functionType != 6) {
            this.expressionNeedRebuild = true;
        }
    }
    onChangeFunctionType(event) {
        this.markExpressionDirty();
        this.functionStr = '';
        this.expressionFlag = false;
        switch (event.value) {
            case '1':
                this.expressionFlag = false;
                this.substringFlag = false;
                this.ruleConditionFlag = true;
                this.lengthFlag = true;
                this.splitFlag = false;
                this.conditionValueTypeDisabled = true;
                this.comparableFieldTypeForFinalValue = '1';
                this.functionStr = null;
                break;
            case '3':
                this.expressionFlag = false;
                this.substringFlag = true;
                this.ruleCondition = null;
                this.ruleConditionFlag = false;
                this.splitFlag = false;
                this.conditionValueTypeDisabled = false;
                this.comparableFieldTypeForFinalValue = null;
                this.functionStr = null;
                break;
            case '5':
                this.expressionFlag = false;
                this.splitFlag = true;
                this.substringFlag = false;
                this.conditionValueTypeDisabled = false;
                this.comparableFieldTypeForFinalValue = null;
                this.functionStr = null;
                break;
            case '6':
                this.expressionFlag = true;
                this.ruleConditionFlag = false;
                this.ruleCondition = null;
                this.conditionValue = null;
                this.conditionValueTypeDisabled = false;
                this.mathFlag = false;
                this.substringFlag = false;
                this.ruleCondition = null;
                this.startIndex = null;
                this.endIndex = null;
                this.comparableFieldTypeForFinalValue = null;
                this.conditionName = null;
                this.functionStr = null;
                this.conditionValue2 = null;
                break;
            case '7':
                this.expressionFlag = false;
                this.splitFlag = false;
                this.substringFlag = false;
                this.functionStr = null;
                break;
            case '8':
                this.expressionFlag = false;
                this.splitFlag = false;
                this.substringFlag = false;
                this.functionStr = null;
                break;
            case '9':
                this.expressionFlag = false;
                this.splitFlag = false;
                this.substringFlag = false;
                this.functionStr = null;
                break;
            case '10':
                this.expressionFlag = false;
                this.splitFlag = false;
                this.substringFlag = false;
                this.functionStr = null;
                break;
            case '11':
                this.expressionFlag = false;
                this.splitFlag = false;
                this.substringFlag = false;
                this.functionStr = null;
                break;
            case null:
                this.functionStr = null;
                this.substringFlag = false;
                this.splitFlag = false;
                this.expressionFlag = false;
                this.conditionValue = null;
                this.conditionValue2 = null;
                this.startIndex = null;
                this.endIndex = null;
                this.conditionFieldType == '2' ? this.comparableFieldTypeForFinalValue = null : this.comparableFieldTypeForFinalValue;
        }
        /*  if(event.value=='6'){

          }else{
              this.expressionFlag=false
          }*/
    }
    buildStringExpression(varName, funcType, operator, conditionValue, conditionValueType, startIndex, endIndex, conditionValue2) {
        debugger;
        console.log('🟨 [DEBUG buildStringExpression] Incoming Params =>', {
            varName,
            funcType,
            operator,
            compareValue: conditionValue,
            conditionValueType,
            startIndex,
            endIndex,
        });
        const opSymbol = (op) => {
            switch (String(op)) {
                case '1':
                    return '>';
                case '2':
                    return '<';
                case '3':
                    return '==';
                case '4':
                    return '>=';
                case '5':
                    return '<=';
                case '6':
                    return '!=';
                default:
                    return '';
            }
        };
        // ✅ نسخه اصلاح‌شده
        const formattedValue = conditionValueType == '1' ? (Number(conditionValue)) : `'${conditionValue}'`;
        console.log('🟩 [DEBUG] formattedValue =>', formattedValue, '| Type:', typeof formattedValue);
        let expression = '';
        const start = startIndex ?? 0;
        switch (String(funcType)) {
            case '1':
                expression = `${varName}.length`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${formattedValue}`;
                }
                break;
            case '3':
                const end = endIndex ?? `${varName}.length`;
                expression = `${varName}.substring(${start}, ${end})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${formattedValue}`;
                }
                break;
            case '5':
                expression = `${varName}.split(/[.,; ]+/)[${start}]`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${formattedValue}`;
                }
                break;
            case '6':
                expression = `${conditionValue ?? ''}`;
                break;
            case '7':
                expression = `(${varName}) + (${formattedValue})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${conditionValue2}`;
                }
                break;
            case '8':
                expression = `(${varName}) - (${formattedValue})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${conditionValue2}`;
                }
                break;
            case '9':
                expression = `(${varName}) * (${formattedValue})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${conditionValue2}`;
                }
                break;
            case '10':
                expression = `(${varName}) / (${formattedValue})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${conditionValue2}`;
                }
                break;
            case '11':
                expression = `(${varName}) % (${formattedValue})`;
                if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                    expression += ` ${opSymbol(operator)} ${conditionValue2}`;
                }
                break;
            default:
                /*        if (operator && conditionValue !== undefined && conditionValue !== null && conditionValue !== '') {
                            expression = `${varName} ${opSymbol(operator)} ${formattedValue}`;
                        } else {
                            expression = varName;
                        }
                        break;*/
                if (operator) {
                    expression = `${varName} ${opSymbol(operator)} ${formattedValue}`;
                }
                else {
                    expression = varName;
                }
                break;
        }
        console.log('✅ [DEBUG buildStringExpression] Final Expression =>', expression);
        return expression;
    }
    deleteMessage() {
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
    }
    showMessage() {
        debugger;
        this.dialogMessageFlag = true;
        this.messagesList = [];
    }
    onCancel() {
        this.close.emit('close');
    }
    onRegister() {
        if (this.validation()) {
            this.apiGatewayService.currentApprovalStageRuleId.subscribe((a) => {
                this.registerRulConditionObject.ruleId = a;
            });
            this.messageId !== null ? (this.registerRulConditionObject.messageId = this.messageId) : (this.registerRulConditionObject.messageId = null);
            this.registerRulConditionObject.ruleCondition = this.ruleCondition;
            this.functionType != null ? (this.registerRulConditionObject.functionType = Number(this.functionType)) : (this.registerRulConditionObject.functionType = null);
            this.registerRulConditionObject.conditionValue = this.conditionValue;
            this.registerRulConditionObject.conditionType = this.conditionType;
            this.conditionType == '1' ? this.registerRulConditionObject.bodyNodePath = this.nodePath : delete this.registerRulConditionObject?.bodyNodePath;
            this.registerRulConditionObject.conditionName = this.conditionName;
            this.registerRulConditionObject.conditionFieldType = this.conditionFieldType;
            this.registerRulConditionObject.conditionValue2 = this.conditionValue2;
            this.registerRulConditionObject.isUsed = 0;
            this.registerRulConditionObject.functionStr = this.functionStr;
            this.registerRulConditionObject.comparableFieldTypeForFinalValue = this.comparableFieldTypeForFinalValue;
            this.registerRulConditionObject.status = 1;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerRuleCondition(this.registerRulConditionObject).subscribe((a) => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    validation() {
        let res;
        this.functionStr ? res = this.validatorService.isValidExpression(this.functionStr) : null;
        if (!this.conditionType) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionType'),
                life: 3000,
            });
            return false;
        }
        else if (!this.conditionFieldType) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionFieldType'),
                life: 3000,
            });
            return false;
        }
        else if (!this.conditionName && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionName'),
                life: 3000,
            });
            return false;
        }
        else if (!this.ruleCondition && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterRuleCondition'),
                life: 3000,
            });
            return false;
        }
        else if (!this.startIndex && (this.substringFlag && this.conditionFieldType == '2') && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس شروع را وارد کنید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.startIndex && (this.splitFlag) && this.conditionFieldType == '2' && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس را وارد کنید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.endIndex && (this.substringFlag && this.conditionFieldType == '2') && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس پایان را وارد کنید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.comparableFieldTypeForFinalValue && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا نوع مقدار قابل قیاس را وارد کنید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.conditionValue && this.conditionFieldType == '1' && this.functionType != 6 && this.functionType != null) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار اولیه قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.conditionValue && this.conditionFieldType == '2' && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار نهائی قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        }
        else if (!this.conditionValue2 && this.conditionFieldType == '1' && this.functionType != null && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار اولیه قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        }
        else if (this.functionType == 6 && !this.functionStr) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا عبارت منتخب را وارد کنید'),
                life: 3000,
            });
            return false;
        }
        else if (this.functionType != 6 && (this.expressionNeedRebuild || !this.functionStr)) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا دکمه <> (ایجاد عبارت منتخب)  را کلیک کنید!'),
                life: 3000,
            });
            return false;
        }
        else if (!res) {
            debugger;
            this.notifierService.showError({
                detail: this.transloco.translate('عبارت منتخب صحیح نمی باشد!'),
                life: 3000,
            });
            return false;
        }
        else if (this.nodePath && !this.nodePath.trim().startsWith('/')) {
            this.notifierService.showError({
                detail: this.transloco.translate('ابتدای مسیر نود باید با "/" شروع شود!'),
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    length = length;
};
__decorate([
    Output()
], ApiRuleConditionRegisterComponent.prototype, "close", void 0);
__decorate([
    Input()
], ApiRuleConditionRegisterComponent.prototype, "inputreg", void 0);
ApiRuleConditionRegisterComponent = __decorate([
    Component({
        selector: 'app-api-rule-condition-register',
        templateUrl: './api-rule-condition-register.component.html',
        styleUrls: ['./api-rule-condition-register.component.scss'],
        standalone: true,
        imports: [
            TableModule,
            BreadcrumbsComponent,
            Panel,
            FormsModule,
            ButtonDirective,
            InputText,
            Tooltip,
            MoreChar19Pipe,
            Dialog,
            TranslocoPipe,
            DropdownModule,
            NgIf,
            TableIdPipe,
            MessagesCategoryPipe,
            ToggleSwitch,
            Toast,
            KeyFilter,
            MatTooltip,
            InputGroup,
            InputGroupAddon,
            Checkbox,
            MessageSelectorComponent,
        ],
    })
], ApiRuleConditionRegisterComponent);
export { ApiRuleConditionRegisterComponent };
