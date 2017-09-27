import { Component, OnInit,Input } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';

declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';


@Component({
  selector: 'app-item-form-component',
  templateUrl: './item-form-component.component.html',
  styleUrls: ['./item-form-component.component.css']
})
export class ItemFormComponentComponent implements OnInit {

  @Input()
  itemModalTitle:String=" ";
  @Input()
  itemModalTitleIcon:String=" ";
  @Input()
  selectedItem;

  formSubmit:boolean=false;
  defaultItem:any={
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
    },
    "Categories":[]

  };

  constructor(private _itemService: ItemsServiceService) { }
  ngOnInit() {}



  cancelItemAddModal(){
    swal({
      title: "Are you sure?",
      text: "Once Close The Form, you will lose the data entered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // clear form
        $('.modal.ItemModal').modal('close');
      }else {
        $('.modal.ItemModal').modal('open');
      }
    });
  }

  addItem(){
    this.formSubmit=true;
    this._itemService.addItem(this.selectedItem).subscribe((result) => {
      console.log(result);
      this.selectedItem=this.defaultItem;
      this.formSubmit=false;
      swal({
        title: "Good job!",
        text: "Add Item!",
        icon: "success",
      }).then((willDelete) => {
        //reload page to refresh items list
        window.location.reload();
      });
    });
  }

  editItem(){
    this.formSubmit=true;
    this._itemService.editItem(this.selectedItem._links.self.href, this.selectedItem).subscribe((result) => {
      console.log(result);
      this.formSubmit=false;
      swal({
        title: "Good job!",
        text: "Edit Item!",
        icon: "success",
      }).then((willDelete) => {
        //reload page to refresh items list
        window.location.reload();
      });
    });
  }

  submitItem(){
    if(this.itemModalTitleIcon=="add"){this.addItem();}else{this.editItem();}
  }
}
