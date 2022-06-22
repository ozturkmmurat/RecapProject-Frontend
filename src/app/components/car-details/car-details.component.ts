import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carDetails : CarDetails;
  carDetailsList :CarDetails[];
  constructor(private carDetailsService: CarDetailsServices,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carsDetailId"]){
        this.getCarsIdDetaill(params["carsDetailId"])
      }else{
        this.getCarDetails();
      }
    })
    
  }

  getCarDetails(){
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carDetailsList = response.data;
    })
  }
  getCarsIdDetaill(carDetailsId:number){
    this.carDetailsService.getCarsIdDetail(carDetailsId).subscribe(response => {
      this.carDetails = response.data
    })
  }

 
}
