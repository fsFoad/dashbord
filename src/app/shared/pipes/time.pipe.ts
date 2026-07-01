import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'timePipe'
})

export class TimePipe implements PipeTransform {

    transform(value: number | string): any {

        if (value) {
            value = value.toString()
            if (value.length == 14) {

                const year = value.slice(0, 4)
                const month = value.slice(4, 6)
                const day = value.slice(6, 8)
                const hour = value.slice(8, 10)
                const minute = value.slice(10, 12)
                const second = value.slice(12, 14)

                return `${hour}:${minute}:${second} ${year}/${month}/${day} `

            } else if(value.length == 8) {
                const year = value.slice(0, 4)
                const month = value.slice(4, 6)
                const day = value.slice(6, 8)

                return `${year}/${month}/${day} `
            } else if (value.length === 19) {
                return value.replace(/-/g, "/");
            }
        }else if (value==""|| value == null||value == undefined) {
            return "-"
        }else {
            return value
        }
    }

}
