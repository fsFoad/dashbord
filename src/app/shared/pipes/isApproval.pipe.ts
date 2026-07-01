import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'isApproval'
})
export class IsApprovalPipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case 0:
                return "تائید نشده";
            case 1:
                return "تائید شده";
            case 2:
                return "تائید نشده";
        }
    }
}
