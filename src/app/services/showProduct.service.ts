import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowProductService {

  private predefinedComments:string='/predefinedComments'
  private comments:string='/commentUser'
  private ratings:string='/api/ratings'



  constructor(private http:HttpClient,private router :Router) { }

  getPredefinedComments(){
    return this.http.get(environment.API_URL+this.predefinedComments)
  }
  getPredefinedCommentsByProductId(productId:number){
    return this.http.get(environment.API_URL+this.predefinedComments+`/product/${productId}`)
  }
  savePredefinedComment(predefinedComment:{}){
    return this.http.post(environment.API_URL+this.predefinedComments,predefinedComment)
  }
  deletePredefinedComment(predefinedCommentId:number){
    return this.http.delete(environment.API_URL+this.predefinedComments+`/${predefinedCommentId}`)
  }
getCommentsByProductId(productId:number){
  return this.http.get(environment.API_URL+this.comments+`/product/${productId}`)
}
saveComment(comment:{}){
  return this.http.post(environment.API_URL+this.comments,comment)
}
deleteComment(commentId:number){
  return this.http.delete(environment.API_URL+this.comments+`/${commentId}`)
}
updateComment(commentId:number,comment:{}){
  return this.http.delete(environment.API_URL+this.comments+`/${commentId}`,comment)
}
getRatings(){
  return this.http.get(environment.API_URL+this.ratings)
}
getRatingsByProductId(productId:number){
  return this.http.get(environment.API_URL+this.ratings+`/product/${productId}`)
}
saveRating(rating:{}){
  return this.http.post(environment.API_URL+this.ratings,rating)
}
deleteRating(ratingId:number){
  return this.http.delete(environment.API_URL+this.ratings+`/${ratingId}`)
}
updateRating(ratingId:number,rating:{}){
  return this.http.delete(environment.API_URL+this.ratings+`/${ratingId}`,rating)
}
}
