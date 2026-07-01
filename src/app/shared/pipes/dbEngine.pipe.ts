import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dbEngine', standalone: true, pure: true })
export class DbEnginePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
