import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
let PartyFacade = class PartyFacade {
    api;
    transloco;
    apiGatewayService;
    _partyList = new BehaviorSubject([]);
    partyList$ = this._partyList.asObservable();
    _loading = new BehaviorSubject(false);
    loading$ = this._loading.asObservable();
    _totalRecords = new BehaviorSubject(0);
    totalRecords$ = this._totalRecords.asObservable();
    state = {
        page: 0,
        size: 10,
        title: '',
    };
    constructor(api, transloco, apiGatewayService) {
        this.api = api;
        this.transloco = transloco;
        this.apiGatewayService = apiGatewayService;
    }
    loadParties() {
        this._loading.next(true);
        this.api.getParties(this.state.page, this.state.size, this.state.title)
            .pipe(map(res => this.handleResponse(res)), finalize(() => this._loading.next(false)))
            .subscribe(({ data, total }) => {
            this._partyList.next(data);
            this._totalRecords.next(total);
        });
    }
    setBread(caseBase) {
        const bread = this.chooseBread(caseBase);
        this.apiGatewayService.updateApprovalDetailsBreadObject(bread);
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'serviceRecipientsParty':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.party'),
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/party.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return [];
        }
    }
    setSearch(title) {
        this.state.page = 0;
        this.state.title = title;
        this.loadParties();
    }
    setPage(event) {
        this.state.page = event.first / event.rows;
        this.state.size = event.rows;
        this.loadParties();
    }
    clear() {
        this.state = { page: 0, size: 10, title: '' };
        this.loadParties();
    }
    extract(res) {
        let data = [];
        if (Array.isArray(res.body))
            data = res.body;
        else if (res.body?.data)
            data = res.body.data;
        return {
            list: data
                .filter(x => x != null)
                .map(x => ({
                ...x,
                status: x.status === 1,
            })),
            total: Number(res.headers.get('totalitems')) || 0,
        };
    }
    handleResponse(res) {
        let data = [];
        if (Array.isArray(res.body)) {
            data = res.body;
        }
        else if (res.body?.data) {
            data = res.body.data;
        }
        const mapped = data
            .filter(x => x != null)
            .map(x => ({
            ...x,
            status: x.status === 1,
        }));
        const total = Number(res.headers.get('totalitems')) || 0;
        return { data: mapped, total };
    }
};
PartyFacade = __decorate([
    Injectable({ providedIn: 'root' })
], PartyFacade);
export { PartyFacade };
