import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'changeTypeId', standalone: true, pure: true })
export class ChangeTypeIdPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
