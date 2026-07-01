import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'castToDateTime',
})
export class CastToDateTimePipe implements PipeTransform {

    transform(args: string): any {
        if (args) {
            const str = args.toString();

            // حالت YYYYMMDD
            if (str.length === 8 && /^\d{8}$/.test(str)) {
                return str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6, 8);
            }
            // حالت YYYYMMDDHHmmssSSS
            else if (str.length >= 15 && str.length <= 17 && /^\d{15,17}$/.test(str)) {
                return str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6, 8)
                    + ' ' + str.slice(8, 10) + ':' + str.slice(10, 12) + ':' + str.slice(12, 14)
                    + ':' + str.slice(14);
            }
            // حالت YYYY-MM-DD
            else if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
                return str.replace(/-/g, '/');
            } else {
                return null;
            }


        }
    }
}
