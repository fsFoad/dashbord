import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'morChar32', standalone: true, pure: true })
export class MorChar32Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
