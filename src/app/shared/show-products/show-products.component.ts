import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
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
  isAuthenticated:boolean=false
  commenti:any[]=[]
  commentaForm!:FormGroup
  predefinedComments:any[]=[]
  constructor(private dialogRef: MatDialogRef<ShowProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private showService:ShowProductService,private toasts:ToastrService,
  private authGuard:AuthGuard) {
  }
  ngOnInit(): void {
    this.commentaForm=new FormGroup(
      {
        testo:new FormControl('',Validators.required)
      }
    )
    this.isAuthenticated=this.authGuard.isAuthenticated
    this.showService
    if(this.data[1]=='prodotto'&&this.isAuthenticated){
    this.takeRatings(this.data[0].id)
    this.showService.getCommentsByProductId(this.data[0].id).subscribe((commenti:any)=>{
      if(commenti){
        this.commenti=commenti
      }
    })
this.showService.getPredefinedComments().subscribe((data:any)=>{
  if(data){
      this.predefinedComments=data
  }
})

    }
  }


  closeDialog(param?:any): void {
    this.dialogRef.close(param||null);
  }

  rate(index:number){
    if(this.isAuthenticated){
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
})}else {
  this.toasts.error('Effettua di nuovo il login, il token è scaduto.')
}
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

 commenta(){
  console.log(this.commentaForm.valid, this.isAuthenticated)
  if(this.commentaForm.valid&&this.isAuthenticated){
    this.showService.saveComment(
 {
  testo:this.commentaForm.controls['testo'].value,
  user_id:JSON.parse(localStorage.getItem('user')!).id,
  product_id:this.data[0].id
 }
    ).subscribe((commento:any)=>{
      if(commento){
        this.toasts.success("Commento inserito.")
        this.showService.getCommentsByProductId(this.data[0].id).subscribe((commenti:any)=>{
          if(commenti){
            this.commenti=commenti
            this.commentaForm.reset()
          }
        })
      }
    },err=>{
      this.toasts.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta.')
      })
  }else{
    this.toasts.error("Sembra che il form non sia compilato o che tu debba effettuare l'accesso.")
  }
 }
}
