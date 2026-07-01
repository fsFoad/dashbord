import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'paramTitle'
})
export class ParameterTitlePipe implements PipeTransform {

    transform(value, list: any[], identity = 'id', label = 'title',dontShowIdInResult?:boolean): any {
        let result: any[];
        if (value?.toString() && list && list.length > 0) {
            result = list.filter(a =>
                a[identity]?.toString() == value.toString()
            );
            if (result && result.length > 0) {
                if (!dontShowIdInResult){
                    return `${value} - ${result[0][label]}`;
                }else {
                    return `${result[0][label]}`;
                }
            } else {
                return '';
            }
        } else {
            return value === 0 ? '' : value;
        }
    }


}
