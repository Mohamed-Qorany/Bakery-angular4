import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'filter'})

export class FilterPipe implements PipeTransform {

  transform(items: any, workletItemsFilterText: any): any {

    //check if search term is undefined
    if (!items || !workletItemsFilterText) {
      return items;
    }



    var i:any;
    var filteredItems:any[]=[];
    for(i in items){
      if(items[i].price.toString().includes(workletItemsFilterText) ||
          items[i].name.toString().includes(workletItemsFilterText) ||
          items[i].description.toString().includes(workletItemsFilterText)){
        filteredItems.push(items[i]);
      }
    }

    return filteredItems;
  }

}
