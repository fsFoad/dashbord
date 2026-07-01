import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'cacheType',
})
export class CacheTypePipe implements PipeTransform {

  transform(value: unknown, ): unknown {
      switch (Number(value)) {
          case null:
              return " ";
          case undefined:
              return " ";
          case 0:
              return "فراخوانی بصورت مستقیم";
          case 1:
              return "فراخوانی بصورت پیش فرض کش و...";
          case 2:
              return "فراخوانی از کش";
          default:
              return " ";
      }
    }

}
