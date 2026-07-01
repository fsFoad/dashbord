import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'addCommaSeparator'
})
export class AddCommaPipe implements PipeTransform {

    transform(value: number | string): any {
        let newValue = null;
        if (((typeof value) === "string" || "number")&&(value!=null)) {
            if((typeof value) === "number"){
                    newValue=value.toString()
                    newValue = this.addCommas(newValue);
                    return newValue;
            }else{
                newValue= value
                newValue = this.addCommas(newValue);
                return newValue;
            }
        } else {
            return newValue;
        }
    }
    addCommas(num: number): string {
        // Convert the number to a string
        const numStr = num.toString();

        // Use a regular expression to add commas
        const pattern = /(\d)(?=(\d{3})+(?!\d))/g;

        // Replace matches with the number followed by a comma
        return numStr.replace(pattern, '$1,');
    }
}
