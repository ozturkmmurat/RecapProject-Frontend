import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  user: User;
  number : number
  sub:Subscription
  constructor(private localStorage: LocalStorageService, private authService: AuthService, private userService: UserService
    ,private router:Router) { }

  ngOnInit(): void {
    this.getByTokenData();
    // this.getByUser()
  }

  isAuthenticatedToken() {
    if (this.localStorage.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  getByUser() {
    const id =+ this.authService.getUserWithJWT()?.id ?? 0;
    if (id >0) {
      this.sub = this.userService.getByUserId(id).subscribe(response => {
        this.user = response.data
      })
    }
   
  }
 

  getByTokenData(){
    if(this.isAuthenticatedToken()){
      this.user = this.authService.getTokenData()
      console.log(this.user)
    }
    
  }

  logOut() {
    this.authService.logOut()
    this.sub?.unsubscribe();
    this.router.navigate(["login"])
  }

}
