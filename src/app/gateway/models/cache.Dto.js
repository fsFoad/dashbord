export class CacheDto {
    serialkey = null;
    expireYY;
    expireMM;
    expireDD;
    cacheType;
    apiId;
    status;
    apiType;
    postSearchFeildPath;
    moduleId;
    shamsiCacheStartDate;
    messageId4x;
    messageId5x;
    apiCacheEndpointDetailDomainList;
    constructor(data) {
        this.serialkey = null;
        this.expireYY = data.year;
        this.expireMM = data.month;
        this.expireDD = data.day;
        this.cacheType = data.cacheType;
        this.apiId = data.apiId;
        this.status = data.status ? 1 : 0;
        this.apiType = data.apiType == '1' ? 0 : (data.apiType == '2' ? 1 : null);
        this.postSearchFeildPath = data.path == "-" ? null : data.path;
        this.moduleId = data.moduleId;
        this.shamsiCacheStartDate = data.cacheStartDate ? Number(data.cacheStartDate) : null;
        this.messageId4x = data.messageId4x;
        this.messageId5x = data.messageId5x;
        this.apiCacheEndpointDetailDomainList =
            data.endpointDetailId !== null && data.endpointDetailId !== undefined
                ? [{ endpointDetailId: data.endpointDetailId, status: 1 }]
                : [];
    }
}
