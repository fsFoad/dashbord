import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'moreCharLong', standalone: true, pure: true })
export class MoreCharLongPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
