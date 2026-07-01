import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {ActivatedRoute} from '@angular/router';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ApiGatewayService} from '../../../../../services/api-gateway.service';
import {AccessDataSaveService} from '../../../../../../shared/services/access-data-save.service';
import {Toast} from "primeng/toast";
import {BreadcrumbsComponent} from "../../../../../../shared/components/breadcrumbs/breadcrumbs.component";
import {NgIf, NgStyle} from "@angular/common";
import {Tooltip} from "primeng/tooltip";
import {ThreeDotDetailsPipe} from "../../../../../../shared/pipes/threeDotDetails.pipe";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {LimitTypePipe} from "../../../../../../shared/pipes/limitType.pipe";
import {StatusPipe} from "../../../../../../shared/pipes/status.pipe";
import {TimeLimitationRegisterComponent} from "./time-limitation-register/time-limitation-register.component";

@Component({
    selector: 'app-time-limitation',
    templateUrl: './time-limitation.component.html',
    styleUrls: ['./time-limitation.component.scss'],
    standalone: true,
    imports: [
        Toast,
        BreadcrumbsComponent,
        NgIf,
        Tooltip,
        ThreeDotDetailsPipe,
        ButtonDirective,
        TranslocoPipe,
        TableModule,
        LimitTypePipe,
        NgStyle,
        StatusPipe,
        TimeLimitationRegisterComponent

    ],
})
export class TimeLimitationComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputTimeLimitation;
    timeLimitationFlag = false;
    addUpdateFlag = false;
    title: string = null;
    url: string = null;
    timeLimitationList = [];
    objectTimeLimitation = {
        fromDateTime: null,
        toDateTime: null,
        limitType: null,
        apiId: null,
        status: null,
        updateFlag: null,
        moduleBase: null,
        clientBase: null,
        accessBase: null,
        partyTitle: null,
        moduleTitle: null,
        clientName: null,
        partyBase: null,
        headerLimit: 'headerLimit',
    };
    partyBase
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    clientBase = null;
    moduleBase = null;
    accessBase = null;
    clientName;
    widthUrl;
    widthTitle;
    first = 0;
    rows = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private accessDataSaveService: AccessDataSaveService
    ) {}

    chooseBread(caseBase: any) {
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
                        label_index3: 'محدودیت زمانی سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/limit.png',
                    },
                    { label_index5: null },
                    { label_index4: null },
                    { label_index6: null },
                ];
                break;
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
                        img_index1: 'assets/icons/module.png',
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
                        label_index3: 'محدودیت زمانی سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/limit.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
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
                        label_index2: 'محدودیت زمانی سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/limit.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
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
                        rout_index2: '/module',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: '/api',
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'محدودیت زمانی سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/limit.png',
                    },
                    { label_index5: null },
                ];
                break;
            default:
                return null;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();

        this.title = this.inputTimeLimitation.title;
        this.url = this.inputTimeLimitation.url;

        // FUSEFS


        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.getlmitbyapiid(this.inputTimeLimitation.apiId).subscribe((a) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.timeLimitationList = a;
                    } else {
                        this.timeLimitationList.push(a);
                    }
                    this.timeLimitationList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.timeLimitationList.length; k++) {
                        this.timeLimitationList[k] = Object.assign(
                            this.timeLimitationList[k],
                            { row: k + 1 }
                        );
                    }
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                }
            );

        if (this.inputTimeLimitation != undefined) {
            this.moduleBase = this.inputTimeLimitation.moduleBase;
            this.clientBase = this.inputTimeLimitation.clientBase;
            this.accessBase = this.inputTimeLimitation.accessBase;
            this.partyTitle = this.inputTimeLimitation.partyTitle;
            this.moduleTitle = this.inputTimeLimitation.moduleTitle;
            this.clientName = this.inputTimeLimitation.clientName;
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
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                this.partyBase=true
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (this.url.length != null) {
            this.url.length > 22 ? (this.widthUrl = 100) : (this.widthUrl = 50);
        }
        if (this.title.length != null) {
            this.title.length > 22
                ? (this.widthTitle = 100)
                : (this.widthTitle = 50);
        }
    }

    showAddUpdate(updateFlag, timeLimitation?) {
      debugger
        const base = {
            moduleBase: this.moduleBase,
            clientBase: this.clientBase,
            accessBase: this.accessBase,
            partyTitle: this.partyTitle,
            moduleTitle: this.moduleTitle,
            clientName: this.clientName,
            partyBase: this.partyBase,
            apiTitle: this.title,
        };
        if (updateFlag) {
            this.objectTimeLimitation = {
                ...timeLimitation,
                ...base,
                updateFlag: true,
                headerLimit: 'ویرایش محدودیت سرویس',
            };
        } else {
            this.objectTimeLimitation = {
                ...this.objectTimeLimitation,
                ...base,
                updateFlag: false,
                headerLimit: 'ثبت محدودیت سرویس',
            };

        }
        this.addUpdateFlag = true;
    }

    onClose(event) {
        if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.partyTitle != undefined && this.partyTitle != '') {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        if (event == 'close') {
            this.addUpdateFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addUpdateFlag = false;
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getlmitbyapiid(this.inputTimeLimitation.apiId)
                .subscribe(
                    (a) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        if (Array.isArray(a)) {
                            this.timeLimitationList = a;
                        } else {
                            this.timeLimitationList.push(a);
                        }
                        this.timeLimitationList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (
                            let k = 0;
                            k < this.timeLimitationList.length;
                            k++
                        ) {
                            this.timeLimitationList[k] = Object.assign(
                                this.timeLimitationList[k],
                                { row: k + 1 }
                            );
                        }
                    },
                    (error) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    }
                );
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
