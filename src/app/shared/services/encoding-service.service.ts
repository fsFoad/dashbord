import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class EncodingServiceService {
  encode(v: string): string { return v; }
  decode(v: string): string { return v; }
  toBase64(v: string): string { return btoa(v); }
  fromBase64(v: string): string { return atob(v); }
}
