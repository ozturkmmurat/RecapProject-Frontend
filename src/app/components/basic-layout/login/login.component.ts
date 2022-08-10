import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userUpdate';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  test: FormGroup;
  user:UserUpdate;
  constructor(private router:Router, private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService, private userService:UserService) { }

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
      this.authService.login(loginModel)
      this.router.navigate([""]);
    }
  }

  getByUser() {
    this.userService.getByUserId(this.authService.getUserId()).subscribe(response => {
      this.user = response.data
      console.log(this.user)
    })
  }
}
