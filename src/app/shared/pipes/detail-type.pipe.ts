import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'detailType', standalone: true, pure: true })
export class DetailTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}

export { DetailTypePipe as detailTypePipe };
