import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

search!:FormGroup
categories:any
constructor(private router:Router,private appService:AppService){}
ngOnInit(): void {

this.search=new FormGroup({
  search:new FormControl('',Validators.required)
})
this.appService.getCategory().subscribe((data:any)=>{
this.categories=data
})
}
cerca(){
  if(this.search.valid){
this.router.navigate(['cerca'])
  }
}
}
