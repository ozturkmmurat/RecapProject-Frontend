import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { registerModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';
import { LocalStorageService } from '../localStorageService/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService,
     private toastrService: ToastrService, 
     private router: Router) {this.setCurrentUser()}

  
  private _currentUser$ = new BehaviorSubject<User>(null);
  user: User
  apiUrl = 'https://localhost:5001/api/auth/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;

  /**
   * Kullanıcıyı rxjs stream olarak getirir
   */
  get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  /**
   * Kullanıcının çağırıldığı anda ki değerini getirir
   */
  get currentUser(): User {
    return this._currentUser$.value;
  }

  private setCurrentUser(): void {
    let token = this.decodeToken(this.getToken());
    if (token != null) {
      let user = {
        id: this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: token.email,
        status: Boolean(token.status),
        firstName: this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"]

      };
      this._currentUser$.next(user);
    }
  }


  login(loginUser: LoginModel) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.loginForToken(loginUser)
      .subscribe(
        response => {
          this.toastrService.info(response.message)
          this.localStorageService.add("token",response.data.token);
          this.localStorageService.add("refreshToken",response.data.refreshToken)
          this.localStorageService.add("expiration",response.data.expiration)
          this.userToken = response.data.token;
          this.decodedToken = this.jwtHelper.decodeToken(response.data.token);
          this.setCurrentUser();
          this.router.navigate(["/"]);
        },
        errorResponse => {
          this.toastrService.error(errorResponse.error)
        }
      );

  }

  refreshTokenLogin(tokenModel:string){
    let newPath = this.apiUrl + "refreshTokenLogin?refreshToken="+tokenModel;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,null)
  }

  loginForToken(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  register(registerModel: registerModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }

  getToken() {
    return this.localStorageService.getItem("token")
  }

  getRefreshToken(){
    return this.localStorageService.getItem("refreshToken")
  }

  getTokenExpiration(){
    return this.localStorageService.getItem("expiration")
  }

  getUserId() {
    return this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  logOut() {
    this._currentUser$.next(null);
    this.router.navigate(["/login"]);
    this.localStorageService.remove("token");
    this.localStorageService.remove("refreshToken");
    this.localStorageService.remove("expiration");
  }

  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  getTokenData(): any {
    let tokenData = this.decodeToken(this.getToken());
    if (tokenData != null) {
      let user = {
        id:
          this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        firstName: this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"]
      } as User;

      const token = new Observable<User>(data => {
        data.next(user)
      });//böyle kullanırsın aşağıda subsucribe
      return user;
    }


  }
}
