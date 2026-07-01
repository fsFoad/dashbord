import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'enStatus', standalone: true, pure: true })
export class EnStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
