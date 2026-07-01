import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'commandType'
})

export class CommandTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'SQL Text';
                break;
            case 2:
                return 'Execute Procedure';
                break;
            case 3:
                return 'Custom Query';
                break;
            default:
                return null;
                break;
        }
    }
}
