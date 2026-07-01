import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'headerType'
})
export class HeaderTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'ثابت';
                break;
            case 2:
                return 'جایگرین';
                break;
            case 3:
                return 'فوروارد';
                break;
            default:
                return null;
                break;
        }
    }
}
