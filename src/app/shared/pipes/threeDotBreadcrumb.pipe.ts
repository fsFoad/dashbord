import {Pipe, PipeTransform} from '@angular/core';
import {CommonValidationsService} from "../validators/common-validations.service";

@Pipe({
    standalone: true,
    name: 'threeDotBreadcrumbPipe'
})

export class ThreeDotBreadcrumbPipe implements PipeTransform {
    constructor(private commonValidationsService: CommonValidationsService) {
    }
    transform(value: string): any {
        let newValue;
        let result: string = value;
        if (value) {
            if (value.length > 19) {
                newValue = value.toString();
                if (this.commonValidationsService.containsPersianChars(newValue)) {
                    result = newValue.toString().slice(0, 15) + ' ...' + ')'
                } else {
                    newValue = newValue.slice(1);
                    result = '(...' + newValue.toString().slice(0, 15) + ')'
                }
                return result
            } else {
                return value
            }
        }

    }

}
