import { Component, OnInit } from '@angular/core';
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


  user: User
  number : number
  constructor(private localStorage: LocalStorageService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getByUser();
  }

  isAuthenticatedToken() {
    if (this.localStorage.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  getByUser() {
    this.userService.getByUserId(this.authService.getUserWithJWT().id).subscribe(response => {
      console.log("KULLANICI token", response)
      this.user = Object.assign(response.data);
      console.log("KULLANICI", this.user)
    })
  }

  logOut() {
    this.authService.logOut()
    this.user = null
  }

}
