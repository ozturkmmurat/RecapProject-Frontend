import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44338/api/rentals/GetAllRentals';
  constructor(private httpClient : HttpClient) { }

  getAllRental():Observable<RentalResponseModel>{
    return this.httpClient.get<RentalResponseModel>(this.apiUrl);
  }
}
