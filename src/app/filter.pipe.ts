import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filter'})

export class FilterPipe implements PipeTransform {

  transform(items: any[], term): any {
    // console.log('term', term);
    return term ? items.filter(item => item.price.indexOf(term) !== -1) : items;
  }

}
