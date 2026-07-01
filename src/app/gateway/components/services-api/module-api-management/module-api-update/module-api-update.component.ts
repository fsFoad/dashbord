import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleDto} from "../../../../models/Module.Dto";
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SelectModule} from 'primeng/select';
import {ToastService} from '../../../../../shared/services/ToastService';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../../@fuse/services/loading';
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {KeyFilter} from 'primeng/keyfilter';
import {ToggleSwitch} from "primeng/toggleswitch";
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { ApiGatewayService } from '../../../../services/api-gateway.service';

@Component({
    selector: 'app-module-api-update',
    templateUrl: './module-api-update.component.html',
    styleUrls: ['./module-api-update.component.scss'],
    providers: [ConfirmationService],
    standalone: true,
    imports: [
        FormsModule,
        InputText,
        SelectModule,
        KeyFilter,
        ButtonDirective,
        TranslocoPipe,
        ConfirmDialog,
        ToggleSwitch,
        BreadcrumbsComponent,
        Toast,
        Ripple,
    ],
})
export class ModuleApiUpdateComponent implements OnInit {
    @Input() inputModuleUpdate;
    @Input() inputPartyBaseModuleUpdate;
    @Output() close = new EventEmitter<string>();
    basemoduleFlag;
    moduleTypeOptions = ApiGatewayConstants.moduleType;
    authenticationMethodOptions = ApiGatewayConstants.authenticationMethod;
    status;
    partyTitle
    moduleTypeValue: number;
    moduleTitle: string = null;
    moduleGroup: number = null;
    moduleAuthMode: number = null;
    esbMode: number = null;
    description: string = null;
    retryCount: number = null;
    delayRetryTime: number = null;
    limitForPeriod: number = null;
    limitRefreshPeriod: number = null;
    partyId;
    moduleId;
    title;
    detailsBreadObject = [];
    moduleDto: ModuleDto = {
        moduleId: null,
        partyId: null,
        moduleTitle: '',
        moduleType: null,
        moduleGroup: null,
        moduleAuthMode: null,
        esbMode: null,
        status: null,
        description: '',
        retryCount: null,
        delayRetryTime: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
    };
    varChangeFlag = false;
    constructor(
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private transloco: TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService
    ) {}
    confirm1() {
        this.confirmationService.confirm({
            message: this.transloco.translate('registerModule.message.sureDeactivateModule'),
            header:this.transloco.translate('module.dialog.header.deActiveModule') ,
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.onAccept(),
            reject: () => this.rejectFunc()
        });
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        debugger
        this.scrollTop();

        this.varChangeFlag = false;
        if (this.inputPartyBaseModuleUpdate!=undefined){
            this.basemoduleFlag = this.inputPartyBaseModuleUpdate?.basemoduleFlag;
            this.partyId = this.inputPartyBaseModuleUpdate?.partyId;
            this.title = this.inputPartyBaseModuleUpdate?.title;
            this.moduleId = this.inputPartyBaseModuleUpdate?.moduleId;
            this.moduleTitle = this.inputPartyBaseModuleUpdate.moduleTitle;
            this.partyTitle = this.inputPartyBaseModuleUpdate.partyTitle;
            this.moduleTypeValue = this.inputPartyBaseModuleUpdate?.moduleType?.toString();
            this.moduleGroup = this.inputPartyBaseModuleUpdate?.moduleGroup?.toString();
            this.moduleAuthMode = this.inputPartyBaseModuleUpdate?.moduleAuthMode?.toString();
            this.esbMode = this.inputPartyBaseModuleUpdate?.esbMode;
            this.description = this.inputPartyBaseModuleUpdate?.description;
            this.retryCount = this.inputPartyBaseModuleUpdate?.retryCount;
            this.delayRetryTime = this.inputPartyBaseModuleUpdate?.delayRetryTime;
            this.limitForPeriod = this.inputPartyBaseModuleUpdate?.limitForPeriod;
            this.limitRefreshPeriod = this.inputPartyBaseModuleUpdate?.limitRefreshPeriod;
            this.inputPartyBaseModuleUpdate.status == 1 ? (this.status = true) : (this.status = false);
            this.detailsBreadObject= this.chooseBread('partyBase')
        }
        else if(this.inputModuleUpdate!=undefined){
            this.basemoduleFlag = this.inputModuleUpdate?.basemoduleFlag;
            this.partyId = this.inputModuleUpdate?.partyId;
            this.title = this.inputModuleUpdate?.title;
            this.moduleId = this.inputModuleUpdate?.moduleId;
            this.moduleTitle = this.inputModuleUpdate.moduleTitle;
            this.moduleTypeValue = this.inputModuleUpdate?.moduleType?.toString();
            this.moduleGroup = this.inputModuleUpdate?.moduleGroup?.toString();
            this.moduleAuthMode = this.inputModuleUpdate?.moduleAuthMode?.toString();
            this.esbMode = this.inputModuleUpdate?.esbMode;
            this.description = this.inputModuleUpdate?.description;
            this.retryCount = this.inputModuleUpdate?.retryCount;
            this.delayRetryTime = this.inputModuleUpdate?.delayRetryTime;
            this.limitForPeriod = this.inputModuleUpdate?.limitForPeriod;
            this.limitRefreshPeriod = this.inputModuleUpdate?.limitRefreshPeriod;
            this.inputModuleUpdate.status == 1 ? (this.status = true) : (this.status = false);
            this.partyTitle = this.inputModuleUpdate.title;
            this.detailsBreadObject= this.chooseBread('moduleBase')
        }

        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        debugger
    }

