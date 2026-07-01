import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'isApproval', standalone: true, pure: true })
export class IsApprovalPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown { return value; }
}
