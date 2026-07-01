import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let HeaderNameService = class HeaderNameService {
    http;
    constructor(http) {
        this.http = http;
    }
    getCountries() {
        const getinputheadernamesUrl = 'http://192.168.160.40:8086/endpointheader/getinputheadernames';
        return this.http.get(getinputheadernamesUrl)
            .toPromise()
            .then(res => res.data)
            .then(data => {
            return data;
        })
            .catch(data => {
            let a;
            if (typeof data.error.text == "object") {
                a = (data.error.text);
            }
            else {
                a = JSON.parse(data.error.text);
            }
            return a;
        });
    }
};
HeaderNameService = __decorate([
    Injectable()
], HeaderNameService);
export { HeaderNameService };
