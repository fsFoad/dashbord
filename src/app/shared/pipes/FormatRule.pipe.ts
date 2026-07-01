import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'formatRule', standalone: true, pure: true })
export class FormatRulePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
