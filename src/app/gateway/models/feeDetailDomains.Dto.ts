// @ts-nocheck

export class FeeDetailDomainsDto {
    calculationTypeId: number
    calculationValue: number
    minValue: number
    maxvalue: number
    fromValue: number
    toValue: number
    objectMapperToList(wageDetailList:any): FeeDetailDomainsDto[] {
        const feeDetailDomains: FeeDetailDomainsDto[] = [];
        let rowNumber = 0;
        wageDetailList.forEach(a => {
            rowNumber++;
            const headerWageDto = new FeeDetailDomainsDto;
            headerWageDto.calculationTypeId = a.calculationTypeId;
            headerWageDto.calculationValue = Number(a.calculationValue);
            headerWageDto.minValue = a.minValue;
            headerWageDto.maxvalue = a.maxvalue;
            headerWageDto.fromValue = a.fromValue;
            headerWageDto.toValue = a.toValue;
            feeDetailDomains.push(headerWageDto);
        });
         
        return feeDetailDomains;
    }
}