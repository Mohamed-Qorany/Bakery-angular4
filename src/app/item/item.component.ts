import { Component, OnInit,Directive, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import {ItemService} from './item.service';
import 'rxjs/Rx';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {

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



    constructor(private _itemService: ItemService) {}
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

        // this._itemService.getItem(currentItem._links.self).subscribe((result) => {
        //     // this.currentItem = result;
        //     console.log(result);
        // });
        //
        // console.log(currentItem);
        // $('body').css({overflow: 'hidden', height: '100%'});
        // $('#openCircularModal').fadeIn();


        console.log(currentItem);
        this.currentItem=currentItem;
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

}
