import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'conditionFieldType'
})
export class ConditionFieldTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "عدد";
            case 2:
                return "رشته";
            default:
                return " ";
        }
    }
}
