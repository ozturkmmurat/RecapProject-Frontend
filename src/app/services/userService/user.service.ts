import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = 'https://localhost:5001/api/users/';
  constructor(private httpclient:HttpClient) { }

  getByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getById?id=" + userId;
    return this.httpclient.get<SingleResponseModel<User>>(newPath)
  }
}
