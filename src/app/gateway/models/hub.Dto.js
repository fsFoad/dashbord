export class HubDto {
    hubId;
    connectionPoolSize;
    allowCreateConnectionPool;
    hubTitle;
    dbEngineId;
    driverName;
    ip;
    portNumber;
    objectName;
    commandTypeId;
    userName;
    password;
    messageId4X;
    messageId5X;
    messageId2X;
    dbName;
    isTestConnection;
    isTestQuery;
    autoCommit;
    canCommit;
    isFinal;
    dataHubStaticElementDomains;
    objectMapper(dbEngineId, driverName, ip, portNumber, objectName, commandTypeId, userName, password, messageId4X, messageId5X, dbName, isTestConnection, isTestQuery, autoCommit, canCommit, isFinal) {
        const hubDto = new HubDto;
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
