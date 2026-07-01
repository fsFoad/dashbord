import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'conditionType', standalone: true, pure: true })
export class ConditionTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
