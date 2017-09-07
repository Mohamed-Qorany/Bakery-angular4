import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { ItemsSummary } from './items-summary';


@Injectable()
export class FavoritesService {

    url = "https://item.cfapps.io/cm/item";
    resultData=[];
  constructor(private http:Http) { }

  workletItems=[
      {
        id:0, title:"Title One", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam",
        img:"assets/resources/IMG/cardImage.jpg", price:"20"
      },
      {
        id:1, title:"Title Two", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
        img:"assets/resources/IMG/cardImage.jpg", price:"40"
      },
      {
        id:2, title:"Title Thee", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
        img:"assets/resources/IMG/cardImage.jpg", price:"50"
      },
      {
        id:3, title:"Title Four", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
        img:"assets/resources/IMG/cardImage.jpg", price:"20"
      },
      {
        id:4, title:"Title Five", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
        img:"assets/resources/IMG/cardImage.jpg", price:"30"
      },
      {
        id:5, title:"Title Six", description:"Lorem ipsum ces ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.",
        img:"assets/resources/IMG/cardImage.jpg", price:"20"
      }
  ]

  getFavoriteItems(){
    return this.workletItems;
  }


    // getItems():[]{
    //     // this.http.get(this.url)
    //     //     .map((response: Response) => <any[]> response.json())
    //     //     .catch(this.handleErrorObservable).do(data => { return JSON.stringify(data)});
    //     this.http.get(this.url).subscribe((response: Response)=>{
    //         const result = response.json();
    //         this.resultData = result._embedded.item;
    //         console.log(this.resultData)
    //         return result._embedded.item;;
    //     });
    //
    //
    // }

}