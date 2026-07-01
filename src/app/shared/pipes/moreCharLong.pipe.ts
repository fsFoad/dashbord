import {Pipe, PipeTransform} from "@angular/core";
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'moreCharLong'
})
export class MoreCharLongPipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {

    }

    transform(args: string): any {
        if (args)
            if (args.length > 49) {
                let tempArgs: string;
                if (this.commonValidationsService.containsPersianChars(args)) {

                    tempArgs = args.toString().slice(0, 46) + ' ...'
                } else {

                    tempArgs = '...' + args.toString().slice(0, 46)

                }
                return tempArgs;
            } else {
                return args;
            }
    }
}
