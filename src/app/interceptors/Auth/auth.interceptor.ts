import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { catchError, filter, ignoreElements, switchMap, take} from "rxjs/operators";
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private toastrService:ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest: HttpRequest<any>;
    let token = this.authService.getToken();
    console.log("İLK TOKEN ", token)
      newRequest = this.addTokenHeader(request,token);
      return next.handle(newRequest).pipe(
        catchError((error) => {
          console.log(error)
          if(error.status === 401){
            this.toastrService.warning("Uzun süredir işlem yapmadığınız için hesaptan çıkış yapıldı")
           return  this.refreshToken(newRequest,next)
           
          }
          if(error.status === 403){
            this.toastrService.error("Yetkiniz yok.")
          }
          return null
        })
      )
  }

 private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      var refreshToken = localStorage.getItem("refreshToken");
      console.log(refreshToken);
      if (refreshToken) {
        return this.authService.refreshTokenLogin(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.localStorageService.update("token", token.data.token)
            console.log("Yeni Token  " , token.data.token )
            this.localStorageService.update("refreshToken", token.data.refreshToken)
            this.localStorageService.update("expiration", token.data.expiration);
            console.log("REQUEST ", request)
            console.log("TOKEN " ,this.authService.getToken())
            return next.handle(this.addTokenHeader(request, this.authService.getToken()));
          }),
          catchError((err) => {
            console.log(err);
              this.isRefreshing = false;
              this.authService.logOut();
              return throwError(err);
          })
        )
      }
    }
    return of(null);
  }
 private addTokenHeader(request: HttpRequest<any>, token: string){
    return request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token),
    });
  }
}