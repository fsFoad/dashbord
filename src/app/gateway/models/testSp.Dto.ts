// @ts-nocheck
export class TestSpDto {
    id: number;
    name: string
    aliasOutputParamName: string
    testValue: (string | number);
    status: number;
    dataType: number;
    paramType: number;
    endpintdetailId: number;
    customParamId: number;
    objectMapperToList(spDetailList: any): TestSpDto[] {
        const testSpDto: TestSpDto[] = [];
        let rowNumber = 0;
        spDetailList.forEach(a => {
            rowNumber++;
            const testSpDto1 = new TestSpDto;
            testSpDto1.id= +a.id
            testSpDto1.name=a.name
            testSpDto1.aliasOutputParamName=a.aliasOutputParamName
            testSpDto1.testValue= a.testValue
            testSpDto1.status= +a.status
            testSpDto1.dataType= +a.dataType
            testSpDto1.paramType= +a.paramType
            testSpDto.push(testSpDto1);
        });
        return testSpDto;
    }
}