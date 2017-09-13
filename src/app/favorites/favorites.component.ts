import { Component, OnInit,Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import {FavoritesService} from './favorites.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ItemsSummary } from './items-summary';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  providers: [FavoritesService]
})
export class FavoritesComponent implements OnInit {

    url = "https://item.cfapps.io/cm/item";
    workletName:String="Item";
    viewType="grid";
    workletItemsFilterText;
    allFavorites:any[]=[];
    favorites:any[]=[];
    orderByFields:any[]= [{field:'title'},{field:'description'},{field:'price'}];
    orderByValue="title";
    favoritLoaded=false;
    currentItem:any={description: "", icon: "",itemIcons:[],name:"",price:"",subDescription:""};

    //paganation
    loading = false;
    total = 0; //total number of items in all pages
    page = 1; //current page
    limit = 3; //number of items per page
    from:number = (this.page*this.limit)-this.limit;
    to:number = this.page*this.limit;



    observableItemsSummary: Observable<ItemsSummary[]>
    itemsSummaryResult:String="";
    errorMessage: String;




    constructor(private _favoritesService: FavoritesService, private http:Http) {}
    ngOnInit() {
        // this.allFavorites = this._favoritesService.getFavoriteItems();
          this.http.get(this.url).subscribe((response: Response)=>{
              const result = response.json();

              this.allFavorites = result._embedded.item;
              for (let item of this.allFavorites) {
                  item.subDescription= item.description.substring(0,255);
                  //get item icons
                  this.http.get(item._links.icons.href).subscribe((iconsResponse: Response)=>{
                      item.itemIcons= iconsResponse.json()._embedded.icon;
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
        this.currentItem=currentItem;
        $('body').css({overflow: 'hidden', height: '100%'});
        $('#openCircularModal').fadeIn();
        // $('#ietemTitle').text(this.currentItem.name);
        // $('#itemDesc').text(this.currentItem.description);
        // $('#itemPrice').text('$'+this.currentItem.price);
        // $('#itemImg').attr('src', this.currentItem.icon);
        // console.log(this.currentItem);
        // $('#openCircularModale').click();
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

    orderItems(orderby){
        console.log("orderBy");
        console.log(orderby);
        this.orderByValue = orderby;
    }

    getValueFromSelect(val){
        this.orderByValue=val;
        // console.log(this.orderByValue);
    }
}
