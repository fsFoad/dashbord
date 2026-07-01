import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'limitType'
})
export class LimitTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'Include';
                break;
            case 2:
                return 'Exclude';
                break;
            default:
                return null;
                break;
        }
    }
}
