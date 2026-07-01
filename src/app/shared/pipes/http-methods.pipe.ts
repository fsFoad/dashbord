import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'httpMethods'
})
export class HttpMethodsPipe  implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "Post";
            case 2:
                return "Get";
            case 3:
                return "Delete";
            case 4:
                return "Options";
            case 5:
                return "Wed";
            case 6:
                return "Pattern";
            case 7:
                return "Trace";
            default:
                return " ";
        }
    }
}
