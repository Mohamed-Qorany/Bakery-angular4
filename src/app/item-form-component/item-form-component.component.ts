import { Component, OnInit,Input } from '@angular/core';

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

  submitSuccess:boolean=true;


  constructor() { }
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
    console.log("add submit");
  }

  editItem(){
    console.log("edit submit");

  }

  submitItem(){
    if(this.itemModalTitleIcon=="add"){
      this.addItem();
    }else{
      this.editItem();
    }
  }
}
