import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'threeDotBreadcrumbPipe', standalone: true, pure: true })
export class ThreeDotBreadcrumbPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
