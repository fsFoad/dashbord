import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'castToDate', standalone: true, pure: true })
export class CastToDatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
