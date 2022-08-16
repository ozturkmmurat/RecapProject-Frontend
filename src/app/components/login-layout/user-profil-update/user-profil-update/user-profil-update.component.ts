import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, observable, tap, of, Observable} from 'rxjs';
import { NaviComponent } from 'src/app/components/navi/navi.component';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-user-profil-update',
  templateUrl: './user-profil-update.component.html',
  styleUrls: ['./user-profil-update.component.css']
})
export class UserProfilUpdateComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private userService: UserService,private localStorage : LocalStorageService, private authService:AuthService, private toastrService:ToastrService,
    ) { }

  // user : UserUpdate;
  user$: Observable<User>;
  user : User
  updateUserForm:FormGroup
  againNewPassword="";

  ngOnInit(): void {
    this.checkUser();
    this.updatedUserForm()
    this.writeUserForm()
  }


  updatedUserForm(){
    this.user$.subscribe(data => {
      this.updateUserForm = this.formBuilder.group({
        userId:[Number(data.id),Validators.required],
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        oldPassword:[],
        newPassword:[],
        email:["",Validators.required],
        againNewPassword:[]
      })
    })
    
  }

  writeUserForm(){
    this.authService.currentUser$.subscribe(data => {
      this.user = data
      console.log("Write", this.user)
    })
    this.updateUserForm.patchValue({
        id: this.user.id, firstName:this.user.firstName, lastName: this.user.lastName, email: this.user.email
    })
  }

  updateUser(){
      let userModel = Object.assign({},this.updateUserForm.value)
      console.log(userModel)
      console.log("TYPE", typeof(userModel))
        this.userService.update(userModel)
        .pipe(
          catchError((err:HttpErrorResponse)=>{
            console.log("HATA",err)
            return of();
          }))
          .subscribe(response => {
            console.log(response)
            this.toastrService.success(response.message, "Güncelleme başarılı")
            this.checkUser()
          })
      if (userModel.newPassword == this.againNewPassword && userModel.newPassword !=null){
        this.userService.update(userModel)
        .pipe(
          catchError((err:HttpErrorResponse)=>{
            this.toastrService.error(err.error.Message,"İşlem başarısız.")
            return of();
          }))
          .subscribe(response => {
            console.log(response)
            this.toastrService.success(response.message, "Güncelleme başarılı")
            this.checkUser()
          })
      }
  }

  checkUser() {
    this.user$ = this.authService.currentUser$;
    this.authService.currentUser$.subscribe(console.log);
  }


}
