import { Component, OnInit,Input } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';

declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';



@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  providers: [ItemsServiceService]
})
export class EditItemComponent implements OnInit {

  @Input()
  selectedItem;

  formSubmit:boolean=false;
  itemObject:any=this.selectedItem;

  constructor(private _itemService: ItemsServiceService) { }
  ngOnInit() {}



  cancelItemEditModal(){
    swal({
      title: "Are you sure?",
      text: "Once Close The Form, you will lose the data entered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        this.selectedItem=this.itemObject;
        $('.modal.ItemModal').modal('close');
      }else {
        $('.modal.ItemModal').modal('open');
      }
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

}
