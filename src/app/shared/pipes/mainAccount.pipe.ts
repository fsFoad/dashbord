import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'mainAccount'
})
export class MainAccountPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return "خیر";
            case undefined:
                return "خیر";
            case 1:
                return "بلی";
            case 2:
                return "خیر";
        }
    }
}
