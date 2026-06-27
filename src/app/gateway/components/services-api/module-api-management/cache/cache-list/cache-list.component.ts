import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MorChar32Pipe } from '../../../../../../shared/pipes/morChar32.pipe';
import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { TableModule } from 'primeng/table';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Tooltip } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { HttpMethodsPipe } from '../../../../../../shared/pipes/http-methods.pipe';
import { CacheTypePipe } from '../../../../../../shared/pipes/cache-type.pipe';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { EndpointheaderDto } from '../../../../../models/endpointheader.Dto';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import {
    HeaderEndpointRegisterComponent,
} from '../../../endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { CacheDto } from '../../../../../models/cache.Dto';
import { CastToDateTimePipe } from '../../../../../../shared/pipes/cast-to-date-time.pipe';

@Component({
    selector: 'app-cache-list',
    imports: [
        NgIf,
        ButtonDirective,
        Menu,
        MorChar32Pipe,
        PrimeTemplate,
        Ripple,
        StatusPipe,
        TableModule,
        TranslocoPipe,
        Tooltip,
        NgClass,
        HttpMethodsPipe,
        CacheTypePipe,
        DropdownModule,
        InputText,
        FormsModule,
        Dialog,
        HeaderEndpointRegisterComponent,
        NgStyle,
        CastToDateTimePipe,
    ],
    templateUrl: './cache-list.component.html',
    standalone: true,
    styleUrl: './cache-list.component.scss',
})
export class CacheListComponent implements OnInit, AfterViewInit {
    @Input() inputApiCache: any;
    @Output() exit = new EventEmitter<void>();

    registerEndpointHeaderDto!: any;

    constructor(
        private transloco: TranslocoService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService,
        private cd: ChangeDetectorRef,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService) {

    }

