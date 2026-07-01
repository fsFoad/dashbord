import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'wageType'
})
export class WageTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case 1:
                return "تعدادی ساده";
                break;
            case 2:
                return "تعدادی پلکانی";
                break;
            case 3:
                return "مبلغی ساده";
                break;
            case 4:
                return "مبلغی پلکانی";
                break;

        }
    }
}
