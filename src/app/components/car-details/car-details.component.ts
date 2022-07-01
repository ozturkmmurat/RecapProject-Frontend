import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';
import { CartServiceService } from '../services/cartService/cart-service.service';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carDetails : CarDetails;
  carDetailsList :CarDetails[];
  cartItems:CartItem[];
  cartItem:CartItem;
  day : number;
  fixedPrice :number;
  amount = { totalPrice:0}
  constructor(private carDetailsService: CarDetailsServices,private activatedRoute:ActivatedRoute, private cartService:CartServiceService) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carsDetailId"]){
        this.getCarsIdDetaill(params["carsDetailId"])
      }
    })
    
  }
  getCarsIdDetaill(carDetailsId:number){
    this.carDetailsService.getCarsIdDetail(carDetailsId).subscribe(response => {
      this.carDetails = response.data
      
      console.log(this.carDetails)
      this.fixedPrice = this.carDetails.dailyPrice
    })
  }

  calculateAmount(){
    this.carDetails.dailyPrice = this.carDetails.dailyPrice *0
    this.carDetails.rentDate = new Date( ((<HTMLInputElement> document.getElementById("rentDate"))).value.toString())
    this.carDetails.returnDate = new Date( (<HTMLInputElement>document.getElementById("returnDate")).value.toString())
    let date:Date = this.carDetails.rentDate
    let date2:Date = this.carDetails.returnDate
    let time = Math.abs(date2.getTime() - date.getTime())
    var days = Math.ceil( time / (1000*3600*24))
    this.carDetails.dailyPrice = this.fixedPrice * days
    this.day = days;
    
    console.log(typeof(this.amount.totalPrice), " " , typeof(this.carDetails.dailyPrice))
    
  }

  addToCart(car:CarDetails){
   car.rentDate =  this.carDetails.rentDate
   car.returnDate = this.carDetails.rentDate
   car.dailyPrice = this.carDetails.dailyPrice
    this.cartService.addToCart(car);
}

calculatePrice(){
   this.amount.totalPrice =+ this.carDetails.dailyPrice
   console.log(this.amount.totalPrice)
  this.cartService.totalAmount(this.amount)
}
 
}
