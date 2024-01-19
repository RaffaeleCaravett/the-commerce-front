import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private visit:string='/visit'
  private category:string='/category'
  private ricerca:string='/ricerca'


  constructor(private http:HttpClient) { }

saveVisit(){
  return this.http.post(environment.API_URL+this.visit,{})
}
getVisit(){
  return this.http.get(environment.API_URL+this.visit)
}
getCategory(){
  return this.http.get(environment.API_URL+this.category)
}
getCategoryById(id:number){
  return this.http.get(environment.API_URL+this.category+`/${id}`)
}
saveRicerca(ricerca:{}){
  return this.http.post(environment.API_URL+this.ricerca,ricerca)
}
}
