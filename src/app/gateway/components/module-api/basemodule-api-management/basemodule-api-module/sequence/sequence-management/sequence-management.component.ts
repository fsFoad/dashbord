import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpMethodsPipe } from '../../../../../../../shared/pipes/http-methods.pipe';
import { InputText } from 'primeng/inputtext';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { NgClass, NgIf, NgStyle, ViewportScroller } from '@angular/common';
import { NormalizeJalaliPipe } from '../../../../../../../shared/pipes/fix-jalali.pipe';
import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { StatusPipe } from '../../../../../../../shared/pipes/status.pipe';
import { TableModule } from 'primeng/table';
import { TieredMenu } from 'primeng/tieredmenu';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { UIChart } from 'primeng/chart';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { AccessDataSaveService } from '../../../../../../../shared/services/access-data-save.service';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { SequenceRegisterComponent } from '../sequence-register/sequence-register.component';
import { ClientNameSequencePipe } from '../../../../../../../shared/pipes/client-name-sequence.pipe';
import { SequenceComponent } from '../sequence.component';

@Component({
    selector: 'app-sequence-management',
    imports: [
        ButtonDirective,
        DropdownModule,
        FormsModule,
        HttpMethodsPipe,
        InputText,
        MoreChar19Pipe,
        NgIf,
        NormalizeJalaliPipe,
        PrimeTemplate,
        Ripple,
        StatusPipe,
        TableModule,
        TieredMenu,
        Tooltip,
        TranslocoPipe,
        UIChart,
        NgClass,
        BreadcrumbsComponent,
        Toast,
        SequenceRegisterComponent,
        ClientNameSequencePipe,
        NgStyle,
        SequenceComponent,
    ],
    templateUrl: './sequence-management.component.html',
    styleUrl: './sequence-management.component.scss',
})
export class SequenceManagementComponent implements OnInit{
    @Input() inputSequenceManagement
    @Output() close = new EventEmitter<string>();
    sequenceList: any[] = [];
    loading: boolean = false;
    tempSequence: any;
    items: any[] = [];
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pageno = 0;
    apiId = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    nextBtnFlag = false;
    moduleTitle
    clientName
    partyTitle
    clientBase
    sequenceDto
    apiTitle
    moduleBase
    accessBase
    detailsBreadObject = [];
    actionType
    addFlag = false
    displayFlag = false
    constructor(
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private accessDataSaveService: AccessDataSaveService,
        private viewportScroller: ViewportScroller,
        private notifierService: ToastService,
        private router: Router,
        private route: ActivatedRoute,
        private primeng: PrimeNG,
    ) {
    }

    showAdd() {
        this.addFlag = true
        if (this.inputSequenceManagement != undefined)
            this.sequenceDto.apiTitleOrg = this.inputSequenceManagement.title
        this.sequenceDto.apiIdOrg = this.inputSequenceManagement.apiIdOrg
        this.sequenceDto.apiId = this.inputSequenceManagement.apiId
        this.sequenceDto.apiNameOrg = this.inputSequenceManagement.apiName
        this.sequenceDto.moduleTitleOrg = this.inputSequenceManagement.moduleTitle
        this.sequenceDto.partyTitleOrg = this.inputSequenceManagement.partyTitle
    }

