import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'tableId', standalone: true, pure: true })
export class TableIdPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
