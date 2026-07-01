import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'morChar55', standalone: true, pure: true })
export class MorChar55Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
