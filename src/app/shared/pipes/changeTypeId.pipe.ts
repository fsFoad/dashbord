import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'changeTypeId'
})
export class ChangeTypeIdPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case 1:
                return "افزوده شده";
            case 2:
                return "حذف شده";
        }
    }
}
