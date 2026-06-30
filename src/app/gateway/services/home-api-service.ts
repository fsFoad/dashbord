import { Injectable } from '@angular/core';
import { ConnectionService } from '../../../../shared/repositories/connection.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class HomeApiService {
    constructor(private connection: ConnectionService) {
    }

    public getIssuanceTree(code: string): Observable<any> {
        const URL = 'legal-tree-action-info/' + code;
        return this.connection.getConnection(URL, null, false);
    }
}
