import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private visit:string='/visit'
  private category:string='/category'
  private ricerca:string='/ricerca'


  constructor(private http:HttpClient,private router :Router) { }

  goHome(){
return this.router.navigate(['/home'])
  }
saveVisit(){
  return this.http.post(environment.API_URL+this.visit,{})
}
getVisit(){
  return this.http.get(environment.API_URL+this.visit)
}
getCategory(){
  return this.http.get(environment.API_URL+this.category)
}

saveRicerca(ricerca:{}){
  return this.http.post(environment.API_URL+this.ricerca,ricerca)
}
}
