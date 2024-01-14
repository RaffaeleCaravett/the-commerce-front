import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
anagrafica!:FormGroup
user:any
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
}
}
