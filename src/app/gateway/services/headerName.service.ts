// @ts-nocheck
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HeaderNameService {

    constructor(private http: HttpClient) {}

    getCountries() {
        const getinputheadernamesUrl = 'http://192.168.160.40:8086/endpointheader/getinputheadernames'
        return this.http.get<any>(getinputheadernamesUrl)
            .toPromise()
            .then(res => (res.data as any[]))
            .then(data => {
                 
                return data;
            })
            .catch(data => {
                 
                let a
                if (typeof  data.error.text == "object"){
                    a=(data.error.text)
                }else {
                    a=JSON.parse(data.error.text)
                }

                 
                return a;
            });
    }
}