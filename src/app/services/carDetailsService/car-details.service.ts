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
export class CarDetailsService {
  apiUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) { }

  getAllCarDetails():Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetCarsDetailDTO"
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  getCarsIdDetail(carDetailsId:number):Observable<SingleResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetCarsIdDetailDTO?id=" + carDetailsId
    return this.httpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }
  getCarsByBrandNameByColorNameDetail(brandName:string,colorName:string):Observable<ListResponseModel<CarDetails>>{
    let newPath = this.apiUrl + "cars/GetByBrandNameByColorNameCarsDetailDTO?brandName="+brandName +"&colorName="+colorName
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
    }

    getCarsDetailByBrandId(brandId:number):Observable<ListResponseModel<CarDetails>>{
      let newPath = this.apiUrl + "cars/GetCarsDetailByColorId?colorId=" + brandId
      return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
    }
    getCarsDetailByColorId(colorId:number):Observable<ListResponseModel<CarDetails>>{
      let newPath = this.apiUrl + "cars/GetCarsDetailByColorId?colorId=" + colorId
      return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
    }
}
