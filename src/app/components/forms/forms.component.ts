import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{

login!:FormGroup
formSection:string=''
signup!:FormGroup
error:string=''
nations:any
cities:any
constructor(private authService:AuthService,private router:Router){}

ngOnInit(): void {

  this.authService.getNations().subscribe((data:any)=>{
    if(data){
          this.nations=data
    }
  })
this.login=new FormGroup({
email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
password:new FormControl('',Validators.required)
})
this.formSection='login'
this.signup=new FormGroup({
  nomeCompleto: new FormControl('',[Validators.required,Validators.minLength(2)]),
  email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  nazione:new FormControl('',Validators.required),
  citta:new FormControl('',Validators.required),
  eta:new FormControl('',[Validators.required,Validators.min(18)]),
password:new FormControl('',[Validators.required,Validators.minLength(6)]),
ripetiPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
})
}


log(body?:any){
if(this.login.valid){
  this.authService.logIn(
    {
      email:body.email||this.login.controls['email'].value,
      password:body.password||this.login.controls['password'].value
    }
    ).subscribe((data:any)=>{
      if(data){
this.authService.setToken(data.tokens.authToken)
this.authService.setRefreshToken(data.tokens.refreshToken)
this.authService.authenticateUser(true)
localStorage.setItem('authToken',this.authService.token)
localStorage.setItem('refreshToken',this.authService.token)
this.router.navigate(['/home'])
}
    },err=>{
      this.error=err.error.message||"Qualcosa è andato storto nel login"
    })
}else{
  this.error="Riguarda il form, qualcosa non va."
}
}

sign(){
if(this.signup.valid&&this.signup.controls['password'].value==this.signup.controls['ripetiPassword'].value){
  this.authService.signUp(
    {
      età:this.signup.controls['età'].value,
      email:this.signup.controls['email'].value,
      password:this.signup.controls['password'].value,
      nomeCompleto:this.signup.controls['nomeCompleto'].value,
      citta:this.signup.controls['citta'].value,
      nazione:this.signup.controls['nazione'].value
    }
    ).subscribe((data:any)=>{
if(data){
  localStorage.setItem('user',JSON.stringify(data))
this.log({email:this.signup.controls['email'].value,password:this.signup.controls['password'].value})
}
    },err=>{
      this.error=err.error.message||"Qualcosa è andato storto nel signup"
    })
}else{
  this.error="Riguarda il form, stai sbagliando o dimenticando di inserire qualcosa"
}
}
updateCities(id:number){
  this.authService.getCitiesByNationId(id).subscribe((data:any)=>{
    if(data){
      this.cities=data
    }
  })
}
}
