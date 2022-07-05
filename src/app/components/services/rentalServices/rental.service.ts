import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCart';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentCarDto } from 'src/app/models/rentCarDto';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:5001/api/rentals/';
  constructor(private httpClient : HttpClient) { }

  getAllRental():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "GetAllRentals"
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  Add(rental:Rental,creditCard:CreditCard,totalPrice = { amount:0 }){
    let newPath = this.apiUrl + "Add?amount="+totalPrice.amount
    return this.httpClient.post(newPath,{rental,creditCard})
  }
}
