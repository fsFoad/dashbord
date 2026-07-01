import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'actionTypeHub', standalone: true, pure: true })
export class ActionTypeHubPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
