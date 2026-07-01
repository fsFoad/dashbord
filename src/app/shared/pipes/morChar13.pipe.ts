import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'morChar13', standalone: true, pure: true })
export class MorChar13Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
