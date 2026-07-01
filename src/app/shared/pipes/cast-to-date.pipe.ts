import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
  name: 'castToDate'
})
export class CastToDatePipe implements PipeTransform {

    transform(args: string): any {
        if (args)
            if (args.toString().length === 8) {
                let tempArgs: string;
                tempArgs = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8);
                return tempArgs;
            } else {
                return null;
            }
    }

}
