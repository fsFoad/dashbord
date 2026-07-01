export class FeeHeaderDto {
    title;
    feeTypeId;
    status;
    objectMapper(title, feeTypeId, status) {
        const feeHeaderDto = new FeeHeaderDto;
        feeHeaderDto.title = title;
        feeHeaderDto.feeTypeId = feeTypeId;
        status == true ? feeHeaderDto.status = 1 : feeHeaderDto.status = 0;
        return feeHeaderDto;
    }
}
