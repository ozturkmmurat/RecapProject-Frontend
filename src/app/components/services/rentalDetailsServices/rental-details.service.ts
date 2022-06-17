import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { RentalDetails } from 'src/app/models/rentalDetails';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {
  apiUrl='https://localhost:44338/api/rentals/GetRentalDetails';
  constructor(private httpclient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetails>>{
    return this.httpclient.get<ListResponseModel<RentalDetails>>(this.apiUrl);
  }

}
