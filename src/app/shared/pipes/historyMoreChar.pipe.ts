import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'historyMoreChar'
})
export class HistoryMoreCharPipe implements PipeTransform {
    transform(args: string): any {
        if (args)
            if (args.length > 10) {
                let tempArgs: string;
                tempArgs =  ' ... '+args.toString().slice(0, 10)

                return tempArgs;
            } else {
                return args;
            }
    }
}
