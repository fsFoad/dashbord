import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'moduleType', standalone: true, pure: true })
export class ModuleTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
