import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'historyMoreChar', standalone: true, pure: true })
export class HistoryMoreCharPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
