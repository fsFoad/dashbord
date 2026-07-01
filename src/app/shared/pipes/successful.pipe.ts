import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'successful'
})
export class SuccessfulPipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case 0:
                return "ناموفق";
            case 1:
                return "موفق";

        }
    }
}
