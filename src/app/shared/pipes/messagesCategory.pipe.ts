import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'messagesCategory'
})
export class MessagesCategoryPipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'سازمان';
                break;
            case 2:
                return 'ماژول';
                break;
            case 3:
                return 'اندپوینت';
                break;
            case 4:
                return 'المان های اندپوینت';
                break;
            case 5:
                return 'کلاینت';
                break;
            case 6:
                return 'سرویس';
                break;
            case 7:
                return 'قواعد سرویس';
                break;
            case 8:
                return 'شرایط قواعد سرویس';
                break;
            default:
                return null;
                break;
        }
    }
}
