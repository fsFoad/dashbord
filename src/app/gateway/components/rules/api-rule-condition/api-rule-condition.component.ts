import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { NgClass, NgIf } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ThreeDotDetailsPipe } from '../../../../shared/pipes/threeDotDetails.pipe';
import { RuleTemplatePipe } from '../../../../shared/pipes/ruleTemplate.pipe';
import { ConditionTypePipe } from '../../../../shared/pipes/conditionType.pipe';
import { ConditionPipe } from '../../../../shared/pipes/condition.pipe';
import { ConditionFieldTypePipe } from '../../../../shared/pipes/conditionFieldType.pipe';
import { ApiRuleConditionRegisterComponent } from './api-rule-condition-register/api-rule-condition-register.component';
import { ApiRuleConditionUpdateComponent } from './api-rule-condition-update/api-rule-condition-update.component';
import { Toast } from 'primeng/toast';
import { TestRunConditionComponent } from '../test-run-condition/test-run-condition.component';
import { StatusPipe } from '../../../../shared/pipes/status.pipe';
import { LogicConditionsComponent } from './logic-conditions/logic-conditions.component';

@Component({
    selector: 'app-api-rule-condition',
    templateUrl: './api-rule-condition.component.html',
    styleUrls: ['./api-rule-condition.component.scss'],

    standalone: true,
    imports: [
        Toast,
        BreadcrumbsComponent,
        TranslocoPipe,
        Tooltip,
        ThreeDotDetailsPipe,
        RuleTemplatePipe,
        ButtonDirective,
        TableModule,
        NgIf,
        ConditionTypePipe,
        ConditionPipe,
        ConditionFieldTypePipe,
        MoreChar19Pipe,
        ApiRuleConditionRegisterComponent,
        ApiRuleConditionUpdateComponent,
        TestRunConditionComponent,
        StatusPipe,
        NgClass,
        LogicConditionsComponent,

    ],

})
export class ApiRuleConditionComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputCondition;
    @Input() inputClientCondition;
    @Input() inputApiRule;
    ruleName;
    hideApi;
    ruleClientBase;
    clientBase;
    partyBase;
    moduleBase;
    accessBase;
    httpsstatus;
    ruleTemplate;
    apiName;
    ruleConditionsList = [];
    registerFlag = false;
    logicFlag = false;
    updateFlag = false;
    displayFlag = false;
    conditionDto;
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    destinationHost;
    apiTitle;
    ruleId;
    clientName;
    widthRuleName;
    widtHttpsstatus;
    widthRuleTemplate;
    widtApiName;
    first = 0;
    rows = 10;
    paginationLabel = this.transloco.translate('label.pagination.table');
    ruleBase: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
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
                        label_index2: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
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
                        isActive2: true,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
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
                        isActive4: true,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',
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
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    { label_Detail_index6: null, index: 6 },
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
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
            case 'clientEndpointBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/home.png',
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
                    { label_index6: null, label_Detail_index6: null },
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

    ngOnInit(): void {
        debugger
        this.scrollTop();
        debugger
        if (this.inputCondition != undefined) {
            debugger
            this.hideApi = true;
            this.ruleName = this.inputCondition.name;
            this.httpsstatus = this.inputCondition.httpsstatus;
            this.partyTitle = this.inputCondition.partyTitle;
            this.moduleTitle = this.inputCondition.moduleTitle;
            this.apiTitle = this.inputCondition.apiTitle;
            this.ruleTemplate = this.inputCondition.ruleTemplate;
            this.ruleId = this.inputCondition.ruleId;
            this.apiName = this.inputCondition.apiName;
            this.ruleBase = true;
            this.detailsBreadObject = this.chooseBread('rulesBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.inputApiRule != undefined) {
            debugger
            debugger
            debugger
            this.hideApi = false;
            this.partyBase = this.inputApiRule.partyBase;
            this.clientBase = this.inputApiRule.clientBase;
            this.accessBase = this.inputApiRule.accessBase;
            this.moduleBase = this.inputApiRule.moduleBase;
            this.ruleName = this.inputApiRule.name;
            this.apiTitle = this.inputApiRule.apiTitle;
            this.partyTitle = this.inputApiRule.partyTitle;
            this.moduleTitle = this.inputApiRule.moduleTitle;
            this.destinationHost = this.inputApiRule.destinationHost;
            this.clientName = this.inputApiRule.clientName;
            this.httpsstatus = this.inputApiRule.httpsstatus;
            this.ruleTemplate = this.inputApiRule.ruleTemplate;
            this.ruleClientBase = this.inputApiRule.ruleClientBase;
            this.apiName = this.inputApiRule.apiName;
            this.ruleId = this.inputApiRule.ruleId;
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
            this.messagesApiFacadeService.getbyruleid(this.inputApiRule.ruleId).subscribe((a) => {
                    debugger
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false),
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 },
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }

            },(error) => {
                    this._primengProgressBarService.hide();
            });
        } else if (this.inputClientCondition != undefined) {
            debugger
            this.clientName = this.inputClientCondition.name;
            this.ruleName = this.inputClientCondition.name;
            this.clientBase = this.inputClientCondition.clientBase;
            this.partyBase = this.inputClientCondition.partyBase;
            this.accessBase = this.inputClientCondition.accessBase;
            this.moduleBase = this.inputClientCondition.moduleBase;
            this.apiTitle = this.inputClientCondition.apiTitle;
            this.partyTitle = this.inputClientCondition.partyTitle;
            this.moduleTitle = this.inputClientCondition.moduleTitle;
            this.destinationHost = this.inputClientCondition.destinationHost;
            this.clientName = this.inputClientCondition.clientName;
            this.ruleName = this.inputClientCondition.ruleName;
            this.httpsstatus = this.inputClientCondition.httpsstatus;
            this.ruleTemplate = this.inputClientCondition.ruleTemplate;
            this.ruleClientBase = this.inputClientCondition.ruleClientBase;
            this.apiName = this.inputClientCondition.apiName;
            this.ruleId = this.inputClientCondition.ruleId;
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.ruleClientBase) {
                this.detailsBreadObject = this.chooseBread('ruleClientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            if (this.clientBase) {
                this.detailsBreadObject =
                    this.chooseBread('clientEndpointBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }

        debugger
        this._primengProgressBarService.show();
        this.apiGatewayService.currentApprovalStageApiName.subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.apiName = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );

        if (this.inputCondition != undefined) {
            debugger
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbyruleid(this.inputCondition.ruleId).subscribe((a) => {
                    debugger
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false),
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 },
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                });

        }
        if (this.ruleName != undefined) {
            debugger
            this.ruleName.length > 22
                ? (this.widthRuleName = 100)
                : (this.widthRuleName = 50);
        }
        if (this.ruleTemplate != undefined) {
            debugger
            this.ruleTemplate.length > 22
                ? (this.widthRuleTemplate = 100)
                : (this.widthRuleTemplate = 50);
        }
        if (this.httpsstatus != undefined) {
            debugger
            this.httpsstatus.length > 22
                ? (this.widtHttpsstatus = 100)
                : (this.widtHttpsstatus = 50);
        }
    }

    showAdd() {
        this.conditionDto = {
            ruleId: null,
            ruleCondition: null,
            conditionValue: '',
            conditionType: null,
            conditionName: '',
            conditionFieldType: null,
            messageId: null,
            status: null,
            ruleConditionId: null,
            detailsBreadObject: null,
            moduleBase: null,
            clientBase: null,
            accessBase: null,
            partyBase: null,
            ruleBase: null,
            clientName: null,
            ruleName: null,
            apiName: null,
            moduleTitle: null,
            partyTitle: null,
            apiTitle: null,
        };

        debugger
        if (this.inputApiRule != undefined) {
            this.conditionDto.ruleBase = false;
            this.conditionDto.ruleName = this.inputApiRule?.name;
            this.conditionDto.apiName = this.inputApiRule?.apiName;
            this.conditionDto.clientName = this.inputApiRule?.clientName;
            this.conditionDto.moduleTitle = this.inputApiRule?.moduleTitle;
            this.conditionDto.partyTitle = this.inputCondition?.partyTitle;

        }
        if (this.inputCondition != undefined) {
            this.conditionDto.ruleName = this.inputCondition?.name;
            this.conditionDto.ruleBase = true;
        }
        this.conditionDto.moduleBase = this.moduleBase;
        this.conditionDto.clientBase = this.clientBase;
        this.conditionDto.accessBase = this.accessBase;
        this.conditionDto.partyBase = this.partyBase;
        this.conditionDto.moduleTitle = this.moduleTitle;
        this.conditionDto.partyTitle = this.partyTitle;
        this.conditionDto.apiTitle = this.apiTitle;
        debugger
        this.registerFlag = true;
    }
    showLogic() {
        this.conditionDto = {
            ruleId: null,
            ruleCondition: null,
            conditionValue: '',
            conditionType: null,
            conditionName: '',
            conditionFieldType: null,
            messageId: null,
            status: null,
            ruleConditionId: null,
            detailsBreadObject: null,
            moduleBase: null,
            clientBase: null,
            accessBase: null,
            partyBase: null,
            ruleBase: null,
            clientName: null,
            ruleName: null,
            apiName: null,
            moduleTitle: null,
            partyTitle: null,
            apiTitle: null,
        };

        debugger
        if (this.inputApiRule != undefined) {
            this.conditionDto.ruleBase = false;
            this.conditionDto.ruleName = this.inputApiRule?.name;
            this.conditionDto.apiName = this.inputApiRule?.apiName;
            this.conditionDto.clientName = this.inputApiRule?.clientName;
            this.conditionDto.moduleTitle = this.inputApiRule?.moduleTitle;
            this.conditionDto.partyTitle = this.inputCondition?.partyTitle;

        }
        if (this.inputCondition != undefined) {
            this.conditionDto.ruleName = this.inputCondition?.name;
            this.conditionDto.ruleBase = true;
        }
        this.conditionDto.ruleId = this.inputCondition.ruleId;
        this.conditionDto.moduleBase = this.moduleBase;
        this.conditionDto.clientBase = this.clientBase;
        this.conditionDto.accessBase = this.accessBase;
        this.conditionDto.partyBase = this.partyBase;
        this.conditionDto.moduleTitle = this.moduleTitle;
        this.conditionDto.partyTitle = this.partyTitle;
        this.conditionDto.apiTitle = this.apiTitle;
        debugger
        this.logicFlag = true;
    }

    BeforeButton() {
        this.close.emit('close');
    }

    onClose(event) {
        this.scrollTop();

        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.ruleClientBase) {
            this.detailsBreadObject = this.chooseBread('ruleClientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        }
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.logicFlag = false;
        } else if (event == 'closeAndCreate') {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbyruleid(this.ruleId).subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false),
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 },
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }
                    this.registerFlag = false;
                    this.updateFlag = false;
                    this.displayFlag = false;
                    this.logicFlag = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
        }
        if (this.inputCondition != undefined) {
            debugger
            this.hideApi = true;
            this.ruleName = this.inputCondition.name;
            this.httpsstatus = this.inputCondition.httpsstatus;
            this.partyTitle = this.inputCondition.partyTitle;
            this.moduleTitle = this.inputCondition.moduleTitle;
            this.apiTitle = this.inputCondition.apiTitle;
            this.ruleTemplate = this.inputCondition.ruleTemplate;
            this.ruleId = this.inputCondition.ruleId;
            this.apiName = this.inputCondition.apiName;
            this.ruleBase = true;
            this.detailsBreadObject = this.chooseBread('rulesBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject,
            );
        } else if (this.inputApiRule != undefined) {
            debugger
            debugger
            debugger
            this.hideApi = false;
            this.partyBase = this.inputApiRule.partyBase;
            this.clientBase = this.inputApiRule.clientBase;
            this.accessBase = this.inputApiRule.accessBase;
            this.moduleBase = this.inputApiRule.moduleBase;
            this.ruleName = this.inputApiRule.name;
            this.partyTitle = this.inputApiRule.partyTitle;
            this.moduleTitle = this.inputApiRule.moduleTitle;
            this.destinationHost = this.inputApiRule.destinationHost;
            this.clientName = this.inputApiRule.clientName;
            this.httpsstatus = this.inputApiRule.httpsstatus;
            this.ruleTemplate = this.inputApiRule.ruleTemplate;
            this.ruleClientBase = this.inputApiRule.ruleClientBase;
            this.apiName = this.inputApiRule.apiName;
            this.ruleId = this.inputApiRule.ruleId;
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
            this.messagesApiFacadeService.getbyruleid(this.inputApiRule.ruleId).subscribe((a) => {
                    debugger
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false),
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 },
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                });
        } else if (this.inputClientCondition != undefined) {
            debugger
            this.clientName = this.inputClientCondition.name;
            this.ruleName = this.inputClientCondition.name;
            this.clientBase = this.inputClientCondition.clientBase;
            this.partyBase = this.inputClientCondition.partyBase;
            this.accessBase = this.inputClientCondition.accessBase;
            this.moduleBase = this.inputClientCondition.moduleBase;
            this.partyTitle = this.inputClientCondition.partyTitle;
            this.moduleTitle = this.inputClientCondition.moduleTitle;
            this.destinationHost = this.inputClientCondition.destinationHost;
            this.clientName = this.inputClientCondition.clientName;
            this.ruleName = this.inputClientCondition.ruleName;
            this.httpsstatus = this.inputClientCondition.httpsstatus;
            this.ruleTemplate = this.inputClientCondition.ruleTemplate;
            this.ruleClientBase = this.inputClientCondition.ruleClientBase;
            this.apiName = this.inputClientCondition.apiName;
            this.ruleId = this.inputClientCondition.ruleId;
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.ruleClientBase) {
                this.detailsBreadObject = this.chooseBread('ruleClientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            if (this.clientBase) {
                this.detailsBreadObject =
                    this.chooseBread('clientEndpointBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }
        /*
                this.detailsBreadObject[3].index3 = 3
                this.detailsBreadObject[3].label_index3 = null
                this.detailsBreadObject[3].img_index3 = null
                this.detailsBreadObject[3].rout_index3 = null
                this.detailsBreadObject[3].isActive3 = false
                this.detailsBreadObject[3].isActive2 = true
                this.detailsBreadObject[3].label_Detail_index3 = null*/
    }

    showUpdate(condition) {
        this.conditionDto = {
            ruleId: null,
            ruleCondition: null,
            conditionValue: '',
            conditionType: null,
            conditionName: '',
            conditionFieldType: null,
            messageId: null,
            status: null,
            ruleConditionId: null,
            detailsBreadObject: null,
            apiTitle: null,
        };


        this.conditionDto = condition;
        this.conditionDto.detailsBreadObject = this.detailsBreadObject;
        if (this.inputApiRule != undefined) {
            this.conditionDto.moduleBase = this.inputApiRule?.moduleBase;
            this.conditionDto.clientBase = this.inputApiRule?.clientBase;
            this.conditionDto.accessBase = this.inputApiRule?.accessBase;
            this.conditionDto.partyBase = this.inputApiRule?.partyBase;
            this.conditionDto.ruleBase = false;
            this.conditionDto.ruleName = this.inputApiRule.name;
            this.conditionDto.apiName = this.inputApiRule.apiName;
            this.conditionDto.clientName = this.inputApiRule.clientName;
            this.conditionDto.moduleTitle = this.inputApiRule.moduleTitle;
            this.conditionDto.partyTitle = this.inputApiRule.partyTitle;
            this.conditionDto.apiTitle = this.apiTitle;
        }
        if (this.inputCondition != undefined) {
            this.conditionDto.partyBase = this.inputCondition?.partyBase;
            this.conditionDto.moduleBase = this.inputCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputCondition?.clientBase;
            this.conditionDto.accessBase = this.inputCondition?.accessBase;
            this.conditionDto.apiTitle = this.apiTitle;
            this.conditionDto.ruleName = this.inputCondition.name;
            this.conditionDto.ruleBase = true;
        }
        if (this.inputClientCondition != undefined) {
            this.conditionDto.partyBase = this.inputClientCondition?.partyBase;
            this.conditionDto.ruleBase = this.inputClientCondition?.ruleBase;
            this.conditionDto.moduleBase = this.inputClientCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputClientCondition?.clientBase;
            this.conditionDto.accessBase = this.inputClientCondition?.accessBase;
            this.conditionDto.apiTitle = this.apiTitle;
        }
        this.updateFlag = true;
    }
}
