import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, observable, tap, of, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-user-profil-update',
  templateUrl: './user-profil-update.component.html',
  styleUrls: ['./user-profil-update.component.css']
})
export class UserProfilUpdateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  // user : UserUpdate;
  user$: Observable<User>;
  updateUserForm: FormGroup
  againNewPassword = "";

  ngOnInit(): void {
    this.checkUser();
    this.updatedUserForm()
    this.writeUserForm()
  }

  updatedUserForm() {
    this.user$.subscribe(data => {
      this.updateUserForm = this.formBuilder.group({
        userId: [Number(data.id), Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        oldPassword: [],
        newPassword: [],
        email: [null, Validators.required],
        againNewPassword: []
      })
    })
  }

  writeUserForm() {
    this.userService.currentUser$.subscribe(data => {
      this.updateUserForm.patchValue({
        id: data.id, firstName: data.firstName, lastName:data.lastName, email: data.email
      })
    })
    
  }

  updateUser() {
    let userModel = Object.assign({}, this.updateUserForm.value)
    console.log(userModel)
    console.log("TYPE", typeof (userModel))
    this.userService.update(userModel)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log("HATA", err)
          return of();
        }))
      .subscribe(response => {
        console.log(response)
        this.toastrService.success(response.message, "Güncelleme başarılı")
        this.checkUser()
        this.writeUserForm()
      })
    if (userModel.newPassword == this.againNewPassword && userModel.newPassword != null) {
      this.userService.update(userModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.toastrService.error(err.error.Message, "İşlem başarısız.")
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
    this.user$ = this.userService.currentUser$;
    this.userService.currentUser$.subscribe(console.log);
  }



}
