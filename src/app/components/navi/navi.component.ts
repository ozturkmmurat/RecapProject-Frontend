import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  user$: Observable<User>;

  constructor(
    private localStorage: LocalStorageService,
    private userService: UserService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.checkUser()
  }

  isAuthenticatedToken() {
    if (this.localStorage.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  checkUser() {
    this.user$ = this.userService.currentUser$;
    this.userService.currentUser$.subscribe(console.log);
  }

  logOut() {
    this.authService.logOut()
    this.userService._currentUser$.next(null);
  }

}
