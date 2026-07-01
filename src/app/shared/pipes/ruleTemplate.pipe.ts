import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'ruleTemplate'
})
export class RuleTemplatePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "خارجی";
            case 2:
                return "داخلی";
            default:
                return " ";
        }
    }
}
