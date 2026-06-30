import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {MoreChar19Pipe} from '../../../shared/pipes/moreChar19.pipe';
import {NgIf} from '@angular/common';
import {Menu} from 'primeng/menu';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {DropdownModule} from 'primeng/dropdown';
import {FormatRulePipe} from '../../../shared/pipes/FormatRule.pipe';
import {ApiRuleRegisterComponent} from './api-rule-register/api-rule-register.component';
import {ApiRuleUpdateComponent} from './api-rule-update/api-rule-update.component';
import {ApiRuleConditionComponent} from './api-rule-condition/api-rule-condition.component';
import {FuseLoadingService} from '../../../../../@fuse/services/loading';
import {ToastService} from '../../../shared/services/ToastService';
import {ApiGatewayService} from '../../services/api-gateway.service';
import {ApiGatewayConstants} from '../../constants/ApiGatewayConstants';
import {MessagesApiFacadeService} from '../../services/messages-api-facade.service';
import {PrimeNG} from 'primeng/config';
import {Toast} from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { MessageTypePipe } from '../../../shared/pipes/messageType.pipe';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Card } from 'primeng/card';
import { TestRunConditionComponent } from './test-run-condition/test-run-condition.component';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        NgIf,
        Toast,
        ButtonDirective,
        TranslocoPipe,
        FormsModule,
        InputText,
        DropdownModule,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        FormatRulePipe,
        Menu,
        ApiRuleRegisterComponent,
        ApiRuleUpdateComponent,
        ApiRuleConditionComponent,
        Ripple,
        Accordion,
        AccordionContent,
        AccordionHeader,
        AccordionPanel,
        MessageTypePipe,
        MessagesCategoryPipe,
        TranslocoDirective,
        Tabs,
        TabList,
        TabPanels,
        Tab,
        TabPanel,
        Card,
        TestRunConditionComponent,

    ],
})
export class RulesComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRule;
    filteredInbound
    filteredOutbound
    dialogMessageFlag = false;
    messageDetailFlag = false;
    takhsisFlag = false;
    messagesList = [];
    ruleInboundList = [];
    ruleOutboundList = [];
    ruleList = [];
    codeMessage;
    titleMessage;
    tableIdMessage;
    typeMessage;
    textMessage;
    textENMessage;
    messageId;
    name;
    title;
    text;
    addFlag = false;
    updateFlag = false;
    rulConditionFlag = false;
    displayFlag = false;
    moduleType;
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    ruleDto;
    detailsBreadObject = [];
    moduleBase;
    moduleTitle;
    partyTitle;
    clientName;
    tempRule;
    tempRuleOut;
    items;
    itemsOut;
    widthName;
    widthTitle;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthCode;
    widthTableId;
    widthText;
    statusCode=null;
    tableId;
    code;
    first = 0;
    rows = 10;
    first2 = 0;
    rows2 = 10;
    totalRecords: number = 0;
    pagenoInbound: number = 0;
    pagenoOutbound: number = 0;
    pagesizeInbound = 10;
    pagesizeOutbound = 10;
    pageDescriptionInbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoInbound + 1);
    pageDescriptionOutbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoOutbound + 1);
    pagesizeOptionsInbound = [
        { name: 5, code: 5 },
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pagesizeOptionsOutbound = [
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
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
        private _primengProgressBarService: FuseLoadingService,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'rulesBase':
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
                        label_index1: this.transloco.translate('menu.rule'),
                        rout_index1: '/rule',
                        isActive1: true,
                        img_index1: 'assets/icons/rule.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
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


        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('rulesBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label:this.transloco.translate('contextMenu.Conditions'),
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        },
                    },

                    {
                        label:this.transloco.translate('contextMenu.testRun'),
                        command: () => {
                            this.showDisplay(this.tempRule);
                        },
                    },
                    {
                        label:this.transloco.translate('contextMenu.Edit'),
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
                        label:this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.itemsOut = [
            {
                items: [
                    {
                        label:this.transloco.translate('contextMenu.Conditions'),
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        },
                    },
                    {
                        label:this.transloco.translate('contextMenu.Edit'),
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
                        label:this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.search(true);
        if (this.inputRule != undefined) {
            this.name = this.inputRule.name;
            this.title = this.inputRule.title;
            this.moduleTitle = this.inputRule.moduleTitle;
            this.partyTitle = this.inputRule.partyTitle;
            this.clientName = this.inputRule.clientName;
        }
        if (this.code) {
            this.code.length > 22
                ? (this.widthCode = 100)
                : (this.widthCode = 50);
        }
        if (this.name) {
            this.name.length > 22
                ? (this.widthName = 100)
                : (this.widthName = 50);
        }
        if (this.title) {
            this.title.length > 22
                ? (this.widthTitle = 100)
                : (this.widthTitle = 50);
        }
    }



    showDisplay(rule) {
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
        this.ruleDto.ruleBase=true
        this.displayFlag = true;
    }
    nextPageStatementOutbound(): void {
        debugger
        this.pagenoOutbound+= 1;
        this.pageDescriptionOutbound =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoOutbound + 1);
        this.search(false,1);
    }
    previousPageStatementOutbound(): void {
        debugger
        this.pagenoOutbound -= 1;
        this.pageDescriptionOutbound =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoOutbound + 1);
        this.search(false,1);
    }
    OnchangePagenoOutbound(e) {
        debugger
        this.pagenoOutbound = 0;
        this.pageDescriptionOutbound=this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(false,1);    }
    showAdd() {
        this.addFlag = true;
    }
    onKeydownSearch(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.search(true,null,true)
        }
    }
    showRuleCondition(rule: any) {
        debugger
        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            httpsstatus: '',
            name: '',
            messageId: null,
            ruleId: null,
            ruleBase: null,
        };
        debugger
        this.ruleDto = rule;
        this.ruleDto.ruleBase = true;
        this.ruleDto.ruleId = rule.ruleId;

        this.apiGatewayService.updateApprovalRuleId(rule.ruleId);
        this.rulConditionFlag = true;
    }
    nextPageStatementInbound(): void {
        debugger
        this.pagenoInbound += 1;
        this.pageDescriptionInbound =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoInbound + 1);
        this.search(false,0);
    }
    previousPageStatementInbound(): void {
        debugger
        this.pagenoInbound -= 1;
        this.pageDescriptionInbound =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoInbound + 1);
        this.search(false,0);
    }
    OnchangePagenoInbound(e) {
        debugger
        this.pagenoInbound = 0;
        this.pageDescriptionInbound =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(false,0);
    }
    private fromBase64Unicode(str: string): string {
        if (!str) return '';

        try {
            return decodeURIComponent(
                atob(str)
                    .split('')
                    .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('')
            );
        } catch {
            return str;
        }
    }
    search(flag?:boolean,template?,reset?) {
        debugger;
        this.ruleList = [];


        let startRow: number;
        this.pagenoInbound != 0 ? (startRow = this.pagenoInbound * this.pagesizeInbound) : (startRow = 0);
        this.pagenoOutbound != 0 ? (startRow = this.pagenoOutbound * this.pagesizeOutbound) : (startRow = 0);
        if(flag){
            debugger
            this.ruleOutboundList=[]
            this.ruleInboundList=[]
            this.pageDescriptionInbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoInbound + 1);
            this.pageDescriptionOutbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoOutbound + 1);
            debugger
            if (reset){
                debugger
                this.pagenoOutbound=0
                this.pagesizeOutbound=10
                this.pageDescriptionOutbound=this.transloco.translate('hardCode.page') + ': ' + 1;

                this.pagenoInbound=0
                this.pagesizeInbound=10
                this.pageDescriptionInbound=this.transloco.translate('hardCode.page') + ': ' + 1;
            }
            debugger
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.rulesearch(this.pagenoOutbound, this.pagesizeOutbound,this.name, this.statusCode, this.messageId,1).subscribe((httpResponse) => {
                this._primengProgressBarService.hide();
                this.ruleOutboundList = Array.isArray(httpResponse) ? httpResponse : [httpResponse];
                this.ruleOutboundList = this.ruleOutboundList?.filter(x => x != null)?.map(x => ({
                    ...x,
                    status: x.status === 1,
                    errorText: this.fromBase64Unicode(x.errorText)
                }))
                this.filteredOutbound = this.ruleOutboundList.length;
                if (this.pagenoOutbound != 0 && this.pagenoOutbound != 1) {
                    for (let u = 0; u < this.ruleOutboundList.length; u++) {
                        this.ruleOutboundList[u] = Object.assign(
                            this.ruleOutboundList[u],
                            { row: u + startRow + 1 },
                        );
                    }
                    for (let u = 0; u < this.ruleOutboundList.length; u++) {
                        this.ruleOutboundList[u] = Object.assign(
                            this.ruleOutboundList[u],
                            { row: u + startRow + 1 },
                        );
                    }
                }
                else if (this.pagenoOutbound == 1) {
                    for (let u = 0; u < this.ruleOutboundList.length; u++) {
                        this.ruleOutboundList[u] = Object.assign(
                            this.ruleOutboundList[u],
                            { row: u + this.pagesizeOutbound + 1 },
                        );
                    }

                } else {
                    for (let u = 0; u < this.ruleOutboundList.length; u++) {
                        this.ruleOutboundList[u] = Object.assign(
                            this.ruleOutboundList[u],
                            { row: u + 1 },
                        );
                    }
                }
                this._primengProgressBarService.hide();
                for (let k = 0; k < this.ruleList.length; k++) {
                    this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
                }
            }, error => {
                this._primengProgressBarService.hide();
            });
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.rulesearch(this.pagenoInbound, this.pagesizeInbound,this.name, this.statusCode, this.messageId,0).subscribe((httpResponse) => {
                this._primengProgressBarService.hide();
                this.ruleInboundList = Array.isArray(httpResponse) ? httpResponse : [httpResponse];
                this.ruleInboundList = this.ruleInboundList?.filter(x => x != null)?.map(x => ({
                    ...x,
                    status: x.status === 1,
                    errorText: this.fromBase64Unicode(x.errorText)
                }))
                this.filteredInbound = this.ruleInboundList.length;
                if (this.pagenoInbound != 0 && this.pagenoInbound != 1) {
                    for (let u = 0; u < this.ruleInboundList.length; u++) {
                        this.ruleInboundList[u] = Object.assign(
                            this.ruleInboundList[u],
                            { row: u + startRow + 1 },
                        );
                    }
                    for (let u = 0; u < this.ruleInboundList.length; u++) {
                        this.ruleInboundList[u] = Object.assign(
                            this.ruleInboundList[u],
                            { row: u + startRow + 1 },
                        );
                    }
                }
                else if (this.pagenoInbound == 1) {
                    for (let u = 0; u < this.ruleInboundList.length; u++) {
                        this.ruleInboundList[u] = Object.assign(
                            this.ruleInboundList[u],
                            { row: u + this.pagesizeInbound + 1 },
                        );
                    }

                } else {
                    for (let u = 0; u < this.ruleInboundList.length; u++) {
                        this.ruleInboundList[u] = Object.assign(
                            this.ruleInboundList[u],
                            { row: u + 1 },
                        );
                    }
                }
                this._primengProgressBarService.hide();
                for (let k = 0; k < this.ruleList.length; k++) {
                    this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
                }
            }, error => {
                this._primengProgressBarService.hide();
            });
        }
        else{
            debugger
            if (template==0){
                this.ruleInboundList=[]
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.rulesearch(this.pagenoInbound, this.pagesizeInbound,this.name, this.statusCode, this.messageId,template).subscribe((httpResponse) => {
                    this._primengProgressBarService.hide();
                    this.ruleInboundList = Array.isArray(httpResponse) ? httpResponse : [httpResponse];
                    this.ruleInboundList = this.ruleInboundList?.filter(x => x != null)?.map(x => ({
                        ...x,
                        status: x.status === 1,
                        errorText: this.fromBase64Unicode(x.errorText)
                    }))
                    this.filteredInbound = this.ruleInboundList.length;
                    if (this.pagenoInbound != 0 && this.pagenoInbound != 1) {
                        for (let u = 0; u < this.ruleInboundList.length; u++) {
                            this.ruleInboundList[u] = Object.assign(
                                this.ruleInboundList[u],
                                { row: u + startRow + 1 },
                            );
                        }
                        for (let u = 0; u < this.ruleInboundList.length; u++) {
                            this.ruleInboundList[u] = Object.assign(
                                this.ruleInboundList[u],
                                { row: u + startRow + 1 },
                            );
                        }
                    }
                    else if (this.pagenoInbound == 1) {
                        for (let u = 0; u < this.ruleInboundList.length; u++) {
                            this.ruleInboundList[u] = Object.assign(
                                this.ruleInboundList[u],
                                { row: u + this.pagesizeInbound + 1 },
                            );
                        }

                    } else {
                        for (let u = 0; u < this.ruleInboundList.length; u++) {
                            this.ruleInboundList[u] = Object.assign(
                                this.ruleInboundList[u],
                                { row: u + 1 },
                            );
                        }
                    }
                    this._primengProgressBarService.hide();
                    for (let k = 0; k < this.ruleList.length; k++) {
                        this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
                    }
                }, error => {
                    this._primengProgressBarService.hide();
                });
            }
            else if(template==1){
                this.ruleOutboundList=[]
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.rulesearch(this.pagenoOutbound, this.pagesizeOutbound,this.name, this.statusCode, this.messageId,template).subscribe((httpResponse) => {
                    this._primengProgressBarService.hide();
                    this.ruleOutboundList = Array.isArray(httpResponse) ? httpResponse : [httpResponse];
                    this.ruleOutboundList = this.ruleOutboundList?.filter(x => x != null)?.map(x => ({
                        ...x,
                        status: x.status === 1,
                        errorText: this.fromBase64Unicode(x.errorText)
                    }))
                    this.filteredOutbound = this.ruleOutboundList.length;
                    if (this.pagenoOutbound != 0 && this.pagenoOutbound != 1) {
                        for (let u = 0; u < this.ruleOutboundList.length; u++) {
                            this.ruleOutboundList[u] = Object.assign(
                                this.ruleOutboundList[u],
                                { row: u + startRow + 1 },
                            );
                        }
                        for (let u = 0; u < this.ruleOutboundList.length; u++) {
                            this.ruleOutboundList[u] = Object.assign(
                                this.ruleOutboundList[u],
                                { row: u + startRow + 1 },
                            );
                        }
                    }
                    else if (this.pagenoOutbound == 1) {
                        for (let u = 0; u < this.ruleOutboundList.length; u++) {
                            this.ruleOutboundList[u] = Object.assign(
                                this.ruleOutboundList[u],
                                { row: u + this.pagesizeOutbound + 1 },
                            );
                        }

                    } else {
                        for (let u = 0; u < this.ruleOutboundList.length; u++) {
                            this.ruleOutboundList[u] = Object.assign(
                                this.ruleOutboundList[u],
                                { row: u + 1 },
                            );
                        }
                    }
                    this._primengProgressBarService.hide();
                    for (let k = 0; k < this.ruleList.length; k++) {
                        this.ruleList[k] = Object.assign(this.ruleList[k], { row: (k + 1) });
                    }
                }, error => {
                    this._primengProgressBarService.hide();
                });
            }
        }
    }
    clear() {
        this.pagesizeOutbound=10
        this.pagesizeInbound=10
        this.pagenoOutbound=0
        this.pagenoInbound=0
        this.pageDescriptionOutbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoOutbound + 1);
        this.pageDescriptionInbound = this.transloco.translate('hardCode.page') + ': ' + (this.pagenoInbound + 1);
        this.nextBtnFlag=false
        this.name = '';
        this.statusCode = '';
        this.messageId = '';
        this.title = '';
        this.codeMessage = '';
        this.titleMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.search(true,null,true);
    }
    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseCodeMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail:  this.transloco.translate('rule.dialog.message.chooseTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail:  this.transloco.translate('rule.dialog.message.chooseTypeMessages'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = [];
            this.messageId = '';
            this.registerTemp.code = this.codeMessage;
            this.registerTemp.title = this.titleMessage;
            this.registerTemp.type = this.typeMessage;
            this.registerTemp.text = this.textMessage;
            this.registerTemp.textEN = this.textENMessage;

            this.registerTemp.tableId = this.tableIdMessage;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerMessage(this.registerTemp)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.messageId = a.messageId;
                        this.title = a.title;
                        this.text = a.text;

                        this.dialogMessageFlag = false;
                        this.search();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    showUpdate(rule: any) {
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
        this.ruleDto.ruleBase=true
        this.updateFlag = true;
    }

    onClose(event) {
        this.scrollTop();
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('menu.basicInfo'),
                img_index0: 'assets/icons/bulletin.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('menu.rule'),
                rout_index1: '/rule',
                isActive1: true,
                img_index1: 'assets/icons/rule.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.displayFlag = false;
            this.search(true);
        } else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.displayFlag = false;
            this.search(true);
        }
    }

    setRecord(rule) {
        this.tempRule = rule;
    }


    BeforeButton() {
        this.close.emit('close');
    }
}
