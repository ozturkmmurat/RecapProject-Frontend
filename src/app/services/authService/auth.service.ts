import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, observable, of } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { registerModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/UserForUpdateDto';
import { LocalStorageService } from '../localStorageService/local-storage.service';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) {
    this.setTokenCurrentUser()
  }


  private _currentTokenUser$ = new BehaviorSubject<User>(null);
  user: User
  apiUrl = 'https://localhost:5001/api/auth/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;

  /**
   * Kullanıcıyı rxjs stream olarak getirir
   */
  get currentTokenUser$(): Observable<User> {
    return this._currentTokenUser$.asObservable();
  }

  /**
   * Kullanıcının çağırıldığı anda ki değerini getirir
   */
  get currentUser(): User {
    return this._currentTokenUser$.value;
  }

  private setTokenCurrentUser(): void {
    let token = this.decodeToken(this.localStorageService.getToken());
    if (token != null) {
      let user = {
        id: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: token.email,
        status: Boolean(token.status),
        firstName: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName: this.jwtHelper.decodeToken(this.localStorageService.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"]

      };
      this._currentTokenUser$.next(user);
    }
  }



  login(loginUser: LoginModel) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.loginForToken(loginUser)
      .subscribe(
        response => {
          this.toastrService.info(response.message)
          this.localStorageService.add("token", response.data.token);
          this.localStorageService.add("refreshToken", response.data.refreshToken)
          this.localStorageService.add("expiration", response.data.expiration)
          this.userToken = response.data.token;
          this.decodedToken = this.jwtHelper.decodeToken(response.data.token);
          this.userService.setCurrentUser()
          this.router.navigate(["/"]);
        },
        errorResponse => {
          this.toastrService.error(errorResponse.error)
        }
      );

  }

  logOut() {
    this.userService._currentUser$.next(null);
    this.router.navigate(["/login"]);
    this.localStorageService.remove("token");
    this.localStorageService.remove("refreshToken");
    this.localStorageService.remove("expiration");
  }

  refreshTokenLogin(tokenModel: string) {
    let newPath = this.apiUrl + "refreshTokenLogin?refreshToken=" + tokenModel;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, null)
  }

  loginForToken(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  register(registerModel: registerModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }


  decodeToken(token: string) {
    if(token !=null){
      return this.jwtHelper.decodeToken(token);
    }
  }


}
