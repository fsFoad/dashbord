export class EndpointDto{
    endpointId?:number
    sourceUrl?: string;
    destinationHost?: string;
    destinationPortNumber?: string;
    status?: number;
    destinationUri?:string;
    moduleId?: number;
}