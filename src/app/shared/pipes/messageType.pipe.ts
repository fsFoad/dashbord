import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'messageType'
})

export class MessageTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'INFO';
                break;
            case 2:
                return 'WARRING';
                break;
            case 3:
                return 'ERROR';
                break;
            case 4:
                return 'EXCEPTION';
                break;
            case 5:
                return 'RECORD OR DATA NOT_FOUND';
                break;
            case 6:
                return 'RECORD OR DATA IS NOT ENABLED';
                break;
            default:
                return null;
                break;
        }
    }
}
