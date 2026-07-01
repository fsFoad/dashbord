import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'purchaseTypePipe'
})
export class PurchaseTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "خرید فقط از جیب";
            case 2:
                return "خرید ترکیبی";
        }
    }
}
