import { Component, OnInit,Input } from '@angular/core';
declare var jquery:any;
declare var $ :any;





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

    constructor() {}
    ngOnInit() {}


    closeCircularModal(){
      $('#openCircularModal').fadeOut('fast');
      $('body').css({overflow: 'auto', height: 'auto'});
    }

    selectItemImage(selectedImage){
      this.selectedItem.icon=selectedImage;
    }


    viewRenderedItemImg(index){
      var itemImageLoaderID = "#ItemImageLoader"+index;
      var itemImageID = "#ItemImage"+index;
      $(itemImageLoaderID).fadeOut("fast", function () {$(itemImageID).fadeIn('slow');});
    }
    viewRenderedActiveImage(){
      $('#activeImageLoader').fadeOut("fast", function () {$('#activeImage').fadeIn('slow');});
    }


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


   closeAccordion(){
     this.openAccordions=false;
   }
}
