import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../../../../../shared/repositories/connection.service';

@Injectable({ providedIn: 'root' })
export class PartyApiService {

    private baseUrl = '/api/party';

    constructor(        private connectionService: ConnectionService,
                        private http: HttpClient) {}

    getParties(pageno: any, pagesize: any, name?: any): Observable<any> {
        let params = new HttpParams()
            .set('pageno', pageno.toString())
            .set('pagesize', pagesize.toString());

        if (name) {
            params = params.set('name', name);
        }

        return this.connectionService.getConnection(
            'party/getpartyinfo',
            '',
            { observe: 'response', params }
        );
    }
}
