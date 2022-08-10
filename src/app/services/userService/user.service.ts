import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'https://localhost:5001/api/users/';
  constructor(private httpclient:HttpClient) { }

  getByUserId(userId:number):Observable<SingleResponseModel<UserUpdate>>{
    let newPath = this.apiUrl + "getById?id=" + userId;
    return this.httpclient.get<SingleResponseModel<UserUpdate>>(newPath)
  }

  update(user:UserUpdate):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(this.apiUrl + "update", user)
  }
}
