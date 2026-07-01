

import {Pipe, PipeTransform} from "@angular/core";
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'morChar55',
})
export class MorChar55Pipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {}

    transform(args: string): any {
        if (args)
            if (args.length > 55) {
                let tempArgs: string;
                if (this.commonValidationsService.containsPersianChars(args)) {
                    tempArgs = args.toString().slice(0, 52) + ' ...';
                } else {
                    tempArgs = '...' + args.toString().slice(0, 52);
                }
                return tempArgs;
            } else {
                return args;
            }
    }
}
