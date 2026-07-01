import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'conditionFieldType', standalone: true, pure: true })
export class ConditionFieldTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
