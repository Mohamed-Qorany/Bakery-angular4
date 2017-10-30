import { Component, OnInit} from '@angular/core';
import {ItemsServiceService} from './items-service.service';
import 'rxjs/Rx';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-items-component',
  templateUrl: './items-component.component.html',
  styleUrls: ['./items-component.component.css'],
  providers: [ItemsServiceService]
})
export class ItemsComponentComponent implements OnInit {

  viewType="grid";
  workletItemsFilterText;
  allFavorites:any[]=[];
  favorites:any[]=[];
  orderByFields:any[]= [{field:'title'},{field:'description'},{field:'price'}];
  orderByValue="title";
  itemLoading:boolean=false;
  itemDescriptionLoading:boolean=false;

  defaultCurrentItem:any={
    name: null, description: null, icon: null, active: false,
    product: {
      upc: null,
      brand: {brandName: null, brandRate: null, brandLogo: null},
      dimesion: {width: 0, height: 0, length: 0, breadth: 0, depth: 0, weight: 0},
      characteristic: {lequid: false, fraguile: false}
    },
    value: {
      quantity: 0, unit: null, price: 0, cost: 0, deliveryPrice: 0, deliveryCost: 0, taxExempted: false,
      taxLevel: {taxUnit: null, costTax: 0, priceTax: 0, taxGroup: []},
      discount: 0,
      exception: [],
      restockLevel: 0, reorderThreshold: 0
    },
    Categories:[]
  };
  currentItem:any;

  //paganation
  loading = false;
  total = 0; //total number of items in all pages
  page = 1; //current page
  limit = 3; //number of items per page
  from:number = (this.page*this.limit)-this.limit;
  to:number = this.page*this.limit;



  constructor(private _itemService: ItemsServiceService) {}
  ngOnInit() {
    this.currentItem = this.defaultCurrentItem;
    this.getItems();
  }


  getItems(){
    this._itemService.getItems().subscribe((result) => {
      for (let item of result._embedded.item) {
        if(item.description){
          item.subDescription= item.description.substring(0,255);
          item.activeIcon= item.icon;
          //get item icons
          this._itemService.getItemIcons(item._links.icons.href).subscribe((result) => {
            item.itemIcons= result._embedded.icon;
          });
          this.allFavorites.push(item);
        }
      }
      this.total = this.allFavorites.length;
      this.favorites=this.allFavorites.slice(this.from, this.to);
      this.itemLoading=true;
    });
  }


  //Items pagination controls
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
    this.itemDescriptionLoading=true;
    this._itemService.getItem(currentItem._links.self.href).subscribe((result) => {
          this.currentItem = result;
          this.currentItem.activeIcon= result.icon;
          this.currentItem.itemIcons=currentItem.itemIcons;
      },
      (err) => console.error(err),
      () => {
        this.itemDescriptionLoading=false;
        if(this.currentItem.product == null){this.currentItem.product = this.defaultCurrentItem.product;}
        if(this.currentItem.value == null){this.currentItem.value = this.defaultCurrentItem.value;}
        $('body').css({overflow: 'hidden', height: '100%'});
        $('#openCircularModal').fadeIn();
      }
    );
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

  openAddItemModal(){$('.tooltipped').tooltip('remove');$('.modal.ItemModal').modal('open');}

}
