import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'theCommerce';

  constructor(private app:AppService,private authService:AuthService,private router:Router){}

  ngOnInit(){
this.app.saveVisit().subscribe((data:any)=>{})


if(localStorage.getItem('authToken')){
  this.authService.verifyToken(localStorage.getItem('authToken')!).subscribe((data:any)=>{
    if(data){
      localStorage.setItem('user',JSON.stringify(data))
      this.authService.setToken(localStorage.getItem('authToken')!)
      this.authService.setRefreshToken(localStorage.getItem('refreshToken')!)
      this.authService.authenticateUser(true)
      localStorage.setItem('authToken',this.authService.token)
      localStorage.setItem('refreshToken',this.authService.token)
      this.router.navigate(['/home'])
    }
  },err=>{
    this.authService.authenticateUser(false)
    if(localStorage.getItem('refreshToken')){
      this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((data:any)=>{
 if(data){
      this.authService.setToken(data.tokens.accessToken)
      this.authService.setRefreshToken(data.tokens.refreshToken)
      this.authService.authenticateUser(true)
      localStorage.setItem('authToken',this.authService.token)
      localStorage.setItem('refreshToken',this.authService.token)
      this.router.navigate(['/home'])
    }      })
    }

  })

}
  }
}
