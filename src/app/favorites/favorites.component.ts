import { Component, OnInit } from '@angular/core';
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
    workletName:String="Favorites";
    viewType="grid";
    workletItemsFilterText;
    allFavorites:any[];
    favorites:any[];
    orderByFields = ['title', 'description', 'price'];
    orderByValue='ddd';
    favoritLoaded=false;
    currentItem;
    //paganation
    loading = false;
    total = 0; //total number of items in all pages
    page = 1; //current page
    limit = 6; //number of items per page
    from:number = (this.page*this.limit)-this.limit;
    to:number = this.page*this.limit;



    observableItemsSummary: Observable<ItemsSummary[]>
    itemsSummaryResult:String="";
    errorMessage: String;




      constructor(private _favoritesService: FavoritesService, private http:Http) {}

      ngOnInit() {
        // this.allFavorites = this._favoritesService.getFavoriteItems();
        // for (let item of this.allFavorites) {
        //   item.subDescription= item.description.substring(0,255);
        // }
        // this.total = this.allFavorites.length;
        // this.favorites=this.allFavorites.slice(this.from, this.to);

          this.http.get(this.url).subscribe((response: Response)=>{
              const result = response.json();
              this.allFavorites = result._embedded.item;
              for (let item of this.allFavorites) {
                  item.subDescription= item.description.substring(0,255);
              }
              this.total = this.allFavorites.length;
              this.favorites=this.allFavorites.slice(this.from, this.to);
              this.favoritLoaded=true;
          });


          // console.log(this._favoritesService.getItems());
      }


     setItemsView(viewType){this.viewType=viewType;}


     getFavorites(): void {
         this.from = (this.page*this.limit)-this.limit;
         this.to = this.page*this.limit;
         this.favorites=this.allFavorites.slice(this.from, this.to);
     }


     goToPage(n: number): void {
        this.page = n;
        this.getFavorites();
     }

     onNext(): void {
        this.page++;
        this.getFavorites();
     }

     onPrev(): void {
        this.page--;
        this.getFavorites();
     }



    openItemDescription(currentItem){
        this.currentItem=currentItem;
        $('#ietemTitle').text(this.currentItem.name);
        $('#itemDesc').text(this.currentItem.description);
        $('#itemPrice').text('$'+this.currentItem.price);
        $('#itemImg').attr('src', this.currentItem.icon);


        console.log(this.currentItem);
        $('#openCircularModale').click();
    }
}
