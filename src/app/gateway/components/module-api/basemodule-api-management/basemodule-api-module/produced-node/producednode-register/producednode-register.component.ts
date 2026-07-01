import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { ButtonDirective } from 'primeng/button';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { InputText } from 'primeng/inputtext';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';

@Component({
    selector: 'app-producednode-register',
    templateUrl: './producednode-register.component.html',
    styleUrls: ['./producednode-register.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        SelectModule,
        Checkbox,
        ButtonDirective,
        TranslocoPipe,
        InputText,

    ],
})
export class ProducednodeRegisterComponent implements OnInit {
    @Input() producedInput;
    @Output() close = new EventEmitter<string>();

    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private apiGatewayService: ApiGatewayService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
    ) {
    }

    headerTypeGroup = [{ name: 'Body', code: '2' }];
    nodeName = '';
    nodePath = '';
    nodePlace: string = null;
    producedId: number = null;
    apiId = '';
    items;
    clientName;
    apiTitle;
    moduleTitle;
    partyTitle;
    tempProduced;
    clientBase;
    moduleBase;
    accessBase;
    partyBase;
    detailsBreadObject = [];
    justReturnValue: boolean = null;
    justReturnValueFlag: boolean = null;

    ngOnInit(): void {
        debugger;
        if (this.producedInput != undefined) {
            this.clientBase = this.producedInput?.clientBase;
            this.moduleBase = this.producedInput?.moduleBase;
            this.accessBase = this.producedInput?.accessBase;
            this.partyBase = this.producedInput?.partyBase;
            this.apiTitle = this.producedInput?.apiTitle;
            this.apiId = this.producedInput?.apiId;
            this.clientBase = this.producedInput?.clientBase;
            this.moduleBase = this.producedInput?.moduleBase;
            this.accessBase = this.producedInput?.accessBase;
            this.clientBase = this.producedInput?.clientBase;
            this.partyTitle = this.producedInput?.partyTitle;
            this.moduleTitle = this.producedInput?.moduleTitle;
            this.clientName = this.producedInput?.clientName;
            if (!this.producedInput?.sequenceBase) {
                if (this.clientBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.moduleBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.accessBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.partyBase) {
                    debugger;
                    this.detailsBreadObject = this.chooseBread('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                }
            } else {
                if (this.clientBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('clientBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.moduleBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('moduleBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.accessBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('accessBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                } else if (this.partyBase) {
                    debugger;
                    this.detailsBreadObject =
                        this.chooseBreadWithSequence('partyBase');
                    this.apiGatewayService.updateApprovalDetailsBreadObject(
                        this.detailsBreadObject,
                    );
                }
            }
        }

        this.nodePlace = '2';
        if (this.producedInput != undefined) {
            if (this.producedInput.nodeName != undefined) {
                if (this.producedInput.justReturnValue == 1) {
                    this.nodePath = '';
                    this.justReturnValueFlag = true;
                } else {
                    if (this.producedInput.nodePath != null) {
                        this.nodePath = this.producedInput.nodePath.toString();
                    }
                }
                debugger;
                this.nodeName = this.producedInput.nodeName;
                this.producedId = this.producedInput.producedId;
                this.producedInput.justReturnValue == 1
                    ? (this.justReturnValue = true)
                    : (this.justReturnValue = false);

                //  this.nodePlace = this.producedInput.nodePlace.toString()
            }
        }
    }

    chooseBreadWithSequence(caseBase: string) {
        debugger
        if (this.producedInput != undefined) {
            if (this.producedInput.nodeName != undefined) {
                debugger
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
                                isActive2: false,
                                label_Detail_index2: '(' + this.apiTitle + ')',
                                img_index2: 'assets/icons/flow.png',
                            },
                            {
                                index: 3,
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },
                            {
                                index: 4,
                                label_index4: 'ویرایش نود تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                img_index4: 'assets/icons/update.png',
                            },
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
                                index: 1,
                                label_index1: 'لیست دسترسی',
                                rout_index1: null,
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
                                label_index3: 'مدیریت جریان پردازشی',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/flow.png',
                            },
                            {
                                index: 4,
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },
                            {
                                index: 5,
                                label_index5: 'ویرایش نود تولید شده',
                                rout_index5: null,
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
                                label_index3: 'مدیریت جریان پردازشی',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/flow.png',
                            },
                            {
                                index: 4,
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },

                            {
                                index: 5,
                                label_index5: 'ویرایش نود تولید شده',
                                rout_index5: null,
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
                                label_index4: 'مدیریت جریان پردازشی',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/flow.png',
                            },
                            {
                                index: 5,
                                label_index5: 'نود های تولید شده',
                                rout_index5: null,
                                isActive5: false,
                                label_Detail_index5: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },
                            {
                                index: 6,
                                label_index6: 'ویرایش نود تولید شده',
                                rout_index6: null,
                                isActive6: true,
                                img_index6: 'assets/icons/update.png',
                            },
                        ];
                    default:
                        return null;
                }
            }
            else {
                debugger
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
                                isActive2: false,
                                label_Detail_index2: '(' + this.apiTitle + ')',
                                img_index2: 'assets/icons/flow.png',
                            },
                            {
                                index: 3,
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },
                            {
                                index: 4,
                                label_index4: 'ثبت نود تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                img_index4: 'assets/icons/save.png',
                            },
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
                                index: 1,
                                label_index1: 'لیست دسترسی',
                                rout_index1: null,
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
                                label_index3: 'مدیریت جریان پردازشی',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/flow.png',
                            },
                            {
                                index: 4,
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },
                            {
                                index: 5,
                                label_index5: 'ثبت نود تولید شده',
                                rout_index5: null,
                                isActive5: true,
                                img_index5: 'assets/icons/save.png',
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
                                label_index3: 'مدیریت جریان پردازشی',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/flow.png',
                            },
                            {
                                index: 4,
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },

                            {
                                index: 5,
                                label_index5: 'ثبت نود تولید شده',
                                rout_index5: null,
                                isActive5: true,
                                img_index5: 'assets/icons/save.png',
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
                                label_index4: 'مدیریت جریان پردازشی',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/flow.png',
                            },
                            {
                                index: 5,
                                label_index5: 'نود های تولید شده',
                                rout_index5: null,
                                isActive5: false,
                                img_index4: 'assets/icons/node.png',
                            },

                            {
                                index: 6,
                                label_index6: 'ثبت نود تولید شده',
                                rout_index6: null,
                                isActive6: true,
                                img_index6: 'assets/icons/save.png',
                            },
                        ];
                    default:
                        return null;
                }
            }
        }

    }

    chooseBread(caseBase: string) {
        debugger
        if (this.producedInput != undefined) {
            if (this.producedInput.nodeName != undefined) {
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
                                label_index2: 'نود های تولید شده',
                                rout_index2: null,
                                isActive2: false,
                                label_Detail_index2: '(' + this.apiTitle + ')',
                                img_index2: 'assets/icons/node.png',
                            },
                            {
                                index: 3,
                                label_index3: 'ویرایش نود تولید شده',
                                rout_index3: null,
                                isActive3: true,
                                img_index3: 'assets/icons/update.png',
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
                                index: 1,
                                label_index1: 'لیست دسترسی',
                                rout_index1: null,
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
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: true,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },

                            {
                                index: 4,
                                label_index4: 'ویرایش نود تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                img_index4: 'assets/icons/update.png',
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
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: true,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },
                            {
                                index: 4,
                                label_index4: 'ویرایش نود تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                img_index4: 'assets/icons/update.png',
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
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },
                            {
                                index: 5,
                                label_index5: 'ویرایش نود تولید شده',
                                rout_index5: null,
                                isActive5: true,
                                img_index5: 'assets/icons/update.png',
                            },
                            { label_index6: null, label_Detail_index6: null },
                        ];
                    default:
                        return null;
                }
            }
            else {
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
                                label_index2: 'نود های تولید شده',
                                rout_index2: null,
                                isActive2: false,
                                label_Detail_index2: '(' + this.apiTitle + ')',
                                img_index2: 'assets/icons/node.png',
                            },
                            {
                                index: 3,
                                label_index3: 'ثبت نود تولید شده',
                                rout_index3: null,
                                isActive3: true,
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
                                index: 1,
                                label_index1: 'لیست دسترسی',
                                rout_index1: null,
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
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: true,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },

                            {
                                index: 4,
                                label_index4: 'ثبت نود تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                img_index4: 'assets/icons/save.png',
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
                                label_index3: 'نود های تولید شده',
                                rout_index3: null,
                                isActive3: false,
                                label_Detail_index3: '(' + this.apiTitle + ')',
                                img_index3: 'assets/icons/node.png',
                            },
                            {
                                index: 4,
                                label_index4: 'ثبت نود تولید شده',
                                rout_index4: null,
                                isActive4: true,
                                img_index4: 'assets/icons/save.png',
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
                                label_index4: 'نود های تولید شده',
                                rout_index4: null,
                                isActive4: false,
                                label_Detail_index4: '(' + this.apiTitle + ')',
                                img_index4: 'assets/icons/node.png',
                            },
                            {
                                index: 5,
                                label_index5: 'ثبت نود تولید شده',
                                rout_index5: null,
                                isActive5: true,
                                img_index5: 'assets/icons/save.png',
                            },
                            { label_index6: null, label_Detail_index6: null },
                        ];
                    default:
                        return null;
                }
            }
        }
    }

    onKeydown(event): void {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.onRegister();
        }
    }

    onRegister() {
        debugger;
        if (this.validation()) {
            let obj;
            if (this.producedInput != undefined) {
                if (this.producedInput.producedId != undefined) {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        producedId: null,
                        // justReturnValue:null
                    };
                    debugger;
                    if (
                        this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != ''
                    ) {
                        const firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }

                    this.nodePath = this.nodePath.trim();
                    if (this.nodePath && !this.nodePath.endsWith('/')) {
                        this.nodePath = this.nodePath + '/';
                    }
                    obj.nodePath = this.nodePath;
                    obj.nodePlace = 2;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.producedInput.apiId;
                    obj.producedId = this.producedInput.producedId;
                    this.justReturnValue == true
                        ? (obj.justReturnValue = 1)
                        : (obj.justReturnValue = 0);
                } else {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        justReturnValue: null,
                    };
                    debugger;
                    if (
                        this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != ''
                    ) {
                        const firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }
                    obj.nodePath = this.nodePath;
                    obj.nodePlace = 2;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.producedInput.apiId;
                    this.justReturnValue == true
                        ? (obj.justReturnValue = 1)
                        : (obj.justReturnValue = 0);
                }
                // FUSEFS

                // this._primengProgressBarService.show();
                this.messagesApiFacadeService.producednodeRegister(obj).subscribe((n) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            obj.nodeName = null;
                            this.nodeName = null;
                            obj.nodePath = null;
                            this.nodePath = null;
                            obj.apiId = null;
                            obj.producedId = null;
                            obj.justReturnValue = null;
                            this.close.emit('closeAndCreate');
                            debugger;
                        },
                        (error) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        },
                    );
            }
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    validation(): boolean {
        if (!this.nodeName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان نود را وارد نمائید!',
                life: 3000,
            });
            return false;
        }
        {
            return true;
        }
    }

    onchangeJustReturnValue() {
        if (this.justReturnValue) {
            this.nodeName = 'justReturnValue';
            this.nodePlace = '2';
            this.nodePath = '';
            this.justReturnValueFlag = true;
        } else {
            this.nodeName = '';
            this.nodePlace = '2';
            this.justReturnValueFlag = false;
        }
    }
}
