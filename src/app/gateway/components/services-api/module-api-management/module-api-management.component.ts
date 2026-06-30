import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../shared/services/ToastService';
import {ModuleDto} from '../../../models/Module.Dto';
import {ApiGatewayService} from '../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {BreadcrumbsComponent} from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {NgClass, NgIf} from '@angular/common';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {ThreeDotDetailsPipe} from '../../../../shared/pipes/threeDotDetails.pipe';
import {Tooltip} from 'primeng/tooltip';
import {ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MoreChar19Pipe} from '../../../../shared/pipes/moreChar19.pipe';
import {ModuleTypePipe} from '../../../../shared/pipes/moduleType.pipe';
import {StatusPipe} from '../../../../shared/pipes/status.pipe';
import {Menu} from 'primeng/menu';
import {Ripple} from 'primeng/ripple';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ModuleApiAddComponent} from './module-api-add/module-api-add.component';
import {ModuleApiUpdateComponent} from './module-api-update/module-api-update.component';
import {EndpointManagementComponent} from '../endpoint-management/endpoint-management.component';
import {
    BasemoduleApiModuleComponent
} from '../../module-api/basemodule-api-management/basemodule-api-module/basemodule-api-module.component';
import {Toast} from 'primeng/toast';
import {CacheComponent} from './cache/cache.component';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-module-api-management',
    templateUrl: './module-api-management.component.html',
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        NgIf,
        TranslocoPipe,
        ThreeDotDetailsPipe,
        Tooltip,
        ButtonDirective,
        TableModule,
        MoreChar19Pipe,
        ModuleTypePipe,
        StatusPipe,
        Menu,
        Ripple,
        DropdownModule,
        FormsModule,
        ModuleApiAddComponent,
        ModuleApiUpdateComponent,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        Toast,
        NgClass,
        CacheComponent,
    ],
    styleUrls: ['./module-api-management.component.scss'],
})
export class ModuleApiManagementComponent implements OnInit {
    @Input() inputUpdate;
    @Output() close = new EventEmitter<string>();

