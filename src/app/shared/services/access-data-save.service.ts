import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AccessDataSaveService {
  shareData: unknown = null;
  save(data: unknown): void { this.shareData = data; }
  get(): unknown { return this.shareData; }
}
