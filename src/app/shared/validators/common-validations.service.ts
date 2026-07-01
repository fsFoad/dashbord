import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CommonValidationsService {
  required(label: string): string { return `${label} الزامی است`; }
}
