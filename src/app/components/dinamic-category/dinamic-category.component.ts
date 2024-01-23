import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AppService } from 'src/app/services/app.service';
import { DinamicService } from 'src/app/services/dinamic.service';

@Component({
  selector: 'app-dinamic-category',
  templateUrl: './dinamic-category.component.html',
  styleUrls: ['./dinamic-category.component.scss']
})
export class DinamicCategoryComponent implements OnInit, OnDestroy{
  id: number=0;
  private sub: any;
  products:any=null
category:any
user:any
isUserRegistered:boolean=false
carrello:any
  constructor(private route: ActivatedRoute,private dinamicService:DinamicService,private toastr:ToastrService,private authGuard:AuthGuard) {}

  ngOnInit() {
    this.isUserRegistered=this.authGuard.isAuthenticated
    if(localStorage.getItem('user')){
      this.user=JSON.parse(localStorage.getItem('user')!)

      this.dinamicService.getCarrelloByUserId(this.user.id).subscribe((carrello:any)=>{
        console.log(carrello)
        if(carrello){
this.carrello=carrello
        }
      })

    }
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
this.dinamicService.getCategoryById(this.id).subscribe((data:any)=>{
  if(data){
    this.category=data
  }
this.dinamicService.getProductsByCategoryId(this.category.id).subscribe((products:any)=>{
  if(products){
    this.products=products.content;
  }
})

})
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  compra(prodotto:any){
if(!this.user){
this.toastr.error("Devi prima effettuare l'accesso")
}else if(!this.carrello){
  this.dinamicService.saveCarrello(
    {
      products_id:[prodotto.id],
      user_id:this.user.id
    }
  ).subscribe((carrello:any)=>{
    this.carrello=carrello
  },err=>{
    this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
  })
}else{
this.dinamicService.updateCarrelloById(this.carrello.id,{
  products_id:[prodotto.id],
  user_id:this.user.id
}).subscribe((carrello:any)=>{
  this.carrello=carrello
},err=>{
  this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
})
}
  }

  addToFavourites(prodotto:any){
    if(this.user&&this.isUserRegistered){
    this.dinamicService.saveLike(
      {
        product_id:prodotto.id,
        user_id:this.user.id
      }
    ).subscribe((like:any)=>{
      if(like){
        this.toastr.success(like)
      }
    },err=>{
if(err.error.text=='Prodotto aggiunto ai preferiti'){
  this.toastr.success(err.error.text)
}else{
      this.toastr.error(err.error.text)
}
    })
  }else{
    this.toastr.error('Il token è scaduto, effettua di nuovo l\'accesso')
  }
  }

  deleteFromCarrello(carrelloId:number,itemId:number){
    this.dinamicService.removeItemFromCarrelloById(carrelloId,itemId).subscribe((carrello:any)=>{
      if(carrello){
        this.carrello=carrello
      }
      this.toastr.success('Elemento rimosso correttamente.')
    },err=>{
      this.toastr.error(err.error.message||'Problema nell\'elaborazione della richiesta.')
    })
  }

  pagaCarrello(carrello:number){
    if(this.user&&this.isUserRegistered){
      let prodotti=[]
      for(let c of this.carrello.products){
        prodotti.push(c.id)
      }
      if(prodotti.length>0){
       this.dinamicService.saveAcquisto({
  user_id:this.user.id,
  product_id:prodotti

}).subscribe((acquisto:any)=>{
  if(acquisto){
    this.toastr.success('Acquisto effettuato correttamente')
    this.svuotaCarrello(this.carrello.id)
  }
},err=>{
  this.toastr.error(err.error.message||"Qualcosa è andato storto nell\'elaborazione della risposta")
})
      }else{
        this.toastr.error("Il carrello è vuoto")
      }

    }else{
      this.toastr.error("Il token non è valido, effettua di nuovo l'accesso")
    }
  }

  svuotaCarrello(carrelloId:number,param?:string){
    if(this.carrello&&this.carrello.products&&this.carrello.products.length>0){
    this.dinamicService.svuotaCarrello(carrelloId).subscribe((carrello:any)=>{
      if(carrello){
        this.carrello=carrello
      }
              this.toastr.success('Carrello svuotato correttamente.')
    },err=>{
      this.toastr.error(err.error.message||'Problema nell\'elaborazione della richiesta.')
    })
  }else{
    this.toastr.error('Il carrello è vuoto.')
  }
  }
}
