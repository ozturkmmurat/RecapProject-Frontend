import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailsResponseModel } from 'src/app/models/carDetailsResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsServices {
  apiUrl = 'https://localhost:44338/api/cars/GetCarsDetailDTO';
  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<CarDetailsResponseModel>{
    return this.httpClient.get<CarDetailsResponseModel>(this.apiUrl);
  }

}
