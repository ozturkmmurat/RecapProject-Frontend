import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailsResponseModel } from 'src/app/models/rentalDetailsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {
  apiUrl='https://localhost:44338/api/rentals/GetRentalDetails';
  constructor(private httpclient:HttpClient) { }

  getRentalDetails():Observable<RentalDetailsResponseModel>{
    return this.httpclient.get<RentalDetailsResponseModel>(this.apiUrl);
  }

}
