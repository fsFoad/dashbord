import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class DirectionService {
  get direction(): string { return document.documentElement.dir || 'rtl'; }
}
