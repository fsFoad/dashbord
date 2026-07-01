import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'dataTypeHub', standalone: true, pure: true })
export class DataTypeHubPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
