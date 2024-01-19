import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

search!:FormGroup
categories:any
user:any
constructor(private router:Router,private appService:AppService){}
ngOnInit(): void {

this.search=new FormGroup({
  search:new FormControl('',Validators.required)
})
this.appService.getCategory().subscribe((data:any)=>{
this.categories=data
})
if(localStorage.getItem('user')){
  this.user=JSON.parse(localStorage.getItem('user')!)
}
}
cerca(){
  if(this.search.valid){
    if(this.user){
       this.appService.saveRicerca({
      user_id:this.user.id,
      ricerca:this.search.controls['search'].value
    }).subscribe((data:any)=>{})
    }

this.router.navigate(['cerca'])
  }
}
}
