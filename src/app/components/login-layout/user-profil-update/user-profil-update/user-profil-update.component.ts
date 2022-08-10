import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, observable, tap, of} from 'rxjs';
import { NaviComponent } from 'src/app/components/navi/navi.component';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userUpdate';
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

  user : UserUpdate;
  updateUserForm:FormGroup
  againNewPassword="";

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
   this.userService.getByUserId(this.authService.getUserId()).subscribe(response => {
    this.user = response.data
    console.log(response)
   })
  }

  updatedUserForm(){
    this.updateUserForm = this.formBuilder.group({
      userId:[this.user.id,Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required],
      email:["",Validators.required]
    })
  }

  updateUser(){
    if(this.updateUserForm.valid){
      let userModel = Object.assign({},this.updateUserForm.value)
      if(userModel.newPassword == null ){
        this.userService.update(userModel)
        .pipe(
          catchError((err:HttpErrorResponse)=>{
            this.toastrService.error(err.error.Message,"İşlem başarısız.")
            return of();
          }))
          .subscribe(response => {
            console.log(response)
            this.toastrService.success(response.message, "Güncelleme başarılı")
            this.getUserData()
          })
      }else if (userModel.newPassword == this.againNewPassword){
        this.userService.update(userModel)
        .pipe(
          catchError((err:HttpErrorResponse)=>{
            this.toastrService.error(err.error.Message,"İşlem başarısız.")
            return of();
          }))
          .subscribe(response => {
            console.log(response)
            this.toastrService.success(response.message, "Güncelleme başarılı")
            this.getUserData()
          })
      }
      
    }
    
  }


}
