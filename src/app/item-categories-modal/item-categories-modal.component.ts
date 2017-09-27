import { Component, OnInit } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';


declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';

@Component({
  selector: 'app-item-categories-modal',
  templateUrl: './item-categories-modal.component.html',
  styleUrls: ['./item-categories-modal.component.css']
})
export class ItemCategoriesModalComponent implements OnInit {

  CategoriesReady:boolean=true;
  Categories:any[];
  categoriesFilterText:String="";
  selectedCategories:any[];

  constructor(private _itemService: ItemsServiceService) { }
  ngOnInit() {
    this._itemService.getCategories().subscribe((result) => {
      this.Categories = result._embedded.category;
    });
  }


  selectCategory(category){
    var selected=false;
    for (let c of this.Categories) {
        if(category == c){
          selected=true;
          break;
        }
    }
    if(!selected){
      this.selectedCategories.push(category);
    }


  }
}
