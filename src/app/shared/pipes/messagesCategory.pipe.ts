import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'messagesCategory', standalone: true, pure: true })
export class MessagesCategoryPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
