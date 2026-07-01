import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'detailType'
})
export class detailTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'Header';
                break;
            case 2:
                return 'Body';
                break;
            case 3:
                return 'Query String';
                break;
            default:
                return null;
                break;
        }
    }
}