    partyTitle: any;
    moduleTitle: any;
    elementsFlag: boolean = false;
    endpointOptionsMap: { [apiId: string]: any[] } = {};
    loadingApiIds: Set<string> = new Set();
    private destroy$ = new Subject<void>();
    moduleId: number;
    tempCache: any;
    apiIdForAddElement: any;
    totalRecords: any;
    first: number = 0;
    rows: number = 5;
    savedEndpoints: any = null;
    cacheList: any[] = [];
    acIdList: any[] = [];
    elementsOptions: any[] = ['a', 'b'];
    items: any[] = [
        {
            items: [
                {
                    label: this.transloco.translate('فعالسازی'),
                    icon: '',
                    command: (): void => {
                        this.active(this.tempCache);
                    },
                },
                {
                    label: this.transloco.translate('غیرفعالسازی'),
                    command: (): void => {
                        this.deActive(this.tempCache);
                    },
                },
                {
                    label: this.transloco.translate('حذف'),
                    command: (): void => {
                        this.delete(this.tempCache);
                    },
                },
                {
                    label: this.transloco.translate('ویرایش'),
                    command: (): void => {
                        this.fillForUpdate(this.tempCache);
                    },
                },
                {
                    label: this.transloco.translate('افزودن المان'),
                    command: (): void => {
                        this.addElements(this.tempCache);
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
    paginationLabel = null;

    debugLog(cache: any, type: string): void {
        console.log(`🔍 ${type} activated for row:`, cache);
        console.log('endpointOptionsMap:', this.endpointOptionsMap);
    }

    getEndpointLabel(apiId: string, endpointDetailId: any): string {
        const list = this.endpointOptionsMap[apiId];
        if (!list) return '---';
        const found = list.find(opt => opt.endpointDetailId == endpointDetailId);
        return found ? found.inputName : '---';
    }

    /*  loadEndpointOptionsFor(apiId: string,state?): void {
          debugger
          this.apiIdForAddElement=apiId
          if (this.endpointOptionsMap[apiId]&&state!='closeAndCreate') return; // فقط اگر لود نشده

          this.messagesApiFacadeService.endpointdetailByApi(this.apiIdForAddElement?Number(this.apiIdForAddElement):null).subscribe((res) => {
              this._primengProgressBarService.hide();
              let tempDetailList;
              if (Array.isArray(res)) {
                  this.endpointOptionsMap[apiId] = res;
              } else {
                  this.endpointOptionsMap[apiId] = [res];
              }
          }, (error) => {
              console.error('خطا در دریافت endpoint:', error);
              this._primengProgressBarService.hide();
          } , () => {
              this.loadingApiIds.delete(apiId);
          });
      }*/
    loadEndpointOptionsFor(apiId: string, forceReload = false, endpointDetailId?: any): void {
        this.apiIdForAddElement = apiId;
        if (this.endpointOptionsMap[apiId] && !forceReload) return; // فقط اگر لود نشده یا نیاز به رفرش نیست

        this.messagesApiFacadeService.endpointdetailByApi(Number(apiId),0,1000).subscribe((res) => {
            this._primengProgressBarService.hide();
            const filtered = (Array.isArray(res) ? res : [res]).filter(item =>
                item?.detailType === 3 && item?.actionType === 3,
            );
            this.endpointOptionsMap[apiId] = filtered;
            // this.endpointOptionsMap[apiId] = Array.isArray(res) ? res : [res];
            if (endpointDetailId) {
                const cacheRow = this.cacheList.find(x => x.apiId == apiId);
                if (cacheRow) {
                    cacheRow.endpointDetailId = endpointDetailId;
                }
            }
        }, (error) => {
            console.error('خطا در دریافت endpoint:', error);
            this._primengProgressBarService.hide();
        });
    }

    setRecord(cache): void {
        this.tempCache = cache;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.paginationLabel = this.transloco.translate('label.pagination.table');
        });
    }

    formatDurationArray(data: Array<{
        year?: number,
        month?: number,
        day?: number,
        hour?: number,
        minute?: number
    }>): string {
        const LRM = '\u200E';

        return data.map(item => {
            const parts: string[] = [];

            if (item.year) parts.push(`${LRM}${item.year}Y`);
            if (item.month) parts.push(`${LRM}${item.month}M`);
            if (item.day) parts.push(`${LRM}${item.day}D`);
            if (item.hour) parts.push(`${LRM}${item.hour}h`);
            if (item.minute) parts.push(`${LRM}${item.minute}m`);

            return parts.join(' ');
        }).join('\n');
    }

    ngOnInit() {

        debugger
        if (this.inputApiCache != undefined) {
            this.moduleId = this.inputApiCache?.moduleId;
            console.log('moduleId', this.moduleId);
            this.inputApiCache.moduleTitle ? this.moduleTitle = this.inputApiCache.moduleTitle : this.moduleTitle = this.inputApiCache.title;
            this.partyTitle = this.inputApiCache.partyTitle;
        }
        this.apiGatewayService.CacheToCacheListSource$.pipe(takeUntil(this.destroy$)).subscribe(val => {
            console.log(this.cacheList);
            debugger
            console.log('📥 data received in CacheListComponent', val);
            debugger
            debugger
            console.log('this.cacheList1', this.cacheList);
            val.SelectedApisSource = val.SelectedApisSource.map(api => ({
                ...api,
                ...val.CacheConfig,
            }));
            debugger
            delete val.CacheConfig;
            debugger
            val.SelectedApisSource = val.SelectedApisSource.map(({ ...rest }) => {
                debugger
                if (rest.apiType === 1) {
                    rest.querystring = '-';
                } else if (rest.apiType === 2) {
                    rest.path = '-';
                }
                return {
                    ...rest,
                };
            });
            console.log('this.cacheList2', this.cacheList);
            debugger
            console.log('bingooo Update', val);
            debugger
            debugger
            debugger
            debugger

            if (val?.SelectedApisSource != undefined && val?.SelectedApisSource != null) {
                if (val?.SelectedApisSource[0]?.flagUpdate) {
                    debugger
                    console.log('✅ flagUpdate detected → updating')
                    val.SelectedApisSource.forEach(newApi => {
                        debugger

                        // const item = this.cacheList.find(obj => obj.apiId === val?.SelectedApisSource[0].apiId);
                        const item = this.cacheList.some(item => (item.apiId === newApi.apiId && item.savedFlag!=true));
                        if (item) {
                            debugger
                            const formattedApi = {
                                expiryDate: this.formatDurationArray([newApi]),
                                savedFlag: false,
                            };

                            // جستجوی ایندکس مورد نظر بر اساس apiId
                            const index = this.cacheList.findIndex(item => (item.apiId === newApi.apiId && item.savedFlag!=true));
                            const existingItem = this.cacheList[index];
                            if (index !== -1) {
                                debugger
                                // چک کردن این که آیا یکی از فیلدهای موجود تغییر کرده یا نه
                                const isChanged = Object.keys(newApi).some(key => newApi[key] !== existingItem[key]);

                                // اگر آیتم پیدا شد، آن را بروزرسانی می‌کنیم
                                this.cacheList[index] = { ...this.cacheList[index], ...formattedApi };

                                if (isChanged) {
                                    this.cacheList[index] = {
                                        ...existingItem,
                                        ...newApi, // تمام فیلدها را آپدیت می‌کنیم
                                        ...formattedApi, // تمام فیلدها را آپدیت می‌کنیم
                                    };
                                }
                            } else {
                                debugger
                                // در غیر این صورت، به لیست اضافه می‌کنیم
                                const isDuplicate = this.cacheList.some(item => item.apiId === newApi.apiId);

                                if (!isDuplicate) {
                                    this.cacheList.push({
                                        ...newApi,
                                        ...formattedApi,
                                        ...{ savedFlag: false },
                                    });
                                } else {
                                    console.warn(`⚠️ داده با apiId=${newApi.apiId} قبلاً در لیست موجود است.`);

                                }

                            }
                        }
                        debugger
                        this.cd.detectChanges();
                    });
                }
                else {
                    debugger
                    console.log('🟡 flagUpdate = false → insert mode');

                    val.SelectedApisSource.forEach(newApi => {
                        debugger
                        if (newApi?.savedFlag != true) {
                            debugger
                            const isDuplicateId = this.cacheList.some(item => {
                                debugger
                                if (item.apiId === newApi.apiId) {
                                    debugger
                                    if (item?.savedFlag != true && item?.status) {
                                        debugger
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }

                            });
                            console.log('bingooo Update isDuplicateId', isDuplicateId);
                            if (isDuplicateId) {
                                this.notifierService.showError({
                                    detail: ' سرویس ' + newApi.apiTitle + 'در جدول کش وجود دارد!لطفا آن را  ثبت نهایی و یا حذف بفرمائید! ',
                                    life: 3000,
                                });
                                console.error(`⚠️ خطا: API با عنوان "${newApi.apiTitle}" و apiId ${newApi.apiId} قبلاً اضافه شده است.`);
                                return;
                            }
                        }
                        // اگر apiId تکراری بود، پیام خطا بده و جلو اضافه شدن بگیر


                        debugger
                        const formattedApi = {
                            ...newApi,
                            expiryDate: this.formatDurationArray([newApi]),
                            status: null,
                        };
                        debugger
                        debugger
                        debugger
                        debugger
                        console.log('this.cacheList3', this.cacheList);
                        this.cacheList.push(formattedApi);
                        console.log('this.cacheList4', this.cacheList);
                        debugger
                        debugger
                        debugger
                    });
                    console.log('this.cacheList5', this.cacheList);
                    debugger
                    console.log('cacheList UPDATED:', this.cacheList);

                    if (this.inputApiCache != undefined) {
                        this.moduleId = this.inputApiCache?.moduleId;
                        console.log('moduleId', this.moduleId);
                    }

                    const formatted = this.formatDurationArray(this.cacheList);
                    console.log(formatted);
                    for (let i = 0; i < this.cacheList.length; i++) {
                        this.cacheList[i] = { ...this.cacheList[i], row: i + 1 };
                    }
                }
            }

        });


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
                let requestBody;
                console.log('active', x);
                requestBody = Array.isArray(x) ? x : [x];
                requestBody = requestBody.map(item => ({ acId: item.apiCacheId }));
                this.messagesApiFacadeService.fetchApicacheList(requestBody).subscribe(res => {
                    debugger
                    console.log('res', res);
                    this.refreshDataAndPreserveUnsavedItems(res);
                    const endpointOptionsMap = {};
                    this.cacheList.forEach(item => {
                        if (!item.endpointDetailId || !item.inputName) return;
                        if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                        endpointOptionsMap[item.apiId].push({
                            endpointDetailId: item.endpointDetailId,
                            inputName: item.inputName,
                        });
                    });
                    this.endpointOptionsMap = endpointOptionsMap;
                    console.log('this.cacheList', this.cacheList);
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
                debugger
                console.log('deActive', x);
                let requestBody;
                console.log('active', x);
                requestBody = Array.isArray(x) ? x : [x];
                requestBody = requestBody.map(item => ({ acId: item.apiCacheId }));

                this.messagesApiFacadeService.fetchApicacheList(requestBody).subscribe(res => {
                    console.log('res', res);
                    this.refreshDataAndPreserveUnsavedItems(res);
                    const endpointOptionsMap = {};
                    this.cacheList.forEach(item => {
                        if (!item.endpointDetailId || !item.inputName) return;
                        if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                        endpointOptionsMap[item.apiId].push({
                            endpointDetailId: item.endpointDetailId,
                            inputName: item.inputName,
                        });
                    });
                    this.endpointOptionsMap = endpointOptionsMap;
                    console.log('this.cacheList', this.cacheList);
                });
            });
        }
    }

    delete(cache) {
        console.log('cache',cache);
        console.log('cacheList',this.cacheList);
        if (!cache.savedFlag) {
            this.cacheList = this.cacheList.filter(c => c.row !== cache.row);
            for (let i = 0; i < this.cacheList.length; i++) {
                this.cacheList[i] = { ...this.cacheList[i], row: i + 1 };
            }
        } else {
            this.notifierService.showError({
                detail: 'امکان حذف موارد ثبت شده وجود ندارد!',
                life: 3000,
            });
        }
    }

    chachedSaveData(cache) {
        cache;
    }

    fillForUpdate(cache) {
        debugger
        if (!cache.savedFlag) {
            cache.flagUpdate = true;
            console.log('fillForUpdate', cache);
            this.apiGatewayService.sendCacheToUpdateApiData(cache);
            this.apiGatewayService.sendCacheToUpdateConfigData(cache);
        } else {
            this.notifierService.showError({
                detail: 'امکان ویرایش موارد ثبت شده وجود ندارد!',
                life: 3000,
            });
        }
    }

    chooseBread(caseBase: any) {
        switch (caseBase) {
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
                        label_index2: 'کش ماژول',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
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
                        rout_index2: '/module',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کش ماژول',
                        rout_index3: '/api',
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            default:
                return null;
        }
    }

    addElements(cache) {
        if (!cache.savedFlag) {
            if (!this.registerEndpointHeaderDto) {
                this.registerEndpointHeaderDto = {};

            }
            this.registerEndpointHeaderDto.chacheFlag = true;
            this.registerEndpointHeaderDto.inputApiCache = this.inputApiCache;
            this.registerEndpointHeaderDto.cacheObj = cache;
            this.elementsFlag = true;
        } else {
            this.notifierService.showError({
                detail: 'امکان افزودن المان برای موارد ثبت شده وجود ندارد!',
                life: 3000,
            });
        }
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
            path: item.postSearchFeildPath ?? '---',
            expiryDate: (
                (item.expireYY ? `${item.expireYY}Y ` : '') +
                (item.expireMM ? `${item.expireMM}M ` : '') +
                (item.expireDD ? `${item.expireDD}D` : '')
            ).trim() || null,
            savedFlag: true,
        }));
    }

