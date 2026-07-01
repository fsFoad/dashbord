import { __decorate } from "tslib";
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
let PartyApiService = class PartyApiService {
    connectionService;
    http;
    baseUrl = '/api/party';
    constructor(connectionService, http) {
        this.connectionService = connectionService;
        this.http = http;
    }
    getParties(pageno, pagesize, name) {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());
        if (name) {
            params = params.set('name', name);
        }
        return this.connectionService.getConnection('party/getpartyinfo', '', { observe: 'response', params });
    }
};
PartyApiService = __decorate([
    Injectable({ providedIn: 'root' })
], PartyApiService);
export { PartyApiService };
