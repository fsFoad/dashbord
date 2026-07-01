import { Component, Input } from '@angular/core';
import {DecimalPipe} from "@angular/common";
@Component({
  selector: 'app-amount-box',
  standalone: true,
  template: '<span>{{amount | number}}</span>',
  imports: [
    DecimalPipe
  ]
})
export class AmountBoxComponent { @Input() amount: number | null = 0; }
