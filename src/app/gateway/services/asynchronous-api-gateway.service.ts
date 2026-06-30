import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsynchronousApiGatewayService {
    private apiType: any

    constructor() {
    }

    setApiType(data:any) {
        this.apiType = data
    }

}
