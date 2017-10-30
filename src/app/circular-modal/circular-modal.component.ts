import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {ItemsServiceService} from '../items-component/items-service.service';

declare var jquery:any;
declare var $ :any;
import * as swal from 'sweetalert';


@Component({
  selector: 'app-circular-modal',
  templateUrl: './circular-modal.component.html',
  styleUrls: ['./circular-modal.component.css']
})
export class CircularModalComponent implements OnInit {

    @Input() selectedItem: any={};
    actions:boolean=true;
    activeSupplier:boolean=false;
    product:boolean=false;
    values:boolean=false;
    categories:boolean=false;
    openAccordions:boolean=true;



    constructor(private _itemService: ItemsServiceService) {}
    ngOnInit() {}


    closeCircularModal(){
      $('#openCircularModal').fadeOut('fast');
      $('body').css({overflow: 'auto', height: 'auto'});
    }

    selectItemImage(selectedImage){this.selectedItem.activeIcon=selectedImage;}

    viewRenderedItemImg(index){
      var itemImageLoaderID = "#ItemImageLoader"+index;
      var itemImageID = "#ItemImage"+index;
      $(itemImageLoaderID).fadeOut("fast", function () {$(itemImageID).fadeIn('slow');});
    }

    viewRenderedActiveImage(){$('#activeImageLoader').fadeOut("fast", function () {$('#activeImage').fadeIn('slow');});}

    openAccordion(accordion){
      this.openAccordions=true;
      if(accordion=='actions'){
        this.activeSupplier=false;
        this.product=false;
        this.values=false;
        this.actions=true;
        this.categories=false;
      }
      if(accordion=='values'){
        this.activeSupplier=false;
        this.categories=false;
        this.product=false;
        this.actions=false;
        this.values=true;
        this.categories=false;
      }
      if(accordion=='product'){
        this.activeSupplier=false;
        this.actions=false;
        this.values=false;
        this.product=true;
        this.categories=false;
      }
      if(accordion=='activeSupplier'){
        this.actions=false;
        this.categories=false;
        this.values=false;
        this.product=false;
        this.activeSupplier=true;
      }
      if(accordion=='categories'){
        this.actions=false;
        this.values=false;
        this.product=false;
        this.activeSupplier=false;
        this.categories=true;
      }
    }

    closeAccordion(){this.openAccordions=false;}

    openEditItemModal(){
        this.closeCircularModal();
        $('.modal.ItemModal').modal('open');
    }

    openCategoriesModal(){$('.modal.CategoriesModal').modal('open');}

    activeItem(e) {
        var isChecked = e.target.checked;
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willActive) => {
            if (willActive) {
                this._itemService.activateItem(this.selectedItem._links.self.href,isChecked).subscribe((result) => {
                    this.selectedItem.active=isChecked;
                    console.log(result);
                    swal({title: "Good job!", text: "Active/Deactivate Item!", icon: "success"});
                });
            }else {}
        });
    }

    deleteItem(){
        swal({
            title: "Are you sure?",
            text: "Please Confirm Delete This Item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willActive) => {
            if (willActive) {
                this._itemService.deleteItem(this.selectedItem._links.self.href).subscribe((result) => {
                    console.log(result);
                    swal({
                        title: "Good job!",
                        text: "Delete Item!",
                        icon: "success"
                    });
                    //reload page to refresh items list
                    window.location.reload();
                });
            }else {}
        });
    }

}
