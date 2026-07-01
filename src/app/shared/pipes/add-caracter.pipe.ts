import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'addcaracterpipe'
})
export class AddCaracterPipe implements PipeTransform {

    transform(value: any, caracter: string): any {
        return value ? caracter + value.toString() : '';
    }


}
