import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'successful', standalone: true, pure: true })
export class SuccessfulPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
