import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'wageType', standalone: true, pure: true })
export class WageTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
