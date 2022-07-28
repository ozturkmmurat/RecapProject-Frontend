import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCard } from 'src/app/models/creditCart';
import { Rental } from 'src/app/models/rental';
import { CarDetailsComponent } from 'src/app/components/basic-layout/car-details/car-details.component';
import { CarDetailsService } from 'src/app/services/carDetailsService/car-details.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { RentalService } from 'src/app/services/rentalServices/rental.service';
import { CartItems } from 'src/app/models/cartItems';
import { RentalDetailsService } from 'src/app/services/rentalDetailsServices/rental-details.service';
import { RentalDto } from 'src/app/models/test';
import { TestBed } from '@angular/core/testing';
import { RentCarDto } from 'src/app/models/rentCarDto';
import { ToastrService } from 'ngx-toastr';
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
  creditCart: CreditCard;
  rental : Rental;
  rentalDto :RentalDto;
  totalPrice = { amount:0 };
  rentalDtoAddForm: UntypedFormGroup;
  rentalCarDto: RentCarDto
  constructor(private carDetailsService: CarDetailsService, private activatedRoute: ActivatedRoute,
    private cartService: CartService, private rentalService: RentalService, private formBuilder: UntypedFormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRentalDtoForm()
    this.orderList()
    this.onlyList()


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
    console.log(this.rentalDtoAddForm)
    if (this.rentalDtoAddForm.valid) {
      let addRentalDtoModel = Object.assign({}, this.rentalDtoAddForm.value)
      this.rentalService.Add(this.rental,addRentalDtoModel,this.totalPrice).subscribe(data => {
        this.toastrService.success("Ürün satın alındı.")
      },error=>{
        console.log("Sunucuyla iletişim başarısız.")
        console.log(error)
      })
    } else {
      this.toastrService.error("Lütfen kredi kartı bilgilerini kontrol ediniz.")
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

    const product=this.cartItems[0].product;
    this.rental = {
        carId:product.carId,customerName:product.carName,rentalId:1,rentDate:product.rentDate,returnDate:product.returnDate
    }
  }
}