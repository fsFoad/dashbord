import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'moreChar19', standalone: true, pure: true })
export class MoreChar19Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
