import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
anagrafica!:FormGroup
user:any
acquisti:any
bozze:any
constructor(private dashboardService:DashboardService){}

ngOnInit(): void {
this.anagrafica=new FormGroup({
nome:new FormControl('',Validators.required),
cognome:new FormControl('',Validators.required),
email:new FormControl('',Validators.required),
tipoUtente:new FormControl('',Validators.required),
codiceFiscale:new FormControl('',Validators.required),
partitaIva:new FormControl('',Validators.required),
via:new FormControl('',Validators.required),
indirizzo:new FormControl('',Validators.required),
numeroCivico:new FormControl('',Validators.required),
cap:new FormControl('',Validators.required),
capitaleSociale:new FormControl('',Validators.required)
})
if(localStorage.getItem('user')){
  this.user=JSON.parse(localStorage.getItem('user')!)
}

this.dashboardService.getAcquisti(this.user.id).subscribe((data:any)=>{
  this.acquisti = data
})
this.dashboardService.getBozza(this.user.id).subscribe((data:any)=>{
  this.bozze= data
})
}
}
