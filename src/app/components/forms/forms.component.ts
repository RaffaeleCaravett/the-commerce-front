import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
constructor(private authService:AuthService){}

ngOnInit(): void {
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


log(){
if(this.login.valid){
  this.authService.logIn(
    {
      email:this.login.controls['email'].value,
      password:this.login.controls['password'].value
    }
    ).subscribe((data:any)=>{console.log(data)},err=>{
      this.error=err.error.message||"Qualcosa è andato storto nel login"
    })
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
    ).subscribe((data:any)=>{console.log(data)},err=>{
      this.error=err.error.message||"Qualcosa è andato storto nel signup"
    })
}
}
}
