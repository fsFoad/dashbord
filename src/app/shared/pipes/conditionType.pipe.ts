import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'conditionType'
})
export class ConditionTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "body";
            case 2:
                return "header";
            case 3:
                return "queryString";
            default:
                return " ";
        }
    }
}
