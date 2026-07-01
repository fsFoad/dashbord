import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, shareReplay, Subject, tap } from 'rxjs';
let ApiGatewayService = class ApiGatewayService {
    api;
    data$ = new BehaviorSubject(null);
    inFlight$ = null;
    loading = false;
    approvalStageObjHub = new BehaviorSubject({
        hubId: null,
        dbEngineId: null,
        driverName: null,
        ip: null,
        portNumber: null,
        objectName: null,
        commandTypeId: null,
        userName: null,
        password: null,
        messageId4X: null,
        messageId5X: null,
        dbNam: null,
        isTestConnection: null,
        isTestQuery: null,
        autoCommit: null,
        canCommit: null,
        isFinal: null,
        dataHubStaticElementDomains: [],
        messageId2X: null
    });
    currentApprovalStageObjHub = this.approvalStageObjHub.asObservable();
    approvalStageApiIdSeq = new BehaviorSubject(0);
    currentApprovalStageApiIdSeq = this.approvalStageApiIdSeq.asObservable();
    approvalStageCode = new BehaviorSubject("");
    currentApprovalStageCode = this.approvalStageCode.asObservable();
    approvalStageEndpointIdHeader = new BehaviorSubject("");
    currentApprovalStageEndpointIdHeader = this.approvalStageEndpointIdHeader.asObservable();
    approvalStageEndpoint = new BehaviorSubject("");
    currentApprovalStageEndpoint = this.approvalStageEndpoint.asObservable();
    approvalStageParty = new BehaviorSubject("");
    currentApprovalStageParty = this.approvalStageParty.asObservable();
    approvalStageModuleId = new BehaviorSubject("");
    currentApprovalStageModuleId = this.approvalStageModuleId.asObservable();
    approvalStageModuleObject = new BehaviorSubject({});
    currentApprovalStageModuleObject = this.approvalStageModuleObject.asObservable();
    approvalStageApiId = new BehaviorSubject({});
    currentApprovalStageApiId = this.approvalStageApiId.asObservable();
    approvalStageApiName = new BehaviorSubject({});
    currentApprovalStageApiName = this.approvalStageApiName.asObservable();
    approvalStageRuleId = new BehaviorSubject({});
    currentApprovalStageRuleId = this.approvalStageRuleId.asObservable();
    approvalStageClientId = new BehaviorSubject('');
    currentApprovalStageClientId = this.approvalStageClientId.asObservable();
    approvalStageApiUrl = new BehaviorSubject({});
    currentApprovalStageApiUrl = this.approvalStageApiUrl.asObservable();
    approvalStageClientObject = new BehaviorSubject({
        clientId: null, name: "", apikey: "", mobileNo: "", baseClientFlag: null
    });
    currentApprovalStageClientObject = this.approvalStageClientObject.asObservable();
    approvalStageRequestlogid = new BehaviorSubject("");
    currentApprovalStageRequestlogid = this.approvalStageRequestlogid.asObservable();
    approvalStageAlert = new BehaviorSubject({});
    currentApprovalStageAlert = this.approvalStageAlert.asObservable();
    approvalStageObjLog = new BehaviorSubject({
        LOGGED_DATE: undefined,
        APIID: undefined,
        CLIENTID: undefined,
        REQUESTID: undefined,
    });
    currentApprovalStageObjLog = this.approvalStageObjLog.asObservable();
    /* private approvalStageDetailsBreadObject= new BehaviorSubject([]);
     currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();
 */
    approvalStageDetailsBreadObject = new BehaviorSubject([]);
    currentApprovalStageDetailsBreadObject = this.approvalStageDetailsBreadObject.asObservable();
    approvalStagemoduleBase = new BehaviorSubject([]);
    currentApprovalStagemoduleBase = this.approvalStagemoduleBase.asObservable();
    approvalStageFoad = new BehaviorSubject([]);
    currentApprovalStageFoad = this.approvalStageFoad.asObservable();
    approvalStageApiType = new BehaviorSubject(0);
    currentApprovalStageApiType = this.approvalStageApiType.asObservable();
    selectedApisSource = new BehaviorSubject([]);
    selectedApis$ = this.selectedApisSource.asObservable();
    cacheConfigSource = new BehaviorSubject(null);
    cacheConfig$ = this.cacheConfigSource.asObservable();
    CacheToCacheListSource = new Subject();
    CacheToCacheListSource$ = this.CacheToCacheListSource.asObservable();
    resetApisCache = new Subject();
    resetApisCache$ = this.resetApisCache.asObservable();
    fillForUpdate = new BehaviorSubject(null);
    cacheListToUpdateData$ = this.fillForUpdate.asObservable();
    fillForUpdateCacheConfig = new BehaviorSubject(null);
    fillForUpdateCacheConfig$ = this.fillForUpdateCacheConfig.asObservable();
    disableTableSubject = new BehaviorSubject(true); // ابتدا غیرفعال است
    disableTable$ = this.disableTableSubject.asObservable();
    selectionEmptySubject = new Subject();
    selectionEmpty$ = this.selectionEmptySubject.asObservable();
    changeActiveCalledSource = new Subject();
    changeActiveCalled$ = this.changeActiveCalledSource.asObservable();
    constructor(api) {
        this.api = api;
    }
    updateApprovalObjHub(hub) {
        this.approvalStageObjHub.next(hub);
    }
    updateApprovalEndpointIdHeader(code) {
        this.approvalStageEndpointIdHeader.next(code);
    }
    updateApprovalApiIdSeq(apiId) {
        this.approvalStageApiIdSeq.next(apiId);
    }
    updateApprovalEndpointIdClient(code) {
        this.approvalStageCode.next(code);
    }
    updateApprovalEndpoint(temp) {
        this.approvalStageEndpoint.next(temp);
    }
    updateApprovalParty(temp) {
        this.approvalStageParty.next(temp);
    }
    updateApprovalModuleId(temp) {
        this.approvalStageModuleId.next(temp);
    }
    updateApprovalModuleObject(temp) {
        this.approvalStageModuleObject.next(temp);
    }
    updateApprovalmoduleBase(temp) {
        this.approvalStagemoduleBase.next(temp);
    }
    updateApprovalApiId(temp) {
        this.approvalStageApiId.next(temp);
    }
    updateApprovalApiName(temp) {
        this.approvalStageApiName.next(temp);
    }
    updateApprovalApiUrl(temp) {
        this.approvalStageApiUrl.next(temp);
    }
    updateApprovalRuleId(temp) {
        this.approvalStageRuleId.next(temp);
    }
    updateApprovalClientId(temp) {
        this.approvalStageClientId.next(temp);
    }
    updateApprovalClientObject(temp) {
        this.approvalStageClientObject.next(temp);
    }
    updateApprovalRequestlogid(temp) {
        debugger;
        this.approvalStageRequestlogid.next(temp);
    }
    updateApprovalAlert(temp) {
        debugger;
        this.approvalStageAlert.next(temp);
    }
    updateApprovalObjLog(temp) {
        debugger;
        this.approvalStageObjLog.next(temp);
    }
    /*updateApprovalDetailsBreadObject(temp: any) {
        this.approvalStageDetailsBreadObject.next(temp)
    }*/
    updateApprovalDetailsBreadObject(data) {
        /*  const breadcrumbObjects = data.map((item: any) => new BreadcrumbService(item));  // تبدیل داده‌ها به شی Breadcrumb
          this.approvalStageDetailsBreadObject.next(breadcrumbObjects);  // ارسال داده‌ها به اشتراک
     */ if (data && Array.isArray(data)) {
            this.approvalStageDetailsBreadObject.next(data);
        }
        else {
            console.error('Received data is not valid:', data);
        }
    }
    updateApprovalFoad(temp) {
        this.approvalStageFoad.next(temp);
    }
    updateApprovalApiType(temp) {
        this.approvalStageApiType.next(temp);
    }
    updateSelectedApis(data) {
        this.selectedApisSource.next(data);
    }
    updateCacheConfig(config) {
        this.cacheConfigSource.next(config);
    }
    getSelectedApisSource() {
        return this.selectedApisSource.value;
    }
    getCacheConfigSource() {
        return this.cacheConfigSource.value;
    }
    sendCachToCachelist() {
        const payload = {
            SelectedApisSource: this.getSelectedApisSource(),
            CacheConfig: this.getCacheConfigSource()
        };
        console.log("🚀 payload sent to CacheToCacheListSource:", {
            SelectedApisSource: this.getSelectedApisSource(),
            CacheConfig: this.getCacheConfigSource()
        });
        this.CacheToCacheListSource.next(payload);
    }
    resetApisCacheTriggerReset() {
        this.resetApisCache.next();
    }
    sendCacheToUpdateApiData(data) {
        debugger;
        this.fillForUpdate.next(data);
    }
    sendCacheToUpdateConfigData(data) {
        debugger;
        this.fillForUpdateCacheConfig.next(data);
    }
    setDisableTable(value) {
        this.disableTableSubject.next(value);
    }
    sendSelectionEmptyStatus(isEmpty) {
        this.selectionEmptySubject.next(isEmpty);
    }
    sendChangeActive(cache) {
        this.changeActiveCalledSource.next(cache);
    }
    clearCashe() {
        debugger;
        this.cacheConfigSource.next(null);
        this.selectedApisSource.next(null); // پاک کردن داده‌ها
        this.CacheToCacheListSource.next(null);
        this.resetApisCache.next(null);
        this.fillForUpdate.next(null);
        this.disableTableSubject.next(false);
        this.selectionEmptySubject.next(null);
        this.fillForUpdateCacheConfig.next(null);
    }
    validatorFnSubject = new BehaviorSubject(() => true);
    setValidatorFn(fn) {
        this.validatorFnSubject.next(fn);
    }
    getValidatorFn() {
        return this.validatorFnSubject.getValue();
    }
    getDataStatistictoday() {
        if (!this.inFlight$) {
            console.log("🚀 API call started");
            this.inFlight$ = this.api.getstatistictoday().pipe(tap(res => console.log("✅ API response len:", res?.length)), shareReplay({ bufferSize: 1, refCount: true }), finalize(() => {
                console.log("🧹 API call finished → reset inFlight");
                this.inFlight$ = null;
            }));
        }
        else {
            console.log("⏳ API call already in progress → sharing");
        }
        return this.inFlight$;
    }
};
ApiGatewayService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiGatewayService);
export { ApiGatewayService };
