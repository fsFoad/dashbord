import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'protocols', standalone: true, pure: true })
export class ProtocolsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
