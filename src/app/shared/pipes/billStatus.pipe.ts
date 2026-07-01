import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'billStatus'
})
export class BillStatusPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "ثبت شده";
            case 3:
                return "پرداخت شده";
        }
    }
}