    saveCache() {
        if (this.validationCache()) {
            debugger
            const unsavedCache = this.getUnsavedCacheList(this.cacheList);
            const mapped = this.mapCache(unsavedCache);
            console.log(mapped);
            mapped.forEach(x => {
                x.status = 1;
            });
            this.messagesApiFacadeService.apicacheRegister(this.moduleId, mapped).subscribe(res => {
                let requestBody;
                requestBody = Array.isArray(res) ? res : [res];
                requestBody = requestBody.map(item => ({ acId: item.apiCacheId }));
                this.messagesApiFacadeService.fetchApicacheList(requestBody).subscribe(res2 => {
                    console.log('res', res2);
                    this.refreshDataAndPreserveSavedItems(res2, this.cacheList);
                    const endpointOptionsMap = {};
                    this.cacheList.forEach(item => {
                        if (!item.endpointDetailId || !item.inputName) return;
                        if (!endpointOptionsMap[item.apiId]) endpointOptionsMap[item.apiId] = [];
                        endpointOptionsMap[item.apiId].push({
                            endpointDetailId: item.endpointDetailId,
                            inputName: item.inputName,
                        });

                    });
                    this.endpointOptionsMap = endpointOptionsMap;
                    console.log('this.cacheList', this.cacheList);

                    for (let k = 0; k < this.cacheList.length; k++) {
                        this.cacheList[k] = Object.assign(
                            this.cacheList[k],
                            { row: k + 1 },
                        );
                    }
                    this.notifierService.showSuccess({
                        detail: 'اطلاعات کش با موفقیت ثبت گردید!',
                        life: 3000,
                    });
                });

            }, error => {
            });
        }
    }

