import { Component, OnInit,Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import {ItemsServiceService} from './items-service.service';
import 'rxjs/Rx';

declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';

@Component({
  selector: 'app-items-component',
  templateUrl: './items-component.component.html',
  styleUrls: ['./items-component.component.css'],
  providers: [ItemsServiceService]
})
export class ItemsComponentComponent implements OnInit {

  workletName:String="Item";
  viewType="grid";
  workletItemsFilterText;
  allFavorites:any[]=[];
  favorites:any[]=[];
  orderByFields:any[]= [{field:'title'},{field:'description'},{field:'price'}];
  orderByValue="title";
  favoritLoaded=false;
  currentItem:any={
    "name": "", "description": "", "icon": "", "active": false,
    "product": {
      "upc": "",
      "brand": {"brandName": "", "brandRate": "", "brandLogo": ""},
      "dimesion": {"width": 0, "height": 0, "length": 0, "breadth": 0, "depth": 0, "weight": 0},
      "characteristic": {"lequid": false, "fraguile": false}
    },
    "value": {
      "quantity": 0, "unit": "", "price": 0, "cost": 0, "deliveryPrice": 0, "deliveryCost": 0, "taxExempted": false,
      "taxLevel": {
        "taxUnit": "", "costTax": 0, "priceTax": 0,
        "taxGroup": []
      },
      "discount": 0,
      "exception": [],
      "restockLevel": 0, "reorderThreshold": 0
    }
  };






  //Item Modal
  itemModalTitle:String=" ";
  itemModalTitleIcon:String=" ";



  //paganation
  loading = false;
  total = 0; //total number of items in all pages
  page = 1; //current page
  limit = 3; //number of items per page
  from:number = (this.page*this.limit)-this.limit;
  to:number = this.page*this.limit;



  constructor(private _itemService: ItemsServiceService) {}
  ngOnInit() {
    this._itemService.getItems().subscribe((result) => {
      this.allFavorites = result._embedded.item;
      for (let item of this.allFavorites) {
        item.subDescription= item.description.substring(0,255);
        item.activeIcon= item.icon;
        //get item icons
        this._itemService.getItemIcons(item._links.icons.href).subscribe((result) => {
          item.itemIcons= result._embedded.icon;
        });
      }
      this.total = this.allFavorites.length;
      this.favorites=this.allFavorites.slice(this.from, this.to);
      this.favoritLoaded=true;
    });
  }




  //paganation controls
  getFavorites(): void {
    this.from = (this.page*this.limit)-this.limit;
    this.to = this.page*this.limit;
    this.favorites=this.allFavorites.slice(this.from, this.to);
  }
  goToPage(n: number): void {this.page = n;this.getFavorites();}
  onNext(): void {this.page++;this.getFavorites();}
  onPrev(): void {this.page--;this.getFavorites();}



  //Item list UI controls
  setItemsView(viewType){this.viewType=viewType;}

  openItemDescription(currentItem){
    this._itemService.getItem(currentItem._links.self.href).subscribe((result) => {
      this.currentItem = result;
      this.currentItem.activeIcon= result.icon;
      this.currentItem.itemIcons=currentItem.itemIcons;
    });
    this.itemModalTitleIcon="edit";
    this.itemModalTitle="Edit Item";
    $('body').css({overflow: 'hidden', height: '100%'});
    $('#openCircularModal').fadeIn();
  }

  viewitemImg(index){
    if(this.viewType == "grid"){
      var loaderID = "#gridImgLoader"+index;
      var imgID = "#gridImg"+index;
      $(loaderID).fadeOut("fast", function () {$(imgID).fadeIn('slow');});
    }else{
      var loaderID = "#listImgLoader"+index;
      var imgID = "#listImg"+index;
      $(loaderID).fadeOut("fast", function () {$(imgID).fadeIn('slow');});
    }
  }

  getValueFromSelect(val){this.orderByValue=val;}

  openAddItemModal(){
    this.itemModalTitleIcon="add";
    this.itemModalTitle="Add New Item";
    $('.tooltipped').tooltip('remove');$('.modal.ItemModal').modal('open');
  }

  openEditItemModal(){
    this.itemModalTitleIcon="edit";
    this.itemModalTitle="Edit Item";
    $('.modal.ItemModal').modal('open');
  }
}
