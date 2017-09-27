import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {AppSettings} from '../app-settings';

@Injectable()
export class ItemsServiceService {

  constructor(private http:Http) {}

  getItems(){return this.http.get(AppSettings.API_ENDPOINT+'item').map(response => response.json());}
  getItem(itemPath){return this.http.get(itemPath).map(response => response.json());}
  getItemIcons(IconsPath){return this.http.get(IconsPath).map(response => response.json());}
  getItemCategories(CategoriesPath){return this.http.get(CategoriesPath).map(response => response.json());}



  getCategories(){return this.http.get(AppSettings.API_ENDPOINT+'category').map(response => response.json());}
  addCategory(category){return this.http.post(AppSettings.API_ENDPOINT+'category', category).map(response => response.json());}
  assignCategories(itemPath, categories){return this.http.put(itemPath+'/category', categories).map(response => response.json());}


  deleteItem(itemPath){return this.http.put(itemPath, {}).map(response => response.json());}
  activateItem(itemPath, status){
    const URL=itemPath+'/activate/'+status;
    return this.http.put(itemPath, {}).map(response => response.json());
  }
  addItem(item){return this.http.post(AppSettings.API_ENDPOINT+'item', item).map(response => response.json());}
  editItem(itemPath, item){return this.http.put(itemPath, item).map(response => response.json());}


}
