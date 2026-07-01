import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AsynchronousApiGatewayService = class AsynchronousApiGatewayService {
    apiType;
    constructor() {
    }
    setApiType(data) {
        this.apiType = data;
    }
};
AsynchronousApiGatewayService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AsynchronousApiGatewayService);
export { AsynchronousApiGatewayService };
