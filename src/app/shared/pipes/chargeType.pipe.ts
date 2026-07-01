import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'chargeTypePipe'
})
export class ChargeTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "شارژ افزایشی";
            case 2:
                return "شارژ ثابت";
        }
    }
}
