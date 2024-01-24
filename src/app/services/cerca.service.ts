import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CercaService {

  private product:string='/products'
  private carrello:string='/carrello'
  private like:string='/like'


  constructor(private http:HttpClient,private router :Router) { }


getProductByNomeContaining(productName:string){
  return this.http.get(environment.API_URL+this.product+`/nome/${productName}`)
}

saveCarrello(carrello:{}){
  return this.http.post(environment.API_URL+this.carrello,carrello)
}
updateCarrelloById(carrelloId:number,carrello:{}){
  return this.http.put(environment.API_URL+this.carrello+`/${carrelloId}`,carrello)
}
getCarrelloByUserId(userId:number){
  return this.http.get(environment.API_URL+this.carrello+`/user/${userId}`)
}
svuotaCarrello(carrelloId:number){
  return this.http.get(environment.API_URL+this.carrello+`/svuota/${carrelloId}`)
}
removeItemFromCarrelloById(carrelloId:number,itemId:number){
  return this.http.get(environment.API_URL+this.carrello+`/prodotto/${carrelloId}/${itemId}`)
}
saveLike(like:{}){
  return this.http.post(environment.API_URL+this.like,like)
}
}
