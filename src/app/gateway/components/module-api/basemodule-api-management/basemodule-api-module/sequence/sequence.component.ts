import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ConfirmationService} from 'primeng/api';
import {ApiGatewayConstants} from '../../../../../constants/ApiGatewayConstants';
import { Observable, Subject } from 'rxjs';
import {TableModule} from 'primeng/table';
import {BreadcrumbsComponent} from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Panel} from 'primeng/panel';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {MoreChar19Pipe} from '../../../../../../shared/pipes/moreChar19.pipe';
import {NgIf, NgStyle} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {Dialog} from 'primeng/dialog';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SelectModule} from 'primeng/select';
import {Message} from 'primeng/message';
import {Checkbox} from 'primeng/checkbox';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {ToastService} from '../../../../../../shared/services/ToastService';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {Fieldset} from 'primeng/fieldset';
import {TieredMenu} from 'primeng/tieredmenu';
import {SequenceRegisterComponent} from './sequence-register/sequence-register.component';
import {Listbox} from 'primeng/listbox';
import {MorChar13Pipe} from '../../../../../../shared/pipes/morChar13.pipe';
import {ThreeDotBreadcrumbPipe} from '../../../../../../shared/pipes/threeDotBreadcrumb.pipe';
import {MorChar55Pipe} from '../../../../../../shared/pipes/morChar55.pipe';
import {detailTypePipe} from '../../../../../../shared/pipes/detail-type.pipe';
import {MorChar32Pipe} from '../../../../../../shared/pipes/morChar32.pipe';
import {MessagesCategoryPipe} from '../../../../../../shared/pipes/messagesCategory.pipe';
import {Toast} from 'primeng/toast';
import {
    MessageFilterAction,
    MessageSelectorComponent,
} from '../../../../../../shared/components/message-selector/message-selector.component';

@Component({
    selector: 'app-sequence',
    templateUrl: './sequence.component.html',
    styleUrls: ['./sequence.component.scss'],
    providers: [ConfirmationService],
    standalone: true,
    imports: [
        TableModule,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        Tooltip,
        MoreChar19Pipe,
        NgStyle,
        Ripple,
        Dialog,
        TranslocoPipe,
        ConfirmDialog,
        SelectModule,
        NgIf,

        Message,
        Checkbox,
        Fieldset,
        TieredMenu,
        SequenceRegisterComponent,
        Listbox,
        MorChar13Pipe,
        ThreeDotBreadcrumbPipe,
        MorChar55Pipe,
        detailTypePipe,
        MorChar32Pipe,
        MessagesCategoryPipe,
        Toast,
        BreadcrumbsComponent,
        MessageSelectorComponent,
    ],
})
export class SequenceComponent implements OnInit {

    constructor(
        private apiGatewayService: ApiGatewayService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private confirmationService: ConfirmationService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
    ) {
    }
    @Output() close = new EventEmitter<string>();
    @Input() inputSequence
    messageSelector400Action$ = new Subject<MessageFilterAction>();
    messageSelector500Action$ = new Subject<MessageFilterAction>();
    messageSelector200Action$ = new Subject<MessageFilterAction>();
    statusCodeOptions400 = ApiGatewayConstants.statusCode;
    statusCodeOptions500 = ApiGatewayConstants.statusCode;
    statusCodeOptions200 = ApiGatewayConstants.statusCode;
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    categoryMessages200 = ApiGatewayConstants.categoryMessages;

    clearTriggerForMessageSelector200 = false;
    clearTriggerForMessageSelector400 = false;
    clearTriggerForMessageSelector500 = false;
    requiredNode
    producedNode
    apiListOptions = []
    apiId: number = null
    addFlag = false
    sequenceFlag = false
    clientBase = false
    moduleBase = false
    accessBase = false
    detailsBreadObject = []
    first = 0;
    rows = 10;
    sequenceDto
    apiTitle = ''
    partyTitle = ''
    partyIdOrg = ''
    partyTitleOrg = ''
    moduleTitle = ''
    clientName = ''
    title = ''
    sequnceId: number = null
    partyListOptionsFirst = [{title: '-', partyId: null}]
    moduleListOptionsFirst = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsFirst = [{title: '-', apiId: null}]
    paginationLabel=this.transloco.translate('label.pagination.table');
    actionTypeOptions = [
        {name: '-', code: null},
        {name: 'Before', code: 1},
        {name: 'Call Back', code: 2},
    ]

    afterApiFirst: number = null
    actionTypeFirst: number = null
    apiHasIgnoreSignatureElement
    apiUseApiCacheFeature
    matchListFirst = []
    producedListFirst = []
    requiredListFirst = []
    messagesList400First = []
    messagesList500First = []
    partyIdFirst
    moduleIdFirst
    moduleIdOrg
    moduleTitleOrg
    countProduced: number = null
    apiIdFirst
    apiIdOrg
    sequnceIdOrg
    apiTitleOrg
    apiTitleFirst
    runAsyncFirst = false
    dialogFirstMatchFlag = false
    message400Flag = false
    message500Flag = false
    message200Flag = false
    apiTitleProduced = ''
    apiTitleRequired = ''
    apiIdProduced: number = null
    apiIdRequired: number = null
    titleApiDe
    moduleTitleFirst
    partyTitleFirst
    tempItem: number = null
    countRequired: number = null
    apiNumber400
    apiNumber500
    apiNumberCus

    totalRecords = 0;
    objSequence = {
        parentId: null,
        sequnceId: null,
        apiId: null,
        actionType: null,
        runAsync: null,
        orderId: null,
        clientId: null,
        title: "",
        status: null
    }
    itemsFirst = [
        {
            label: 'نود های متصل (Matched)',
            icon: '',
            command: () => {
                this.showMatchNodes(this.tempItem);
            }
        },
        {
            separator: true
        },
        {
            label: this.transloco.translate('contextMenu.cancel'),
        },
    ]

