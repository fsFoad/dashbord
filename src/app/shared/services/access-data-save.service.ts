import {Injectable} from "@angular/core";
import { AccessDto } from '../../main/models/accessDto';

@Injectable({
    providedIn: 'root'
})
export class AccessDataSaveService {
    private _partyId: number = null;
    private _endpointId: number = null;
    private _moduleId: number = null;
    private _partyName: string = null;
    private _moduleTitle: string = null;
    private _clientName: string = null;
    private _apiBase: number = null;
    private _endpointBase: number = null;
    private _clientBase: number = null;
    private _shareData: AccessDto = {
        partyId: null,
        endpointId: null,
        moduleId: null,
        partyName: "",
        moduleTitle: "",
        clientName: "",
        accessBase: null,
        apiBase: null,
        endpointBase: null,
        clientBase: null
    };

    get shareData(): AccessDto {
        return this._shareData;
    }

    set shareData(value: AccessDto) {
        this._shareData = value;
    }

    get partyId(): number {
        return this._partyId;
    }

    set partyId(value: number) {
        this._partyId = value;
    }

    get endpointId(): number {
        return this._endpointId;
    }

    set endpointId(value: number) {
        this._endpointId = value;
    }

    get moduleId(): number {
        return this._moduleId;
    }

    set moduleId(value: number) {
        this._moduleId = value;
    }

    get partyName(): string {
        return this._partyName;
    }

    set partyName(value: string) {
        this._partyName = value;
    }

    get moduleTitle(): string {
        return this._moduleTitle;
    }

    set moduleTitle(value: string) {
        this._moduleTitle = value;
    }

    get clientName(): string {
        return this._clientName;
    }

    set clientName(value: string) {
        this._clientName = value;
    }

    get apiBase(): number {
        return this._apiBase;
    }

    set apiBase(value: number) {
        this._apiBase = value;
    }

    get partyBase(): number {
        return this._endpointBase;
    }

    set endpointBase(value: number) {
        this._endpointBase = value;
    }

    get clientBase(): number {
        return this._clientBase;
    }

    set clientBase(value: number) {
        this._clientBase = value;
    }


}
