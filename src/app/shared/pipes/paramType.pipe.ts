import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'paramType', standalone: true, pure: true })
export class ParamTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
