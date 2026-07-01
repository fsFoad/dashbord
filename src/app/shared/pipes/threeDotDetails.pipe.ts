import {Pipe, PipeTransform} from '@angular/core';
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'threeDotDetailsPipe'
})

export class ThreeDotDetailsPipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {

    }

    transform(value: string): any {
        let newValue;
        if (value) {
            if (value.length > 19) {
                newValue = value.toString();
                let tempArgs: string;
                // result = newValue.toString().slice(0, 16) + ' ...'
                // return result;
                if (this.commonValidationsService.containsPersianChars(newValue)) {
                    tempArgs = newValue.toString().slice(0, 16) + ' ...'
                } else {
                    tempArgs = '...' + newValue.toString().slice(0, 16)
                }
                return tempArgs;
            } else {
                return value;
            }
        }
    }

}
