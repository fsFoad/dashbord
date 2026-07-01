import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class PrintService {
  print(content: unknown): void { window.print(); }
}
