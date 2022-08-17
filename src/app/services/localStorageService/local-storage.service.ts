import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key : string){
    return localStorage.getItem(key);
  }

  add(key : string, value : string){
    return localStorage.setItem(key,value)
  }

  remove(key : string){
    return localStorage.removeItem(key);
  }

  update(key : string, value : string){
    localStorage.removeItem(key);
    localStorage.setItem(key,value);
  }

  isAuthenticated() {
    if (localStorage.getItem("token")){
      return true;
    }
    else {
      return false;
    }
  }
  
  getToken() {
    return this.getItem("token")
  }

  getRefreshToken(){
    return this.getItem("refreshToken")
  }

  getTokenExpiration(){
    return this.getItem("expiration")
  }

}
