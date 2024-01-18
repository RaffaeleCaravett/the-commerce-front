import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth:string ='/auth'
  private login:string ='/login'
  private signup:string ='/signup'
  public token:string=''
  private nation:string='/nation'
  private city:string='/city'

constructor(private http:HttpClient){}

logIn(body:{}){
return this.http.post(environment.API_URL+this.auth+this.login,body)
  }
  signUp(body:{}){
    return this.http.post(environment.API_URL+this.auth+this.signup,body)
      }

      getNations(){
        return this.http.get(environment.API_URL+this.nation)
      }
      getNationsByCityId(id:number){
        return this.http.get(environment.API_URL+this.nation+`/cities/${id}`)
      }
      getCitiesByNationId(id:number){
        return this.http.get(environment.API_URL+this.city+`/nationId/${id}`)
      }
}
