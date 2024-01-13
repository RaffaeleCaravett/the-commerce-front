import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

search!:FormGroup
constructor(private router:Router){}
ngOnInit(): void {
this.search=new FormGroup({
  search:new FormControl('',Validators.required)
})
}
cerca(){
  if(this.search.valid){
this.router.navigate(['cerca'])
  }
}
}
