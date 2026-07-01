import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'actionType',
})
export class ActionTypeFirstPipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'اولویت اجرا در قبل';
                break;
            case 2:
                return 'اولویت اجرا در بعد';
                break;
            default:
                return null;
                break;
        }
    }
}
