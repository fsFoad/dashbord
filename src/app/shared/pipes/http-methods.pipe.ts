import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'httpMethods', standalone: true, pure: true })
export class HttpMethodsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
