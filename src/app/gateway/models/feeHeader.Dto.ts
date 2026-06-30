export class FeeHeaderDto{
    title: string;
    feeTypeId: number;
    status: number;
    objectMapper(title: any, feeTypeId: any, status: any): FeeHeaderDto {
        const feeHeaderDto: FeeHeaderDto = new FeeHeaderDto;
        feeHeaderDto.title = title;
        feeHeaderDto.feeTypeId = feeTypeId;
        status==true?feeHeaderDto.status = 1:feeHeaderDto.status = 0
         
        return feeHeaderDto;
    }
}