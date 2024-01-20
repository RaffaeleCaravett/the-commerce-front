import { Injectable } from '@angular/core';
import type { ActivatedRouteSnapshot, CanActivate,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService) {}


  isAuthenticated:boolean = false;


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.isAuthenticated) {
      return true;
    } else {
this.toastr.error("Devi effettuare il login per accedere a questa area")
      return false;
    }
  }
  authenticateUser(bool?:boolean){
  if(bool){
     this.isAuthenticated=bool
  }else{
    this.isAuthenticated=false
  }
}
}
