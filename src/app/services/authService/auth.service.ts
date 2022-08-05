import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { registerModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:5001/api/auth/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;

  constructor(private httpClient: HttpClient, private localStorageService:LocalStorageService, private toastrService : ToastrService, private router:Router) { }


  login(loginUser: LoginModel) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.loginForToken(loginUser).subscribe(response => {
      this.toastrService.info (response.body.message)
      this.setToken(response.body.data.token);
      this.userToken = response.body.data.token;
      this.decodedToken = this.jwtHelper.decodeToken(response.body.data.token);
      console.log(this.decodedToken)
      console.log(this.getUserId());
      this.router.navigate([""]);
    }, errorResponse => {
      this.toastrService.error(errorResponse.error)
    });
    
  }

  loginForToken(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel, {observe : 'response'})
  }

  register(registerModel:registerModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register",registerModel)
  }


  getToken(){
    return this.localStorageService.getItem("token")
  }

  setToken(token:any){
    return this.localStorageService.add("token",token)
  }

  getUserId(){
      return this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  logOut(){
    return this.localStorageService.remove("token")

  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  getUserWithJWT(): User {
    let token = this.decodeToken(this.getToken());

    if (token != null) {
      let user = {
        id:
          +token[
            Object.keys(token).filter((t) => t.endsWith('nameidentifier'))[0]
          ],
        
        email: token.email,
        status: Boolean(token.status),
        firstName:token.firstName,
        lastName:token.lastName
        
      };
      return user
    }

    return null;
  }


}
