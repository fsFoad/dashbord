import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'dataTypeHub'
})

export class DataTypeHubPipe implements PipeTransform {
    transform(value: number): string {
        switch (value!=null?Number(value):null) {

            case null:
                return '-';
                break;
            case 0:
                return 'string';
                break;
            case 1:
                return 'Numeric';
                break;
            default:
                return '-';
                break;
        }
    }
}
