

import {Pipe, PipeTransform} from "@angular/core";
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'morChar32'
})
export class MorChar32Pipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {

    }

    transform(args: string): any {
        if (args)
            if (args.length > 32) {
                let tempArgs: string;
                if (this.commonValidationsService.containsPersianChars(args)) {

                    tempArgs = args.toString().slice(0, 29) + ' ...'
                } else {

                    tempArgs = '...' + args.toString().slice(0, 29)

                }
                return tempArgs;
            } else {
                return args;
            }
    }
}
