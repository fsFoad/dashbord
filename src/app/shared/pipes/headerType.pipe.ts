import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'headerType', standalone: true, pure: true })
export class HeaderTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
