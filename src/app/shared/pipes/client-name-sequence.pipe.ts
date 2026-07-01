import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'clientNameSequence', standalone: true, pure: true })
export class ClientNameSequencePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
