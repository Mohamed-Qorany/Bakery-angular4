import { Component, OnInit,Input } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';

declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [ItemsServiceService]
})
export class AddItemComponent implements OnInit {



  formSubmit:boolean=false;
  defaultItem:any={
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
  itemObject:any;

  constructor(private _itemService: ItemsServiceService) { }
  ngOnInit() {
    this.itemObject = this.defaultItem;
  }



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
        this.itemObject = this.defaultItem;
      }else {
        $('.modal.ItemModal').modal('open');
      }
    });
  }

  addItem(){
    this.formSubmit=true;
    this._itemService.addItem(this.itemObject).subscribe((result) => {
      this.itemObject=this.defaultItem;
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
}
