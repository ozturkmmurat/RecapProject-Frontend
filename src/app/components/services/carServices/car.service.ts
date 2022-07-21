import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:5001/api/';
  constructor(private httpclient:HttpClient) { }

  getAllCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/GetAllCars"
    return this.httpclient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/GetCarsByBrandId?id=" + brandId
    return this.httpclient.get<ListResponseModel<Car>>(newPath);
  }
 
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/GetCarsByColorId?id=" + colorId
    return this.httpclient.get<ListResponseModel<Car>>(newPath);
  }
 /* getCarsIdDetail(carDetails:number):Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetCarsIdDetailDTO?id=" + carDetails
    return this.httpclient.get<ListResponseModel<CarDetails>>(newPath);
  }*/
  add(car:Car):Observable<ResponseModel>{
    return this.httpclient.post<ResponseModel>(this.apiUrl+"cars/add",car)
   
  }
}
