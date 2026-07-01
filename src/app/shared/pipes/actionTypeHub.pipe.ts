import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'actionTypeHub',
})
export class ActionTypeHubPipe implements PipeTransform {
    transform(value: number): string {
        switch (value != null ? Number(value) : null) {
            case 0:
                return 'Ok';
                break;
            case 1:
                return 'Dont Care';
                break;
            default:
                return 'ok';
                break;
        }
    }
}
