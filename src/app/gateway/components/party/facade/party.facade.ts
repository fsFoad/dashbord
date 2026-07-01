// @ts-nocheck
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PartyApiService } from '../services/party-api.service';
import { Party } from '../models/party.model';
import { TranslocoService } from '@ngneat/transloco';
import { ApiGatewayService } from '../../../services/api-gateway.service';

@Injectable({ providedIn: 'root' })
export class PartyFacade {

    private _partyList = new BehaviorSubject<Party[]>([]);
    partyList$ = this._partyList.asObservable();

    private _loading = new BehaviorSubject<boolean>(false);
    loading$ = this._loading.asObservable();

    private _totalRecords = new BehaviorSubject<number>(0);
    totalRecords$ = this._totalRecords.asObservable();

    private state = {
        page: 0,
        size: 10,
        title: '',
    };

    constructor(
        private api: PartyApiService,
        private transloco: TranslocoService,
        private apiGatewayService: ApiGatewayService,
    ) {
    }

    loadParties() {
        this._loading.next(true);

        this.api.getParties(this.state.page, this.state.size, this.state.title)
            .pipe(
                map(res => this.handleResponse(res)),
                finalize(() => this._loading.next(false)),
            )
            .subscribe(({ data, total }) => {
                this._partyList.next(data);
                this._totalRecords.next(total);
            });
    }

    setBread(caseBase: string) {
        const bread = this.chooseBread(caseBase);
        this.apiGatewayService.updateApprovalDetailsBreadObject(bread);
    }

    private chooseBread(caseBase: string) {
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
    setSearch(title: string) {
        this.state.page = 0;
        this.state.title = title;
        this.loadParties();
    }

    setPage(event: any) {
        this.state.page = event.first / event.rows;
        this.state.size = event.rows;
        this.loadParties();
    }

    clear() {
        this.state = { page: 0, size: 10, title: '' };
        this.loadParties();
    }

    private extract(res: HttpResponse<any>) {
        let data: any[] = [];

        if (Array.isArray(res.body)) data = res.body;
        else if (res.body?.data) data = res.body.data;

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

    private handleResponse(res: HttpResponse<any>) {
        let data: any[] = [];

        if (Array.isArray(res.body)) {
            data = res.body;
        } else if (res.body?.data) {
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
}
