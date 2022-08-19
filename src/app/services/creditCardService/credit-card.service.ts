import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCart';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:5001/api/creditCart/';
  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getAll"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCreditCardById(creditCard:number):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "GetById?id=" + creditCard
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCreditCardByUserId(id:number):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "GetByUserId?id=" + id
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>("https://localhost:5001/api/creditCart/Add",creditCard);
  }
}