    addFlag = false;
    updateFlag = false;
    endpointFlag = false;
    apiModuleFlag = false;
    cacheFlag = false;
    moduleTitle = '';
    title = '';
    moduleList = [];
    updateModuleDto;
    partyDto;
    detailsBreadObject = [];
    ModuleDto = {
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
        moduleId: null,
        moduleBase: null,
        partyTitle: null,
    };
    moduleDto: ModuleDto = {
        delayRetryTime: null,
        description: '',
        esbMode: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        moduleAuthMode: null,
        moduleBase: null,
        moduleGroup: null,
        moduleId: null,
        moduleTitle: '',
        moduleType: null,
        partyId: null,
        partyTitle: '',
        retryCount: null,
        status: null,
    };
    items;
    nestedItems;
    tempModule;
    widthTitle;
    first = 0;
    rows = 10;
    pageno = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag = false;
    totalRecords: number = 0;
    paginationLabel = this.transloco.translate('label.pagination.table');
    firstIndex: number = 0;
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private primeng: PrimeNG
    ) {}

 /*   nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }*/

    OnchangePageno(e) {
        debugger
        this.pageno = e.first / e.rows;
        this.pagesize = e.rows;
        if (e.rows !== this.pagesize) {
            this.firstIndex = 0;
            this.pageno = 0;
        } else {
            this.firstIndex = e.first;
            this.pageno = e.first / e.rows;
        }
        this.pagesize = e.rows;
        this.search();
    }
    setRecord(module) {
        debugger
        this.tempModule = module;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    chooseBread(caseBase: string) {
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
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    ngOnInit(): void {
        this.scrollTop();
        this.apiGatewayService.clearCashe();
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: 'سرویس های ماژول',
                        icon: '',
                        command: () => {
                            this.showApi(this.tempModule);
                        },
                    },
                    {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {
                            this.showEndpoint(this.tempModule);
                        },
                    },
                    {
                        label: 'کش های ماژول',
                        icon: '',
                        command: () => {
                            this.showCache(this.tempModule);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempModule);
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
        debugger
        this.partyDto = this.inputUpdate;
        debugger
        console.log('this.inputUpdate', this.inputUpdate);
        this.moduleList = [];
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .modulesearchbypartyid(this.pageno, this.pagesize, this.inputUpdate.partyId)
            .subscribe({
                next: (res: HttpResponse<any[]>) => {
                    this._primengProgressBarService.hide();

                    const body = res.body ?? [];
                    const list = Array.isArray(body) ? body : [body];
                    this.moduleList = list
                        .map((x, idx) => ({
                            ...x,
                            status: x.status === 1,
                            row: idx + 1,
                        }));
                    this.totalRecords = Number(res.headers.get('totalitems')) || 0;
                },
                error: () => {
                    this._primengProgressBarService.hide();
                }
            });
/*        this.messagesApiFacadeService.modulesearchbypartyid(this.pageno, this.pagesize, this.inputUpdate.partyId).subscribe(
                (responseAll: HttpResponse<any>) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(responseAll)) {
                        this.moduleList = responseAll;
                    } else {
                        this.moduleList.push(responseAll);
                    }
                    this.moduleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.moduleList.length; k++) {
                        this.moduleList[k] = Object.assign(this.moduleList[k], {
                            row: k + 1,
                        });
                        /!*(this.partyList[k].row = (k+1))*!/
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );*/
        this.title = this.inputUpdate.title;

        this.detailsBreadObject= this.chooseBread('partyBase')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);

    }

    showAdd() {
        this.addFlag = true;
    }

    showUpdate(module) {debugger
        this.updateModuleDto = {
            partyId: null,
            moduleTitle: '',
            moduleType: '',
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleBase: null,
            title: null,
            moduleId: null,
        };


        debugger
        this.updateModuleDto = module;
        this.updateModuleDto.partyBase=true
        this.updateModuleDto.moduleType = '' + this.updateModuleDto.moduleType + '';
        this.updateModuleDto.partyTitle = this.inputUpdate.title;
        this.updateFlag = true;
    }

    showEndpoint(module) {
        this.updateModuleDto = {
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
            moduleid: null,
            title: null,
            moduleBase: null,
            partyBase: null,
            moduleId: null,
        };
        this.updateModuleDto = module;
        this.updateModuleDto.moduleid = module.moduleId;
        this.updateModuleDto.title = this.title;
        this.updateModuleDto.moduleBase = false;
        this.updateModuleDto.partyBase = true;
        this.apiGatewayService.updateApprovalModuleId(module.moduleId);
        this.endpointFlag = true;
    }
    showCache(module) {
        debugger
        this.apiGatewayService.clearCashe();
        this.moduleDto = {
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
            moduleId: null,
            partyTitle: null,
            moduleBase: null,
            partyBase: null,
        };
        this.moduleDto = module;
        this.moduleDto.moduleId = module.moduleId;
        debugger
        this.moduleDto.moduleTitle = module.moduleTitle;
        this.moduleDto.partyTitle =  this.title ;
        this.moduleDto.moduleBase = false;
        this.moduleDto.partyBase = true;
        this.apiGatewayService.updateApprovalModuleId(module.moduleId);
        this.cacheFlag = true;
    }
    onClose(event: any) {
        this.scrollTop();
        this.detailsBreadObject= this.chooseBread('partyBase')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.endpointFlag = false;
            this.apiModuleFlag = false;
            this.cacheFlag  = false;
        }
        else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.endpointFlag = false;
            this.apiModuleFlag = false;
            this.cacheFlag  = false;
            this._primengProgressBarService.show();

            /*
            this.messagesApiFacadeService.modulesearchbypartyid(this.pageno, this.pagesize, this.inputUpdate.partyId).subscribe((responseAll) => {
                        this._primengProgressBarService.hide();
                        this.moduleList = [];
                        if (Array.isArray(responseAll)) {
                            this.moduleList = responseAll;
                        } else {
                            this.moduleList.push(responseAll);
                        }
                        this.moduleList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.moduleList.length; k++) {
                            this.moduleList[k] = Object.assign(
                                this.moduleList[k],
                                { row: k + 1 }
                            );
                            /!*(this.partyList[k].row = (k+1))*!/
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );*/
            this.messagesApiFacadeService
                .modulesearchbypartyid(this.pageno, this.pagesize, this.inputUpdate.partyId)
                .subscribe(
                    (responseAll: HttpResponse<any[]>) => {
                        this._primengProgressBarService.hide();

                        this.moduleList = [];
                        const body = responseAll.body ?? [];
                        const list = Array.isArray(body) ? body : [body];
                        this.moduleList = list
                            .map((x, idx) => ({
                                ...x,
                                status: x.status === 1,
                                row: idx + 1,
                            }));
                        this.totalRecords = Number(responseAll.headers.get('totalitems')) || 0;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }


    validationSearchByTitle(): boolean {
        if (!this.moduleTitle) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان ماژول را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.moduleTitle && this.moduleTitle.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان ماژول را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    search() {
        this.moduleList = [];
        if (!this.moduleTitle || this.moduleTitle == ' ') {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .modulesearchbypartyid(
                    this.pageno,
                    this.pagesize,
                    this.inputUpdate.partyId
                )
                .subscribe(
                    (responseAll: HttpResponse<any[]>) => {
                        this._primengProgressBarService.hide();

                        this.moduleList = [];
                        const body = responseAll.body ?? [];
                        const list = Array.isArray(body) ? body : [body];
                        this.moduleList = list
                            .map((x, idx) => ({
                                ...x,
                                status: x.status === 1,
                                row: idx + 1,
                            }));
                        this.totalRecords = Number(responseAll.headers.get('totalitems')) || 0;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .moduleSearchByTitle(this.moduleTitle)
                .subscribe(
                    (response) => {
                        this._primengProgressBarService.hide();
                        this.moduleList = [];
                        if (Array.isArray(response)) {
                            this.moduleList = response;
                        } else {
                            this.moduleList.push(response);
                        }
                        this.moduleList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    showApi(module) {
        this.ModuleDto = {
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
            moduleBase: null,
            partyTitle: null,
        };
        this.moduleDto = module;
        this.moduleDto.moduleBase = false;
        this.moduleDto.partyTitle = this.title;
        this.apiGatewayService.updateApprovalFoad(this.moduleDto);

        this.apiModuleFlag = true;
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
