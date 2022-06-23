import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from '../services/brandServices/brand.service';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';
import { CarService } from '../services/carServices/car.service';
import { ColorService } from '../services/colorServices/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  carsDetailsList : CarDetails[] = [];
  colors : Color[] = [];
  brands : Brand[] = [];
  colorName : string;
  brandName : string;
  filterText="";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private carDetailsService:CarDetailsServices,
    private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarDetailsByBrandId(params["brandId"])
      }else if (params["colorId"]) {
        this.getCarDetailsByColorId(params["colorId"])
      }
      else{
        this.getCarDetails()
        this.getColor()
        this.getBrand()
      }
    })
    
  }

  getCars(){
    this.carService.getAllCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response =>{
      this.cars = response.data
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response =>{
      this.cars = response.data
    })
  }
  getCarDetails(){
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carsDetailsList = response.data;
    })
  }
  getCarDetailsByBrandNameByColorName(brandName:string,colorName:string){
    this.carDetailsService.getCarsByBrandNameByColorNameDetail(brandName,colorName).subscribe(response => {
      this.carsDetailsList = response.data;
      console.log(this.carsDetailsList)
      console.log(brandName,colorName)
    })
  }
  getCarDetailsByBrandId(brandId:number){
    this.carDetailsService.getCarsDetailByBrandId(brandId).subscribe(response => {
      this.carsDetailsList = response.data
      console.log(this.carsDetailsList)
    })
  }

  getCarDetailsByColorId(brandId:number){
    this.carDetailsService.getCarsDetailByBrandId(brandId).subscribe(response => {
      this.carsDetailsList = response.data
      console.log(this.carsDetailsList)
    })
  }

  getColor(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  getBrand(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

}
