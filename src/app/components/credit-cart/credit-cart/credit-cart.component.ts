import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCart } from 'src/app/models/creditCart';
import { Rental } from 'src/app/models/rental';
import { CarDetailsComponent } from '../../car-details/car-details.component';
import { CarDetailsServices } from '../../services/carDetailsServices/car-details-services.service';
import { CartServiceService } from '../../services/cartService/cart-service.service';
import { RentalService } from '../../services/rentalServices/rental.service';
import { CartItems } from 'src/app/models/cartItems';
import { RentalDetailsService } from '../../services/rentalDetailsServices/rental-details.service';
import { RentalDto } from 'src/app/models/test';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'app-credit-cart',
  templateUrl: './credit-cart.component.html',
  styleUrls: ['./credit-cart.component.css']
})
export class CreditCartComponent implements OnInit {

  carDetails: CarDetails;
  carDetailsList: CarDetails[];
  carDetailsComponent: CarDetailsComponent;
  cartItems: CartItem[];
  creditCart: CreditCart;
  rental : Rental;
  rentalDto :RentalDto;
  totalPrice = { amount:0 };
  rentalDtoAddForm: FormGroup;
  sayi : number
  constructor(private carDetailsService: CarDetailsServices, private activatedRoute: ActivatedRoute,
    private cartService: CartServiceService, private rentalService: RentalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderList()
    this.onlyList()
    this.createRentalDtoForm()
    
  }

  createRentalDtoForm() {
    this.rentalDtoAddForm = this.formBuilder.group({
      cartNumber: ["", Validators.required],
      expirationMonth: ["", Validators.required],
      expirationYear: ["", Validators.required],
      cvv: ["", Validators.required],
      
    })
  }

  add() {
    
    let addRentalDtoModel = Object.assign({}, this.rentalDtoAddForm.value)
    if (!this.rentalDtoAddForm.valid) {
     
      this.rentalService.Add(this.rental,this.creditCart,this.totalPrice).subscribe(data => {
       console.log("Başarıyla eklendi")
      })
    } else {
      console.log("Başarısız")
    }
  }

  getCarsIdDetaill(carDetailsId: number) {
    this.carDetailsService.getCarsIdDetail(carDetailsId).subscribe(response => {
      this.carDetails = response.data
    })
  }

  orderList() {
    this.cartItems = this.cartService.list()
    console.log(this.cartItems[0])
  }
  onlyList() {
    this.totalPrice = this.cartService.onlyList()
  }
  addRental(){
    const a=1;
    let b = a;
   
    let test = this.cartItems[0].product.carId
    console.log(test);
   // this.rentalDto.rental.carId = this.cartItems[0].product.carId
   
   // console.log(this.rentalDto.rental.carId)


  }
}
