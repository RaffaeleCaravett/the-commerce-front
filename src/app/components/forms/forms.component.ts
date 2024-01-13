import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{

login!:FormGroup
formSection:string=''
signup!:FormGroup
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
password:new FormControl('',Validators.required),
ripetiPassword:new FormControl('',Validators.required)
})
}
}
