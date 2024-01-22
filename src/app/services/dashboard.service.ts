import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private acquisto:string='/acquisto'
private bozza:string='/bozza'
private ricerca:string='/ricerca'
private anagrafica:string='/scheda'
private like:string='/like'
private rating:string='/api/ratings'
private societa:string='/societa'
private category:string='/category'
private prodotto:string='/products'

constructor(private http:HttpClient){}


  getAcquisti(userId:number){
    return this.http.get(environment.API_URL+this.acquisto+`/user/${userId}`)
  }
  getBozza(userId:number){
    return this.http.get(environment.API_URL+this.bozza+`/user/${userId}`)
  }
  getRicerca(userId:number){
    return this.http.get(environment.API_URL+this.ricerca+`/user/${userId}`)
  }
  getLike(userId:number){
    return this.http.get(environment.API_URL+this.like+`/user/${userId}`)
  }
  getRating(userId:number){
    return this.http.get(environment.API_URL+this.rating+`/user/${userId}`)
  }
  saveAnagrafica(anagrafica:any){
    return this.http.post(environment.API_URL+this.anagrafica,anagrafica)
  }
  getAnagraficaByUserId(userId:any){
    return this.http.get(environment.API_URL+`${this.anagrafica}/user/${userId}`)
  }
  updateAnagraficaById(anagraficaId:any,body:{}){
    return this.http.put(environment.API_URL+`${this.anagrafica}/${anagraficaId}`,body)
  }
  saveSocieta(societa:{}){
    return this.http.post(environment.API_URL+this.societa,societa)
  }
  getSocietaByAnagraficaId(anagraficaId:number){
    return this.http.get(environment.API_URL+this.societa+'/'+anagraficaId)
  }
  deleteSocieta(id:number){
    return this.http.delete(environment.API_URL+this.societa+`/${id}`)
  }
  updateSociety(societyId:number,society:{}){
    return this.http.put(environment.API_URL+this.societa+'/'+societyId,society)
  }
  getCategory(){
    return this.http.get(environment.API_URL+this.category)
  }
saveProdotto(prodotto:{},file:File){

  const formData: FormData = new FormData();


  const json = JSON.stringify(prodotto);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  formData.append('productDTO', blob);
  formData.append('immagine_profilo', file, file.name);

  return this.http.post(environment.API_URL + this.prodotto, formData);
}
getProdottBySocietàId(societàId:number){
  return this.http.get(environment.API_URL+this.prodotto+`/${societàId}`)
}
}
