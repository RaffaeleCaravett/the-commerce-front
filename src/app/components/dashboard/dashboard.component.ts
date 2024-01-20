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
ricerca:any
error:any
likes:any
recensioni:any
success:string=''
schedaAnagrafica:any
constructor(private dashboardService:DashboardService){}

ngOnInit(): void {

this.anagrafica=new FormGroup({
nome:new FormControl('',Validators.required),
cognome:new FormControl('',Validators.required),
email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
tipoUtente:new FormControl('',Validators.required),
codiceFiscale:new FormControl('',Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')),
partitaIva:new FormControl('',Validators.pattern("^[0-9]{11}$")),
via:new FormControl('',Validators.required),
indirizzo:new FormControl('',Validators.required),
numeroCivico:new FormControl('',Validators.required),
cap:new FormControl('',Validators.required),
capitaleSociale:new FormControl('',Validators.required)
})
if(localStorage.getItem('user')){
  this.user=JSON.parse(localStorage.getItem('user')!)
  this.dashboardService.getAnagraficaByUserId(this.user.id).subscribe((data:any)=>{
  this.schedaAnagrafica=data

    this.anagrafica.controls['nome'].setValue(this.schedaAnagrafica.nome),
    this.anagrafica.controls['cognome'].setValue(this.schedaAnagrafica.cognome),
    this.anagrafica.controls['email'].setValue(this.schedaAnagrafica.email),
    this.anagrafica.controls['tipoUtente'].setValue(this.schedaAnagrafica.role),
    this.anagrafica.controls['codiceFiscale'].setValue(this.schedaAnagrafica.codiceFiscale),
    this.anagrafica.controls['partitaIva'].setValue(this.schedaAnagrafica.partitaIva),
    this.anagrafica.controls['via'].setValue(this.schedaAnagrafica.via),
    this.anagrafica.controls['indirizzo'].setValue(this.schedaAnagrafica.indirizzo),
    this.anagrafica.controls['numeroCivico'].setValue(this.schedaAnagrafica.numeroCivico),
    this.anagrafica.controls['cap'].setValue(this.schedaAnagrafica.cap),
    this.anagrafica.controls['capitaleSociale'].setValue(this.schedaAnagrafica.capitaleSociale),
this.anagrafica.updateValueAndValidity()
})
}

this.dashboardService.getAcquisti(this.user.id).subscribe((data:any)=>{
  this.acquisti = data
})
this.dashboardService.getBozza(this.user.id).subscribe((data:any)=>{
  this.bozze= data
})
this.dashboardService.getRicerca(this.user.id).subscribe((data:any)=>{
  this.ricerca= data
})
this.dashboardService.getLike(this.user.id).subscribe((data:any)=>{
  this.likes= data
})
this.dashboardService.getRating(this.user.id).subscribe((data:any)=>{
  this.recensioni= data
})

}

saveAnagrafica(){
this.success=''
this.error=''
if(!this.schedaAnagrafica){
  if(this.anagrafica.controls['tipoUtente'].value=='UTENTE'){
this.anagrafica.controls['capitaleSociale'].setValue(0)
}else{
  this.anagrafica.controls['codiceFiscale'].setValue(null)

}
  if(this.anagrafica.valid){
    if(this.anagrafica.controls['codiceFiscale'].value==''&&this.anagrafica.controls['partitaIva'].value==''){
      this.error='Il campo C.F e P. Iva sono entrambi vuoti'
    }else{
      this.error=''
this.dashboardService.saveAnagrafica(
  {
    nome:this.anagrafica.controls['nome'].value,
    cognome:this.anagrafica.controls['cognome'].value,
    email:this.anagrafica.controls['email'].value,
    role:this.anagrafica.controls['tipoUtente'].value,
    codiceFiscale:this.anagrafica.controls['codiceFiscale'].value||'',
    partitaIva:this.anagrafica.controls['partitaIva'].value||'',
    via:this.anagrafica.controls['via'].value,
    indirizzo:this.anagrafica.controls['indirizzo'].value,
    numeroCivico:this.anagrafica.controls['numeroCivico'].value,
    cap:this.anagrafica.controls['cap'].value,
    capitaleSociale:this.anagrafica.controls['capitaleSociale'].value||'',
    user_id:this.user.id
  }
).subscribe((scheda:any)=>{
  if(scheda){
      this.schedaAnagrafica=scheda
      this.success="Scheda aggiornata correttamente"
  }
},err=>{
  this.error=err.error.message
})
    }
  }else{
    this.error="Compila il form"
  }
}else {
  if(this.anagrafica.controls['tipoUtente'].value=='UTENTE'){
    this.anagrafica.controls['capitaleSociale'].setValue(0)
    }else{
      this.anagrafica.controls['codiceFiscale'].setValue(null)
    }
      if(this.anagrafica.valid){
        if(this.anagrafica.controls['codiceFiscale'].value==''&&this.anagrafica.controls['partitaIva'].value==''){
          this.error='Il campo C.F e P. Iva sono entrambi vuoti'
        }else{
          console.log(this.anagrafica.controls['partitaIva'].value)
  this.dashboardService.updateAnagraficaById(this.schedaAnagrafica.id,{
    nome:this.anagrafica.controls['nome'].value,
    cognome:this.anagrafica.controls['cognome'].value,
    email:this.anagrafica.controls['email'].value,
    role:this.anagrafica.controls['tipoUtente'].value,
    codiceFiscale:this.anagrafica.controls['codiceFiscale'].value||'',
    partitaIva:this.anagrafica.controls['partitaIva'].value||'',
    via:this.anagrafica.controls['via'].value,
    indirizzo:this.anagrafica.controls['indirizzo'].value,
    numeroCivico:this.anagrafica.controls['numeroCivico'].value,
    cap:this.anagrafica.controls['cap'].value,
    capitaleSociale:this.anagrafica.controls['capitaleSociale'].value||'',
    user_id:this.user.id
  }).subscribe((data:any)=>{
if(data){
  this.schedaAnagrafica=data
  this.success="Scheda aggiornata correttamente"
}
},err=>{
this.error=err.error.message
})
}
      }else{
        this.error="Compila il form"
      }
    }
}
}
