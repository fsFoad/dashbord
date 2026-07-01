import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'normalizeJalali', standalone: true, pure: true })
export class NormalizeJalaliPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
