import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { PrimeNG } from 'primeng/config';
import { Dialog } from 'primeng/dialog';
import { FileUpload } from 'primeng/fileupload';

import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Panel } from 'primeng/panel';
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientUpdateComponent } from './client-update/client-update.component';
import { AccessListComponent } from '../access-list/access-list.component';
import { Toast } from 'primeng/toast';
import { Constants } from '../../../shared/constants/Constants';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        InputText,
        ButtonDirective,
        TranslocoPipe,
        BreadcrumbsComponent,
        SelectModule,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        StatusPipe,
        Ripple,
        Menu,
        ClientRegisterComponent,
        ClientUpdateComponent,
        AccessListComponent,
        NgIf,
        Toast,
        NgClass,
    ],
    providers: [ToastService],
})
export class ClientComponent implements OnInit {
    clientList = [];
    searchByOption = Constants.searchByOption
    searchBy;
    partyListOptions = [{ title: '-', partyId: null }];
    partyId = null;
    partyName = null;
    clientName = null;
    apiKey = null;
    mobileNo = null;
    clientBase = null;
    apiFlag = false;
    endpointFlag = false;
    ruleClient = false;
    detailsBreadObject = [];
    hiddenApikey = true;
    myClient = {
        status: null,
        publicKey: '',
        organizationCode: null,
        name: '',
        mobileNo: '',
        endpointId: null,
        digitalPublickey: null,
        clientId: null,
        apikey: null,
        allowedAccountno: null,
        clientBase: null,
    };
    tempClient;
    items;
    first = 0;
    rows = 10;
    registerFlag = false;
    updateFlag = false;
    accessListFlag = false;
    clientDto;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private router: Router,
        private primeng: PrimeNG
    ) {}

    onChangeSearch(event) {
        if (event.value == '1') {
            this.hiddenApikey = true;
            this.searchBy = event.value;
        } else if (event.value == '2') {
            this.hiddenApikey = false;
            this.searchBy = event.value;
        }
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'clientBase':
                return [

                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '',
                        isActive0: true,
                        img_index0: 'assets/icons/client.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    {
                        label_index3: null,
                        label_Detail_index3: null,
                    },
                    { label_index4: null, label_Detail_index4: null },
                    {
                        label_index5: null,
                        label_Detail_index5: null,
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    onKeydown(event) {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    addClientshow() {
        this.registerFlag = true;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.searchBy = '1';
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: 'لیست دسترسی',
                        icon: '',
                        command: () => {
                            this.showAccessList(this.tempClient);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        icon: '',
                        command: () => {
                            this.showUpdate(this.tempClient);
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
        this.detailsBreadObject = this.chooseBread('clientBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallclient().subscribe(
            (z) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                if (Array.isArray(z)) {
                    this.clientList = z;
                } else {
                    this.clientList.push(z);
                }
                this.clientList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.clientList.length; k++) {
                    this.clientList[k] = Object.assign(this.clientList[k], {
                        row: k + 1,
                    });
                }
            },
            (error) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            }
        );
    }

    clear() {
        this.partyId = null;
        this.clientName = null;
        this.apiKey = null;
        this.clientList = [];
        this.searchBy = '1';
        this.hiddenApikey = true;
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (z) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                if (Array.isArray(z)) {
                    this.clientList = z;
                } else {
                    this.clientList.push(z);
                }
                this.clientList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.clientList.length; k++) {
                    this.clientList[k] = Object.assign(this.clientList[k], {
                        row: k + 1,
                    });
                }
                console.log(this.clientList);
            },
            (error) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            }
        );
    }

    searchValidate(): boolean {
        if (this.searchBy == null && this.searchBy == undefined) {
            this.notifierService.showError({
                detail: 'لطفا نوع جستجو را وارد کنید',
            });
        } else {
            return true;
        }
    }

    search() {
        if (this.searchValidate())
            if (this.searchBy == '1') {
                this.clientName == null
                    ? (this.clientName = '')
                    : this.clientName;
                // FUSEFS

                // this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .clientsearchbyclientnameandmobileno(this.clientName, '')
                    .subscribe(
                        (w) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            this.clientList = [];
                            if (Array.isArray(w)) {
                                this.clientList = w;
                            } else {
                                this.clientList.push(w);
                            }
                            this.clientList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.clientList.length; k++) {
                                this.clientList[k] = Object.assign(
                                    this.clientList[k],
                                    { row: k + 1 }
                                );
                            }
                        },
                        (error) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                        }
                    );
            } else if (this.searchBy == '2') {
                // FUSEFS

                // this._primengProgressBarService.show();
                this.apiKey == null ? (this.apiKey = '') : this.apiKey;
                this.messagesApiFacadeService
                    .getclinetidbyapikey(this.apiKey)
                    .subscribe(
                        (w) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            this.clientList = [];
                            if (Array.isArray(w)) {
                                this.clientList = w;
                            } else {
                                this.clientList.push(w);
                            }
                            this.clientList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.clientList.length; k++) {
                                this.clientList[k] = Object.assign(
                                    this.clientList[k],
                                    { row: k + 1 }
                                );
                            }
                        },
                        (error) => {
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            console.log(error);
                            this.clientList = [];
                            this.notifierService.showWarning({
                                detail: 'اطلاعاتی یافت نشد!',
                                life: 5000,
                            });
                        }
                    );
            }
    }

    showUpdate(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
        };
        this.clientDto = client;
        this.updateFlag = true;
    }

    showAccessList(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
            clientFlag: null,
            clientBase: null,
        };

        this.clientDto = client;
        this.clientDto.clientFlag = true;
        this.clientDto.clientBase = true;
        this.accessListFlag = true;
    }

    setRecord(client) {
        this.tempClient = client;
    }

    showEndpointAndApi(client, flag) {
        this.myClient = {
            status: null,
            publicKey: '',
            organizationCode: null,
            name: '',
            mobileNo: '',
            endpointId: null,
            digitalPublickey: null,
            clientId: null,
            apikey: null,
            allowedAccountno: null,
            clientBase: null,
        };
        this.myClient = client;
        this.myClient.clientBase = true;
        this.apiGatewayService.updateApprovalClientObject(client);
        this.apiGatewayService.updateApprovalClientObject(this.myClient);
        if (flag == 1) {
            this.endpointFlag = true;
        }
        if (flag == 2) {
            this.apiFlag = true;
        }
        if (flag == 3) {
            this.ruleClient = true;
        }
    }

    onClose(event) {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread(this.clientBase);
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.accessListFlag = false;
        } else if (event == 'closeAndCreate') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.accessListFlag = false;
            this.search();
        }
        this.detailsBreadObject = this.chooseBread('clientBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }
}
