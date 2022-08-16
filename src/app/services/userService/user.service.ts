import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'https://localhost:5001/api/users/';
  constructor(private httpclient:HttpClient) { }

  getByUserId(userId:number):Observable<SingleResponseModel<UserForUpdateDto>>{
    let newPath = this.apiUrl + "getById?id=" + userId;
    return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }

  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    console.log(typeof(userForUpdateDto))
    console.log("service",userForUpdateDto)
    return this.httpclient.post<ResponseModel>("https://localhost:5001/api/users/update",  userForUpdateDto)
  }
}
