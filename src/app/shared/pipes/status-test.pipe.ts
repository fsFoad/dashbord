import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'statusTest'
})
export class StatusTestPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case 0:
                return "Not confirmed";
            case 1:
                return "confirmed";
        }
    }
}
