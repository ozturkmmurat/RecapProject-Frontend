import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'https://localhost:5001/api/users/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private httpclient:HttpClient,private localStorageService : LocalStorageService) { }

  _currentUser$ = new BehaviorSubject<User>(null);

  get currentUser$(): Observable<User> {
    console.log(this._currentUser$)
    return this._currentUser$.asObservable();
  }

  get currentUser(): User {
    return this._currentUser$.value;
  }

  getByUserId(userId:number):Observable<SingleResponseModel<UserForUpdateDto>>{
      let newPath = this.apiUrl + "getById?id=" + userId;
      return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }

  
  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    console.log(typeof(userForUpdateDto))
    console.log("service",userForUpdateDto)
    return this.httpclient.post<ResponseModel>("https://localhost:5001/api/users/update",  userForUpdateDto)
  }


   setCurrentUser(): void {
    if (this.getUserId() != null) {
      this.getByUserId(this.getUserId()).subscribe(response => {
        let user = {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        }
        this._currentUser$.next(user)
      })
    }
  }

  getUserId() {
    if(this.localStorageService.getToken() != null)
    return this.jwtHelper.decodeToken(this.localStorageService.getToken())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}
