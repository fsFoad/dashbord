import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'scheduledStatus', standalone: true, pure: true })
export class ScheduledStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
