import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class FavoritesService {

    url = "https://item.cfapps.io/cm/item";
    constructor(private http:Http) { }


    getItems(){
        return this.http.get(this.url).map(response => response.json());
    }
}