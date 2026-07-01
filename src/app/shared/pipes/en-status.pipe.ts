import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'enStatus'
})
export class EnStatusPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case 0:
                return "Inactive";
            case 1:
                return "active";
            case 2:
                return "Inactive";
        }
    }
}
