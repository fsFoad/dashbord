export class TestSpDto {
    id;
    name;
    aliasOutputParamName;
    testValue;
    status;
    dataType;
    paramType;
    endpintdetailId;
    customParamId;
    objectMapperToList(spDetailList) {
        const testSpDto = [];
        let rowNumber = 0;
        spDetailList.forEach(a => {
            rowNumber++;
            const testSpDto1 = new TestSpDto;
            testSpDto1.id = +a.id;
            testSpDto1.name = a.name;
            testSpDto1.aliasOutputParamName = a.aliasOutputParamName;
            testSpDto1.testValue = a.testValue;
            testSpDto1.status = +a.status;
            testSpDto1.dataType = +a.dataType;
            testSpDto1.paramType = +a.paramType;
            testSpDto.push(testSpDto1);
        });
        return testSpDto;
    }
}
