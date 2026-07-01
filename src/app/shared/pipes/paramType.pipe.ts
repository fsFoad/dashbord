import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'paramType'
})

export class ParamTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 0:
                return 'Input Parameter';
                break;
            case 1:
                return 'Output Parameter';
                break;
            case 2:
                return 'Oracle Cursor';
                break;
            case 3:
                return 'Output Parameter and set as ResultSet';
                break;
            default:
                return null;
                break;
        }
    }
}
