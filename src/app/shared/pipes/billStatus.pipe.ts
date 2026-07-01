import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'billStatus', standalone: true, pure: true })
export class BillStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
