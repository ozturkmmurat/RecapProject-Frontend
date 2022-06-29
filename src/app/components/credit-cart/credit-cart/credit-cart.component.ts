import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCart } from 'src/app/models/creditCart';
import { Rental } from 'src/app/models/rental';
import { RentCarDto } from 'src/app/models/rentCarDto';
import { CarDetailsComponent } from '../../car-details/car-details.component';
import { CarDetailsServices } from '../../services/carDetailsServices/car-details-services.service';
import { CartServiceService } from '../../services/cartService/cart-service.service';
import { RentalService } from '../../services/rentalServices/rental.service';

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
  cartItem: CartItem;
  creditCart: CreditCart;
  rentalDto: RentCarDto;
  totalPrice = { amount: 0 };
  rentalDtoAddForm: FormGroup;
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
      cvv: ["", Validators.required]
    })
  }

  add() {
    
    let addRentalDtoModel = Object.assign({}, this.rentalDtoAddForm.value)
    if (this.rentalDtoAddForm.valid) {
     
      this.rentalService.Add(this.rentalDto, this.totalPrice).subscribe(data => {
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
  }
  onlyList() {
    this.totalPrice = this.cartService.onlyList()
  }
  addRental(){
    this.rentalDto.rental.carId = this.cartItem.product.carId
    this.rentalDto.rental.rentDate = this.cartItem.product.rentDate
    this.rentalDto.rental.returnDate = this.cartItem.product.returnDate
    this.rentalDto.rental.customerName = "Murat";
    console.log("TEST",)
  }
}
