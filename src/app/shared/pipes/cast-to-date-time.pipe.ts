import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'castToDateTime', standalone: true, pure: true })
export class CastToDateTimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
