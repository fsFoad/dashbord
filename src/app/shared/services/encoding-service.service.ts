import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EncodingServiceService {

    constructor() {
    }

    toBase64(str: string): string {
        return btoa(unescape(encodeURIComponent(str)));
    }

    fromBase64(base64: string): string {
        return decodeURIComponent(escape(atob(base64)));
    }
}
