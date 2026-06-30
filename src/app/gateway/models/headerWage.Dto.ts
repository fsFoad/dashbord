import {FeeDetailDomainsDto} from "./feeDetailDomains.Dto";

export class HeaderWageDto
{
    title: string;
    feeTypeId: number;
    fromDate: number;
    toDate: number;
    feeDetailDomains:FeeDetailDomainsDto[];
}
