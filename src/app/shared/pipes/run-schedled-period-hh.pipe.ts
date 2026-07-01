import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'runScheduledPeriodHh', standalone: true, pure: true })
export class RunScheduledPeriodHhPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}

export { RunScheduledPeriodHhPipe as RunSchedledPeriodHHPipe };
