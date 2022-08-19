import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  test: FormGroup;
  user: UserForUpdateDto;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private toastrService: ToastrService, 
    private localStorageService: LocalStorageService,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(
        (response) => {
          if(response.success){
            this.localStorageService.setToken(response.data.token)
            this.localStorageService.setTokenExpiration(response.data.expiration)
            this.localStorageService.setRefreshToken(response.data.refreshToken)
            this.userService.setCurrentUser()
            this.router.navigate(["/"]);
          }
        },errorResponse => {
          this.toastrService.error(errorResponse.error)
        }
      )
    }
  }
}
