import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
societa:any
societaForm!:FormGroup
prodotto!:FormGroup
categories:any
constructor(private dashboardService:DashboardService, private toastr:ToastrService){}

ngOnInit(): void {
  this.dashboardService.getCategory().subscribe((category:any)=>{
    if(category){
      this.categories=category
    }
  })
  this.prodotto=new FormGroup({
    nome:new FormControl('',Validators.required),
    tipoProdotto:new FormControl('',Validators.required),
    prezzo:new FormControl('',Validators.required),
    pezzi:new FormControl('',Validators.required),
    category_id:new FormControl('',Validators.required),
    societa_id:new FormControl({value:'', disabled: true},Validators.required)
  })
  this.societaForm=new FormGroup({
    societaName:new FormControl('',Validators.required)
  })
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
if(this.schedaAnagrafica.role=='VENDITORE'){
  this.dashboardService.getSocietaByAnagraficaId(this.schedaAnagrafica.id).subscribe((scheda:any)=>{
    if(scheda){
      this.societa=scheda
      this.societaForm=new FormGroup({
  societaName:new FormControl(this.societa.nome,Validators.required)
})
    }
  })
}
})
if(this.societa){
  this.prodotto=new FormGroup({
    nome:new FormControl('',Validators.required),
    tipoProdotto:new FormControl('',Validators.required),
    prezzo:new FormControl('',Validators.required),
    pezzi:new FormControl('',Validators.required),
    category_id:new FormControl('',Validators.required),
    societa_id:new FormControl({value:this.societa.id,disabled:true},Validators.required)
  })
}
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

if(!this.schedaAnagrafica){
  if(this.anagrafica.controls['tipoUtente'].value=='UTENTE'){
this.anagrafica.controls['capitaleSociale'].setValue(0)
}else{
  this.anagrafica.controls['codiceFiscale'].setValue(null)

}
  if(this.anagrafica.valid){
    if(this.anagrafica.controls['codiceFiscale'].value==''&&this.anagrafica.controls['partitaIva'].value==''){
      this.toastr.error('Il campo C.F e P. Iva sono entrambi vuoti')
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
      this.toastr.success("Scheda aggiornata correttamente")
  }
},err=>{
  this.toastr.error(err.error.message)
})
    }
  }else{
    this.toastr.error("Compila il form")
  }
}else {
  if(this.anagrafica.controls['tipoUtente'].value=='UTENTE'){
    this.anagrafica.controls['capitaleSociale'].setValue(0)
    this.anagrafica.controls['partitaIva'].setValue('')
    }else{
      this.anagrafica.controls['codiceFiscale'].setValue(null)
    }
      if(this.anagrafica.valid){
        if(this.anagrafica.controls['codiceFiscale'].value==''&&this.anagrafica.controls['partitaIva'].value==''){
          this.toastr.error('Il campo C.F e P. Iva sono entrambi vuoti')
        }else{
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
  if(this.schedaAnagrafica.role=='VENDITORE'){
this.dashboardService.saveSocieta({
  nome:this.schedaAnagrafica.partitaIva,
  scheda_anagrafica_id:this.schedaAnagrafica.id
}).subscribe((societa:any)=>{
  if(societa){
    this.societa=societa
  }
})
  }else{
this.dashboardService.getSocietaByAnagraficaId(this.schedaAnagrafica.id).subscribe((societa:any)=>{
  if(societa){
this.dashboardService.deleteSocieta(data.id).subscribe((soc:any)=>{
},err=>{console.log(err)})
  }
})
  }
this.user.role=this.schedaAnagrafica.role
this.toastr.success("Scheda aggiornata correttamente")
}
},err=>{
  this.toastr.error(err.error.message)
})
}
      }else{
        this.toastr.error("Compila il form")
      }
    }
}

modifySocietyName(){
if(this.societaForm.valid){
  this.dashboardService.updateSociety(
    this.societa.id,
{
    nome:this.societaForm.controls['societaName'].value,
    scheda_anagrafica_id:this.schedaAnagrafica.id
  }
    ).subscribe((societa:any)=>{
      if(societa){
        this.societa=societa
        this.societaForm.controls['societaName'].setValue(this.societa.nome)
        this.societaForm.updateValueAndValidity()
      }
    })
}
}
addProdotto(){
  if(this.prodotto.valid){
this.dashboardService.saveProdotto(
  {
    nome:new FormControl('',Validators.required),
    tipoProdotto:new FormControl('',Validators.required),
    prezzo:new FormControl('',Validators.required),
    pezzi:new FormControl('',Validators.required),
    category_id:new FormControl('',Validators.required),
    societa_id:new FormControl(this.societa.id,Validators.required)
  }
)
  }else{
    this.toastr.error('Il form non è valido')
  }
}
}