    getUnsavedCacheList(cacheList: any[]): any[] {
        return cacheList.filter(item => item?.savedFlag !== true);
    }

    validationCache(): boolean {
        debugger
        let counterEndpointDetailId = 0;
        let counterPath = 0;
        let filterNotSave = [];
        filterNotSave = this.cacheList.filter(item => {
            return item?.savedFlag != true;

        });
        for (let i = 0; i < this.cacheList.length; i++) {
            debugger
            if (!this.cacheList[i]?.endpointDetailId && this.cacheList[i]?.apiType == 2 && this.cacheList[i]?.savedFlag != true) {
                counterEndpointDetailId++;
            }
            if (!this.cacheList[i]?.path && this.cacheList[i]?.apiType == 1) {
                debugger
                counterPath++;

            }
            if (this.cacheList[i]?.apiType == 1 && this.cacheList[i]?.savedFlag != true) {
                debugger
                let path = this.cacheList[i]?.path;
                const isValid = path?.startsWith('/') && !path?.endsWith('/');

                if (isValid) {
                    debugger
                    console.log('✅ رشته معتبر است');
                } else {
                    debugger
                    path = (path || '').trim();

                    if (!path.startsWith('/')) {
                        path = '/' + path;
                    }

                    if (path.endsWith('/')) {
                        path = path.slice(0, -1);
                    }
                    /* path = path.trim();
                     if (!path.startsWith('/')) {
                         path = '/' + path;
                     }
                     if (path.endsWith('/')) {
                         path = path.slice(0, -1);
                     }*/
                }

                console.log(path, 'معتبر شده');
                debugger
                this.cacheList[i].path = path;
            }
        }


        debugger
        debugger
        if (filterNotSave.length == 0) {
            this.notifierService.showError({
                detail: 'دیتایی برای ثبت اطلاعات کش ماژول وجود ندارد!',
                life: 3000,
            });
            return false;
        } else if (counterEndpointDetailId > 0) {
            this.notifierService.showError({
                detail: 'لطفا همه Querystring را برای سرویس های منتخب تعیین نمائید!',
                life: 3000,
            });
            return false;
        } else if (counterPath > 0) {
            this.notifierService.showError({
                detail: 'لطفا همه مسیر های نود را برای سرویس های منتخب تعیین نمائید!',
                life: 3000,
            });
            return false;
        } else if (counterPath > 0) {
            this.notifierService.showError({
                detail: 'لطفا همه مسیر های نود را برای سرویس های منتخب تعیین نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    closeElementCache(event: { type: string; apiId: any, endpointDetailId: any, visible?: boolean }) {
        debugger
        this.elementsFlag = false;
        if (event.type === 'closeAndCreate') {
            debugger
            this.loadEndpointOptionsFor(event.apiId, true, event.endpointDetailId);
            const cacheRow = this.cacheList.find(x => x.apiId == event.apiId);
            if (cacheRow && event.endpointDetailId) {
                debugger
                cacheRow.endpointDetailId = event.endpointDetailId;
            }
        }
        if (event.type == 'close') {
            if (event?.visible) {
                this.elementsFlag = false;

            }
        }

    }

    mapCache(inputArray: any[]): CacheDto[] {
        return inputArray.map(item => new CacheDto(item));
    }

    onExit(e) {
        debugger
        this.exit.emit();
    }

    refreshDataAndPreserveSavedItems(serverData, saved?: any): void {
        debugger
        const savedItems = saved.filter(item => item.savedFlag);
        let normalServerData = this.mapSavedData(serverData);
        const mergedData = [...normalServerData];
        savedItems.forEach(u => {
            mergedData.push(u);

        });
        this.cacheList = mergedData;
    }

    refreshDataAndPreserveUnsavedItems(serverData, unsaved?: any): void {
        debugger
      /*  const mappedServerData = this.mapSavedData(serverData);

        const serverMap = new Map(mappedServerData.map(item => [item.apiId, item]));

        const newCacheList = this.cacheList.map(localItem => {
            if (serverMap.has(localItem.apiId)) {
                return serverMap.get(localItem.apiId)!;
            } else {
                return localItem;
            }
        });

        const localApiIds = new Set(this.cacheList.map(i => i.apiId));
        const newItemsFromServer = mappedServerData.filter(item => !localApiIds.has(item.apiId));

        this.cacheList = [...newCacheList, ...newItemsFromServer];
        for (let i = 0; i < this.cacheList.length; i++) {
            this.cacheList[i] = { ...this.cacheList[i], row: i + 1 };
        }*/
        const mappedServerData = this.mapSavedData(serverData);

        const serverMap = new Map(mappedServerData.map(item => [item.apiId, item]));

        const newCacheList = this.cacheList.map(localItem => {
            debugger
            const serverItem = serverMap.get(localItem.apiId);

            if (serverItem) {
                debugger
                if (localItem.apicacheid != null && serverItem.apicacheid != null) {
                    debugger
                    if (localItem.apicacheid === serverItem.apicacheid) {
                        debugger
                        return serverItem;
                    } else {
                        debugger
                        return localItem;
                    }
                }
                else if (localItem.apicacheid == null) {
                    return serverItem;
                }
            }

            return localItem;
        });
        const localApiIds = new Set(this.cacheList.map(i => i.apiId));
        const newItemsFromServer = mappedServerData.filter(item => !localApiIds.has(item.apiId));
        this.cacheList = [...newCacheList, ...newItemsFromServer];
        for (let i = 0; i < this.cacheList.length; i++) {
            this.cacheList[i] = { ...this.cacheList[i], row: i + 1 };
        }
    }

}
