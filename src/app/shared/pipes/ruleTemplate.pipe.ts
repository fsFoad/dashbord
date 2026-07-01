import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'ruleTemplate', standalone: true, pure: true })
export class RuleTemplatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
