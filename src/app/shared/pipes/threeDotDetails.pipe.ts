import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'threeDotDetailsPipe', standalone: true, pure: true })
export class ThreeDotDetailsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
