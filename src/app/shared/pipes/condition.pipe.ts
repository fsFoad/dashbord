import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'condition'
})
export class ConditionPipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "بزرگ تر";
            case 2:
                return "کوچک تر";
            case 3:
                return "مساوی";
            case 4:
                return "بزرگ تر مساوی";
            case 5:
                return "کوچک تر مساوی";
            case 6:
                return "نامساوی";
            default:
                return " ";
        }
    }
}