    chooseBread(caseBase: string) {
        debugger
        switch (caseBase) {
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
                        label_index1:  this.transloco.translate('breadcrumbs.party'),
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.module'),
                        rout_index2: '',
                        isActive2: true,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {    index: 3,
                        label_index3: this.transloco.translate('editModule.header.header'),
                        rout_index3: '/registerRule',
                        isActive3: true,
                        img_index3: 'assets/icons/update.png',},
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
                        label_index1:  this.transloco.translate('breadcrumbs.module'),
                        rout_index1: '/party',
                        isActive1: false,

                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('editModule.header.header'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2:  'assets/icons/update.png',
                    },

                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
        debugger
    }

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    changeFlag() {
        this.varChangeFlag = true;
    }

    rejectFunc() {
        console.log('عملیات لغو شد.');
        // مدیریت لغو عملیات
    }

    private onAccept(){
        this.moduleDto.moduleGroup = 0;
        this.moduleDto.esbMode = 0;
        this.moduleDto.moduleId = this.moduleId;
        this.moduleDto.partyId = Number(this.partyId);
        this.moduleDto.moduleTitle = this.moduleTitle;
        this.moduleDto.moduleType = Number(this.moduleTypeValue);
        this.moduleDto.moduleAuthMode = +this.moduleAuthMode;
        this.description != null
            ? (this.moduleDto.description = this.description)
            : (this.moduleDto.description = null);
        this.retryCount != null
            ? (this.moduleDto.retryCount = Number(this.retryCount))
            : (this.moduleDto.retryCount = null);
        this.delayRetryTime != null
            ? (this.moduleDto.delayRetryTime = Number(
                this.delayRetryTime
            ))
            : (this.moduleDto.delayRetryTime = null);
        this.limitForPeriod != null
            ? (this.moduleDto.limitForPeriod = Number(
                this.limitForPeriod
            ))
            : (this.moduleDto.limitForPeriod = null);
        this.limitRefreshPeriod != null
            ? (this.moduleDto.limitRefreshPeriod = Number(
                this.limitRefreshPeriod
            ))
            : (this.moduleDto.limitRefreshPeriod = null);
        this.status == true ? (this.moduleDto.status = 1) : 0;
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .registerModule(this.moduleDto)
            .subscribe(
                (Moduleresponse) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                }
            );
    }

    onUpdate() {
        if (this.validation()) {
            if (this.varChangeFlag && this.status == false) {
                this.confirm1();
            } else {
                this.moduleDto.moduleGroup = 0;
                this.moduleDto.esbMode = 0;
                this.moduleDto.moduleId = this.moduleId;
                this.moduleDto.partyId = Number(this.partyId);
                this.moduleDto.moduleTitle = this.moduleTitle;
                this.moduleDto.moduleType = Number(this.moduleTypeValue);
                this.moduleDto.moduleAuthMode = +this.moduleAuthMode;
                this.description != null
                    ? (this.moduleDto.description = this.description)
                    : (this.moduleDto.description = null);
                this.retryCount != null
                    ? (this.moduleDto.retryCount = Number(this.retryCount))
                    : (this.moduleDto.retryCount = null);
                this.delayRetryTime != null
                    ? (this.moduleDto.delayRetryTime = Number(
                          this.delayRetryTime
                      ))
                    : (this.moduleDto.delayRetryTime = null);
                this.limitForPeriod != null
                    ? (this.moduleDto.limitForPeriod = Number(
                          this.limitForPeriod
                      ))
                    : (this.moduleDto.limitForPeriod = null);
                this.limitRefreshPeriod != null
                    ? (this.moduleDto.limitRefreshPeriod = Number(
                          this.limitRefreshPeriod
                      ))
                    : (this.moduleDto.limitRefreshPeriod = null);
                this.status == true
                    ? (this.moduleDto.status = 1)
                    : (this.moduleDto.status = 0);
                // FUSEFS

                // this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerModule(this.moduleDto)
                    .subscribe(
                        (Moduleresponse) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            this.close.emit('closeAndCreate');
                        },
                        (error) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    validation(): boolean {
        if (!this.moduleTitle) {
            this.notifierService.showError({
                detail: this.transloco.translate('editModule.message.enterModuleTitle'),
                life: 3000,
            });
            return false;
        } else if (!this.moduleTypeValue) {
            this.notifierService.showError({
                detail:this.transloco.translate('editModule.message.enterModuleType'),
                life: 3000,
            });
            return false;
        } else if (!this.moduleAuthMode) {
            this.notifierService.showError({
                detail: this.transloco.translate('editModule.message.enterAuthenticationMethod'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
