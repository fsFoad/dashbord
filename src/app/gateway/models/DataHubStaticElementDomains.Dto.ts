export class DataHubStaticElementDomains {
    paramName: string;
    paramValue: string;
    status: number;
    dataType: number;
    apiDataHubId: number;
    operationTypeId: number;
    elementId?: number;

    objectMapperToList(wageDetailList: any): DataHubStaticElementDomains[] {
        const dataHubStaticElementDomains: DataHubStaticElementDomains[] = [];
        let rowNumber = 0;
        wageDetailList.forEach(a => {
            rowNumber++;

            const dataHubStaticElementDomains1 = new DataHubStaticElementDomains;
            dataHubStaticElementDomains1.paramName = a.paramName;
            dataHubStaticElementDomains1.paramValue = a.paramValue
            dataHubStaticElementDomains1.dataType = +a.dataType;
            dataHubStaticElementDomains1.apiDataHubId = +a.apiDataHubId;
            dataHubStaticElementDomains1.operationTypeId = +a.operationTypeId;
            a.status==true? dataHubStaticElementDomains1.status =1:dataHubStaticElementDomains1.status =0;
            dataHubStaticElementDomains.push(dataHubStaticElementDomains1);

        });
        return dataHubStaticElementDomains;
    }
}