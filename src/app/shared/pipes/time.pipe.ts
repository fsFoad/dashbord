import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'timePipe', standalone: true, pure: true })
export class TimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
