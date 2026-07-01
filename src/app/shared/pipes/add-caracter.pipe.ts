import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'addCaracter', standalone: true, pure: true })
export class AddCaracterPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
