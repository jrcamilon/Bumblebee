import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  

  transform(items: any[], filter?: any): any {
    if (!items || filter) {
      return items;
    }

    console.log(items, filter);
  //   return items.filter(item => item.family.indexOf(filter.family) !== -1);

  }

}
