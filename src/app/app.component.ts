import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'theCommerce';

  constructor(private app:AppService,private authService:AuthService){}

  ngOnInit(){
this.app.saveVisit().subscribe((data:any)=>{})


if(localStorage.getItem('authToken')){
  this.authService.verifyToken(localStorage.getItem('authToken')!).subscribe((data:any)=>{
    console.log(data)
//      this.authService.setToken(data.accessToken)
// this.authService.setRefreshToken(data.refreshToken)
// this.authService.authenticateUser(true)
// localStorage.setItem('authToken',this.authService.token)
// localStorage.setItem('refreshToken',this.authService.token)
// this.router.navigate(['/home'])
  },err=>{
    if(localStorage.getItem('refreshToken')){
      this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((data:any)=>{
console.log(data)
      })
    }

  })

}
  }
}
