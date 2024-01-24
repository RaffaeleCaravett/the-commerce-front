import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShowProductService } from 'src/app/services/showProduct.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit{
  rating: number = 0;
  hoverRating: number = 0;
  stars = [1, 2, 3, 4, 5];
  alreadyCensed:boolean=false
  media:number=0
  ratingSum:number=0
  constructor(private dialogRef: MatDialogRef<ShowProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private showService:ShowProductService,private toasts:ToastrService) {
  }
  ngOnInit(): void {
    this.showService
    if(this.data[1]=='prodotto')
    this.takeRatings(this.data[0].id)
  }


  closeDialog(param?:any): void {
    this.dialogRef.close(param||null);
  }

  rate(index:number){
this.showService.saveRating({
  product_id:this.data[0].id,
  user_id:JSON.parse(localStorage.getItem('user')!).id,
  rating:index
}).subscribe((rating:any)=>{
  if(rating){
    this.alreadyCensed=true
      this.rating=rating.rating
      this.takeRatings(this.data[0].id)
  }
},err=>{
  this.toasts.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta.')
})
  }
  takeRatings(dataId:number){

    this.media=0
   this.ratingSum=0

   this.showService.getRatingsByProductId(dataId).subscribe((dat:any)=>{
     if(dat){
      dat.forEach((da:any)=>{

        if(da.product.id==this.data[0].id && da.user.id==JSON.parse(localStorage.getItem('user')!).id){
          this.alreadyCensed=true
          this.rating=da.rating
        }
        this.ratingSum+= da.rating
      })
      this.media=parseFloat((this.ratingSum / dat.length).toFixed(1));
      if(Number.isNaN(this.media)){
        this.media=0
      }
    }
    })

 }
}
