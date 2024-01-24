import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CercaService {

  private product:string='/products'


  constructor(private http:HttpClient,private router :Router) { }


getProductByNomeContaining(productName:string){
  return this.http.get(environment.API_URL+this.product+`/nome/${productName}`)
}

}
