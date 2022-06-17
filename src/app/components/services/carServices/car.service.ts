import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44338/api/';
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
    let newPath = this.apiUrl + "cars/GetCarsByColorId?colorId=" + colorId
    return this.httpclient.get<ListResponseModel<Car>>(newPath);
  }
}
