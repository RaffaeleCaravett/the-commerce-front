import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

private acquisto:string='/acquisto'
private bozza:string='/bozza'

  constructor(private http:HttpClient){}


  getAcquisti(userId:number){
    return this.http.get(environment.API_URL+this.acquisto+`/user/${userId}`)
  }
  getBozza(userId:number){
    return this.http.get(environment.API_URL+this.bozza+`/user/${userId}`)
  }
}
