import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy{

images:string[]=[]
index:number=0
interval:any
categories:any[]=[]
constructor(private app:AppService){}

  ngOnDestroy(): void {
clearInterval(this.interval)  }

ngOnInit(): void {
  this.app.getCategory().subscribe((data:any)=>{
   if(data){
    this.categories=data
   }
  })
  let image= '../../../assets/homeImages/banner.jpg'
  let image1= '../../../assets/homeImages/banner1.jpg'
  let image2= '../../../assets/homeImages/banner2.jpg'
  this.images.push(image,image1,image2)

  this.interval= setInterval(()=>{
if(this.index==2){
  this.index=0
}else{
  this.index+=1
}
  },5000)
}
updateCarousel(direction:string){
if(direction=='back'){
  if(this.index==0){
    this.index=2
  }else{
    this.index-=1
  }
}else{
  if(this.index==2){
    this.index=0
  }else{
    this.index+=1
  }
}

}


}
