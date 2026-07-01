import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cacheType', standalone: true, pure: true })
export class CacheTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
