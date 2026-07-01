import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'formatRule'
})
export class FormatRulePipe implements PipeTransform{
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'خارجی';
                break;
            case 2:
                return 'داخلی';
                break;
            default:
                return null;
                break;
        }
    }
}
