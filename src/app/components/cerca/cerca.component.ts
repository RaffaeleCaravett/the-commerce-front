import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AppService } from 'src/app/services/app.service';
import { CercaService } from 'src/app/services/cerca.service';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.scss']
})
export class CercaComponent implements OnInit{
  private sub: any;
param:string = ''
prodotti:any[]=[]
user:any
isUserRegistered:boolean=false
carrello:any
categories:any
  constructor(private route: ActivatedRoute,private cercaService:CercaService,private toastr:ToastrService,private authGuard:AuthGuard,private appService:AppService){}


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.param = params['param'];
this.appService.getCategory().subscribe((categories:any)=>{
  this.categories=categories
})

this.cercaService.getProductByNomeContaining(this.param).subscribe((prodotti:any)=>{
  this.prodotti=prodotti
},err=>{
  this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
})
    })

    this.isUserRegistered=this.authGuard.isAuthenticated
    if(localStorage.getItem('user')){
      this.user=JSON.parse(localStorage.getItem('user')!)

      this.cercaService.getCarrelloByUserId(this.user.id).subscribe((carrello:any)=>{
        if(carrello){
this.carrello=carrello
        }
      })

    }

    }

    compra(prodotto:any){
      if(!this.user){
      this.toastr.error("Devi prima effettuare l'accesso")
      }else if(!this.carrello){
        this.cercaService.saveCarrello(
          {
            products_id:[prodotto.id],
            user_id:this.user.id
          }
        ).subscribe((carrello:any)=>{
          this.carrello=carrello
        this.toastr.success('Prodotto aggiunto al carrello')
        },err=>{
          this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
        })
      }else{
      this.cercaService.updateCarrelloById(this.carrello.id,{
        products_id:[prodotto.id],
        user_id:this.user.id
      }).subscribe((carrello:any)=>{
        this.carrello=carrello
      this.toastr.success('Prodotto aggiunto al carrello')
      },err=>{
        this.toastr.error(err.error.message||'Qualcosa è andato storto nell\'elaborazione della richiesta')
      })
      }
        }

        addToFavourites(prodotto:any){
          if(this.user&&this.isUserRegistered){
          this.cercaService.saveLike(
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
}