    setRecord(sequence) {
        this.tempSequence = sequence;
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.fetchList(this.pagesize, this.pageno);
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.fetchList(this.pagesize, this.pageno);
    }

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.fetchList(this.pagesize, this.pageno);
    }

    fetchList(pageno,pagesize ) {
        debugger;
        let startRow: number;
        pageno != 0 ? (startRow = pageno * pagesize) : (startRow = 0);
        debugger;
        this.loading = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getapisequencebyapiidv2(this.pageno, this.pagesize, this.apiId).subscribe((a) => {
                this._primengProgressBarService.hide();
                this.loading = false;
                if (Array.isArray(a)) {
                    this.sequenceList = a;
                } else {
                    this.sequenceList.push(a);
                }
                this.sequenceList.map((x) =>
                    x.status === 1
                        ? (x.status = true)
                        : (x.status = false),
                );
                if (pageno != 0 && pageno != 1) {
                    debugger;
                    for (let u = 0; u < this.sequenceList.length; u++) {
                        this.sequenceList[u] = Object.assign(
                            this.sequenceList[u],
                            { row: u + startRow + 1 },
                        );
                        debugger;
                    }
                } else if (pageno == 1) {
                    debugger;
                    for (let u = 0; u < this.sequenceList.length; u++) {
                        this.sequenceList[u] = Object.assign(
                            this.sequenceList[u],
                            { row: u + pagesize + 1 },
                        );
                        debugger;
                    }
                } else {
                    for (let u = 0; u < this.sequenceList.length; u++) {
                        this.sequenceList[u] = Object.assign(
                            this.sequenceList[u],
                            { row: u + 1 },
                        );
                        debugger;
                    }
                }
                this.loading = false;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );


    }

    BeforeButton(){
        this.close.emit('close');
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

    ngOnInit(): void {
        debugger
        if (this.inputSequenceManagement != undefined) {
            this.sequenceDto = this.inputSequenceManagement
            console.log('pp.inputSequence',this.inputSequenceManagement)
            this.clientName = this.inputSequenceManagement.clientName
            this.apiTitle = this.inputSequenceManagement.title
            this.partyTitle = this.inputSequenceManagement.partyTitle
            this.moduleTitle = this.inputSequenceManagement.moduleTitle
            this.apiId = this.inputSequenceManagement.apiId
            this.clientBase = this.inputSequenceManagement.clientBase
            this.moduleBase = this.inputSequenceManagement.moduleBase
            this.accessBase = this.inputSequenceManagement.accessBase
            this.clientBase = this.inputSequenceManagement.clientBase
            this._primengProgressBarService.show()
            this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                console.log(u)
                this._primengProgressBarService.hide()

                debugger
                this._primengProgressBarService.show()

            },error => {
                this._primengProgressBarService.hide()
            })
            this.fetchList(this.pageno,this.pagesize)
            debugger
            if (this.clientBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('clientBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.moduleBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.partyTitle != undefined && this.partyTitle != "") {
                debugger
                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }

        this.items = [

            {
                label: 'مشاهده جریان پردازشی',
                icon: '',
                command: () => {
                    this.showDisplay(this.tempSequence);
                },
            },

            {
                separator: true
            },
            {
                label: this.transloco.translate('contextMenu.cancel'),
            },
        ];
    }
    showDisplay(sequence){
        this.displayFlag=true
        this.sequenceDto=sequence
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
                this.clientBase = e.clientBase
                this.moduleBase = e.moduleBase
                this.accessBase = e.accessBase
                this.clientBase = e.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    this._primengProgressBarService.show()
                    debugger
                    this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                        debugger
                        this._primengProgressBarService.hide()
                    }, error => {
                        debugger
                        this._primengProgressBarService.hide()
                        console.log(error, 'error')
                    })
                })
            }

            else if (this.inputSequenceManagement != undefined) {
                //  this.sequenceDto = this.inputSequence
                this.clientName = this.inputSequenceManagement.clientName
                this.apiTitle = this.inputSequenceManagement.title
                this.partyTitle = this.inputSequenceManagement.partyTitle
                this.moduleTitle = this.inputSequenceManagement.moduleTitle
                this.apiId = this.inputSequenceManagement.apiIdOrg
                console.log("apiIdپرنت2",this.apiId)
                this.clientBase = this.inputSequenceManagement.clientBase
                this.moduleBase = this.inputSequenceManagement.moduleBase
                this.accessBase = this.inputSequenceManagement.accessBase
                this.clientBase = this.inputSequenceManagement.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    this._primengProgressBarService.show()


                })

            }

            this.addFlag = false
            this.displayFlag = false
        }
        else {
            this.addFlag = false
            this.displayFlag = false
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
        this.messagesApiFacadeService.getapisequencebyapiidv2(this.pageno, this.pagesize, this.apiId).subscribe((a) => {
                this._primengProgressBarService.hide();
                this.loading = false;
                if (Array.isArray(a)) {
                    this.sequenceList = a;
                } else {
                    this.sequenceList.push(a);
                }
                this.sequenceList.map((x) =>
                    x.status === 1
                        ? (x.status = true)
                        : (x.status = false),
                );

                    for (let u = 0; u < this.sequenceList.length; u++) {
                        this.sequenceList[u] = Object.assign(
                            this.sequenceList[u],
                            { row: u + 1 },
                        );
                        debugger;
                    }

                this.loading = false;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );

    }

}
