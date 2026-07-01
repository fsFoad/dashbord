import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../../constants/ApiGatewayConstants';
import { ActivatedRoute } from '@angular/router';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
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
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SelectModule } from 'primeng/select';
import { TableIdPipe } from '../../../../../shared/pipes/tableId.pipe';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { KeyFilter } from 'primeng/keyfilter';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import {
    CommonValidationsService,

} from '../../../../../shared/validators/common-validations.service';
import { Checkbox } from 'primeng/checkbox';
import {
    MessageFilterAction,
    MessageSelectorComponent,
} from '../../../../../shared/components/message-selector/message-selector.component';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-api-rule-condition-update',
    templateUrl: './api-rule-condition-update.component.html',
    styleUrls: ['./api-rule-condition-update.component.scss'],
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
        SelectModule,
        NgIf,
        Tooltip,

        TableIdPipe,
        ToggleSwitch,
        Toast,
        KeyFilter,
        InputGroup,
        InputGroupAddon,
        Checkbox,
        MessageSelectorComponent,
    ],
})
export class ApiRuleConditionUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    conditionTypeOptions = ApiGatewayConstants.conditionType;
    conditionFieldTypeOptions = ApiGatewayConstants.conditionFieldType;
    ruleConditionOptions = ApiGatewayConstants.conditions;
    functionTypeOptions = [{ name: '-', code: null }];
    conditionType;
    conditionName;
    conditionFieldType;
    conditionValue;
    messageId;
    status;
    comparableFieldTypeForFinalValue;
    endIndex: string = null;
    startIndex: string = null;
    removeMessage = false;
    ruleCondition;
    dialogMessageFlag = false;
    title;
    tableId;
    text;
    nodePath
    nodePathFlag: boolean = false;
    functionType: string | number = null;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    widthTitle;
    functionStr;
    conditionValue2;
    expressionFlag: boolean = false;
    substringFlag: boolean = false;
    mathFlag: boolean = false;
    lengthFlag: boolean = false;
    splitFlag: boolean = false;
    conditionValueTypeDisabled: boolean = false;
    ruleConditionFlag: boolean = true;
    expressionNeedRebuild: boolean = true;

    registerMessageTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    updateRulConditionObject = {
        ruleId: null,
        ruleCondition: null,
        conditionValue: '',
        conditionType: null,
        conditionName: '',
        conditionFieldType: null,
        messageId: null,
        status: null,
        ruleConditionId: null,
        functionType: null,
        functionStr: null,
        isUsed: null,
        comparableFieldTypeForFinalValue: null,
        conditionValue2: null,
        bodyNodePath: null,
    };
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
    messageSelectorAction$ = new Subject<MessageFilterAction>();
    selectedRow: any[] = [];
    constructor(
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private validatorService: CommonValidationsService,
        private notifierService: ToastService,
    ) {
    }

   /* onMessageSelected(message: any) {
        debugger
        debugger
        debugger
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
    }*/
    onMessageSelected(event: any) {

        this.messageId = event.messageid ?? event.messageId;

        this.title = event.title;

        this.text = event.text;

        this.tableId =
            event.tableid ?? event.tableId;

        this.dialogMessageFlag = false;

        this.selectedRow = [{
            messageId: this.messageId,
            title: this.title,
            text: this.text,
            tableid: this.tableId,
        }];
    }

    onChildSelectionCleared(status: boolean) {

        if (!status) return;

        this.deleteMessage();
    }
    changeNodePath(){
        if (this.nodePathFlag != true) {
            this.nodePath = null;
        }else {
            this.functionType= null;
        }
    }
    chooseBread(caseBase: string) {
        debugger
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
                        label_index2: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('breadcrumbs.editRulesCondition'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/update.png',
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
                        label_index4: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.editRulesCondition'),
                        rout_index5: '/register',
                        isActive5: true,
                        img_index5: 'assets/icons/update.png',
                    },
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
                        label_index4: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.editRulesCondition'),
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
                        label_index4: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',

                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.editRulesCondition'),
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
                        label_index5: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index5: null,
                        isActive5: false,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 6,
                        label_index6: this.transloco.translate('breadcrumbs.editRulesCondition'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/update.png',
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
                        label_index3: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.ruleName + ')',
                        img_index3: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('breadcrumbs.editRulesCondition'),
                        rout_index4: '/register',
                        isActive4: true,
                        img_index4: 'assets/icons/update.png',
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
                        img_index4: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('breadcrumbs.rulesCondition'),
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    {
                        index: 6,
                        label_index6: this.transloco.translate('breadcrumbs.editRulesCondition'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/update.png',
                    },
                ];
            default:
                return null;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    onChangeConditionFieldType(event) {
        this.functionStr = '';
        this.expressionFlag = false;
        if (event.value == '1') {
            this.mathFlag = true;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeNumberOptions;
            this.comparableFieldTypeForFinalValue = '1';
            this.conditionValueTypeDisabled = true;
        } else if (event.value == '2') {
            this.mathFlag = false;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeStringOptions;
            this.comparableFieldTypeForFinalValue = null;
            this.conditionValueTypeDisabled = false;
        } else {
            this.functionTypeOptions = [];
            this.comparableFieldTypeForFinalValue = null;
            this.conditionValueTypeDisabled = false;
        }
        this.functionType = null;
    }

    fillExpression(): void {
        debugger

        // اگر نام شرط وارد نشده، از مقدار پیش‌فرض استفاده می‌کنیم تا خطا ندهد
        const varName = this.conditionName?.trim() || 'value';
        const funcType = this.functionType != null ? String(this.functionType) : null; // 👈 تبدیل به string
        const operator = this.ruleCondition ?? null;
        const compareValue = this.conditionValue ?? '';
        const startIndex = this.startIndex ?? 0;
        const endIndex = this.endIndex ?? '';
        const conditionValueType = this.comparableFieldTypeForFinalValue;
        const secondNumberMath = this.conditionValue2;

        console.log('🟦 [DEBUG fillExpression] Inputs =>', {
            varName,
            funcType,
            operator,
            compareValue,
            startIndex,
            endIndex,
            conditionValueType,
            secondNumberMath,
        });

        this.functionStr = this.buildStringExpression(
            varName,
            funcType,
            operator,
            compareValue,
            conditionValueType,
            startIndex,
            endIndex,
            secondNumberMath,
        );

        this.expressionNeedRebuild = false;
    }

    markExpressionDirty(): void {
        if (this.functionType != 6) {
            this.expressionNeedRebuild = true;
        }
    }

    buildStringExpression(varName: string, funcType: string | number | null, operator: string | number | null, conditionValue: any, conditionValueType: string | number, startIndex?: any,
                          endIndex?: any, conditionValue2?: any,
    ): string {

        debugger
        console.log('🟨 [DEBUG buildStringExpression] Incoming Params =>', {
            varName,
            funcType,
            operator,
            compareValue: conditionValue,
            conditionValueType,
            startIndex,
            endIndex,
        });

        const opSymbol = (op: string | number): string => {
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
        const formattedValue =
            conditionValueType == '1' ? (Number(conditionValue)) : `'${conditionValue}'`;

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
                } else {
                    expression = varName;
                }
                break;
        }

        console.log('✅ [DEBUG buildStringExpression] Final Expression =>', expression);
        return expression;
    }

    onChangeFunctionType(event) {
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
                break;
        }
        /*  if(event.value=='6'){

          }else{
              this.expressionFlag=false
          }*/
    }

    parseFunctionStr(functionStr) {
        if (!functionStr) {
            return;
        }
        // استخراج تمام پرانتزها
        const parenRegex = /\((.*?)\)/g;
        const parenMatches = [...functionStr.matchAll(parenRegex)];

        // پیدا کردن اولین پرانتزی که عدد باشد
        let secondNumberMath = null;
        for (const m of parenMatches) {
            if (!isNaN(m[1])) {
                secondNumberMath = Number(m[1]);
                break;
            }
        }

        // استخراج عملگرهای مقایسه
        const compareRegex = /(>=|<=|>|<|==|!=)\s*(-?\d+(\.\d+)?)/;
        const compareMatch = functionStr.match(compareRegex);

        const operator = compareMatch ? compareMatch[1] : null;
        const conditionValue = compareMatch ? Number(compareMatch[2]) : null;

        return {
            secondNumberMath,
            conditionValue,
        };
    }

    ngOnInit(): void {
        debugger
        debugger
        if (this.inputUpdate != undefined) {
            debugger
/*
            this.conditionType=='1'?
*/
            (this.inputUpdate.bodyNodePath!=null&&this.inputUpdate.bodyNodePath!=undefined&&this.inputUpdate.bodyNodePath!="")?this.nodePathFlag=true:this.nodePathFlag=false;
            (this.inputUpdate.bodyNodePath!=null&&this.inputUpdate.bodyNodePath!=undefined&&this.inputUpdate.bodyNodePath!="")?this.nodePath=this.inputUpdate.bodyNodePath:this.nodePath=null;

            if (this.inputUpdate.ruleBase) {
                debugger
                this.conditionFieldTypeOptions = ApiGatewayConstants.conditionFieldType;
                this.ruleName = this.inputUpdate?.ruleName;
                this.partyTitle = this.inputUpdate?.partyTitle;
                this.moduleTitle = this.inputUpdate?.moduleTitle;
                this.apiTitle = this.inputUpdate?.apiTitle;
                this.apiName = this.inputUpdate?.apiName;
                this.comparableFieldTypeForFinalValue =
                    this.inputUpdate?.comparableFieldTypeForFinalValue != null
                        ? String(this.inputUpdate.comparableFieldTypeForFinalValue)
                        : null;
                debugger
                debugger
                debugger
                debugger

                if (this.inputUpdate.functionType) {
                    debugger
                    this.functionType = this.inputUpdate.functionType.toString();

                    if (this.functionType == '3') {
                        this.onChangeFunctionType('3');
                        this.substringFlag = true;
                        this.parseSubstringIndexes(this.inputUpdate?.functionStr);
                    } else if (this.functionType == '5') {
                        this.onChangeFunctionType('5');
                        this.parseSplitIndex(this.inputUpdate?.functionStr);
                        this.splitFlag = true;
                    } else if (this.functionType == '7' || this.functionType == '8' || this.functionType == '9' || this.functionType == '10' || this.functionType == '11') {
                        this.conditionValue2 = this.inputUpdate?.conditionValue2;
                        this.conditionValue = this.inputUpdate?.conditionValue;
                    }
                }
                this.functionStr = this.inputUpdate?.functionStr;
                this.detailsBreadObject = this.chooseBread('rulesBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else {
                debugger
                this.partyBase = this.inputUpdate?.partyBase;
                this.clientBase = this.inputUpdate?.clientBase;
                this.accessBase = this.inputUpdate?.accessBase;
                this.moduleBase = this.inputUpdate?.moduleBase;
                this.ruleName = this.inputUpdate?.ruleName;
                this.partyTitle = this.inputUpdate?.partyTitle;
                this.moduleTitle = this.inputUpdate?.moduleTitle;
                this.apiTitle = this.inputUpdate?.apiTitle;
                this.clientName = this.inputUpdate?.clientName;
                this.apiName = this.inputUpdate?.apiName;

                if (this.partyBase) {
                    this.detailsBreadObject = this.chooseBread('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.moduleBase) {
                    this.detailsBreadObject = this.chooseBread('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.clientBase) {
                    this.detailsBreadObject = this.chooseBread('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.accessBase) {
                    this.detailsBreadObject = this.chooseBread('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                }
            }

        }
        console.log('detailsBreadObject', this.inputUpdate.detailsBreadObject);
        this.scrollTop();
        this.conditionName = this.inputUpdate.conditionName;
        this.conditionValue = this.inputUpdate.conditionValue;
        this.messageId = this.inputUpdate.messageId;
        if (this.messageId) {

            this.selectedRow = [
                {
                    messageId: this.messageId
                }
            ];
        }
        this.inputUpdate.status == 1 ? (this.status = true) : (this.status = false);

        this.inputUpdate.conditionFieldType != undefined
            ? (this.conditionFieldType = this.inputUpdate.conditionFieldType.toString())
            : (this.conditionFieldType = this.inputUpdate.conditionFieldType);
        if (this.conditionFieldType == '1') {
            this.mathFlag = true;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeNumberOptions;
            this.comparableFieldTypeForFinalValue = '1';
            this.conditionValueTypeDisabled = true;
        } else if (this.conditionFieldType == '2') {
            this.mathFlag = false;
            this.functionTypeOptions = ApiGatewayConstants.functionTypeStringOptions;

            this.conditionValueTypeDisabled = false;
        } else {
            this.functionTypeOptions = [];
            this.conditionValueTypeDisabled = false;
        }

        this.inputUpdate.ruleCondition != undefined
            ? (this.ruleCondition = this.inputUpdate.ruleCondition.toString())
            : (this.ruleCondition = this.inputUpdate.ruleCondition);

        this.inputUpdate.conditionType != undefined
            ? (this.conditionType = this.inputUpdate.conditionType.toString())
            : (this.conditionType = this.inputUpdate.conditionType);


    /*    if (this.inputUpdate.messageId !== null) {
            // FUSEFS

            // /!*  this._primengProgressBarService.show();
            this.messagesApiFacadeService
                 .getbymessageId(this.inputUpdate.messageId)
                 .subscribe(
                     (a) => {
                         // FUSEFS

                         // this._primengProgressBarService.hide();
                         this.titleMessage = a.title;
                         this.textMessage = a.text;
                         this.textMessage = a.textEN;
                         a.tableId != undefined
                             ? (this.tableIdMessage = a.tableId.toString())
                             : (this.tableIdMessage = a.tableId);

                         a.code != undefined
                             ? (this.codeMessage = a.code.toString())
                             : (this.codeMessage = a.code);

                         a.type != undefined
                             ? (this.typeMessage = a.type.toString())
                             : (this.typeMessage = a.type);

                         a.text != undefined
                             ? (this.title = a.text.toString())
                             : (this.title = a.text);
                         a.tableId != undefined
                             ? (this.tableId = a.tableId.toString())
                             : (this.tableId = a.tableId);
                         a.text != undefined
                             ? (this.text = a.text.toString())
                             : (this.text = a.text);
                         if (this.title.length != undefined) {
                             if (this.title.length > 22) {
                                 this.widthTitle = 100;
                             }
                         }
                         if (this.tableId.length != undefined) {
                             if (this.tableId.length > 22) {
                                 this.widthTableId = 100;
                             }
                         }
                         if (this.text.length != undefined) {
                             if (this.text.length > 22) {
                                 this.widthText = 100;
                             }
                         }
                         if (this.messageId.length != undefined) {
                             if (this.messageId.length > 22) {
                                 this.widthMessageId = 100;
                             }
                         }
                     },
                     (error) => {
                         // FUSEFS

                         // this._primengProgressBarService.hide();
                     },
                 );*!/
        }*/

        this.functionType == '6' ? this.expressionFlag = true : this.expressionFlag = false;

        debugger
        /*   if(this.inputUpdate!=undefined){
               debugger
               if (this.inputUpdate?.ruleBase) {
                   debugger
                   this.detailsBreadObject=this.inputUpdate.detailsBreadObject
                 /!*  this.detailsBreadObject[3].index3 =3
                   this.detailsBreadObject[3].label_index3 =this.transloco.translate('editCondition.header.editConditionRule')
                   this.detailsBreadObject[3].img_index3 = 'assets/icons/update.png'
                   this.detailsBreadObject[3].rout_index3 ='/updete'
                   this.detailsBreadObject[3].isActive3 =true
                   this.detailsBreadObject[3].isActive2 =true
                   this.detailsBreadObject[3].label_Detail_index3 =null*!/
               }else {

                   this.detailsBreadObject=this.inputUpdate.detailsBreadObject
                /!*   this.detailsBreadObject=this.inputUpdate.detailsBreadObject
                   this.detailsBreadObject[6].index6 =6
                   this.detailsBreadObject[6].label_index6 =this.transloco.translate('editCondition.header.editConditionRule')
                   this.detailsBreadObject[6].img_index6 = 'assets/icons/update.png'
                   this.detailsBreadObject[6].rout_index6 ='/save'
                   this.detailsBreadObject[6].isActive6 =true
                   this.detailsBreadObject[6].isActive5 =true
                   this.detailsBreadObject[6].label_Detail_index6 =null*!/
                   //غیر قواعد
               }
           }


           this.apiGatewayService.updateApprovalDetailsBreadObject(
               this.detailsBreadObject
           );*/
    }

    parseSplitIndex(expr: string): void {
        if (!expr) {
            return;
        }
        const regex = /\.split\s*\([^)]*\)\s*\[(\d+)\]/;
        const match = expr.match(regex);
        if (match) {
            this.startIndex = match[1];
        }
    }
    showMessage() {

        this.dialogMessageFlag = true;

        this.messageSelectorAction$.next({
            type: 'search'
        });
    }
    parseSubstringIndexes(expr: string): void {
        this.functionStr = expr;
        if (!expr) {
            return;
        }
        const regex = /\.substring\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/;
        const match = expr.match(regex);
        if (match) {
            this.startIndex = match[1].trim();
            this.endIndex = match[2].trim();
        }
    }
    refreshMessages() {

        this.messageSelectorAction$.next({
            type: 'search'
        });
    }

    onMessageChange(message: any | null) {

        if (!message) {

            this.messageId = null;
            this.title = null;
            this.text = null;
            this.tableId = null;

            return;
        }

        this.messageId = message.messageid ?? message.messageId;

        this.title = message.title;

        this.text = message.text;

        this.tableId =
            message.tableid ?? message.tableId;

        this.dialogMessageFlag = false;
    }
    deleteMessage() {

        this.messageSelectorAction$.next({
            type: 'clear'
        });


        this.title = null;

        this.text = null;

        this.tableId = null;

        this.messageId = null;

        this.selectedRow = [];
    }

    onCancel() {
        this.close.emit('close');
    }



    onUpdate() {
        debugger
        if (this.validation()) {
            debugger
            this.apiGatewayService.currentApprovalStageRuleId.subscribe((a) => {
                this.updateRulConditionObject.ruleId = a;
            });
            this.updateRulConditionObject.ruleConditionId =
                this.inputUpdate.ruleConditionId;
            this.updateRulConditionObject.ruleCondition = this.ruleCondition;
            this.functionType != null ? (this.updateRulConditionObject.functionType = Number(this.functionType)) : (this.updateRulConditionObject.functionType = null);
            this.updateRulConditionObject.conditionValue = this.conditionValue;
            this.updateRulConditionObject.conditionType = this.conditionType;
            this.updateRulConditionObject.conditionName = this.conditionName;
            this.updateRulConditionObject.conditionFieldType = this.conditionFieldType;
            this.updateRulConditionObject.conditionValue2 = this.conditionValue2;
            this.updateRulConditionObject.isUsed = this.inputUpdate.isUsed;
            this.updateRulConditionObject.functionStr = this.functionStr;
            this.updateRulConditionObject.comparableFieldTypeForFinalValue = this.comparableFieldTypeForFinalValue;
            this.conditionType == '1' ? this.updateRulConditionObject.bodyNodePath = this.nodePath : delete this.updateRulConditionObject?.bodyNodePath;

            this.status ? (this.updateRulConditionObject.status = 1) : (this.updateRulConditionObject.status = 0);
            this.messageId != null ? (this.updateRulConditionObject.messageId = this.messageId) : (this.updateRulConditionObject.messageId = null);

            // FUSEFS


            // this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRuleCondition(this.updateRulConditionObject)
                .subscribe((a) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                });
        }
    }

  /*  search() {
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                this.codeMessage,
                this.titleMessage,
                this.tableIdMessage,
                this.typeMessage,
            )
            .subscribe(
                (response) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    if (Array.isArray(response)) {
                        this.messagesList = response;
                    } else {
                        this.messagesList.push(response);
                    }
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                },
            );
    }*/

/*    clear() {
        this.codeMessage = '';
        this.titleMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.search();
    }*/


    validation(): boolean {
        let res;
        this.functionStr ? res = this.validatorService.isValidExpression(this.functionStr) : null;
        if (!this.conditionType) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionFieldType) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionFieldType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionName && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionName'),
                life: 3000,
            });
            return false;
        } else if (!this.ruleCondition && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterRuleCondition'),
                life: 3000,
            });
            return false;
        } else if (!this.startIndex && (this.substringFlag && this.conditionFieldType == '2') && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس شروع را وارد کنید!'),
                life: 3000,
            });
            return false;
        } else if (!this.startIndex && (this.splitFlag) && this.conditionFieldType == '2' && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس را وارد کنید!'),
                life: 3000,
            });
            return false;
        } else if (!this.endIndex && (this.substringFlag && this.conditionFieldType == '2') && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا ایندکس پایان را وارد کنید!'),
                life: 3000,
            });
            return false;
        } else if (!this.comparableFieldTypeForFinalValue && this.functionType != 6 && this.conditionFieldType == '2') {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا نوع مقدار قابل قیاس را وارد کنید!'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionValue && this.conditionFieldType == '1' && this.functionType != 6 && this.functionType != null) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار اولیه قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionValue && this.conditionFieldType == '2' && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار نهائی قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionValue2 && this.conditionFieldType == '1' && this.functionType != null && this.functionType != 6) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا مقدار اولیه قابل قیاس را وارد نمائید!'),
                life: 3000,
            });
            return false;
        } else if (this.functionType == 6 && !this.functionStr) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا عبارت منتخب را وارد کنید'),
                life: 3000,
            });
            return false;
        } else if (this.functionType != 6 && (this.expressionNeedRebuild || !this.functionStr)) {
            this.notifierService.showError({
                detail: this.transloco.translate('لطفا دکمه <> (ایجاد عبارت منتخب)  را کلیک کنید!'),
                life: 3000,
            });
            return false;
        } else if (!res) {
            debugger
            this.notifierService.showError({
                detail: this.transloco.translate('عبارت منتخب صحیح نمی باشد!'),
                life: 3000,
            });
            return false;
        }else if (this.nodePath && !this.nodePath.trim().startsWith('/')) {
            this.notifierService.showError({
                detail: this.transloco.translate('ابتدای مسیر نود باید با "/" شروع شود!'),
                life: 3000,
            });
            return false;
        }else {
            return true;
        }
    }
}
