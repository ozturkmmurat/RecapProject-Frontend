import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';
import { CarService } from '../services/carServices/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  carsDetailsList : CarDetails[] = [];
  carDetails : CarDetails;
  filterText="";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private carDetailsService:CarDetailsServices) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars()
        this.getCarDetails()
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
}
