import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'limitType', standalone: true, pure: true })
export class LimitTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
