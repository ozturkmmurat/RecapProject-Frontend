import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from 'src/app/models/carDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsServices {
  apiUrl = 'https://localhost:44338/api/cars/GetCarsDetailDTO';
  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<ListResponseModel<CarDetails>>{
    return this.httpClient.get<ListResponseModel<CarDetails>>(this.apiUrl);
  }

}
