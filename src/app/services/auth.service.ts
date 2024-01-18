import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment";
import { AuthGuard } from "../core/guard/auth.guard";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth:string ='/auth'
  private login:string ='/login'
  private signup:string ='/signup'
  public token:string=''
  public refreshToken:string=''
  private nation:string='/nation'
  private city:string='/city'

constructor(private http:HttpClient, private authGuard:AuthGuard){}

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
      setToken(token:string){
this.token=token
      }
      setRefreshToken(refreshToken:string){
        this.refreshToken=refreshToken
              }
              authenticateUser(bool:boolean){
this.authGuard.authenticateUser(bool||undefined)
              }
              verifyToken(token:string){
                return this.http.get(environment.API_URL+'/auth/'+token)
              }
              verifyRefreshToken(refreshToken:string){
                return this.http.get(environment.API_URL+'/auth/refreshToken'+refreshToken)
              }
}
