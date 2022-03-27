import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModel } from 'src/app/models/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44338/api/cars/GetAllCars';
  constructor(private httpclient:HttpClient) { }

  getAllCars():Observable<CarResponseModel>{
    return this.httpclient.get<CarResponseModel>(this.apiUrl);
  }

}
