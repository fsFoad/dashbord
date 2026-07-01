import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'addCommaSeparator', standalone: true, pure: true })
export class AddCommaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
