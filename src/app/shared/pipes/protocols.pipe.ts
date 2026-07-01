import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'protocols',
})
export class ProtocolsPipe implements PipeTransform {
    transform(value): string {
        return 'TCP';
    }

}
