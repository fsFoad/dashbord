import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'priorityType', standalone: true, pure: true })
export class PriorityTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
