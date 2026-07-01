import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'statusPipe',
})
export class StatusPipe implements PipeTransform {

    transform(value: number): string {
        switch (value!=null?Number(value):null) {
            case null:
                return 'ثبت نشده';
            case 0:
                return 'غیرفعال';
            case 1:
                return 'فعال';
            case 2:
                return 'غیرفعال';

        }
    }
}