    codeMessage400 = '400'
    codeMessage500 = '500'
    titleMessage500
    titleMessage400
    textMessage400
    textENMessage400
    tableIdMessage400
    typeMessage400
    textMessage500
    textENMessage500
    tableIdMessage500
    typeMessage500
    messageId

    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    codeMessageCus='200'
    titleMessageCus
    tableIdMessageCus
    typeMessageCus
    messagesListCusFirst
    messagesListCusTemp
    titleApiSecound='سرویس اولیه'
    hasClient = false;
    clientOptions=[{ name: '-', clientId: null }];
    clientId=null;
    icon200_val = null;
    icon400_val = null;
    icon500_val = null;
    messageId4XX: number = null;
    messageId5XX: number = null;
    messageId2XX: number = null;
    ngOnInit(): void {
        debugger
        if (this.inputSequence != undefined) {
            this.sequenceDto = this.inputSequence
            console.log('pp.inputSequence',this.inputSequence)
            this.clientName = this.inputSequence.clientName
            this.apiTitle = this.inputSequence.title
            this.partyTitle = this.inputSequence.partyTitle
            this.moduleTitle = this.inputSequence.moduleTitle
            this.apiId = this.inputSequence.apiId
            this.clientBase = this.inputSequence.clientBase
            this.moduleBase = this.inputSequence.moduleBase
            this.accessBase = this.inputSequence.accessBase
            this.clientBase = this.inputSequence.clientBase
            // FUSEFS

            // this._primengProgressBarService.show()
            this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                console.log(u)
                // FUSEFS

                // this._primengProgressBarService.hide()
                this.apiIdOrg = u
                debugger
                // FUSEFS

                // this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.hide()
                    if (v != undefined) {
                        debugger
                        debugger
                        this.messagesApiFacadeService.fetchallclient().subscribe(b => {
                            this.clientOptions=b
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        }, error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        });
                        if (v[0] != undefined) {
                            debugger
                            debugger
                            this.title = v[0].title
                            this.apiTitleOrg = v[0].apiTitle
                            this.apiIdOrg = v[0].apiId
                            this.sequnceIdOrg = v[0].sequnceId
                            this.clientId = v[0].clientId
                            if (this.clientId !=null||this.clientId !=undefined){
                                this.hasClient=true
                            }
                            if (v[0].status == 1) {
                                debugger
                                // FUSEFS

                                // this._primengProgressBarService.show()
                                this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                    debugger
                                    // FUSEFS

                                    // this._primengProgressBarService.hide()
                                    debugger
                                    this.moduleIdOrg = w.moduleId
                                    this.moduleTitleOrg = w.moduleTitle
                                    // FUSEFS

                                    // this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                        debugger
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                        this.partyIdOrg = u.partyId
                                        this.partyTitleOrg = u.title
                                        debugger
                                        if (v[1] != undefined) {
                                            debugger
                                            // FUSEFS

                                            // this._primengProgressBarService.show()
                                            this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                debugger
                                                debugger
                                                debugger
                                                debugger
                                                // FUSEFS

                                                // this._primengProgressBarService.hide()
                                                this.matchListFirst = j
                                                this.apiListOptionsFirst = [
                                                    {title: v[1].apiTitle, apiId: v[1].apiId}
                                                ]
                                                if (v[1].apiId!=undefined&&v[1].apiId!=null){
                                                    this.messagesApiFacadeService.checkapicapability( v[1].apiId).subscribe(c=>{
                                                        this.apiHasIgnoreSignatureElement=c.apiHasIgnoreSingatureElement
                                                        this.apiUseApiCacheFeature=c.apiUseApiCacheFeature
                                                    })
                                                }

                                                this.apiTitleFirst = v[1].apiTitle
                                                this.apiIdFirst = v[1].apiId
                                        // FUSEFS

                                        // /*        this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.messagesearch(
                                                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                ).subscribe(response => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    debugger
                                                    if (Array.isArray(response)) {
                                                        this.messagesList400First = response
                                                        this.messagesList400Temp = response
                                                    } else {
                                                        this.messagesList400First.push(response)
                                                        this.messagesList400Temp.push(response)
                                                    }

                                                    if (this.messagesList400First.length > 1) {
                                                        debugger
                                                        const temp = this
                                                        this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                            return x.messageId === v[1].messageId4XX;

                                                        });
                                                    }
                                                    debugger
                                                    this.messagesList400Temp = this.messagesList400First
                                                    this.apiNumber400 = 1
                                                    debugger
                                                    this.actionTypeFirst = v[1].actionType
                                                    this.actionTypeFirst==2?    this.titleApiSecound="سرویس ثانویه":( this.actionTypeFirst==1?    this.titleApiSecound="سرویس اولیه":'')
                                                    debugger
                                                    v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                    if (v[1].actionType == 2) {
                                                        this.afterApiFirst = 1
                                                    }
                                                },error =>{
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })
                                                // FUSEFS

                                                // this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.messagesearch(
                                                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                    this.typeMessage500
                                                ).subscribe(response => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    debugger
                                                    this.messagesList500First = []
                                                    if (Array.isArray(response)) {
                                                        this.messagesList500First = response
                                                        this.messagesList500Temp = response
                                                    } else {
                                                        this.messagesList500First.push(response)
                                                        this.messagesList500Temp.push(response)
                                                    }
                                                    if (this.messagesList500First.length > 1) {
                                                        const temp = this
                                                        this.messagesList500First = this.messagesList500First.filter(function (x) {


                                                            return x.messageId === temp.messageId5XX;
                                                        });
                                                    }
                                                    this.messagesList500Temp = this.messagesList500First


                                                    this.apiNumber500 = 1

                                                },error => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })
                                                // FUSEFS

                                                // this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.messagesearch(
                                                    this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
                                                    this.typeMessageCus
                                                ).subscribe(response => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    debugger
                                                    this.messagesListCusFirst = []
                                                    if (Array.isArray(response)) {
                                                        this.messagesListCusFirst = response
                                                        this.messagesListCusTemp = response
                                                    } else {
                                                        this.messagesListCusFirst.push(response)
                                                        this.messagesListCusTemp.push(response)
                                                    }
                                                    if (this.messagesListCusFirst.length > 1) {
                                                        const temp = this
                                                        this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {

                                                            return x.messageId === temp.messageId2XX;
                                                        });
                                                    }
                                                    this.messagesListCusTemp = this.messagesListCusFirst


                                                    this.apiNumberCus = 1

                                                },error =>{
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })*/
                                                if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                    debugger
                                                    this.icon400_val  = "pi pi-check"
                                                    this.messageId4XX = v[1].messageId4XX
                                                }
                                                if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                    debugger
                                                    this.icon500_val = "pi pi-check"
                                                    this.messageId5XX = v[1].messageId5XX
                                                }

                                                debugger
                                                if (v[1].messageId2XX != undefined && v[1].messageId2XX != 0) {
                                                    this.icon200_val  = "pi pi-check"
                                                    debugger
                                                    this.messageId2XX = v[1].messageId2XX
                                                }
                                             // FUSEFS

                                             // this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                    debugger
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    this.moduleListOptionsFirst = [
                                                        {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                    ]
                                                    this.moduleIdFirst = i.moduleId
                                                    this.moduleTitleFirst = i.moduleTitle
                                                    // FUSEFS

                                                    // this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                        debugger
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                        this.partyIdFirst = y.partyId
                                                        this.partyTitleFirst = y.title

                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })
                                            },error => {
                                                // FUSEFS

                                                // this._primengProgressBarService.hide()
                                            })
                                        }
                                    },error => {
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                    })
                                },error => {
                                    // FUSEFS

                                    // this._primengProgressBarService.hide()
                                })

                                this.sequenceFlag = true

                                debugger
                            } else {
                                this.sequenceFlag = false
                            }
                        }
                    }


                }, error => {
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.hide()
                    console.log(error, 'error')
                    this.sequenceFlag = false
                })
            },error => {
                // FUSEFS

                // this._primengProgressBarService.hide()
            })

