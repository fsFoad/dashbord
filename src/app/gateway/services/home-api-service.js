import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let HomeApiService = class HomeApiService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    getIssuanceTree(code) {
        const URL = 'legal-tree-action-info/' + code;
        return this.connection.getConnection(URL, null, false);
    }
};
HomeApiService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], HomeApiService);
export { HomeApiService };
