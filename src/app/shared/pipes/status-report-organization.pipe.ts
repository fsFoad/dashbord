import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'statusReportOrganizationPipe'
})
export class statusReportOrganizationPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case 0:
                return "جدید";
            case 1:
                return "موفق";
            case 2:
                return "عدم تطابق کیف";
            case 3:
                return "کیف نامعتبر";
            case 4:
                return "عدم تطابق سازمان";
            case 5:
                return "عدم تطابق جیب";
            case 6:
                return "عدم رعایت سقف";
            case 7:
                return "تکراری";
            case 8:
                return "ناشناخته";

        }
    }
}
