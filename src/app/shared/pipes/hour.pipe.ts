import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'hour', standalone: true, pure: true })
export class HourPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
