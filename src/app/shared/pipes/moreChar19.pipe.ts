import {Pipe, PipeTransform} from "@angular/core";
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'moreChar19'
})
export class MoreChar19Pipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {

    }

    transform(args: string): any {
        if (args)
            if (args.length > 19) {
                let tempArgs: string;
                if (this.commonValidationsService.containsPersianChars(args)) {

                    tempArgs = args.toString().slice(0, 16) + ' ...'
                } else {

                    tempArgs = '...' + args.toString().slice(0, 16)

                }
                return tempArgs;
            } else {
                return args;
            }
    }
}
