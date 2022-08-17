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
  constructor(private  authService:AuthService,private localStorageService: LocalStorageService, private toastrService:ToastrService) { }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");
    let newRequest : HttpRequest<any>
    newRequest = request.clone({
      headers: request.headers.set("Authorization","Bearer " + token),
      
    })
    return next.handle(newRequest);
  }
}