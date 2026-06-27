import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { ConfirmationService, PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { PrimeNG } from 'primeng/config';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { HttpMethodsPipe } from '../../../../../../shared/pipes/http-methods.pipe';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { CastToDateTimePipe } from '../../../../../../shared/pipes/cast-to-date-time.pipe';
import { CacheTypePipe } from '../../../../../../shared/pipes/cache-type.pipe';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-cache-api',
    imports: [
        BreadcrumbsComponent,
        PrimeTemplate,
        TableModule,
        Toast,
        TranslocoPipe,
        NgStyle,
        NgClass,
        HttpMethodsPipe,
        NgIf,
        StatusPipe,
        CastToDateTimePipe,
        CacheTypePipe,
        Tooltip,
        Menu,
        ButtonDirective,
        Ripple,
    ],
    providers: [ConfirmationService],
    templateUrl: './cache-api.component.html',
    standalone: true,
    styleUrl: './cache-api.component.scss',
})
export class CacheApiComponent implements OnInit{
    @Input() inputCacheApi;
    @Output() close = new EventEmitter<string>();

    detailsBreadObject:any[]=[]
    apiCacheList:any[]=[]
    items: any[] = [
        {
            items: [
                {
                    label: this.transloco.translate('فعالسازی'),
                    icon: '',
                    command: (): void => {
                        this.active(this.tempApiCache);
                    },
                },
                {
                    label: this.transloco.translate('غیرفعالسازی'),
                    command: (): void => {
                        this.deActive(this.tempApiCache);
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
    tempApiCache:any=null
    paginationLabel=this.transloco.translate('label.pagination.table');
    rows
    first
    moduleId:number=null
    apiId:number=null
    endpointOptionsMap: Record<string, any[]> = {};
    clientBase
    moduleBase
    accessBase
    partyBase
    type
    name
    clientName=''
    moduleTitle=''
    partyTitle=''
    title=''
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private cd: ChangeDetectorRef,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
        private confirmationService: ConfirmationService,
        private notifierService: ToastService
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
                        label_index3: 'کش سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/hub.png',
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
                        label_index3: 'کش سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/hub.png',
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
                        label_index2: 'کش سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/hub.png',
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
                        label_index4: 'کش سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/hub.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    refreshDataAndPreserveUnsavedItems(serverData): void {
        // ۱. فیلتر آیتم‌های ثبت‌نشده
        debugger
        const unsavedItems = this.apiCacheList.filter(item => !item.savedFlag);
        const normalServerData=this.mapSavedData(serverData);
        // ۲. فراخوانی سرویس برای گرفتن داده‌های جدید
        // this.cacheList.getData().subscribe((serverData: MyData[]) => {
        // ۳. جلوگیری از ورود آیتم‌های تکراری (مثلاً با name یا ویژگی دلخواه)
        const mergedData= [...normalServerData];

        /*     unsavedItems.forEach(localItem => {
                 const isDuplicate = serverData.some(serverItem => serverItem.name === localItem.name);
                 if (!isDuplicate) {
                     mergedData.push(localItem);
                 }
             });*/
        unsavedItems.forEach(u => {
            // const hasSameId = u.apiId && mergedData.some(n => n.apiId === u.apiId&&(n.status!=true));
            // اگر آیتم ذخیره‌نشده شناسه‌ی یکسان با هیچ آیتم جدید ندارد، اضافه می‌شود
            // if (!hasSameId) {
            mergedData.push(u);
            // }
        });
        debugger
        // ۴. آپدیت لیست نهایی
        this.apiCacheList =mergedData
        // });
    }

    active(cache) {
        debugger
        if (!cache.savedFlag) {
            /* debugger
             const target = this.cacheList.find(x => x.apiId === cache.apiId);
             if (target) {
                 target.status = true;
             }*/
            this.notifierService.showError({
                detail: 'امکان فعالسازی موارد ثبت نشده وجود ندارد!',
                life: 3000,
            });
        } else {
            debugger
            this.messagesApiFacadeService.apicacheStatus(cache?.apicacheid, 1).subscribe(x => {
                debugger
                console.log('active', x);
                this.messagesApiFacadeService.getApiCachebyMAId(this.moduleId,this.apiId).subscribe(res => {
                    debugger
                    console.log('res', res);
                    this.refreshDataAndPreserveUnsavedItems(res)
                    const endpointOptionsMap = {};
                    this.apiCacheList.forEach(item => {
                        if (!item.endpointDetailId || !item.inputName) return;
                        if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                        endpointOptionsMap[item.apiId].push({
                            endpointDetailId: item.endpointDetailId,
                            inputName: item.inputName,
                        });
                    });
                    this.endpointOptionsMap = endpointOptionsMap;
                    console.log('this.cacheList', this.apiCacheList);
                });
            });
        }
    }

    deActive(cache) {
        debugger
        if (!cache.savedFlag) {
            /*  const target = this.cacheList.find(x => x.apiId === cache.apiId);
              if (target) {
                  target.status = false;
              }*/
            this.notifierService.showError({
                detail: 'امکان غیرفعالسازی موارد ثبت نشده وجود ندارد!',
                life: 3000,
            });
        } else {
            debugger
            this.messagesApiFacadeService.apicacheStatus(cache?.apicacheid, 0).subscribe(x => {
                console.log('deActive', x);
                this.messagesApiFacadeService.getApiCachebyMAId(this.moduleId,this.apiId).subscribe(res => {
                    console.log('res', res);
                    this.refreshDataAndPreserveUnsavedItems(res)
                    const endpointOptionsMap = {};
                    this.apiCacheList.forEach(item => {
                        if (!item.endpointDetailId || !item.inputName) return;
                        if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                        endpointOptionsMap[item.apiId].push({
                            endpointDetailId: item.endpointDetailId,
                            inputName: item.inputName,
                        });
                    });
                    this.endpointOptionsMap = endpointOptionsMap;
                    console.log('this.cacheList', this.apiCacheList);
                });
            });
        }
    }


    BeforeButton() {
        this.close.emit('close');
    }

    setRecord(apiCache) {
        this.tempApiCache = apiCache
    }
    trackByFn(index: number, item: any): any {
        return item.apicacheid; // یا هر شناسه منحصر به فرد دیگر
    }
    ngOnInit(): void {
        debugger
        debugger
        debugger
        debugger
        debugger


        console.log('inputCacheApi',this.inputCacheApi)
        if (this.inputCacheApi!=undefined) {
            this.moduleId=this.inputCacheApi.moduleId
            this.apiId=this.inputCacheApi.apiId
            this.name = this.inputCacheApi.name;
            this.title = this.inputCacheApi.title;
            this.moduleTitle = this.inputCacheApi.moduleTitle;
            this.partyTitle = this.inputCacheApi.partyTitle;
            this.clientName = this.inputCacheApi.clientName;
            this.clientBase = this.inputCacheApi.clientBase;
            this.moduleBase = this.inputCacheApi.moduleBase;
            this.accessBase = this.inputCacheApi.accessBase;
            this.partyBase = this.inputCacheApi.partyBase;
            this.type = this.inputCacheApi.type;
        }
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
        this.messagesApiFacadeService.getApiCachebyMAId(this.moduleId,this.apiId).subscribe(res=>{
            const normalizedRes = Array.isArray(res) ? res : [res]; // تضمین آرایه بودن
            this.apiCacheList=normalizedRes
            console.log('res', normalizedRes);
            this.apiCacheList=this.mapSavedData(normalizedRes)
            const endpointOptionsMap = {};
            this.apiCacheList.forEach(item => {
                if (!item.endpointDetailId || !item.inputName) return;
                if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                endpointOptionsMap[item.apiId].push({
                    endpointDetailId: item.endpointDetailId,
                    inputName: item.inputName,
                });
            });
            this.endpointOptionsMap = endpointOptionsMap;
            console.log('apiCacheList',this.apiCacheList);
        })

    }
    getEndpointLabel(apiId: string, endpointDetailId: any): string {
        const list = this.endpointOptionsMap[apiId];
        if (!list) return '---';
        const found = list.find(opt => opt.endpointDetailId == endpointDetailId);
        return found ? found.inputName : '---';
    }
    mapSavedData(input: any[]): any[] {
        return input.map((item, idx) => ({
            apiId: item.apiId,
            moduleId: item.moduleId,
            apiName: item.apiName,
            apiTitle: item.apiTitle,
            partyName: item.partyTitle,
            moduleName: item.moduleTitle,
            apiType: item.apiType == 0 ? '1' : (item.apiType == 1 ? '2' : null),
            status: !!item.status,
            row: idx + 1,
            year: item.expireYY ?? null,
            month: item.expireMM ?? null,
            day: item.expireDD ?? null,
            hour: null,
            minute: null,
            apicacheid: item.apiCacheId,
            cacheType: item.cacheType,
            endpointDetailId: (
                item.apiCacheEndpointDetailDomainList &&
                item.apiCacheEndpointDetailDomainList.length > 0
            ) ? item.apiCacheEndpointDetailDomainList[0].endpointDetailId : (item.endpointDetailId ?? null),
            inputName: (
                item.apiCacheEndpointDetailDomainList &&
                item.apiCacheEndpointDetailDomainList.length > 0
            ) ? item.apiCacheEndpointDetailDomainList[0].endpointDetailInputName : (item.endpointDetailInputName ?? null),
            messageId4x: item.messageId4x ?? null,
            messageId5x: item.messageId5x ?? null,
            cacheStartDate: item.shamsiCacheStartDate ?? item.cacheStartDate ?? null,
            shamsiCacheExpireDate: item.shamsiCacheExpireDate ?? item.shamsiCacheExpireDate ?? null,
            path: item.postSearchFeildPath ?? '---',
            expiryDate: (
                (item.expireYY ? `${item.expireYY}Y ` : '') +
                (item.expireMM ? `${item.expireMM}M ` : '') +
                (item.expireDD ? `${item.expireDD}D` : '')
            ).trim() || null,
            savedFlag: true,
        }));
    }

}
