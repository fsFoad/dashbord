import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'dbEngine'
})

export class DbEnginePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
                break;
            case 1:
                return 'MSSQL';
                break;
            case 2:
                return 'Oracle';
                break;
            case 3:
                return 'PostgreSQL';
                break;
            case 4:
                return 'MySQL';
                break;
            default:
                return null;
                break;
        }
    }
}
