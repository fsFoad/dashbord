import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {PrimeNG} from 'primeng/config';
import {FormatRulePipe} from '../../../../../../shared/pipes/FormatRule.pipe';
import {ApiRuleRegisterComponent} from '../../../../rules/api-rule-register/api-rule-register.component';
import {ApiRuleUpdateComponent} from '../../../../rules/api-rule-update/api-rule-update.component';
import {ApiRuleConditionComponent} from '../../../../rules/api-rule-condition/api-rule-condition.component';
import {Card} from 'primeng/card';
import {RuleTemplatePipe} from '../../../../../../shared/pipes/ruleTemplate.pipe';
import {Toast} from 'primeng/toast';
import {Tooltip} from "primeng/tooltip";
import {MoreChar19Pipe} from "../../../../../../shared/pipes/moreChar19.pipe";
import { NgClass, NgIf } from '@angular/common';
import {StatusPipe} from "../../../../../../shared/pipes/status.pipe";
import {Menu} from "primeng/menu";
import {Dialog} from "primeng/dialog";
import {Ripple} from "primeng/ripple";
import { DropdownModule } from 'primeng/dropdown';


@Component({
    selector: 'app-api-rule',
    templateUrl: './api-rule.component.html',
    styleUrls: ['./api-rule.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        FormatRulePipe,
        ApiRuleRegisterComponent,
        ApiRuleUpdateComponent,
        ApiRuleConditionComponent,
        Card,
        RuleTemplatePipe,
        Toast,
        TranslocoPipe,
        Tooltip,
        MoreChar19Pipe,
        NgClass,
        StatusPipe,
        Menu,
        Dialog,
        Ripple,
        NgIf,
        DropdownModule,
    ],
})
export class ApiRuleComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputApiRule;
    name;
    title;
    addFlag = false;
    updateFlag = false;
    rulConditionFlag = false;
    moduleType;
    rulList = [];
    ruleDto;
    detailsBreadObject = [];
    moduleBase;
    accessBase;
    partyBase;
    moduleTitle;
    partyTitle;
    clientName;
    clientBase;
    apiId;
    tempRule;
    items;
    widthName;
    widthTitle;
    ruleAttachList;
    dialogRuleFlag;
    ruleName;
    attachFlag = false;
    ruleTemp = {
        apiId: null,
        ruleId: null,
        apiRuleStatus: null,
    };
    first = 0;
    rows = 10;
    pageno: number = 0;
    totalRecords: number = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 5, code: 5 },
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag: boolean = false;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    chooseBread(caseBase: any) {
        debugger
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
                        label_index3: 'قواعد',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
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
                        label_index3: 'قواعد',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
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
                        label_index2: 'قواعد',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/rule.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
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
                        label_index4: 'قواعد',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    ngOnInit(): void {
        debugger
        debugger
        debugger
        this.scrollTop();
        if (this.inputApiRule != undefined) {
            debugger
            this.name = this.inputApiRule.name;
            this.title = this.inputApiRule.title;
            this.moduleTitle = this.inputApiRule.moduleTitle;
            this.partyTitle = this.inputApiRule.partyTitle;
            this.clientName = this.inputApiRule.clientName;
            this.clientBase = this.inputApiRule.clientBase;
            this.moduleBase = this.inputApiRule.moduleBase;
            this.accessBase = this.inputApiRule.accessBase;
            this.partyBase = this.inputApiRule.partyBase;
            this.inputApiRule.clientBase;
            this.apiId = this.inputApiRule.apiId;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: this.transloco.translate('فعالسازی'),
                        command: () => {
                            this.active(this.tempRule);
                        },
                    },
                    {
                        label: this.transloco.translate('غیرفعالسازی'),
                        command: () => {
                            this.deActive(this.tempRule);
                        },
                    },
                    {
                        label: 'شرایط قاعده سرویس',
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempRule);
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
        this.searchRule(this.apiId);

        if (this.name.length > 22) {
            this.widthName = 100;
        }
        if (this.title.length > 22) {
            this.widthTitle = 100;
        }
    }

    clear() {
        this.ruleName = '';
        this.nextBtnFlag=false
        this.pageno=0
        this.pagesize=10
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.pageno, this.pagesize).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.ruleAttachList = a;
                for (let k = 0; k < this.ruleAttachList.length; k++) {
                    this.ruleAttachList[k] = Object.assign(this.ruleAttachList[k], { row: (k + 1) });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }
    nextPageStatement(): void {
        debugger
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchRules();
    }
    previousPageStatement(): void {
        debugger
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchRules();
    }

    OnchangePageno(e) {
        debugger
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.searchRules();
    }
    searchRules(){
        debugger
        this.ruleAttachList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.pageno, this.pagesize, this.ruleName).subscribe(httpResponse => {
            debugger;
            this._primengProgressBarService.hide();
            if (Array.isArray(httpResponse)) {
                this.ruleAttachList = httpResponse;
            } else {
                this.ruleAttachList.push(httpResponse);

            }
            this.ruleAttachList = this.ruleAttachList?.filter(x => x != null)?.map(x => {
                x.status = x.status === 1;
                return x;
            });

            if (this.pageno != 0 && this.pageno != 1) {
                for (let u = 0; u < this.ruleAttachList.length; u++) {
                    this.ruleAttachList[u] = Object.assign(
                        this.ruleAttachList[u],
                        { row: u + startRow + 1 },
                    );
                }
            } else if (this.pageno == 1) {
                for (let u = 0; u < this.ruleAttachList.length; u++) {
                    this.ruleAttachList[u] = Object.assign(
                        this.ruleAttachList[u],
                        { row: u + this.pagesize + 1 },
                    );
                }
            } else {
                for (let u = 0; u < this.ruleAttachList.length; u++) {
                    this.ruleAttachList[u] = Object.assign(
                        this.ruleAttachList[u],
                        { row: u + 1 },
                    );
                }
            }
            this._primengProgressBarService.hide();

        }, error => {
            this._primengProgressBarService.hide();
        });
    }
    showRules() {
        debugger
        this.pageno=0
        this.pagesize=10
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.pageno, this.pagesize,this.ruleName).subscribe(
            (c) => {
                debugger
                this.nextBtnFlag=false
                this._primengProgressBarService.hide();
                this.ruleAttachList = c;
                for (let k = 0; k < this.ruleAttachList.length; k++) {
                    this.ruleAttachList[k] = Object.assign(this.ruleAttachList[k], { row: (k + 1) });
                }
                this.dialogRuleFlag = true;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    selectedRule(rule) {
        this.ruleTemp = {
            apiId: null,
            ruleId: null,
            apiRuleStatus: null,
        };
        this.ruleName = '';
        this.ruleTemp.apiId = this.apiId;
        this.ruleTemp.ruleId = rule.ruleId;
        this.ruleTemp.apiRuleStatus =1;

        console.log(rule, 'rule');
        console.log(this.rulList, 'this.rulList');
        console.log(this.rulList.length, 'this.rulList.length');
        if (this.rulList.length == 0) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRuleAttach(this.ruleTemp)
                .subscribe(
                    (l) => {
                        this._primengProgressBarService.hide();
                        this.dialogRuleFlag = false;

                        this.searchRule(this.apiId);
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else {
            this.dialogRuleFlag = false;
            this.notifierService.showError({
                detail: 'یک قاعده متصل به سرویس مورد نظر وجود دارد!',
                life: 3000,
            });
        }
    }

    showRuleCondition(rule: any) {
        debugger

        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            status: null,
            httpsstatus: '',
            name: '',
            messageId: null,
            apiId: null,
            ruleId: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            apiTitle: null,
            clientName: null,
            clientBase: null,
            accessBase: null,
            partyBase: null,
            apiName: null,
            ruleBase: null,
        };

        this.apiGatewayService.updateApprovalRuleId(rule.ruleId);
        this.ruleDto = rule;
        this.ruleDto.partyTitle = this.partyTitle;
        this.ruleDto.moduleTitle = this.moduleTitle;
        this.ruleDto.apiTitle = this.title;
        this.ruleDto.clientName = this.clientName;
        this.ruleDto.apiName = this.name;

        this.ruleDto.ruleBase = true;
        this.ruleDto.moduleBase = this.inputApiRule.moduleBase;
        this.ruleDto.clientBase = this.inputApiRule.clientBase;
        this.ruleDto.accessBase = this.inputApiRule.accessBase;
        this.ruleDto.partyBase = this.inputApiRule.partyBase;
        this.ruleDto.partyBase = this.inputApiRule.partyBase;
        this.ruleDto.ruleBase =false;
        this.rulConditionFlag = true;
    }
    active(rule: any) {

        this.messagesApiFacadeService.apiruleStatus(rule.apiId,rule.ruleId,1).subscribe(x=>{
            this.searchRule(this.apiId);
            this.notifierService.showSuccess(this.transloco.translate('label.http.status.200'));
        })



    }
    deActive(rule: any) {
        this.messagesApiFacadeService.apiruleStatus(rule.apiId,rule.ruleId,0).subscribe(x=>{
            this.searchRule(this.apiId);
            this.notifierService.showSuccess(this.transloco.translate('label.http.status.200'));
        })
    }

    showUpdate(rule: any) {
        debugger
        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            status: null,
            httpsstatus: '',
            name: '',
            messageId: null,
            apiId: null,
            ruleId: null,
        };
        this.ruleDto = rule;
        this.ruleDto.moduleBase = this.inputApiRule.moduleBase;
        this.ruleDto.clientBase = this.inputApiRule.clientBase;
        this.ruleDto.accessBase = this.inputApiRule.accessBase;
        this.ruleDto.partyBase = this.inputApiRule.partyBase;
        this.ruleDto.partyTitle = this.partyTitle;
        this.ruleDto.moduleTitle = this.moduleTitle;
        this.ruleDto.moduleTitle = this.moduleTitle;
        this.ruleDto.apiTitle = this.title;
        this.ruleDto.clientName = this.clientName;
        this.ruleDto.apiName = this.name;
        this.updateFlag = true;
    }

    onClose(event) {
        if (this.inputApiRule != undefined) {
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.searchRule(this.apiId);
        }
    }

    searchRule(apiId) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.ruleFindByApiid(apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(a)) {
                    this.rulList = a;
                } else {
                    this.rulList.push(a);
                }
                this.rulList.map((x) =>
                    x.apiRuleStatus === 1 ? (x.apiRuleStatus = true) : (x.apiRuleStatus = false)
                );
                for (let k = 0; k < this.rulList.length; k++) {
                    this.rulList[k] = Object.assign(this.rulList[k], {
                        row: k + 1,
                    });
                    /*(this.partyList[k].row = (k+1))*/
                }
                if (this.rulList.length != 0) {
                    this.attachFlag = true;
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    setRecord(rule) {
        this.tempRule = rule;
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
