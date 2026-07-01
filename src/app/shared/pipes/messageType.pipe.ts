import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'messageType', standalone: true, pure: true })
export class MessageTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
