import { Component, OnInit } from '@angular/core';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { RentalDetailsService } from '../services/rentalDetailsServices/rental-details.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent implements OnInit {
  rentalDetails: RentalDetails[] = [];
  constructor(private rentalDetailsService :RentalDetailsService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails(){
    this.rentalDetailsService.getRentalDetails().subscribe(response =>{
      this.rentalDetails = response.data
    })
  }

}
