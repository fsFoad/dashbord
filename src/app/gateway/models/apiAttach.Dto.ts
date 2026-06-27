export class ApiAttachDto {
    apiId?: number
    callDuration?:number
    cashing_expire?: string
    cashing_status?:number
    cookeSendStatus?: number
    dailyCount?:number
    delayRetryCount?: number
    description: string
    feeFieldPath?: string
    hasBody?:number
    hasEncodingUrl?: number
    hasSequence?:number
    hasStaticBody?: number
    hasUrlParams?:number
    limitForPeriod?: number
    limitRefreshPeriod?: number
    logRequestStatus?:number
    logResponseStatus?: number
    maxCall?:number
    moduleId?: number
    monthlyCount?:number
    name?: string
    protocol?:number
    retryCount?: number
    retryForHttpStatusCode?: number
    reverseCondition?: number
    reverseStatus?:number
    row?: number
    runningType?:number
    staticBody?: number
    status?:number
    timeout?: number
    title?: string
    type?: number
    url?: string
    weeklyCount?:number
}