debugger
            if (this.clientBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('clientBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.moduleBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.partyTitle != undefined && this.partyTitle != "") {
                debugger
                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }

    }
    onMessageSelected200(e: any) {
        const id = e?.messageid ?? e?.messageId ?? null;
        this.messageId2XX = id;
        this.icon200_val = 'pi pi-check';
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared200(flag: boolean) {
        if (!flag) return;
        this.messageId2XX = null;
        this.icon200_val = null;
    }
    onChangeHasClient(event) {
        console.log(event,'clientId');
        if(!event.checked){
            this.clientId=null
        }
    }
    showMatchNodes(item) {
        debugger
        if (this.actionTypeFirst == 2 && this.runAsyncFirst) {
            this.notifierService.showError({detail: 'سرویس Async بوده و دارای نود متصل (match) نمی باشد!'});

        } else {
            if (this.matchListFirst.length > 0) {
                if (this.actionTypeFirst == 1) {
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        let countProduced = 0
                        this.producedListFirst = []
                        if (Array.isArray(l)) {
                            this.producedListFirst = l
                        } else {
                            this.producedListFirst.push(...l)
                        }
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            if ('row' in this.producedListFirst) {
                            } else {
                                this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                    , partyTitle: this.partyTitle
                                })
                            }
                        }
                        const filteredPro = this.producedListFirst.filter(proItem => {
                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                        });

                        this.producedListFirst = []
                        this.producedListFirst = filteredPro

                        this.apiTitleProduced = this.apiTitleFirst
                        this.apiIdProduced = this.apiIdFirst
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++
                        }
                        this.countProduced = countProduced
                        // FUSEFS

                        // this._primengProgressBarService.show()
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                            let countRequired = 0
                            this.requiredListFirst = []
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e
                            } else {
                                this.requiredListFirst.push(...e)
                            }
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                if ('row' in this.requiredListFirst) {
                                } else {
                                    this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                        row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                        , partyTitle: this.partyTitle
                                    })
                                }

                            }
                            const filteredReq = this.requiredListFirst.filter(reqItem => {
                                return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                            });
                            this.requiredListFirst = []
                            this.requiredListFirst = filteredReq


                            this.apiTitleRequired = this.titleApiDe
                            this.apiIdRequired = this.apiIdOrg
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++
                            }
                            this.countRequired = countRequired
                            this.dialogFirstMatchFlag = true
                        },error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                        })
                    },error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                    })
                } else if (this.actionTypeFirst == 2) {
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        let countProduced = 0
                        this.producedListFirst = []
                        if (Array.isArray(s)) {
                            this.producedListFirst = s
                        } else {
                            this.producedListFirst.push(...s)
                        }
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            if ('row' in this.producedListFirst) {
                            } else {
                                this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                    , partyTitle: this.partyTitle
                                })
                            }
                        }
                        const filteredPro = this.producedListFirst.filter(proItem => {
                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                        });

                        this.producedListFirst = []
                        this.producedListFirst = filteredPro

                        this.apiTitleProduced = this.apiTitleFirst
                        this.apiIdProduced = this.apiIdFirst
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++
                        }
                        this.countProduced = countProduced
                        // FUSEFS

                        // this._primengProgressBarService.show()
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                            let countRequired = 0
                            this.requiredListFirst = []
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e
                            } else {
                                this.requiredListFirst.push(...e)
                            }
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                if ('row' in this.requiredListFirst) {
                                } else {
                                    this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                        row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                        , partyTitle: this.partyTitle
                                    })
                                }

                            }
                            const filteredReq = this.requiredListFirst.filter(reqItem => {
                                return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                            });
                            this.requiredListFirst = []
                            this.requiredListFirst = filteredReq

                            this.apiTitleRequired = this.titleApiDe
                            this.apiIdRequired = this.apiIdOrg
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++
                            }
                            this.countRequired = countRequired
                            this.dialogFirstMatchFlag = true
                        },error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                        })
                    },error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                    })
                } else {
                    this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                }

            }
            else {
                if (this.actionTypeFirst == 1) {
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        let countProduced = 0
                        this.producedListFirst = []
                        if (Array.isArray(l)) {
                            this.producedListFirst = l
                        } else {
                            this.producedListFirst.push(...l)
                        }
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            if ('row' in this.producedListFirst) {
                            } else {
                                this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                    , partyTitle: this.partyTitle
                                })
                            }
                        }
                        this.apiTitleProduced = this.apiTitleFirst
                        this.apiIdProduced = this.apiIdFirst
                        this.producedListFirst = [...this.producedListFirst];
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++
                        }
                        this.countProduced = countProduced
                        // FUSEFS

                        // this._primengProgressBarService.show()
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                            let countRequired = 0
                            this.requiredListFirst = []
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e
                            } else {
                                this.requiredListFirst.push(...e)
                            }
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                if ('row' in this.requiredListFirst) {
                                } else {
                                    this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                        row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                        , partyTitle: this.partyTitle
                                    })
                                }
                            }
                            this.apiTitleRequired = this.titleApiDe
                            this.apiIdRequired = this.apiIdOrg
                            this.requiredListFirst = [...this.requiredListFirst];
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++
                            }
                            this.countRequired = countRequired
                            this.dialogFirstMatchFlag = true
                        },error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                        })


                    },error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                    })
                } else if (this.actionTypeFirst == 2) {
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        let countProduced = 0
                        this.producedListFirst = []
                        if (Array.isArray(s)) {
                            this.producedListFirst = s
                        } else {
                            this.producedListFirst.push(...s)
                        }
                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            if ('row' in this.producedListFirst) {
                            } else {
                                this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                    , partyTitle: this.partyTitle
                                })
                            }
                        }
                        this.apiTitleProduced = this.titleApiDe
                        this.apiIdProduced = this.apiIdOrg
                        this.producedListFirst = [...this.producedListFirst];

                        for (let k = 0; k < this.producedListFirst.length; k++) {
                            countProduced++
                        }
                        this.countProduced = countProduced
                        // FUSEFS

                        // this._primengProgressBarService.show()
                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                            let countRequired = 0
                            this.requiredListFirst = []
                            if (Array.isArray(e)) {
                                this.requiredListFirst = e
                            } else {
                                this.requiredListFirst.push(...e)
                            }
                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                if ('row' in this.requiredListFirst) {
                                } else {
                                    this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                        row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                        , partyTitle: this.partyTitle
                                    })
                                }
                            }
                            this.apiTitleRequired = this.apiTitleFirst
                            this.apiIdRequired = this.apiIdFirst
                            this.requiredListFirst = [...this.requiredListFirst];

                            for (let k = 0; k < this.requiredListFirst.length; k++) {
                                countRequired++
                            }
                            this.countRequired = countRequired
                            this.dialogFirstMatchFlag = true
                        },error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                        })
                    },error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                    })
                } else {
                    this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                }
            }
        }

    }

    closeMatchNodesFirst() {
        debugger
        this.dialogFirstMatchFlag = false
    }
    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: "لیست دسترسی",
                        rout_index0: "",
                        isActive0: false,
                        img_index0: "assets/icons/access.png",
                        label_Detail_index0: null
                    },
                    {
                        index: 1,
                        label_index1: "سرویس",
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: "assets/icons/api.png"
                    },
                    {
                        index: 2,
                        label_index2: "مدیریت جریان پردازشی",
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: "assets/icons/flow.png"
                    }, {label_index4: null}, {label_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: "کلاینت",
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: "assets/icons/client.png"
                    },
                    {
                        index: 1, label_index1: "لیست دسترسی", rout_index1: null, isActive1: false,
                        img_index1: "assets/icons/access.png",
                        label_Detail_index1: '(' + this.clientName + ')'
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "مدیریت جریان پردازشی", rout_index3: null, isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: "assets/icons/flow.png"
                    }, {label_index5: null}, {label_index6: null}
                ]
            case 'moduleBase':
                return [
                    {  index: 0,
                        label_index0: 'سرویس گیرندگان',
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,},
                    {
                        index: 1, label_index1: "ماژول", rout_index1: '/module', isActive1: false,
                        img_index1: "assets/icons/module.png"
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "مدیریت جریان پردازشی", rout_index3: null, isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: "assets/icons/flow.png"
                    }, {label_index4: null}, {label_index5: null}, {label_index6: null}
                ]
            case 'partyBase':
                return [
                    {  index: 0,
                        label_index0: 'سرویس گیرندگان',
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,},
                    {
                        index: 1, label_index1: "سازمان", rout_index1: '/party', isActive1: false,
                        img_index1: "assets/icons/party.png"
                    },
                    {
                        index: 2, label_index2: "ماژول", rout_index2: '',
                        isActive2: false, label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: "assets/icons/module.png"
                    },
                    {
                        index: 3, label_index3: "سرویس", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: "assets/icons/api.png"
                    },
                    {
                        index: 4, label_index4: "مدیریت جریان پردازشی", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: "assets/icons/flow.png"
                    }, {label_index5: null}, {label_index6: null}]
            default:
                return null
        }
    }
   onCancel(): void {
        this.close.emit('close');
    }
    BeforeButton() {
        this.close.emit('close');
    }
    deactivate() {
        this.objSequence = {
            sequnceId: null,
            parentId: null,
            apiId: null,
            actionType: null,
            runAsync: null,
            orderId: null,
            clientId: null,
            title: "",
            status: null
        }

        this.objSequence.sequnceId = this.sequnceIdOrg
        this.objSequence.parentId = (-1)
        this.objSequence.actionType = (-1)
        this.objSequence.apiId = this.apiIdOrg
        this.objSequence.title = this.title
        this.objSequence.status = 0
        this.objSequence.runAsync = 0
        this.objSequence.orderId = 0
        if (this.clientId){
            this.objSequence.clientId = this.clientId
        }else {


        }


        // FUSEFS



        // this._primengProgressBarService.show()
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(p => {
            // FUSEFS

            // this._primengProgressBarService.hide()
            this.close.emit('close');
            this.sequenceFlag = false
        },error => {
            // FUSEFS

            // this._primengProgressBarService.hide()
        })


    }
    parentMethod(sequnceId) {
        debugger
        // FUSEFS

        // this._primengProgressBarService.show()
        this.messagesApiFacadeService.getapisequencebyparentid(sequnceId).subscribe(parentObj => {
            debugger
            // FUSEFS

            // this._primengProgressBarService.hide()
            debugger
            // FUSEFS

            // this._primengProgressBarService.show()
            this.messagesApiFacadeService.apibyid(parentObj.apiId).subscribe(firstApi => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide()
                this.apiListOptionsFirst.push(firstApi)
                this.apiIdFirst = firstApi.apiId
                this.apiTitleFirst = firstApi.title
                parentObj.runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                this.actionTypeFirst = parentObj.actionType
                //   this.actionTypeOptionsFirst = e.actionType
                // this.apiIdSecond = e.parentId
                // FUSEFS

                // this._primengProgressBarService.show()
                this.messagesApiFacadeService.moduleFindbyapiid(this.inputSequence.apiId).subscribe(firstModule => {
                    // FUSEFS

                    // this._primengProgressBarService.hide()
                    this.moduleIdFirst = firstModule.moduleId
                    this.moduleTitleFirst = firstModule.moduleTitle
                    this.moduleListOptionsFirst.push(firstModule)
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.partyFindbymoduleid(firstModule.moduleId).subscribe(firstParty => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        this.partyIdFirst = firstParty.partyId
                        this.partyTitleFirst = firstParty.title
                        this.partyListOptionsFirst.push(firstParty)
                        // FUSEFS

                        // this._primengProgressBarService.show()
                        this.messagesApiFacadeService.getapisequencebyparentid(parentObj.parentId).subscribe(SecondParent => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                            this.apiListOptionsFirst.push(SecondParent)
                            this.apiIdFirst = SecondParent.apiId
                            this.apiTitleFirst = SecondParent.title
                            parentObj.runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                            this.actionTypeFirst = parentObj.actionType

                            //   this.actionTypeOptionsFirst = e.actionType
                            // this.apiIdSecond = e.parentId
                            debugger
                            if (parentObj.parentId != null) {
                                debugger
                                this.parentMethod(parentObj.sequnceId)
                            }


                        },error => {
                            // FUSEFS

                            // this._primengProgressBarService.hide()
                        })
                    },error => {
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                    })
                },error => {
                    // FUSEFS

                    // this._primengProgressBarService.hide()
                })

            },error => {
                // FUSEFS

                // this._primengProgressBarService.hide()
            })
        },error => {
            // FUSEFS

            // this._primengProgressBarService.hide()
        })
    }
    setRecord(numberApi: number) {

        this.tempItem = numberApi
    }


    confirm() {
        this.confirmationService.confirm({
            message: 'آیا از غیرفعالسازی این جریان پردازشی اطمینان دارید؟',
            accept: () => {
                this.deactivate()
                //Actual logic to perform a confirmation
            }
        });
    }
    onMessageSelected500(message: any) {
        const id = message?.messageid ?? message?.messageId;

        this.messageId5XX = id;
        this.icon500_val = 'pi pi-check';

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
    onMessageSelected400(message: any) {
        const id = message?.messageid ?? message?.messageId;

        this.messageId4XX = id;
        this.icon400_val = 'pi pi-check';

        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectMessage'),
            life: 3000,
        });
    }
    onChildSelectionCleared500(flag: boolean) {
        if (!flag) return;
        this.messageId5XX = null;
        this.icon500_val = null;
    }
    onClose(e): void {
        debugger

        console.log(e,'this.responseObjSequence')
        if (e != 'close') {
            debugger
            debugger
            debugger
            if (e!=undefined){
                debugger
                debugger
                debugger

                this.clientName = e.clientName
                this.apiTitle = e.title
                this.partyTitle = e.partyTitle
                this.moduleTitle = e.moduleTitle
                this.apiId = e.apiIdOrg
                this.apiIdOrg = e.apiIdOrg
                console.log("apiIdOrgپرنت2",this.apiIdOrg)
                this.clientBase = e.clientBase
                this.moduleBase = e.moduleBase
                this.accessBase = e.accessBase
                this.clientBase = e.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    debugger
                    this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        if (v != undefined) {
                            if (v[0] != undefined) {
                                this.title = v[0].title
                                this.apiTitleOrg = v[0].apiTitle
                                this.apiIdOrg = v[0].apiId
                                console.log("پرنت1",this.apiIdOrg)
                                this.sequnceIdOrg = v[0].sequnceId
                                if (v[0].status == 1) {
                                    debugger
                                    // FUSEFS

                                    // this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                        debugger
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                        debugger
                                        this.moduleIdOrg = w.moduleId
                                        this.moduleTitleOrg = w.moduleTitle
                                        // FUSEFS

                                        // this._primengProgressBarService.show()
                                        this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                            debugger
                                            // FUSEFS

                                            // this._primengProgressBarService.hide()
                                            this.partyIdOrg = u.partyId
                                            this.partyTitleOrg = u.title
                                            debugger
                                            if (v[1] != undefined) {
                                                debugger
                                                // FUSEFS

                                                // this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                    debugger
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    this.matchListFirst = j

                                                    this.apiListOptionsFirst = [
                                                        {title: v[1].apiTitle, apiId: v[1].apiId}
                                                    ]
                                                    this.apiTitleFirst = v[1].apiTitle
                                                    this.apiIdFirst = v[1].apiId
                                                    if (v[1].apiId!=undefined&&v[1].apiId!=null){
                                                        this.messagesApiFacadeService.checkapicapability( v[1].apiId).subscribe(c=>{
                                                            this.apiHasIgnoreSignatureElement=c.apiHasIgnoreSingatureElement
                                                            this.apiUseApiCacheFeature=c.apiUseApiCacheFeature
                                                        })
                                                    }
                                                    console.log("v[1].apiIdپرنت2",v[1].apiId)
                                                    if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                        this.icon400_val  = "pi pi-check"
                                                        this.messageId4XX = v[1].messageId4XX
                                                    }
                                                    if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                        this.icon500_val = "pi pi-check"
                                                        this.messageId5XX = v[1].messageId5XX
                                                    }
                                                    debugger
                                                    if (v[1].messageId2XX != undefined && v[1].messageId2XX != 0) {
                                                        this.icon200_val  = "pi pi-check"
                                                        debugger
                                                        this.messageId2XX = v[1].messageId2XX
                                                    }
                                                  // FUSEFS

                                                  // /*  this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                    ).subscribe(response => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        debugger
                                                        if (Array.isArray(response)) {
                                                            this.messagesList400First = response
                                                            this.messagesList400Temp = response
                                                        } else {
                                                            this.messagesList400First.push(response)
                                                            this.messagesList400Temp.push(response)
                                                        }

                                                        if (this.messagesList400First.length > 1) {
                                                            debugger
                                                            const temp = this
                                                            this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                                return x.messageId === temp.messageId4XX;
                                                            });
                                                        }
                                                        debugger
                                                        this.messagesList400Temp = this.messagesList400First
                                                        this.apiNumber400 = 1
                                                        this.actionTypeFirst = v[1].actionType
                                                        this.actionTypeFirst==2?    this.titleApiSecound="سرویس ثانویه":( this.actionTypeFirst==1?    this.titleApiSecound="سرویس اولیه":'')
                                                        v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                        if (v[1].actionType == 2) {
                                                            this.afterApiFirst = 1
                                                        }
                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })
                                                    // FUSEFS

                                                    // this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                        this.typeMessage500
                                                    ).subscribe(response => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        debugger
                                                        this.messagesList500First = []
                                                        if (Array.isArray(response)) {
                                                            this.messagesList500First = response
                                                            this.messagesList500Temp = response
                                                        } else {
                                                            this.messagesList500First.push(response)
                                                            this.messagesList500Temp.push(response)
                                                        }
                                                        if (this.messagesList500First.length > 1) {
                                                            const temp = this
                                                            this.messagesList500First = this.messagesList500First.filter(function (x) {

                                                                return x.messageId === temp.messageId5XX;
                                                            });
                                                        }
                                                        this.messagesList500Temp = this.messagesList500First


                                                        this.apiNumber500 = 1

                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })*/
                                                    // FUSEFS

                                                    // this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                        debugger
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        this.moduleListOptionsFirst = [
                                                            {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                        ]
                                                        this.moduleIdFirst = i.moduleId
                                                        this.moduleTitleFirst = i.moduleTitle
                                                        // FUSEFS

                                                        // this._primengProgressBarService.show()
                                                        this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                            debugger
                                                            // FUSEFS

                                                            // this._primengProgressBarService.hide()
                                                            this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                            this.partyIdFirst = y.partyId
                                                            this.partyTitleFirst = y.title

                                                           /* if (v[2] != undefined) {
                                                                this.apiListOptionsSecond = [
                                                                    {title: v[2].apiTitle, apiId: v[2].apiId}]
                                                                this.apiTitleSecond = v[2].apiTitle
                                                                this.apiIdSecond = v[2].apiId

                                                                this.actionTypeSecond = v[2].actionType
                                                                v[2].runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                                                if (v[2].actionType == 2) {
                                                                    this.afterApiSecond = 2
                                                                }
                                                                if (v[2].messageId4XX != undefined && v[2].messageId4XX != 0) {
                                                                    this.icon400_valSecond = "pi pi-check"
                                                                    this.messageId4XXSecond = v[2].messageId4XX
                                                                }
                                                                if (v[2].messageId5XX != undefined && v[2].messageId5XX != 0) {
                                                                    this.icon500_valSecond = "pi pi-check"
                                                                    this.messageId5XXSecond = v[2].messageId5XX
                                                                }
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.messagesearch(
                                                                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                    this.typeMessage500
                                                                ).subscribe(response => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    this.messagesList500Second = []
                                                                    if (Array.isArray(response)) {
                                                                        this.messagesList500Second = response
                                                                        this.messagesList500Temp = response
                                                                    } else {
                                                                        this.messagesList500Second.push(response)
                                                                        this.messagesList500Temp.push(response)
                                                                    }
                                                                    if (this.messagesList500Second.length > 1) {
                                                                        const temp = this
                                                                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId5XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList500Temp = this.messagesList500Second
                                                                    this.apiNumber500 = 2
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.messagesearch(
                                                                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                                ).subscribe(response => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    if (Array.isArray(response)) {
                                                                        this.messagesList400Temp = response
                                                                        this.messagesList400Second = response
                                                                    } else {
                                                                        this.messagesList400Second.push(response)
                                                                        this.messagesList400Temp.push(response)

                                                                    }
                                                                    debugger
                                                                    if (this.messagesList400Second.length > 1) {
                                                                        const temp = this
                                                                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId4XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList400Temp = this.messagesList400Second
                                                                    this.apiNumber400 = 2
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.moduleFindbyapiid(v[2].apiId).subscribe(r => {
                                                                    debugger
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    this.moduleListOptionsSecond = [
                                                                        {moduleTitle: r.moduleTitle, moduleId: r.moduleId}
                                                                    ]
                                                                    this.moduleIdFirst = r.moduleId
                                                                    this.moduleTitleFirst = r.moduleTitle
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.show()
                                                                    this.messagesApiFacadeService.partyFindbymoduleid(r.moduleId).subscribe(q => {
                                                                        debugger
                                                                        // FUSEFS

                                                                        // this._primengProgressBarService.hide()
                                                                        this.partyListOptionsSecond = [{title: q.title, partyId: q.partyId}]
                                                                        this.partyIdFirst = q.partyId
                                                                        this.partyTitleFirst = q.title

                                                                        if (v[3] != undefined) {
                                                                            this.apiListOptionsThird = [
                                                                                {title: v[3].apiTitle, apiId: v[3].apiId}
                                                                            ]
                                                                            this.apiTitleThird = v[3].apiTitle
                                                                            this.apiIdThird = v[3].apiId

                                                                            this.actionTypeThird = v[3].actionType
                                                                            v[3].runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                                                                            if (v[3].actionType == 2) {
                                                                                this.afterApiThird = 3
                                                                            }
                                                                            if (v[3].messageId4XX != undefined && v[3].messageId4XX != 0) {
                                                                                this.icon400_valThird = "pi pi-check"
                                                                                this.messageId4XXThird = v[3].messageId4XX
                                                                            }
                                                                            if (v[3].messageId5XX != undefined && v[3].messageId5XX != 0) {
                                                                                this.icon500_valThird = "pi pi-check"
                                                                                this.messageId5XXThird = v[3].messageId5XX
                                                                            }
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                                            ).subscribe(response => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList400Temp = response
                                                                                    this.messagesList400Third = response
                                                                                } else {
                                                                                    this.messagesList400Third.push(response)
                                                                                    this.messagesList400Temp.push(response)

                                                                                }
                                                                                debugger
                                                                                if (this.messagesList400Third.length > 1) {
                                                                                    const temp = this
                                                                                    this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId4XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList400Temp = this.messagesList400Third
                                                                                this.apiNumber400 = 3
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                                this.typeMessage500
                                                                            ).subscribe(response => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                this.messagesList500Third = []
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList500Third = response
                                                                                    this.messagesList500Temp = response
                                                                                } else {
                                                                                    this.messagesList500Third.push(response)
                                                                                    this.messagesList500Temp.push(response)
                                                                                }
                                                                                if (this.messagesList500Third.length > 1) {
                                                                                    const temp = this
                                                                                    this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId5XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList500Temp = this.messagesList500Third
                                                                                this.apiNumber500 = 3
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.moduleFindbyapiid(v[3].apiId).subscribe(g => {
                                                                                debugger
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                this.moduleListOptionsThird = [
                                                                                    {moduleTitle: g.moduleTitle, moduleId: g.moduleId}
                                                                                ]
                                                                                this.moduleIdThird = g.moduleId
                                                                                this.moduleTitleThird = g.moduleTitle
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.show()
                                                                                this.messagesApiFacadeService.partyFindbymoduleid(g.moduleId).subscribe(j => {
                                                                                    // FUSEFS

                                                                                    // this._primengProgressBarService.hide()
                                                                                    this.partyListOptionsThird = [{title: j.title, partyId: j.partyId}]
                                                                                    this.partyIdThird = j.partyId
                                                                                    this.partyTitleThird = j.title
                                                                                },error => {
                                                                                    // FUSEFS

                                                                                    // this._primengProgressBarService.hide()
                                                                                })
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                        }
                                                                    },error => {
                                                                        // FUSEFS

                                                                        // this._primengProgressBarService.hide()
                                                                    })
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                            }*/
                                                        },error => {
                                                            // FUSEFS

                                                            // this._primengProgressBarService.hide()
                                                        })
                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })
                                            }
                                        },error => {
                                            // FUSEFS

                                            // this._primengProgressBarService.hide()
                                        })
                                    },error => {
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                    })
                                    this.sequenceFlag = true
                                    debugger
                                } else {
                                    this.sequenceFlag = false
                                }
                            }
                        }


                    }, error => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        console.log(error, 'error')
                        this.sequenceFlag = false
                    })

                })
            }

            else if (this.inputSequence != undefined) {
                //  this.sequenceDto = this.inputSequence
                this.clientName = this.inputSequence.clientName
                this.apiTitle = this.inputSequence.title
                this.partyTitle = this.inputSequence.partyTitle
                this.moduleTitle = this.inputSequence.moduleTitle
                this.apiId = this.inputSequence.apiIdOrg
                console.log("apiIdپرنت2",this.apiId)
                this.apiIdOrg = this.inputSequence.apiIdOrg
                console.log("apiIdOrgپرنت2",this.apiIdOrg)
                this.clientBase = this.inputSequence.clientBase
                this.moduleBase = this.inputSequence.moduleBase
                this.accessBase = this.inputSequence.accessBase
                this.clientBase = this.inputSequence.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    // FUSEFS

                    // this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        if (v != undefined) {
                            if (v[0] != undefined) {
                                this.title = v[0].title
                                this.apiTitleOrg = v[0].apiTitle
                                this.apiIdOrg = v[0].apiId
                                console.log("پرنت1",this.apiIdOrg)
                                this.sequnceIdOrg = v[0].sequnceId
                                if (v[0].status == 1) {
                                    debugger
                                    // FUSEFS

                                    // this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                        debugger
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                        debugger
                                        this.moduleIdOrg = w.moduleId
                                        this.moduleTitleOrg = w.moduleTitle
                                        // FUSEFS

                                        // this._primengProgressBarService.show()
                                        this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                            debugger
                                            // FUSEFS

                                            // this._primengProgressBarService.hide()
                                            this.partyIdOrg = u.partyId
                                            this.partyTitleOrg = u.title
                                            debugger
                                            if (v[1] != undefined) {
                                                debugger
                                                // FUSEFS

                                                // this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                    debugger
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                    this.matchListFirst = j

                                                    this.apiListOptionsFirst = [
                                                        {title: v[1].apiTitle, apiId: v[1].apiId}
                                                    ]
                                                    this.apiTitleFirst = v[1].apiTitle
                                                    this.apiIdFirst = v[1].apiId
                                                    console.log("v[1].apiIdپرنت2",v[1].apiId)
                                                    if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                        this.icon400_val  = "pi pi-check"
                                                        this.messageId4XX = v[1].messageId4XX
                                                    }
                                                    if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                        this.icon500_val = "pi pi-check"
                                                        this.messageId5XX = v[1].messageId5XX
                                                    }
                                                    debugger
                                                    if (v[1].messageId2XX != undefined && v[1].messageId2XX != 0) {
                                                        this.icon200_val  = "pi pi-check"
                                                        debugger
                                                        this.messageId2XX = v[1].messageId2XX
                                                    }
                                               // FUSEFS

                                               // /*     this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                    ).subscribe(response => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        debugger
                                                        if (Array.isArray(response)) {
                                                            this.messagesList400First = response
                                                            this.messagesList400Temp = response
                                                        } else {
                                                            this.messagesList400First.push(response)
                                                            this.messagesList400Temp.push(response)
                                                        }

                                                        if (this.messagesList400First.length > 1) {
                                                            debugger
                                                            const temp = this
                                                            this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                                return x.messageId === temp.messageId4XX;
                                                            });
                                                        }
                                                        debugger
                                                        this.messagesList400Temp = this.messagesList400First
                                                        this.apiNumber400 = 1
                                                        this.actionTypeFirst = v[1].actionType
                                                        this.actionTypeFirst==2?    this.titleApiSecound="سرویس ثانویه":( this.actionTypeFirst==1?    this.titleApiSecound="سرویس اولیه":'')
                                                        v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                        if (v[1].actionType == 2) {
                                                            this.afterApiFirst = 1
                                                        }
                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })
                                                    // FUSEFS

                                                    // this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                        this.typeMessage500
                                                    ).subscribe(response => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        debugger
                                                        this.messagesList500First = []
                                                        if (Array.isArray(response)) {
                                                            this.messagesList500First = response
                                                            this.messagesList500Temp = response
                                                        } else {
                                                            this.messagesList500First.push(response)
                                                            this.messagesList500Temp.push(response)
                                                        }
                                                        if (this.messagesList500First.length > 1) {
                                                            const temp = this
                                                            this.messagesList500First = this.messagesList500First.filter(function (x) {

                                                                return x.messageId === temp.messageId5XX;
                                                            });
                                                        }
                                                        this.messagesList500Temp = this.messagesList500First


                                                        this.apiNumber500 = 1

                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })*/
                                                    // FUSEFS

                                                    // this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                        debugger
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                        this.moduleListOptionsFirst = [
                                                            {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                        ]
                                                        this.moduleIdFirst = i.moduleId
                                                        this.moduleTitleFirst = i.moduleTitle
                                                        // FUSEFS

                                                        // this._primengProgressBarService.show()
                                                        this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                            debugger
                                                            // FUSEFS

                                                            // this._primengProgressBarService.hide()
                                                            this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                            this.partyIdFirst = y.partyId
                                                            this.partyTitleFirst = y.title

                                                           /* if (v[2] != undefined) {
                                                                this.apiListOptionsSecond = [
                                                                    {title: v[2].apiTitle, apiId: v[2].apiId}]
                                                                this.apiTitleSecond = v[2].apiTitle
                                                                this.apiIdSecond = v[2].apiId

                                                                this.actionTypeSecond = v[2].actionType
                                                                v[2].runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                                                if (v[2].actionType == 2) {
                                                                    this.afterApiSecond = 2
                                                                }
                                                                if (v[2].messageId4XX != undefined && v[2].messageId4XX != 0) {
                                                                    this.icon400_valSecond = "pi pi-check"
                                                                    this.messageId4XXSecond = v[2].messageId4XX
                                                                }
                                                                if (v[2].messageId5XX != undefined && v[2].messageId5XX != 0) {
                                                                    this.icon500_valSecond = "pi pi-check"
                                                                    this.messageId5XXSecond = v[2].messageId5XX
                                                                }
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.messagesearch(
                                                                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                    this.typeMessage500
                                                                ).subscribe(response => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    this.messagesList500Second = []
                                                                    if (Array.isArray(response)) {
                                                                        this.messagesList500Second = response
                                                                        this.messagesList500Temp = response
                                                                    } else {
                                                                        this.messagesList500Second.push(response)
                                                                        this.messagesList500Temp.push(response)
                                                                    }
                                                                    if (this.messagesList500Second.length > 1) {
                                                                        const temp = this
                                                                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId5XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList500Temp = this.messagesList500Second
                                                                    this.apiNumber500 = 2
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.messagesearch(
                                                                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                                ).subscribe(response => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    if (Array.isArray(response)) {
                                                                        this.messagesList400Temp = response
                                                                        this.messagesList400Second = response
                                                                    } else {
                                                                        this.messagesList400Second.push(response)
                                                                        this.messagesList400Temp.push(response)

                                                                    }
                                                                    debugger
                                                                    if (this.messagesList400Second.length > 1) {
                                                                        const temp = this
                                                                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId4XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList400Temp = this.messagesList400Second
                                                                    this.apiNumber400 = 2
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                                // FUSEFS

                                                                // this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.moduleFindbyapiid(v[2].apiId).subscribe(r => {
                                                                    debugger
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                    this.moduleListOptionsSecond = [
                                                                        {moduleTitle: r.moduleTitle, moduleId: r.moduleId}
                                                                    ]
                                                                    this.moduleIdFirst = r.moduleId
                                                                    this.moduleTitleFirst = r.moduleTitle
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.show()
                                                                    this.messagesApiFacadeService.partyFindbymoduleid(r.moduleId).subscribe(q => {
                                                                        debugger
                                                                        // FUSEFS

                                                                        // this._primengProgressBarService.hide()
                                                                        this.partyListOptionsSecond = [{title: q.title, partyId: q.partyId}]
                                                                        this.partyIdFirst = q.partyId
                                                                        this.partyTitleFirst = q.title

                                                                        if (v[3] != undefined) {
                                                                            this.apiListOptionsThird = [
                                                                                {title: v[3].apiTitle, apiId: v[3].apiId}
                                                                            ]
                                                                            this.apiTitleThird = v[3].apiTitle
                                                                            this.apiIdThird = v[3].apiId

                                                                            this.actionTypeThird = v[3].actionType
                                                                            v[3].runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                                                                            if (v[3].actionType == 2) {
                                                                                this.afterApiThird = 3
                                                                            }
                                                                            if (v[3].messageId4XX != undefined && v[3].messageId4XX != 0) {
                                                                                this.icon400_valThird = "pi pi-check"
                                                                                this.messageId4XXThird = v[3].messageId4XX
                                                                            }
                                                                            if (v[3].messageId5XX != undefined && v[3].messageId5XX != 0) {
                                                                                this.icon500_valThird = "pi pi-check"
                                                                                this.messageId5XXThird = v[3].messageId5XX
                                                                            }
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                                                                            ).subscribe(response => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList400Temp = response
                                                                                    this.messagesList400Third = response
                                                                                } else {
                                                                                    this.messagesList400Third.push(response)
                                                                                    this.messagesList400Temp.push(response)

                                                                                }
                                                                                debugger
                                                                                if (this.messagesList400Third.length > 1) {
                                                                                    const temp = this
                                                                                    this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId4XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList400Temp = this.messagesList400Third
                                                                                this.apiNumber400 = 3
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                                this.typeMessage500
                                                                            ).subscribe(response => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                this.messagesList500Third = []
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList500Third = response
                                                                                    this.messagesList500Temp = response
                                                                                } else {
                                                                                    this.messagesList500Third.push(response)
                                                                                    this.messagesList500Temp.push(response)
                                                                                }
                                                                                if (this.messagesList500Third.length > 1) {
                                                                                    const temp = this
                                                                                    this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId5XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList500Temp = this.messagesList500Third
                                                                                this.apiNumber500 = 3
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                            // FUSEFS

                                                                            // this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.moduleFindbyapiid(v[3].apiId).subscribe(g => {
                                                                                debugger
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                                this.moduleListOptionsThird = [
                                                                                    {moduleTitle: g.moduleTitle, moduleId: g.moduleId}
                                                                                ]
                                                                                this.moduleIdThird = g.moduleId
                                                                                this.moduleTitleThird = g.moduleTitle
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.show()
                                                                                this.messagesApiFacadeService.partyFindbymoduleid(g.moduleId).subscribe(j => {
                                                                                    // FUSEFS

                                                                                    // this._primengProgressBarService.hide()
                                                                                    this.partyListOptionsThird = [{title: j.title, partyId: j.partyId}]
                                                                                    this.partyIdThird = j.partyId
                                                                                    this.partyTitleThird = j.title
                                                                                },error => {
                                                                                    // FUSEFS

                                                                                    // this._primengProgressBarService.hide()
                                                                                })
                                                                            },error => {
                                                                                // FUSEFS

                                                                                // this._primengProgressBarService.hide()
                                                                            })
                                                                        }
                                                                    },error => {
                                                                        // FUSEFS

                                                                        // this._primengProgressBarService.hide()
                                                                    })
                                                                },error => {
                                                                    // FUSEFS

                                                                    // this._primengProgressBarService.hide()
                                                                })
                                                            }*/
                                                        },error => {
                                                            // FUSEFS

                                                            // this._primengProgressBarService.hide()
                                                        })
                                                    },error => {
                                                        // FUSEFS

                                                        // this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    // FUSEFS

                                                    // this._primengProgressBarService.hide()
                                                })
                                            }
                                        },error => {
                                            // FUSEFS

                                            // this._primengProgressBarService.hide()
                                        })
                                    },error => {
                                        // FUSEFS

                                        // this._primengProgressBarService.hide()
                                    })
                                    this.sequenceFlag = true
                                    debugger
                                } else {
                                    this.sequenceFlag = false
                                }
                            }
                        }


                    }, error => {
                        debugger
                        // FUSEFS

                        // this._primengProgressBarService.hide()
                        console.log(error, 'error')
                        this.sequenceFlag = false
                    })

                })

            }

            this.addFlag = false
        } else {
            this.addFlag = false
        }
        if (this.clientBase) {
            debugger
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.moduleBase) {
            debugger
            this.detailsBreadObject = this.chooseBread('moduleBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.accessBase) {
            debugger
            this.detailsBreadObject = this.chooseBread('accessBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.partyTitle != undefined && this.partyTitle != "") {
            debugger
            this.detailsBreadObject = this.chooseBread('partyBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }

    }

    showAdd() {
        if (this.sequenceFlag) {
            this.notifierService.showError({detail: 'جریان پردازشی فعال وجود دارد'})
        } else {
            this.addFlag = true
            if (this.inputSequence != undefined)
                this.sequenceDto.apiTitleOrg = this.inputSequence.title
            this.sequenceDto.apiIdOrg = this.inputSequence.apiIdOrg
            this.sequenceDto.apiId = this.inputSequence.apiId
            this.sequenceDto.apiNameOrg = this.inputSequence.apiName
            this.sequenceDto.moduleTitleOrg = this.inputSequence.moduleTitle
            this.sequenceDto.partyTitleOrg = this.inputSequence.partyTitle
        }
    }


}
