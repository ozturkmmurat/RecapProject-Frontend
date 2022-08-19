import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
  ) { }

  signOut(){
    this.removeTokens();
  }

  getItem(key : string){
    return localStorage.getItem(key);
  }

  add(key : string, value : string){
    return localStorage.setItem(key,value)
  }

  remove(key : string){
    return localStorage.removeItem(key);
  }

  removeTokens(){
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("refreshToken")
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

  setToken(value:string){
    return localStorage.setItem("token",value)
  }

  setRefreshToken(value:string){
    return localStorage.setItem("refreshToken",value)
  }
  setTokenExpiration(value:string){
    return localStorage.setItem("expiration",value)
  }

}
