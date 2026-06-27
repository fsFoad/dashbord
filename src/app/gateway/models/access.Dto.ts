export class AccessDto{
    partyId?: number;
    endpointId: number;
    moduleId: number;
    partyName?: string;
    moduleTitle: string;
    clientName: string;
    accessBase:boolean;
    endpointBase?:boolean;
    clientBase?:boolean;
    apiBase?:boolean
}
