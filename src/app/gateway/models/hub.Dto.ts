import {DataHubStaticElementDomains} from "./DataHubStaticElementDomains.Dto";

export class HubDto{
    hubId?:number
    connectionPoolSize?:number
    allowCreateConnectionPool?:number
    hubTitle: string;
    dbEngineId: number;
    driverName:string;
    ip: string;
    portNumber: number;
    objectName: string;
    commandTypeId: number;
    userName: string;
    password:string;
    messageId4X: number;
    messageId5X: number;
    messageId2X: number;
    dbName: string;
    isTestConnection: number;
    isTestQuery: number;
    autoCommit: number;
    canCommit: number;
    isFinal: number;
    dataHubStaticElementDomains:DataHubStaticElementDomains[];
    objectMapper(dbEngineId: any, driverName: any, ip: any,portNumber:any,
                 objectName:any,commandTypeId:any,userName:any,password:any,messageId4X:any
        ,messageId5X:any,dbName:any,isTestConnection:any,isTestQuery:any ,autoCommit:any
        ,canCommit:any ,isFinal:any): HubDto {

        const hubDto: HubDto = new HubDto;
        hubDto.dbEngineId = dbEngineId;
        hubDto.driverName = driverName;
        hubDto.ip = ip;
        hubDto.portNumber = portNumber;
        hubDto.objectName = objectName;
        hubDto.commandTypeId = commandTypeId;
        hubDto.userName = userName;
        hubDto.password = password;
        hubDto.messageId4X = messageId4X;
        hubDto.messageId5X = messageId5X;
        hubDto.dbName = dbName;
        hubDto.isTestConnection = isTestConnection;
        hubDto.isTestQuery = isTestQuery;
        hubDto.autoCommit = autoCommit;
        hubDto.canCommit = canCommit;
        hubDto.isFinal = isFinal;

        return hubDto;
    }
}
