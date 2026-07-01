export class FeeDetailDomainsDto {
    calculationTypeId;
    calculationValue;
    minValue;
    maxvalue;
    fromValue;
    toValue;
    objectMapperToList(wageDetailList) {
        const feeDetailDomains = [];
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
