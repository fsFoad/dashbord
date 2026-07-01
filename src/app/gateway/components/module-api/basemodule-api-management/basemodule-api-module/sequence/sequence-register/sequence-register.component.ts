// @ts-nocheck
import {  Component, EventEmitter, Input, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiGatewayConstants } from '../../../../../../constants/ApiGatewayConstants';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { FuseLoadingService } from '@fuse/services/loading';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { ButtonDirective } from 'primeng/button';
import { Message } from 'primeng/message';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Fieldset } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { Ripple } from 'primeng/ripple';
import { Tooltip } from 'primeng/tooltip';
import { TieredMenu } from 'primeng/tieredmenu';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { ProducedNodeComponent } from '../../produced-node/produced-node.component';
import { NgIf } from '@angular/common';
import { RequiredNodeComponent } from '../../required-node/required-node.component';
import { Dialog } from 'primeng/dialog';
import { Panel } from 'primeng/panel';
import { Listbox } from 'primeng/listbox';
import { MorChar13Pipe } from '../../../../../../../shared/pipes/morChar13.pipe';
import { detailTypePipe } from '../../../../../../../shared/pipes/detail-type.pipe';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { MorChar32Pipe } from '../../../../../../../shared/pipes/morChar32.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { MessagesCategoryPipe } from '../../../../../../../shared/pipes/messagesCategory.pipe';
import { MorChar55Pipe } from '../../../../../../../shared/pipes/morChar55.pipe';
import {
    MessageSelectorComponent
} from '../../../../../../../shared/components/message-selector/message-selector.component';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sequence-register',
    templateUrl: './sequence-register.component.html',
    styleUrls: ['./sequence-register.component.scss'],
    providers: [ConfirmationService],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Toast,
        ButtonDirective,
        Message,
        InputText,
        FormsModule,
        Fieldset,
        DropdownModule,
        Ripple,
        Tooltip,
        TieredMenu,
        Checkbox,
        TableModule,
        ProducedNodeComponent,
        NgIf,
        RequiredNodeComponent,
        Dialog,
        Panel,
        Listbox,
        TranslocoPipe,
        MorChar13Pipe,
        detailTypePipe,
        MoreChar19Pipe,
        MorChar32Pipe,
        MatTooltip,
        MessagesCategoryPipe,
        MorChar55Pipe,
        MessageSelectorComponent,

    ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SequenceRegisterComponent implements OnInit {

    constructor(
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private confirmationService: ConfirmationService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
    }

    @Input() inputSequenceRegister;
    @Output() close = new EventEmitter<string>();
    responseObjSequence = null;
    titleApiSecound = 'سرویس اولیه';
    messageSelector200Action$ = new Subject<any>();
    messageSelector400Action$ = new Subject<any>();
    messageSelector500Action$ = new Subject<any>();
    titleApiDe;
    apiIdDe;
    apiIdOrg;
    apiTitleOrg;
    apiNameOrg;
    moduleTitleOrg;
    partyTitleOrg;
    apiTitle;
    nameApiDe;
    moduleTitleDe;
    moduleTitle;
    clientNameDe;
    clientName;
    partyTitle;
    apiId;
    firstSequnceId;
    sequnceIdOrg;
    secondSequnceId;
    firstApiSequnceId;
    messageId4XX: number = null;
    messageId5XX: number = null;
    messageId2XX: number = null;
    producedNodeFlag = false;
    requiredNodeFlag = false;
    runAsyncFirst = false;
    apiHasIgnoreSignatureElement = false;
    apiUseApiCacheFeature = false;
    hasClientDisabled = true;
    hasClient = false;
    disableCusMessage = true;
    clientOptions=[{ name: '-', clientId: null }];
    partyIdFirst;
    moduleIdFirst;
    apiIdFirst;
    apiTitleFirst;
    apiNameFirst;
    moduleTitleFirst;
    partyTitleFirst;
    partyListOptionsFirst = [{ title: '-', partyId: null }];
    moduleListOptionsFirst = [{ moduleTitle: '-', moduleId: null }];
    apiListOptionsFirst = [{ title: '-', apiId: null }];
    statusCodeOptions400 = ApiGatewayConstants.statusCode;
    statusCodeOptions500 = ApiGatewayConstants.statusCode;
    statusCodeOptions200 = ApiGatewayConstants.statusCode;
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    categoryMessages200 = ApiGatewayConstants.categoryMessages;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessage400;
    typeMessage500;
    messageId: number = null;
    codeMessage400 = '400';
    codeMessage500 = '500';
    tableIdMessage400;
    tableIdMessage500;
    apiDto;
    titleMessage400;
    titleMessage500;
    textMessage400;
    textMessage500;
    textENMessage400;
    textENMessage500;
    producedListFirst = [];
    requiredListFirst = [];
    requiredNode;
    producedNode;
    pointerMatch = null;
    title = '';
    status: boolean = null;
    afterApiFirst: number = null;
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    objSequence = {
        parentId: null,
        apiId: null,
        actionType: null,
        runAsync: null,
        orderId: null,
        title: '',
        messageId4XX: null,
        messageId5XX: null,
        messageId2XX: null,
        status: null,
        clientId: null,
    };
    objMatch = {
        producerId: null,
        requiredId: null,
        sequenceId: null,
    };
    tooltipCusBtn = '';
   actionTypeOptionsFirst = [
        { name: '-', code: null },
        { name: 'Before', code: 1 },
        { name: 'Call Back', code: 2 },
    ];
    dialogFirstMatchFlag = false;
    paginationLabel = this.transloco.translate('label.pagination.table');
    helpFlag = false;
    registerFlag = false;
    nextFlag = true;
    clientHidden = true;
    afterApiDisableFirst = true;
    afterApiDisableSecond = true;
    afterApiDisableThird = true;
    firstApi = false;
    first = 0;
    rows = 10;
    matchListFirst = [];
    actionTypeFirst: number = null;
    thirdPart = false;
    secondPart = false;
    itemsFirst;
    itemsDialog;
    tempItem: number = null;
    tempItemDialog: number = null;
    clientBase;
    moduleBase;
    accessBase;
    detailsBreadObject = [];
    apiTitleProduced = '';
    apiIdProduced: number = null;
    apiIdRequired: number = null;
    apiTitleRequired = '';
    countRequired: number = null;
    countProduced: number = null;
    clientId=null;
    clearTriggerForMessageSelector200 = false;
    clearTriggerForMessageSelector400 = false;
    clearTriggerForMessageSelector500 = false;
    messagesList200Temp = [];
    messagesList400Temp = [];
    messagesList500Temp = [];
    message200Flag = false;
    message400Flag = false;
    message500Flag = false;
    icon200_val = null;
    icon400_val = null;
    icon500_val = null;
    onClose(e) {
        if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.partyTitle != undefined && this.partyTitle != '') {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        this.producedNodeFlag = false;
        this.requiredNodeFlag = false;
    }
    OnchangePartyFirst(event) {
        this.matchListFirst = [];
        this.apiIdFirst = null;
        this.apiListOptionsFirst = [{ title: '-', apiId: null }];
        if (event.value != null) {
            this.partyListOptionsFirst.forEach(s => {
                if (s.partyId == event.value) {
                    this.partyTitleFirst = s.title;
                    this.partyIdFirst = s.partyId;
                }
            });
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(m => {
                this._primengProgressBarService.hide();
                this.moduleListOptionsFirst = [];
                this.moduleListOptionsFirst.push(...m);
                this.moduleListOptionsFirst.unshift({ moduleTitle: '-', moduleId: null });
                this.moduleListOptionsFirst = this.moduleListOptionsFirst.sort();
            }, error => {
                this._primengProgressBarService.hide();
            });
        } else {
            this.partyIdFirst = null;
            this.partyTitleFirst = null;
            this.moduleIdFirst = null;
            this.moduleListOptionsFirst = [{ moduleTitle: '-', moduleId: null }];
            this.apiIdFirst = null;
            this.apiListOptionsFirst = [{ title: '-', apiId: null }];
        }
    }
    OnchangeModuleFirst(event) {
        this.matchListFirst = [];
        if (event.value != null) {
            this.moduleListOptionsFirst.forEach(s => {
                if (s.moduleId == event.value) {
                    this.moduleTitleFirst = s.moduleTitle;
                    this.moduleIdFirst = s.moduleId;
                }
            });
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apiNochart(0, 10000, this.moduleIdFirst).subscribe(a => {
                this._primengProgressBarService.hide();
                this.apiListOptionsFirst = [];
                this.apiListOptionsFirst.push(...a);
                this.apiListOptionsFirst.unshift({ title: '-', apiId: null });
                this.apiListOptionsFirst = this.apiListOptionsFirst.sort();
            }, error => {
                this._primengProgressBarService.hide();
            });
        } else {
            this.apiIdFirst = null;
            this.moduleTitleFirst = null;
            this.moduleIdFirst = null;
            this.apiListOptionsFirst = [{ title: '-', apiId: null }];
        }
    }
    OnchangeApiFirst(event) {
        this.matchListFirst = [];
        if (event.value != null) {
            this.apiListOptionsFirst.forEach(s => {
                if (s.apiId == event.value) {
                    this.apiTitleFirst = s.title;
                    this.apiIdFirst = s.apiId;
                }
            });
            this.messagesApiFacadeService.checkapicapability(this.apiIdFirst).subscribe(c => {
                this.apiHasIgnoreSignatureElement = c.apiHasIgnoreSingatureElement;
                this.apiUseApiCacheFeature = c.apiUseApiCacheFeature;
            });
        } else {
            this.apiNameFirst = null;
            this.apiTitleFirst = null;
            this.apiIdFirst = null;
            this.apiHasIgnoreSignatureElement = null;
            this.apiUseApiCacheFeature = null;
        }

    }
    onChangeHasClient(event) {
        console.log(event,'clientId');
        if(!event.checked){
           this.clientId=null
        }
    }
    onChangeHasClientv(event) {
        console.log(event,'onChangeHasClientv');

    }
    onChangeActionTypeFirst(event) {
        this.matchListFirst = [];
        if (event.value == 2) {
            this.titleApiSecound = 'سرویس ثانویه';
            this.thirdPart = true;
            this.secondPart = true;
            this.afterApiDisableFirst = false;
            this.runAsyncFirst = true;
            this.afterApiDisableSecond = true;
            this.afterApiDisableThird = true;
            this.disableCusMessage = true;
        } else {
            this.disableCusMessage = false;
            this.titleApiSecound = 'سرویس اولیه';
            this.runAsyncFirst = false;
            this.thirdPart = false;
            this.secondPart = false;
            this.afterApiDisableFirst = true;
            this.afterApiFirst = null;
        }
    }
    showProducedNode(item) {
        if (this.validationFirstApi()) {
            if (this.actionTypeFirst == 1) {
                this.apiDto.apiId = this.apiIdFirst;
                this.apiDto.title = this.apiTitleFirst;
                this.apiDto.name = this.apiNameFirst;
                this.apiDto.moduleTitle = this.moduleTitleFirst;
                this.apiDto.moduleId = this.moduleIdFirst;
                this.apiDto.partyTitle = this.partyTitleFirst;
                this.apiDto.partyId = this.partyIdFirst;
            } else if (this.actionTypeFirst == 2) {
                this.apiDto.apiId = this.apiIdOrg;
                this.apiDto.title = this.apiTitleOrg;
                this.apiDto.name = this.apiNameOrg;
                this.apiDto.moduleTitle = this.moduleTitleOrg;
                this.apiDto.partyTitle = this.partyTitleOrg;
            }
            this.producedNodeFlag = true;
        }


    }
    showRequiredNode(item) {
        if (this.validationFirstApi()) {
            if (this.actionTypeFirst == 1) {
                this.apiDto.apiId = this.apiIdOrg;
                this.apiDto.title = this.apiTitleOrg;
                this.apiDto.name = this.apiNameOrg;
                this.apiDto.moduleTitle = this.moduleTitleOrg;
                this.apiDto.partyTitle = this.partyTitleOrg;
            } else if (this.actionTypeFirst == 2) {
                this.apiDto.apiId = this.apiIdFirst;
                this.apiDto.title = this.apiTitleFirst;
                this.apiDto.name = this.apiNameFirst;
                this.apiDto.moduleTitle = this.moduleTitleFirst;
                this.apiDto.moduleId = this.moduleIdFirst;
                this.apiDto.partyTitle = this.partyTitleFirst;
                this.apiDto.partyId = this.partyIdFirst;

            }


            this.requiredNodeFlag = true;
        }
    }
    validationFirstApi(): boolean {
        debugger
        if (!this.actionTypeFirst) {
            this.notifierService.showError({ detail: 'لطفا اولویت اجرا را انتخاب کنید!', life: 3000 });
            return false;

        } else if (!this.partyIdFirst) {
            this.notifierService.showError({
                detail: 'لطفا سازمان را برای ' + this.titleApiSecound + '  انتخاب کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.moduleIdFirst) {
            this.notifierService.showError({
                detail: 'لطفا ماژول را برای ' + this.titleApiSecound + ' انتخاب کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.apiIdFirst) {
            this.notifierService.showError({
                detail: 'لطفا سرویس را برای ' + this.titleApiSecound + ' انتخاب کنید!',
                life: 3000,
            });
            return false;
        } else if (this.apiIdFirst == this.apiIdOrg) {
            this.notifierService.showError({
                detail: 'انتخاب سرویس تکراری برای سرویس اول امکان پذیر نیست!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
    onChildSelectionCleared200(flag: boolean) {
        if (!flag) return;
        this.messageId2XX = null;
        this.icon200_val = null;
    }
    handleMessageSelected(type: '200' | '400' | '500', message: any) {
        const id = message?.messageid ?? message?.messageId;

        if (type === '200') {
            this.messageId2XX = id;
            this.icon200_val = 'pi pi-check';
        }

        if (type === '400') {
            this.messageId4XX = id;
            this.icon400_val = 'pi pi-check';
        }

        if (type === '500') {
            this.messageId5XX = id;
            this.icon500_val = 'pi pi-check';
        }

        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared400(flag: boolean) {
        if (!flag) return;
        this.messageId4XX = null;
        this.icon400_val = null;
    }
    onChildSelectionCleared500(flag: boolean) {
        if (!flag) return;
        this.messageId5XX = null;
        this.icon500_val = null;
    }
    onchangeRunAsyncFirst(e) {
        debugger
        this.disableCusMessage = false;
        if (e.checked) {
            this.disableCusMessage = true;
        }
    }
    private getSuffixForNodePlace(nodePlace?: string | number): string {
        const v = String(nodePlace); // '1' | '2' | '3' | 'undefined' ...
        switch (v) {
            case '1':
                return ' (Header)';
            case '2':
                return ' (Body)';
            case '3':
                return ' (Query String)';
            default:
                return '';
        }
    }
    showMatchNodes(item) {
        debugger
        this.producedNode = null;
        this.requiredNode = null;
        this.pointerMatch = item;

        debugger
        if (this.validationFirstApi()) {
            debugger
            this.apiDto.apiId = this.apiIdFirst;
            if (this.matchListFirst.length > 0) {
                if (this.actionTypeFirst == 1) {
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                        debugger
                        this._primengProgressBarService.hide();
                        let countProduced = 0;
                        this.producedListFirst = [];
                        if (Array.isArray(l)) {
                            this.producedListFirst = l;
                        } else {
                            this.producedListFirst.push(...l);
                        }
                        console.log('producedListFirst ', this.producedListFirst);
                        console.log('requiredListFirst ', this.requiredListFirst);
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            // if ('row' in this.producedListFirst) {
                            // } else {
                            /*  this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                  row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                  , partyTitle: this.partyTitle
                              })*/
                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1),
                                nodeName: this.producedListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.producedListFirst[k]?.nodePlace),
                                apiTitle: this.apiTitle,
                                moduleTitle: this.moduleTitle,
                                partyTitle: this.partyTitle,
                            });
                            // }
                        }
                        const filteredPro = this.producedListFirst.filter(proItem => {
                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                        });

                        this.producedListFirst = [];
                        this.producedListFirst = filteredPro;

                        this.apiTitleProduced = this.apiTitleFirst;
                        this.apiIdProduced = this.apiIdFirst;
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++;
                        }
                        this.countProduced = countProduced;
                        this._primengProgressBarService.show();
                        debugger
                        debugger
                        debugger
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                            debugger
                            debugger
                            debugger

                            this._primengProgressBarService.hide();
                            let countRequired = 0;
                            this.requiredListFirst = [];
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e;
                            } else {
                                this.requiredListFirst.push(...e);
                            }
                            console.log('producedListFirst ', this.producedListFirst);
                            console.log('requiredListFirst ', this.requiredListFirst);
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                // if ('row' in this.requiredListFirst) {
                                // } else {
                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                    row: (k + 1),
                                    nodeName: this.requiredListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.requiredListFirst[k]?.nodePlace),
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                });
                                // }

                            }
                            const filteredReq = this.requiredListFirst.filter(reqItem => {
                                return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                            });
                            this.requiredListFirst = [];
                            this.requiredListFirst = filteredReq;


                            this.apiTitleRequired = this.titleApiDe;
                            this.apiIdRequired = this.apiIdDe;
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++;
                            }
                            this.countRequired = countRequired;
                            this.dialogFirstMatchFlag = true;
                        }, error => {
                            this._primengProgressBarService.hide();
                        });

                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                } else if (this.actionTypeFirst == 2) {
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
                        debugger
                        this._primengProgressBarService.hide();
                        let countProduced = 0;
                        this.producedListFirst = [];
                        if (Array.isArray(s)) {
                            this.producedListFirst = s;
                        } else {
                            this.producedListFirst.push(...s);
                        }
                        console.log('producedListFirst ', this.producedListFirst);
                        console.log('requiredListFirst ', this.requiredListFirst);
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            // if ('row' in this.producedListFirst) {
                            // } else {
                            /*  this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                  row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                  , partyTitle: this.partyTitle
                              })*/
                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1),
                                nodeName: this.producedListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.producedListFirst[k]?.nodePlace),
                                apiTitle: this.apiTitle,
                                moduleTitle: this.moduleTitle,
                                partyTitle: this.partyTitle,
                            });
                            // }
                        }
                        const filteredPro = this.producedListFirst.filter(proItem => {
                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                        });

                        this.producedListFirst = [];
                        this.producedListFirst = filteredPro;

                        this.apiTitleProduced = this.apiTitleFirst;
                        this.apiIdProduced = this.apiIdFirst;
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++;
                        }
                        this.countProduced = countProduced;
                        this._primengProgressBarService.show();
                        debugger
                        debugger
                        debugger
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                            debugger
                            debugger
                            debugger
                            this._primengProgressBarService.hide();
                            let countRequired = 0;
                            this.requiredListFirst = [];
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e;
                            } else {
                                this.requiredListFirst.push(...e);
                            }
                            console.log('producedListFirst ', this.producedListFirst);
                            console.log('requiredListFirst ', this.requiredListFirst);
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                // if ('row' in this.requiredListFirst) {
                                // } else {
                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                    row: (k + 1),
                                    nodeName: this.requiredListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.requiredListFirst[k]?.nodePlace),
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                });
                                // }

                            }
                            const filteredReq = this.requiredListFirst.filter(reqItem => {
                                return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                            });
                            this.requiredListFirst = [];
                            this.requiredListFirst = filteredReq;

                            this.apiTitleRequired = this.titleApiDe;
                            this.apiIdRequired = this.apiIdDe;
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++;
                            }
                            this.countRequired = countRequired;
                            this.dialogFirstMatchFlag = true;
                        }, error => {
                            this._primengProgressBarService.hide();
                        });
                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                } else {
                    this.notifierService.showError({ detail: 'لطفا اولویت اجرا را انتخاب کنید' });
                }

            } else {
                if (this.actionTypeFirst == 1) {
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                        this._primengProgressBarService.hide();
                        debugger
                        let countProduced = 0;
                        this.producedListFirst = [];
                        if (Array.isArray(l)) {
                            this.producedListFirst = l;
                        } else {
                            this.producedListFirst.push(...l);
                        }
                        console.log('producedListFirst ', this.producedListFirst);
                        console.log('requiredListFirst ', this.requiredListFirst);
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            // if ('row' in this.producedListFirst) {
                            // } else {
                            /*this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                , partyTitle: this.partyTitle
                            })*/
                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1),
                                nodeName: this.producedListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.producedListFirst[k]?.nodePlace),
                                apiTitle: this.apiTitle,
                                moduleTitle: this.moduleTitle,
                                partyTitle: this.partyTitle,
                            });
                            // }
                        }
                        this.apiTitleProduced = this.apiTitleFirst;
                        this.apiIdProduced = this.apiIdFirst;
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++;
                        }
                        this.countProduced = countProduced;
                        this._primengProgressBarService.show();
                        debugger
                        debugger
                        debugger
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                            debugger
                            debugger
                            debugger
                            this._primengProgressBarService.hide();
                            let countRequired = 0;
                            this.requiredListFirst = [];
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e;
                            } else {
                                this.requiredListFirst.push(...e);
                            }
                            console.log('producedListFirst ', this.producedListFirst);
                            console.log('requiredListFirst ', this.requiredListFirst);
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                /*   if ('row' in this.requiredListFirst) {
                                   } else {*/
                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                    row: (k + 1),
                                    nodeName: this.requiredListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.requiredListFirst[k]?.nodePlace),
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                });
                                // }
                            }
                            this.apiTitleRequired = this.titleApiDe;
                            this.apiIdRequired = this.apiIdDe;
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++;
                            }
                            this.countRequired = countRequired;
                            this.dialogFirstMatchFlag = true;
                        }, error => {
                            this._primengProgressBarService.hide();
                        });


                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                } else if (this.actionTypeFirst == 2) {
                    debugger
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(s => {
                        this._primengProgressBarService.hide();
                        let countProduced = 0;
                        this.producedListFirst = [];
                        if (Array.isArray(s)) {
                            this.producedListFirst = s;
                        } else {
                            this.producedListFirst.push(...s);
                        }
                        console.log('producedListFirst ', this.producedListFirst);
                        console.log('requiredListFirst ', this.requiredListFirst);
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            // if ('row' in this.producedListFirst) {
                            // } else {
                            /*this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                , partyTitle: this.partyTitle
                            })*/
                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                row: (k + 1),
                                nodeName: this.producedListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.producedListFirst[k]?.nodePlace),
                                apiTitle: this.apiTitle,
                                moduleTitle: this.moduleTitle,
                                partyTitle: this.partyTitle,
                            });
                            // }
                        }
                        this.apiTitleProduced = this.titleApiDe;
                        this.apiIdProduced = this.apiIdDe;
                        this.producedListFirst = [...this.producedListFirst];

                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++;
                        }
                        this.countProduced = countProduced;
                        this._primengProgressBarService.show();
                        debugger
                        debugger
                        debugger
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                            debugger
                            debugger
                            debugger
                            this._primengProgressBarService.hide();
                            let countRequired = 0;
                            this.requiredListFirst = [];
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e;
                            } else {
                                this.requiredListFirst.push(...e);
                            }
                            console.log('producedListFirst ', this.producedListFirst);
                            console.log('requiredListFirst ', this.requiredListFirst);
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                // if ('row' in this.requiredListFirst) {
                                // } else {
                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                    row: (k + 1),
                                    nodeName: this.requiredListFirst[k]?.nodeName + this.getSuffixForNodePlace(this.requiredListFirst[k]?.nodePlace),
                                    apiTitle: this.apiTitle,
                                    moduleTitle: this.moduleTitle,
                                    partyTitle: this.partyTitle,
                                });
                                // }
                            }
                            this.apiTitleRequired = this.apiTitleFirst;
                            this.apiIdRequired = this.apiIdFirst;
                            this.requiredListFirst = [...this.requiredListFirst];

                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++;
                            }
                            this.countRequired = countRequired;
                            this.dialogFirstMatchFlag = true;
                        }, error => {
                            this._primengProgressBarService.hide();
                        });
                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                } else {
                    this.notifierService.showError({ detail: 'لطفا اولویت اجرا را انتخاب کنید' });
                }
            }
        }


    }
    closeMatchNodesFirst() {
        this.dialogFirstMatchFlag = false;
    }
    chooseBread(caseBase: string) {
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
                        label_index2: 'مدیریت جریان پردازشی',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/flow.png',
                    },
                    {
                        index: 3, label_index3: 'ثبت جریان پردازشی', rout_index3: null, isActive3: true,
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
                        index: 1, label_index1: 'لیست دسترسی', rout_index1: null, isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2, label_index2: 'سرویس', rout_index2: null, isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3, label_index3: 'مدیریت جریان پردازشی', rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4, label_index4: 'ثبت جریان پردازشی', rout_index4: null, isActive4: true,
                        img_index4: 'assets/icons/save.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: 'ماژول', rout_index1: '/module', isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2, label_index2: 'سرویس', rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3, label_index3: 'مدیریت جریان پردازشی', rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/flow.png',
                    },
                    {
                        index: 4, label_index4: 'ثبت جریان پردازشی', rout_index4: null, isActive4: true,
                        img_index4: 'assets/icons/save.png',
                    }, { label_index5: null, label_Detail_index5: null }
                    , { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1, label_index1: 'سازمان', rout_index1: '/party', isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2, label_index2: 'ماژول', rout_index2: '',
                        isActive2: false, label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3, label_index3: 'سرویس', rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4, label_index4: 'مدیریت جریان پردازشی', rout_index4: null, isActive4: false,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/flow.png',
                    }, {
                        index: 5, label_index5: 'ثبت جریان پردازشی', rout_index5: null, isActive5: true,
                        img_index5: 'assets/icons/save.png',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    matchingFirst() {
        debugger
        let producedId: number = null;
        let requiredId: number = null;
        let nodeNameProduced: string = null;
        let nodePlaceProduced: string = null;
        let nodePathProduced: string = null;
        let nodePlaceRrequired: string = null;
        let nodeNameRrequired: string = null;
        let nodePathRrequired: string = null;

        if (this.producedNode.producedId != undefined && this.producedNode != null) {
            this.producedListFirst.forEach(s => {
                if (s.producedId == this.producedNode.producedId) {
                    producedId = s.producedId;
                    nodeNameProduced = s.nodeName;
                    nodePlaceProduced = s.nodePlace;
                    nodePathProduced = s.nodePath;

                }
            });
        } else {
            this.notifierService.showError({ detail: 'برای اتصال نود ها باید نود تولید شده انتخاب شده باشد!' });
        }

        if (this.requiredNode.requiredId != undefined && this.requiredNode != null) {
            this.requiredListFirst.forEach(s => {
                if (s.requiredId == this.requiredNode.requiredId) {

                    requiredId = s.requiredId;
                    nodeNameRrequired = s.nodeName;
                    nodePlaceRrequired = s.nodePlace;
                    nodePathRrequired = s.nodePath;

                }
            });
        } else {
            this.notifierService.showError({ detail: 'برای اتصال نود ها باید نود مورد نیاز انتخاب شده باشد!' });
        }


        if (this.producedNode != undefined
            && this.requiredNode != undefined
            && this.requiredNode != null
            && this.producedNode != null
        ) {
            let countRequired = 0;
            let countProduced = 0;
            debugger
            this.matchListFirst.push({
                firstApi: this.apiTitleProduced,
                firstApiId: this.apiIdProduced,
                secondApi: this.apiTitleRequired,
                secondApiId: this.apiIdRequired,
                nodeNameRequired: nodeNameRrequired,
                nodeNameProduced: nodeNameProduced,
                nodePlaceProduced: nodePlaceProduced,
                nodePlaceRrequired: nodePlaceRrequired,
                nodePathRrequired: nodePathRrequired,
                nodePathProduced: nodePathProduced,
                requiredId: this.requiredNode.requiredId,
                producedId: this.producedNode.producedId,
                actionType: this.actionTypeFirst,
            });
            const itemIndexProduced = this.producedListFirst.indexOf(this.producedNode);
            const tempProducedList = this.producedListFirst;
            this.producedListFirst = [...tempProducedList];
            this.producedListFirst.splice(itemIndexProduced, 1);

            for (let k = 0; k < this.producedListFirst.length; k++) {
                countProduced++;
            }
            this.countProduced = countProduced;
            const itemIndexRequired = this.requiredListFirst.indexOf(this.requiredNode);
            const tempRequiredList = this.requiredListFirst;
            this.requiredListFirst = [...tempRequiredList];
            this.requiredListFirst.splice(itemIndexRequired, 1);
            for (let k = 0; k < this.requiredListFirst.length; k++) {
                countRequired++;
            }
            this.countRequired = countRequired;
            for (let k = 0; k < this.matchListFirst.length; k++) {
                if ('row' in this.matchListFirst) {
                } else {
                    this.matchListFirst[k] = Object.assign(this.matchListFirst[k], {
                        row: (k + 1),
                    });
                }
            }

        } else {
            this.notifierService.showError({ detail: 'برای اتصال نود ها باید نود مورد نیاز و نود های تولید شده انتخاب شده باشد!' });

        }
        this.requiredNode = null;
        this.producedNode = null;
    }
    deleteMatch(match) {
        debugger

        let countProduced1 = 0;
        let countRequired1 = 0;
        this.producedListFirst = [...this.producedListFirst, {
            producedId: match.producedId,
            nodeName: match.nodeNameProduced,
            nodePlace: match.nodePlaceProduced,
        }];
        this.requiredListFirst = [...this.requiredListFirst, {
            requiredId: match.requiredId,
            nodePlace: match.nodePlaceRequired,
            nodeName: match.nodeNameRequired,
        }];

        for (let i = 0; i < this.matchListFirst.length; i++) {
            if (this.matchListFirst[i].row == match.row) {
                this.matchListFirst.splice(i, 1);
                break;
            }
        }
        for (let k = 0; k < this.producedListFirst.length; k++) {
            countProduced1++;
        }
        this.countProduced = countProduced1;
        for (let k = 0; k < this.requiredListFirst.length; k++) {
            countRequired1++;
        }
        this.countRequired = countRequired1;

    }
    ngOnInit(): void {
        console.log('inputSequenceRegister', this.inputSequenceRegister);
        this.itemsFirst = [
            {
                label: 'اتصال نود های تولید شده و نود های مورد نیاز',
                icon: '',
                command: () => {
                    this.showMatchNodes(this.tempItem);
                },
            },
            {
                label: 'نود های تولید شده',
                icon: '',
                command: () => {
                    this.showProducedNode(this.tempItem);
                },
            },
            {
                label: 'نود های مورد نیاز',
                icon: '',
                command: () => {
                    this.showRequiredNode(this.tempItem);
                },
            },

            {
                separator: true
            },
            {
                label: 'انصراف',
                /*items: [{
                    label: 'انصراف',

                }]*/
            },
        ];
        this.itemsDialog = [
            {
                label: 'حذف از لیست اتصال نود ها',
                icon: '',
                command: () => {
                    this.deleteMatch(this.tempItemDialog);
                },
            },

            {
                separator: true
            },
            {
                label: 'انصراف',
                /*items: [{
                    label: 'انصراف',

                }]*/
            },
        ];
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallparty().subscribe(a => {
            this._primengProgressBarService.hide();
            this.partyListOptionsFirst.push(...a);
            this.partyListOptionsFirst = this.partyListOptionsFirst.sort();
        }, error => {
            this._primengProgressBarService.hide();
        });
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallclient().subscribe(b => {
            this.clientOptions=b
            this._primengProgressBarService.hide();
        }, error => {
            this._primengProgressBarService.hide();
        });


        this.apiDto = this.inputSequenceRegister;
        this.apiDto.sequenceBase = true;
        this._primengProgressBarService.show();
        this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                this._primengProgressBarService.hide();

                debugger
                this.apiIdOrg = u;
                console.log('تغییر1', this.apiIdOrg);
            }
            ,
            error => {
                this._primengProgressBarService.hide();
            },
        );
        if (this.inputSequenceRegister != undefined) {
            debugger
            this.clientId = this.inputSequenceRegister.clientId;
            this.nameApiDe = this.inputSequenceRegister.name;
            this.titleApiDe = this.inputSequenceRegister.title;
            this.apiIdDe = this.inputSequenceRegister.apiId;
            this.apiTitleOrg = this.inputSequenceRegister.apiTitleOrg;
            this.inputSequenceRegister.apiIdOrg ? this.apiIdOrg = this.inputSequenceRegister.apiIdOrg : this.apiIdOrg;
            console.log('تغییر2', this.apiIdOrg);
            this.apiNameOrg = this.inputSequenceRegister.apiNameOrg;
            this.partyTitleOrg = this.inputSequenceRegister.partyTitleOrg;
            this.moduleTitleOrg = this.inputSequenceRegister.moduleTitleOrg;
            debugger
            this.apiTitle = this.inputSequenceRegister.title;
            this.moduleTitleDe = this.inputSequenceRegister.moduleTitle;
            this.moduleTitle = this.inputSequenceRegister.moduleTitle;
            this.clientNameDe = this.inputSequenceRegister.clientName;
            this.clientName = this.inputSequenceRegister.clientName;
            this.partyTitle = this.inputSequenceRegister.partyTitle;
            this.clientBase = this.inputSequenceRegister.clientBase;
            this.moduleBase = this.inputSequenceRegister.moduleBase;
            this.accessBase = this.inputSequenceRegister.accessBase;
            this.clientId=null
            if (this.inputSequenceRegister.clientId != null) {

                this.clientHidden = false;
            } else {
                this.clientHidden = true;
            }
            if (this.clientBase) {

                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.moduleBase) {

                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {

                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.partyTitle != undefined && this.partyTitle != '') {

                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        /* this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(c => {
             if (Array.isArray(c)) {
                 this.apiAttachList = c
             } else {
                 this.apiAttachList.push(c)
             }
             for (let k = 0; k < this.apiAttachList.length; k++) {
                 this.apiAttachList[k] = Object.assign(this.apiAttachList[k], {row: (k + 1)})
             }
             console.log(this.apiAttachList, 'apiAttachList')

             if (c.length == 0) {

                 this.notifierService.showError({detail: "هیچ سرویسی برای ماژول منتخب وجود ندارد!", life: 3000});
             } else {

                 this.dialogApiFlag = true
             }

         }, error => {

         })*/
    }
    setRecord(numberApi: number) {

        this.tempItem = numberApi;
    }
    setRecordDialogFirst(numberApi: number) {
        this.tempItemDialog = numberApi;
    }
    onCancel(): void {
        this.close.emit('close');
    }
    validationRegisterSequence(): boolean {
        debugger
        if (!this.title) {
            this.notifierService.showError({ detail: 'لطفا عنوان جریان پردازشی وارد کنید!', life: 3000 });
            return false;
        } else if (!this.actionTypeFirst) {
            this.notifierService.showError({
                detail: ' لطفا اولویت اجرا را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        }
        if (!this.partyIdFirst) {
            this.notifierService.showError({
                detail: ' لطفا سازمان را برای  ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.moduleIdFirst) {
            this.notifierService.showError({
                detail: ' لطفا ماژول را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.apiIdFirst) {
            this.notifierService.showError({
                detail: ' لطفا سرویس را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        }  /*else if ((this.actionTypeFirst == 2) && (!this.afterApiFirst)) {
            this.notifierService.showError({detail: "لطفا (اجرای سرویس پس از) را برای سرویس اول وارد کنید!", life: 3000});
            return false;
        }*/ else if ((this.actionTypeFirst == 1) && (this.matchListFirst.length == 0)) {
            this.notifierService.showError({
                detail: ' لطفا نود های متصل (Matched) را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        } else if ((this.actionTypeFirst == 2) && (this.afterApiFirst == 1) && (this.matchListFirst.length == 0) && (this.runAsyncFirst == false)) {
            this.notifierService.showError({
                detail: ' لطفا نود های متصل (Matched) را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.runAsyncFirst && this.matchListFirst.length == 0) {
            this.notifierService.showError({
                detail: ' لطفا نود های متصل (Matched) را برای ' + this.titleApiSecound + ' وارد کنید!',
                life: 3000,
            });
            return false;
        }else if (this.hasClient&&(this.clientId==null||this.clientId==undefined)) {
            this.notifierService.showError({
                detail: 'لطفا کلاینت مورد نظر را برای این جریان پردازشی انتخاب کنید!',
                life: 3000,
            });
            return false;
        }
        /* else if (this.runAsyncFirst && this.matchListFirst.length > 0) {
            this.notifierService.showError({detail: 'سرویس اول در Async نمیتواند دارای نود متصل (match) باشد'});
        }*/ else {
            return true;
        }
    }
    onRegister(): void {
        debugger
        this.objMatch = {
            producerId: null,
            requiredId: null,
            sequenceId: null,
        };

        this.objSequence = {
            parentId: null,
            apiId: null,
            actionType: null,
            runAsync: null,
            orderId: null,
            title: '',
            messageId4XX: null,
            messageId5XX: null,
            messageId2XX: null,
            status: null,
            clientId: null,
        };
        if (this.validationRegisterSequence()
        ) {
            //سرویس اصلی
            this.objSequence.parentId = (-1);
            this.objSequence.actionType = (-1);
            this.objSequence.apiId = this.apiIdOrg;
            this.objSequence.title = this.title;
            this.objSequence.status = 1;
            this.objSequence.runAsync = 0;
            this.objSequence.orderId = -1;
            this.objSequence. clientId = this.clientId;
            this.objSequence.messageId4XX = this.messageId4XX;
            this.objSequence.messageId5XX = this.messageId5XX;
            this.objSequence.messageId2XX = this.messageId2XX;
            debugger
            this._primengProgressBarService.show();
            console.log('سرویس ثبت اصلی فراخوانی شد!');
            this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(p => {
                debugger
                console.log('پاسخ سرویس ثبت اصلی  فرعی برگشت!');

                this._primengProgressBarService.hide();
                this.objSequence = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: '',
                    messageId4XX: null,
                    messageId5XX: null,
                    messageId2XX: null,
                    status: null,
                    clientId:null
                };
//سرویس اول
                debugger
                this.sequnceIdOrg = p.sequnceId;
                this.objSequence.parentId = p.sequnceId;
                this.firstSequnceId = p.sequnceId;
                this.objSequence.actionType = this.actionTypeFirst;
                this.objSequence.apiId = this.apiIdFirst;
                this.objSequence.title = this.title;
                this.objSequence.messageId4XX = this.messageId4XX;
                this.objSequence.messageId5XX = this.messageId5XX;
                this.objSequence.messageId2XX = this.messageId2XX;
                this.objSequence.clientId = this.clientId;
                debugger
                this.objSequence.orderId = 1;
                this.runAsyncFirst == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0;
                this.objSequence.status = 1;

                debugger
                if (this.apiIdFirst) {
                    if (this.actionTypeFirst == 2) {
                        console.log('نوع callback!');

                        debugger
                        this.firstRegister();
                    } else if (this.actionTypeFirst == 1) {
                        if (this.matchListFirst.length > 0) {
                            debugger
                            console.log('نوع before!');

                            this.firstRegister();
                        } else {
                            this.notifierService.showError({
                                detail: 'نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!',
                                life: 3000,
                            });
                        }
                    }
                } else {
                    debugger
                    if (this.moduleIdFirst) {
                        this.notifierService.showError({
                            detail: 'لطفا سرویس را برای سرویس اول انتخاب کنید',
                            life: 3000,
                        });
                    } else {
                        if (this.partyIdFirst) {
                            this.notifierService.showError({
                                detail: 'لطفا ماژول را برای سرویس اول انتخاب کنید!',
                                life: 3000,
                            });
                        } else {
                            this.notifierService.showError({
                                detail: 'لطفا سازمان را برای سرویس اول انتخاب کنید!',
                                life: 3000,
                            });
                        }
                    }
                }

            }, error => {
                this._primengProgressBarService.hide();
            });
        }

    }
    firstRegister() {
        debugger
        //سرویس اول
        console.log('سرویس فرعی فراخوانی شد!');
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(i => {
            debugger
            console.log('پاسخ سرویس فرعی برگشت!');
            this._primengProgressBarService.hide();
            this.objMatch = {
                producerId: null,
                sequenceId: null,
                requiredId: null,
            };

            this.secondSequnceId = i.sequnceId;
            this.firstApiSequnceId = i.sequnceId;
            this.responseObjSequence = i;
            this.responseObjSequence.clientName = this.clientName;
            this.responseObjSequence.apiTitle = this.apiTitle;
            this.responseObjSequence.partyTitle = this.partyTitle;
            this.responseObjSequence.moduleTitle = this.moduleTitle;
            this.responseObjSequence.apiIdOrg = this.apiIdOrg;
            this.responseObjSequence.firstApi = this.firstApi;
            this.responseObjSequence.clientBase = this.clientBase;
            this.responseObjSequence.moduleBase = this.moduleBase;
            this.responseObjSequence.accessBase = this.accessBase;


            debugger
            if (this.matchListFirst.length > 0) {
                this.matchListFirst.forEach(item => {
                    this.objMatch.producerId = item.producedId;
                    this.objMatch.requiredId = item.requiredId;
                    this.objMatch.sequenceId = this.secondSequnceId;
                    debugger

                    //مچینگ سرویس اصلی و اول
                    this._primengProgressBarService.show();
                    console.log('سرویس اتصال نود ها فراخوانی شد!');
                    this.messagesApiFacadeService.matchdependnode(this.objMatch).subscribe(b => {
                        debugger
                        console.log('پاسخ سرویس اتصال نود ها برگشت!');

                        this._primengProgressBarService.hide();
                        this.objSequence = {
                            parentId: null,
                            apiId: null,
                            actionType: null,
                            runAsync: null,
                            orderId: null,
                            title: '',
                            messageId4XX: null,
                            messageId5XX: null,
                            messageId2XX: null,
                            status: null,
                            clientId: null,
                        };
                        this.notifierService.showSuccess({ detail: 'اطلاعات ثبت گردید!', life: 3000 });
                        this.close.emit(this.responseObjSequence);

                    }, error => {
                        this._primengProgressBarService.hide();
                    });
                });
            } else {
                this.notifierService.showSuccess({ detail: 'اطلاعات ثبت گردید!', life: 3000 });
                this.close.emit(this.responseObjSequence);
            }

        }, error => {
            this._primengProgressBarService.hide();
        });
    }

}

