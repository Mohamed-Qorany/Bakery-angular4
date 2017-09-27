import { Component, OnInit, Input } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';
import { Subject } from 'rxjs/Rx';


declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';

@Component({
  selector: 'app-item-categories-modal',
  templateUrl: './item-categories-modal.component.html',
  styleUrls: ['./item-categories-modal.component.css']
})
export class ItemCategoriesModalComponent implements OnInit {
    Categories:any[];
    categoryObject:any={"name": "", "nominalCode": "", "categoryIcon": ""};
    categoriesListObjects:any[]=[];

    CategoriesSubmit:boolean=false;
    addCategoriesReady:boolean=false;
    @Input() selectedItem: any={};




     // We use this trigger because fetching the list of persons can be quite long,
    dtTrigger: Subject<any> = new Subject();




    constructor(private _itemService: ItemsServiceService) { }

    ngOnInit() {
      this._itemService.getCategories().subscribe((result) => {
        this.Categories = result._embedded.category;
        this.dtTrigger.next();
      });
    }

    ngOnChanges() {
      if(this.Categories && this.selectedItem){
        this._itemService.getItemCategories(this.selectedItem._links.categories.href).subscribe((result) => {
            this.selectedItem.Categories=result._embedded.category;
            for (let c of this.Categories) {
              for (let itemC of this.selectedItem.Categories) {
                if (itemC.name == c.name) {c.selected = true; break;}
              }
            }
        });
      }
    }

    cancelCategoriesModal(){
      swal({
        title: "Are you sure?", text: "Once Close The Form, you will lose the data Changes!",
        icon: "warning", buttons: true, dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // clear form
          $('.modal.CategoriesModal').modal('close');
        }else {$('.modal.CategoriesModal').modal('open');}
      });
    }

    closeAddCategory(){
      if(this.categoryObject.name!=="" || this.categoryObject.nominalCode!=="" || this.categoryObject.categoryIcon!==""){
        swal({
          title: "Are you sure?", text: "Once Close The Form, you will lose the data!",
          icon: "warning", buttons: true, dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.categoryObject={"name": "", "nominalCode": "", "categoryIcon": ""};
            $(".addCategoryContainer").fadeOut('fast');
          }else {}
        });
      }else{
        $(".addCategoryContainer").fadeOut('fast');
      }
    }

    openAddCategory(){
      $(".addCategoryContainer").fadeIn('fast');
    }

    addCategory(){
      this.addCategoriesReady=true;
      this._itemService.addCategory(this.categoryObject).subscribe((result) => {
          // console.log(result);
          this.Categories.unshift(this.categoryObject);
          this.categoryObject={"name": "", "nominalCode": "", "categoryIcon": ""};
          this.addCategoriesReady=false;
          swal({
            title: "Good job!",
            text: "Add Category!",
            icon: "success",
          }).then((willDelete) => {
            if (willDelete) {
              this.categoryObject={"name": "", "nominalCode": "", "categoryIcon": ""};
              $(".addCategoryContainer").fadeOut('fast');
            }else {}
          });
      });
    }


    assignCategories(){
        this.categoriesListObjects=[1,2];
        this.CategoriesSubmit=true;
        // for (let c of this.Categories) {
        //     if (c.selected) {this.categoriesListObjects.push(c);}
        // }
        this._itemService.assignCategories(this.selectedItem._links.self.href, this.categoriesListObjects).subscribe((result) => {
            // console.log(result);
            this.CategoriesSubmit=false;
            swal({title: "Good job!", text: "Assign Categories!", icon: "success",
            }).then((willDelete) => {
                if (willDelete) {this.categoriesListObjects=[];}else {}
            });
        });
    }
}
