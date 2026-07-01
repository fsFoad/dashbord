import { __decorate } from "tslib";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
let StatsApiService = class StatsApiService {
    http = inject(HttpClient);
    stats(range) {
        let params = new HttpParams();
        if (range?.from)
            params = params.set('from', range.from.toISOString().slice(0, 10));
        if (range?.to)
            params = params.set('to', range.to.toISOString().slice(0, 10));
        return this.http.get('/api/stats', { params });
    }
};
StatsApiService = __decorate([
    Injectable({ providedIn: 'root' })
], StatsApiService);
export { StatsApiService };
