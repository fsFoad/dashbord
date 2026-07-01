import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApisCacheComponent } from './apis-cache/apis-cache.component';
import { CashConfigComponent } from './cash-config/cash-config.component';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { CacheListComponent } from './cache-list/cache-list.component';
let CacheComponent = class CacheComponent {
    apiGatewayService;
    close = new EventEmitter();
    inputCachePartyBase;
    exitToModule = new EventEmitter();
    moduleDto = null;
    selectedApis = [];
    cacheConfig = {};
    cacheList;
    partyTitle;
    moduleTitle;
    title;
    detailsBreadObject;
    constructor(apiGatewayService) {
        this.apiGatewayService = apiGatewayService;
    }
    ngOnInit() {
        debugger;
        debugger;
        debugger;
        debugger;
        if (this.inputCachePartyBase != undefined) {
            debugger;
            this.moduleDto = this.inputCachePartyBase;
            this.inputCachePartyBase.moduleTitle ? this.moduleTitle = this.inputCachePartyBase.moduleTitle : this.moduleTitle = this.inputCachePartyBase.title;
            this.partyTitle = this.inputCachePartyBase.partyTitle;
            if (this.inputCachePartyBase.partyBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            else if (this.inputCachePartyBase.moduleBase) {
                debugger;
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
    }
    handleExit() {
        debugger;
        this.BeforeButton();
    }
    onApiSelected(apis) {
        this.selectedApis = apis;
    }
    onConfigChanged(config) {
        this.cacheConfig = config;
    }
    addToCache() {
        debugger;
        const combinedData = this.selectedApis.map(api => ({
            ...api,
            ...this.cacheConfig
        }));
        this.cacheList.push(...combinedData);
    }
    BeforeButton() {
        this.close.emit('close');
    }
    chooseBread(caseBase) {
        switch (caseBase) {
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
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ثبت کش ماژول',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/save.png',
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
                        label_index0: 'سرویس گیرندگان',
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
                        label_index3: 'ثبت کش ماژول',
                        rout_index3: '/api',
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/save.png',
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
};
__decorate([
    Output()
], CacheComponent.prototype, "close", void 0);
__decorate([
    Input()
], CacheComponent.prototype, "inputCachePartyBase", void 0);
__decorate([
    Output()
], CacheComponent.prototype, "exitToModule", void 0);
CacheComponent = __decorate([
    Component({
        selector: 'app-cache',
        imports: [
            ApisCacheComponent,
            CashConfigComponent,
            BreadcrumbsComponent,
            Toast,
            CacheListComponent,
        ],
        templateUrl: './cache.component.html',
        standalone: true,
        styleUrl: './cache.component.scss',
    })
], CacheComponent);
export { CacheComponent };
