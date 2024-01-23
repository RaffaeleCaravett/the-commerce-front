import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { use } from "echarts";
import { environment } from "src/environment";


@Injectable({
  providedIn: 'root'
})
export class DinamicService {

private category:string='/category';
private products:string='/products';
private carrello:string='/carrello'
  constructor(private http:HttpClient){}

getProductsByCategoryId(categoryId:number){
return this.http.get(environment.API_URL+this.products+this.category+`/${categoryId}`)
}
getCategories(){
  return this.http.get(environment.API_URL+this.category)
}
getCategoryById(id:number){
  return this.http.get(environment.API_URL+this.category+`/${id}`)
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
}
