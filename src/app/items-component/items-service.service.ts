import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import {AppSettings} from '../app-settings';

@Injectable()
export class ItemsServiceService {
  headers: Headers;


  constructor(private http:Http) {
    this.headers = new Headers({ 'Content-Type': 'text/plain'});
  }

  getItems(){return this.http.get(AppSettings.API_ENDPOINT+'item').map(response => response.json());}
  getItem(itemPath){return this.http.get(itemPath).map(response => response.json());}
  getItemIcons(IconsPath){return this.http.get(IconsPath).map(response => response.json());}
  getCategories(IconsPath){return this.http.get(AppSettings.API_ENDPOINT+'category').map(response => response.json());}




  activateItem(itemPath, status){

    const URL=itemPath+'/activate/'+status;

    const payload = {};
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(URL,payload, this.headers)
        .map(response => response.json())
        .subscribe(
            response => response.json(),
            (err) => console.error(err),
            () => console.log('Authentication Complete')
        );




    // var URL=itemPath;
    //
    // const body = JSON.stringify(status);
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    //
    //
    // return this.http.put(itemPath, {activate:status}, headers).map((data:Response) =>data.json());


    // return this.http.put().map(response => response.json());
  }

}
