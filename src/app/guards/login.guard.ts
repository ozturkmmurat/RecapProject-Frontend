import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authService/auth.service';
import { LocalStorageService } from '../services/localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private localStorae:LocalStorageService,private toastrService:ToastrService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorae.isAuthenticated()) {
      return true;
    }else{
    this.router.navigate(["login"])
    this.toastrService.info("Sisteme giriş yapmalısınız.")
    return true;
    }
  }
  
}
