import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'condition', standalone: true, pure: true })
export class ConditionPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
