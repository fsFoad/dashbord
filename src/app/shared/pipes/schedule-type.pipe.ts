import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'scheduleType', standalone: true, pure: true })
export class ScheduleTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
