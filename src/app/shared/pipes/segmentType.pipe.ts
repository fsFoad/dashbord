import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'segmentTypePipe'
})
export class SegmentTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return " ";
            case undefined:
                return " ";
            case 1:
                return "نقدی";
            case 2:
                return "تسهیلات";
            case 3:
                return "اعتبار";
            case 4:
                return "امتیاز";
        }
    }
}
