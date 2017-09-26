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





    //Item Modal
    @Input()
    itemModalTitle:String=" ";

    @Input()
    itemModalTitleIcon:String=" ";




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

    // activeItem(id:number, status:boolean){
    //     this._itemService.activateItem(id,status).subscribe(
    //         (result) => console.log(result),
    //         (err) => console.error(err),
    //         () => console.log('Authentication Complete')
    //     );
    // }

    activeItem(item, e) {
        var isChecked = e.target.checked;
        console.log(item._links.self.href);
        console.log(isChecked);
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willActive) => {
            if (willActive) {
                swal("success!",{icon: "success",});
            }else {

            }
        });


        this._itemService.activateItem(item._links.self.href,isChecked);
    }

    openEditItemModal(){
        this.closeCircularModal();
        console.log("edit")
        $('.modal.ItemModal').modal('open');
    }

}
