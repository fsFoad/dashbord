/*export class IplimitDto {
    endpointId: string;
    ipAddress: string;
    limitId?:number
}*/
export interface IplimitDto {
    endpointId: number;
    ipAddress: string;
    limitId?: number;
}
