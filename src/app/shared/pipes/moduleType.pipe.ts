import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'moduleType'
})
export class ModuleTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'Restful';
                break;
            case 2:
                return 'soap';
                break;
            case 3:
            default:
                return null;
                break;
        }
    }
}
