import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carDetails : CarDetails[] = [];
  constructor(private carDetailsService: CarDetailsServices) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails(){
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carDetails = response.data;
    })
  }

}
