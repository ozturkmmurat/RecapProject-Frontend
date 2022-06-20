import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from 'src/app/models/carDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsServices {
  apiUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<SingleResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetCarsDetailDTO"
    return this.httpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }
  getCarsIdDetail(carDetailsId:number):Observable<SingleResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetCarsIdDetailDTO?id=" + carDetailsId
    return this.httpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }

}
