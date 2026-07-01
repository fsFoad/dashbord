import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonDirective } from 'primeng/button';
import { ProgressBar } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ApiGatewayConstants } from '../../../../constants/ApiGatewayConstants';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Tooltip } from 'primeng/tooltip';
let LogicConditionsComponent = class LogicConditionsComponent {
    transloco;
    messagesApiFacadeService;
    messageService;
    notifierService;
    apiGatewayService;
    close = new EventEmitter();
    inputLogic;
    allExpressionOptions = [];
    firstDropdownOptions = [];
    cards = [];
    betweenValues = [];
    Operator = null;
    ruleId;
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
    OperatorOptions = ApiGatewayConstants.OperatorOptions;
    fieldLabels = ['عبارت منتخب(چپ)', 'عملگر منطقی', 'عبارت منتخب(راست)'];
    groupIds = [];
    constructor(transloco, messagesApiFacadeService, messageService, notifierService, apiGatewayService) {
        this.transloco = transloco;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.messageService = messageService;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.addCard(true);
    }
    ngOnInit() {
        debugger;
        console.log('[LogicConditions] ngOnInit → inputLogic = ', this.inputLogic);
        if (!this.inputLogic) {
            console.warn('[LogicConditions] inputLogic خالی است، از کامپوننت خارج می‌شوم');
            return;
        }
        debugger;
        this.ruleId = this.inputLogic.ruleId;
        console.log('[LogicConditions] ruleId = ', this.ruleId);
        forkJoin({
            first: this.messagesApiFacadeService.ruleconditionElement(this.ruleId),
            second: this.messagesApiFacadeService.ruleconditionElementGroup(this.ruleId),
        }).subscribe({
            next: ({ first, second }) => {
                console.log('------------------- forkJoin result -------------------');
                console.log('[LogicConditions] ruleconditionElement (first) = ', first);
                console.log('[LogicConditions] ruleconditionElementGroup (second) = ', second);
                this.mapFirstServiceToOptions(first);
                this.mapSecondServiceToUI(second);
                console.log('[LogicConditions] cards بعد از mapSecondServiceToUI = ', this.cards);
                console.log('[LogicConditions] betweenValues بعد از mapSecondServiceToUI = ', this.betweenValues);
                console.log('--------------------------------------------------------');
                this.messagesApiFacadeService.getbyruleid(this.ruleId).subscribe({
                    next: x => {
                        debugger;
                        const filtered = x.filter(item => item.isUsed == 1);
                        this.allExpressionOptions = filtered.map(item => ({
                            label: item.functionStr,
                            value: item.ruleConditionId,
                        }));
                        this.firstDropdownOptions = [
                            { label: '-', value: null },
                            ...this.allExpressionOptions,
                        ];
                        debugger;
                    },
                    error: err => {
                        console.error('[LogicConditions] خطا در getbyruleid: ', err);
                    }
                });
            },
            error: (err) => {
                console.error('[LogicConditions] خطا در forkJoin(ruleconditionElement, ruleconditionElementGroup): ', err);
            }
        });
        this.partyBase = this.inputLogic?.partyBase;
        this.clientBase = this.inputLogic?.clientBase;
        this.accessBase = this.inputLogic?.accessBase;
        this.moduleBase = this.inputLogic?.moduleBase;
        this.ruleName = this.inputLogic?.ruleName;
        this.partyTitle = this.inputLogic?.partyTitle;
        this.moduleTitle = this.inputLogic?.moduleTitle;
        this.apiTitle = this.inputLogic?.apiTitle;
        this.clientName = this.inputLogic?.clientName;
        this.apiName = this.inputLogic?.apiName;
        if (this.inputLogic != null) {
            this.detailsBreadObject = this.inputLogic.detailsBreadObject;
        }
        this.detailsBreadObject = this.chooseBread('rulesBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (this.partyBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.moduleBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.clientBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        else if (this.accessBase) {
            debugger;
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
    }
    normalizeOpCodeFromService(raw) {
        if (raw == null)
            return null;
        if (!this.OperatorOptions || !this.OperatorOptions.length) {
            return raw;
        }
        const sampleCode = this.OperatorOptions[0].code;
        if (typeof sampleCode === 'string') {
            return String(raw);
        }
        if (typeof sampleCode === 'number') {
            return Number(raw);
        }
        return raw;
    }
    onCancel() {
        this.close.emit('close');
    }
    BeforeButton() {
        this.close.emit('close');
    }
    chooseBread(caseBase) {
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
                        label_index3: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index3: '/register',
                        isActive3: true,
                        img_index3: 'assets/icons/math.png',
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
                        label_index5: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index5: '/register',
                        isActive5: true,
                        img_index5: 'assets/icons/math.png',
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
                        label_index5: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index5: '/register',
                        isActive5: true,
                        img_index5: 'assets/icons/math.png',
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
                        label_index5: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index5: '/register',
                        isActive5: true,
                        img_index5: 'assets/icons/math.png',
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
                        label_index6: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/math.png',
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
                        label_index4: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index4: '/register',
                        isActive4: true,
                        img_index4: 'assets/icons/math.png',
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
                        label_index6: this.transloco.translate('breadcrumbs.logicGates'),
                        rout_index6: '/register',
                        isActive6: true,
                        img_index6: 'assets/icons/math.png',
                    },
                ];
            default:
                return null;
        }
    }
    get cardsCount() {
        return this.cards.length;
    }
    get completedCount() {
        return this.cards.filter((_, index) => this.isCardComplete(index)).length;
    }
    get filledBetweenCount() {
        return this.betweenValues.filter(v => !!v).length;
    }
    hasFreeExpression() {
        const usedValues = new Set();
        this.cards.forEach(card => {
            const [left, , right] = card.selects;
            if (left != null) {
                usedValues.add(left);
            }
            if (right != null) {
                usedValues.add(right);
            }
        });
        const totalExpressions = this.allExpressionOptions.length;
        return usedValues.size < totalExpressions;
    }
    normalizeOp(raw) {
        if (raw == null)
            return null;
        if (typeof raw === 'number') {
            if (raw === 1 || raw === 2 || raw === 3)
                return String(raw);
        }
        if (raw === '1' || raw === '2' || raw === '3') {
            return raw;
        }
        if (typeof raw === 'string') {
            const lower = raw.toLowerCase();
            if (lower === 'and')
                return '1';
            if (lower === 'or')
                return '2';
            if (lower === '-')
                return null;
        }
        if (typeof raw === 'object' && raw.code !== undefined) {
            return this.normalizeOp(raw.code);
        }
        return null;
    }
    findOperatorCodeFromService(value) {
        if (value == null)
            return null;
        const opt = this.OperatorOptions.find((o) => o.code == value);
        return opt ? opt.code : null;
    }
    get completionRate() {
        const betweenNeeded = this.cardsCount > 1 ? this.cardsCount - 1 : 0;
        const totalPieces = this.cardsCount + betweenNeeded;
        if (!totalPieces) {
            return 0;
        }
        const donePieces = this.completedCount + this.filledBetweenCount;
        return Math.round((donePieces / totalPieces) * 100);
    }
    trackByIndex(index) {
        return index;
    }
    isCardComplete(cardIndex) {
        const selects = this.cards[cardIndex]?.selects || [];
        if (selects.length < 3)
            return false;
        const [first, second, third] = selects;
        const hasFirst = !!first;
        const hasSecond = !!second;
        const hasThird = !!third;
        if (cardIndex === 0) {
            return hasFirst && hasSecond && hasThird;
        }
        else {
            if (hasFirst && !hasSecond && !hasThird)
                return true;
            if (hasFirst && hasSecond && hasThird)
                return true;
            return false;
        }
    }
    getAvailableExpressionOptions(cardIndex, selectIndex) {
        debugger;
        const currentValue = this.cards[cardIndex]?.selects[selectIndex] ?? null;
        const usedValues = new Set();
        this.cards.forEach((card, i) => {
            card.selects.forEach((val, j) => {
                debugger;
                if (val == null)
                    return;
                if (i === cardIndex && j === selectIndex)
                    return;
                usedValues.add(val);
            });
        });
        const available = this.allExpressionOptions.filter(opt => {
            debugger;
            if (opt.value === currentValue) {
                return true;
            }
            return !usedValues.has(opt.value);
        });
        return [{ label: '-', value: null }, ...available];
    }
    canAddCard() {
        if (!this.cards.length) {
            return this.hasFreeExpression();
        }
        if (!this.isCardComplete(this.cards.length - 1)) {
            return false;
        }
        return this.hasFreeExpression();
    }
    /*   addCard(ignoreCheck = false): void {
           if (!ignoreCheck) {
               if (!this.isCardComplete(this.cards.length - 1)) {
                   return;
               }
   
               if (!this.hasFreeExpression()) {
                   this.messageService.add({
                       severity: 'warn',
                       summary: 'امکان افزودن گروه جدید نیست',
                       detail: 'تمام عبارات منتخب استفاده شده‌اند.',
                   });
                   return;
               }
           }
   
           this.cards.push({
               selects: [null, null, null],
               status: true,
           });
   
           if (this.cards.length > 1) {
               this.betweenValues.push(null);
           }
       }*/
    addCard(ignoreCheck = false) {
        if (!ignoreCheck) {
            if (!this.isCardComplete(this.cards.length - 1)) {
                return;
            }
            if (!this.hasFreeExpression()) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'امکان افزودن گروه جدید نیست',
                    detail: 'تمام عبارات منتخب استفاده شده‌اند.',
                });
                return;
            }
        }
        this.cards.push({
            selects: [null, null, null],
            status: true,
            elementIdLeft: null, // NEW
            elementIdRight: null, // NEW
        });
        if (this.cards.length > 1) {
            this.betweenValues.push(null);
            this.groupIds.push(null); // NEW
        }
    }
    removeCard(index) {
        if (index === 0)
            return;
        this.cards.splice(index, 1);
        if (index - 1 >= 0) {
            this.betweenValues.splice(index - 1, 1);
            this.groupIds.splice(index - 1, 1); // NEW
        }
    }
    /*    removeCard(index: number): void {
            if (index === 0) return;
            this.cards.splice(index, 1);
            if (index - 1 >= 0) {
                this.betweenValues.splice(index - 1, 1);
            }
        }*/
    /*   private buildRuleConditions(ruleId: number): any[] {
           const result: any[] = [];
   
           this.cards.forEach((card) => {
               const [left, opRaw, right] = card.selects;
               const op = this.normalizeOp(opRaw);
               const cardStatus = card.status ? '1' : '0';
   
               if (left != null) {
                   const leftId = Number(left);
                   result.push({
                       ruleId: ruleId,
                       ruleConditionId: leftId,
                       parentElementId: leftId,
                       op: op,
                       status: cardStatus,
                   });
               }
   
               if (right != null) {
                   const rightId = Number(right);
                   const leftId = left != null ? Number(left) : rightId;
   
                   result.push({
                       ruleId: ruleId,
                       ruleConditionId: rightId,
                       parentElementId: leftId,
                       op: op,
                       status: cardStatus,
                   });
               }
           });
   
           return result;
       }*/
    buildRuleConditions(ruleId) {
        const result = [];
        this.cards.forEach((card, index) => {
            const [left, opRaw, right] = card.selects;
            let op = this.normalizeOp(opRaw);
            const cardStatus = card.status ? '1' : '0';
            const isSingleFromSecondOn = index > 0 &&
                left != null &&
                right == null &&
                op == null;
            if (isSingleFromSecondOn) {
                op = '3';
            }
            // LEFT
            if (left != null) {
                const leftRuleConditionId = Number(left);
                const leftDto = {
                    ruleId,
                    ruleConditionId: leftRuleConditionId,
                    parentElementId: leftRuleConditionId,
                    op,
                    status: cardStatus,
                };
                // فقط وقتی از سرور لود شده و id داریم:
                if (card.elementIdLeft != null && card.elementIdLeft > 0) {
                    leftDto.id = card.elementIdLeft;
                }
                result.push(leftDto);
            }
            // RIGHT
            if (right != null) {
                const rightRuleConditionId = Number(right);
                const parentElementId = left != null ? Number(left) : rightRuleConditionId;
                const rightDto = {
                    ruleId,
                    ruleConditionId: rightRuleConditionId,
                    parentElementId,
                    op,
                    status: cardStatus,
                };
                if (card.elementIdRight != null && card.elementIdRight > 0) {
                    rightDto.id = card.elementIdRight;
                }
                result.push(rightDto);
            }
        });
        return result;
    }
    buildRuleConditionGroups(ruleId, elementIdMap) {
        const groups = [];
        // ✳️ حالت 1: فقط یک کارت داریم
        if (this.cards.length === 1) {
            const onlyCard = this.cards[0];
            const [first, , second] = onlyCard.selects;
            const cardIsEmpty = !first && !second;
            if (cardIsEmpty) {
                return groups;
            }
            const firstElementId = onlyCard.elementIdLeft ??
                (first != null ? elementIdMap.get(Number(first)) ?? null : null);
            const secondElementId = onlyCard.elementIdRight ??
                (second != null ? elementIdMap.get(Number(second)) ?? null : null);
            const group = {
                ruleId,
                ruleconditionElementFirstId: firstElementId,
                ruleconditionElementSecondId: secondElementId,
                ruleconditionElementThirdId: null,
                ruleconditionElementFourthId: null,
                op: '3', // بین گروه‌ها عملگری نداریم → طبق قرارداد شما 3
            };
            const gid = this.groupIds[0];
            if (gid != null && gid > 0) {
                group.id = gid; // فقط در ویرایش
            }
            groups.push(group);
            return groups;
        }
        // ✳️ حالت 2: بیش از یک کارت
        for (let i = 0; i < this.cards.length - 1; i++) {
            const current = this.cards[i];
            const next = this.cards[i + 1];
            const [currFirst, , currSecond] = current.selects;
            const [nextFirst, , nextSecond] = next.selects;
            const currentIsEmpty = !currFirst && !currSecond;
            const nextIsEmpty = !nextFirst && !nextSecond;
            if (currentIsEmpty && nextIsEmpty) {
                continue;
            }
            const rawOp = this.betweenValues[i] ?? null;
            let groupOp = this.normalizeOp(rawOp);
            if (!groupOp) {
                groupOp = '3'; // هیچ AND/OR انتخاب نشده → 3
            }
            const currFirstElementId = current.elementIdLeft ??
                (currFirst != null ? elementIdMap.get(Number(currFirst)) ?? null : null);
            const currSecondElementId = current.elementIdRight ??
                (currSecond != null ? elementIdMap.get(Number(currSecond)) ?? null : null);
            const nextFirstElementId = next.elementIdLeft ??
                (nextFirst != null ? elementIdMap.get(Number(nextFirst)) ?? null : null);
            const nextSecondElementId = next.elementIdRight ??
                (nextSecond != null ? elementIdMap.get(Number(nextSecond)) ?? null : null);
            const group = {
                ruleId,
                ruleconditionElementFirstId: currFirstElementId,
                ruleconditionElementSecondId: currSecondElementId,
                ruleconditionElementThirdId: nextFirstElementId,
                ruleconditionElementFourthId: nextSecondElementId,
                op: groupOp,
            };
            const gid = this.groupIds[i];
            if (gid != null && gid > 0) {
                group.id = gid; // فقط وقتی از سرور لود شده
            }
            groups.push(group);
        }
        return groups;
    }
    mapFirstServiceToCards(rows) {
        const cards = [];
        for (let i = 0; i < rows.length; i += 2) {
            const leftRow = rows[i];
            const rightRow = rows[i + 1];
            const leftId = leftRow ? leftRow.ruclecondicionId : null;
            const innerOp = leftRow && leftRow.op != null ? String(leftRow.op) : null;
            const rightId = rightRow ? rightRow.ruclecondicionId : null;
            cards.push({
                selects: [leftId, innerOp, rightId],
                status: leftRow?.status === 1,
            });
        }
        return cards;
    }
    /*mapSecondServiceToUI(rows: SecondServiceRow[]) {
        const sorted = [...rows].sort((a, b) => a.pairGroupId - b.pairGroupId);
        const cards: SmartCard[] = [];
        const betweenValues: (string | null)[] = [];
        const maxPairId =
            sorted.length > 0
                ? sorted[sorted.length - 1].pairGroupId
                : -1;
        for (let i = 0; i <= maxPairId; i++) {
            cards[i] = {
                selects: [null, null, null],
                status: true,
            };
        }
        for (const row of sorted) {
            const idx = row.pairGroupId;
            cards[idx] = {
                selects: [
                    row.ruleConditionIdOne ?? null,
                    row.ruleConditionOp != null ? String(row.ruleConditionOp) : null,
                    row.ruleConditionIdTwo ?? null,
                ],
                status: true,
            };
            if (idx < maxPairId) {
                betweenValues[idx] =
                    row.ruleConditionGroupOp != null
                        ? String(row.ruleConditionGroupOp)
                        : null;
            }
        }

        this.cards = cards;
        this.betweenValues = betweenValues;
    }*/
    mapSecondServiceToUI(rows) {
        console.log('[LogicConditions] mapSecondServiceToUI → rows = ', rows);
        if (!rows || rows.length === 0) {
            console.warn('[LogicConditions] mapSecondServiceToUI: rows خالی است');
            if (this.cards.length === 0) {
                this.cards = [{
                        selects: [null, null, null],
                        status: true,
                        elementIdLeft: null,
                        elementIdRight: null,
                    }];
            }
            this.betweenValues = [];
            this.groupIds = []; // NEW
            return;
        }
        const sorted = [...rows].sort((a, b) => a.pairGroupId - b.pairGroupId);
        console.log('[LogicConditions] mapSecondServiceToUI → sorted rows = ', sorted);
        const minPairId = sorted[0].pairGroupId;
        const maxPairId = sorted[sorted.length - 1].pairGroupId;
        console.log('[LogicConditions] pairGroupId range: ', { minPairId, maxPairId });
        const cardsCount = maxPairId - minPairId + 1;
        const cards = [];
        const betweenValues = [];
        const groupIds = []; // NEW
        // init
        for (let idx = 0; idx < cardsCount; idx++) {
            cards[idx] = {
                selects: [null, null, null],
                status: true,
                elementIdLeft: null,
                elementIdRight: null,
            };
            if (idx < cardsCount - 1) {
                betweenValues[idx] = null;
                groupIds[idx] = null;
            }
        }
        for (const row of sorted) {
            const idx = row.pairGroupId - minPairId;
            const innerOpCode = this.mapOpNumberToCode(row.ruleConditionOp);
            const groupOpCode = this.mapOpNumberToCode(row.ruleConditionGroupOp);
            console.log('[LogicConditions] mapping row to card index: ', {
                row,
                idx,
                innerOpCode,
                groupOpCode,
            });
            cards[idx] = {
                selects: [
                    row.ruleConditionIdOne ?? null,
                    innerOpCode,
                    row.ruleConditionIdTwo ?? null,
                ],
                status: true,
                elementIdLeft: row.elementIdOne ?? null, // NEW
                elementIdRight: row.elementIdTwo ?? null, // NEW
            };
            // عملگر و groupId بین این کارت و بعدی
            if (idx < cardsCount - 1) {
                betweenValues[idx] = groupOpCode;
                groupIds[idx] = row.groupId ?? null; // NEW
            }
        }
        this.cards = cards;
        this.betweenValues = betweenValues;
        this.groupIds = groupIds; // NEW
        console.log('[LogicConditions] mapSecondServiceToUI → result cards = ', this.cards);
        console.log('[LogicConditions] mapSecondServiceToUI → result betweenValues = ', this.betweenValues);
        console.log('[LogicConditions] mapSecondServiceToUI → result groupIds = ', this.groupIds);
    }
    onchangea(e) {
        console.log(e, 'fffff');
    }
    mapOpNumberToCode(op) {
        if (op === 1)
            return '1';
        if (op === 2)
            return '2';
        return null;
    }
    mapFirstServiceToOptions(rows) {
        console.log('[LogicConditions] mapFirstServiceToOptions → input rows = ', rows);
        this.allExpressionOptions = rows.map(row => ({
            label: row.functionStr,
            value: row.ruclecondicionId,
        }));
        this.firstDropdownOptions = [
            { label: '-', value: null },
            ...this.allExpressionOptions,
        ];
        console.log('[LogicConditions] allExpressionOptions (from first service) = ', this.allExpressionOptions);
    }
    register() {
        if (!this.ruleId) {
            this.notifierService.showError('شناسه قاعده نامعتبر است');
            return;
        }
        const conditionsPayload = this.buildRuleConditions(this.ruleId);
        if (!conditionsPayload.length) {
            this.notifierService.showError('هیچ شرطی برای ثبت وجود ندارد');
            return;
        }
        if (!this.cards.length || !this.isCardComplete(0)) {
            this.notifierService.showError('لطفا در گروه بندی قابل انتخاب اول، هر سه فیلد باید تکمیل گردند!');
            return;
        }
        this.messagesApiFacadeService
            .registerElementRulecondition(conditionsPayload)
            .subscribe((res) => {
            const elementIdMap = new Map();
            res.forEach((item) => {
                if (item.ruleConditionId != null && item.id != null) {
                    elementIdMap.set(Number(item.ruleConditionId), item.id);
                }
            });
            const groupsPayload = this.buildRuleConditionGroups(this.ruleId, elementIdMap);
            if (!groupsPayload.length) {
                this.notifierService.showSuccess('شرایط با موفقیت ثبت شد');
                this.close.emit('closeAndCreate');
                return;
            }
            this.messagesApiFacadeService
                .registerGroupRulecondition(groupsPayload)
                .subscribe(() => {
                this.notifierService.showSuccess('شرایط و گروه‌ها با موفقیت ثبت شدند');
                this.close.emit('closeAndCreate');
            }, () => {
                this.notifierService.showError('خطا در ثبت گروه شرایط');
            });
        }, () => {
            this.notifierService.showError('خطا در ثبت شرایط');
        });
        // (اگر این خط رو نگه داری، مودال بلافاصله بسته می‌شود حتی اگر ارور بده.
        // من پیشنهاد می‌کنم برداریش.)
        // this.close.emit('closeAndCreate');
    }
    onchange = onchange;
};
__decorate([
    Output()
], LogicConditionsComponent.prototype, "close", void 0);
__decorate([
    Input()
], LogicConditionsComponent.prototype, "inputLogic", void 0);
LogicConditionsComponent = __decorate([
    Component({
        selector: 'app-logic-conditions',
        standalone: true,
        imports: [
            CommonModule,
            FormsModule,
            ButtonDirective,
            ProgressBar,
            DropdownModule,
            Card,
            InputSwitchModule,
            BreadcrumbsComponent,
            Toast,
            ToggleSwitch,
            Tooltip,
        ],
        templateUrl: './logic-conditions.component.html',
        styleUrls: ['./logic-conditions.component.scss'],
        providers: [MessageService],
    })
], LogicConditionsComponent);
export { LogicConditionsComponent };
