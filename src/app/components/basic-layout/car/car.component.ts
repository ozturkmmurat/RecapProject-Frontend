import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandServices/brand.service';
import { CarDetailsService } from 'src/app/services/carDetailsService/car-details.service';
import { CarService } from 'src/app/services/carServices/car.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { ColorService } from 'src/app/services/colorServices/color.service';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  carsDetailsList: CarDetails[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];
  colorName: string;
  brandName: string;
  filterText = "";
  
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private carDetailsService: CarDetailsService,
    private colorService: ColorService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getColor()
      this.getBrand()
      if (params["brandId"]) {
        this.getCarDetailsByBrandId(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarDetailsByColorId(params["colorId"])
      }
      else {
        this.getCarDetails()
      }
    })

  }
  getCars() {
    this.carService.getAllCars().subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
    })
  }
  getCarDetails() {
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carsDetailsList = response.data;
      console.log(this.carsDetailsList)
    })
  }
  getCarDetailsByBrandNameByColorName(brandName: string, colorName: string) {
    this.carDetailsService.getCarsByBrandNameByColorNameDetail(brandName, colorName).subscribe(response => {
      this.carsDetailsList = response.data;
      console.log(this.carsDetailsList)
      console.log(brandName, colorName)
    })
  }
  getCarDetailsByBrandId(brandId: number) {
    this.carDetailsService.getCarsDetailByBrandId(brandId).subscribe(response => {
      this.carsDetailsList = response.data
      console.log(this.carsDetailsList)
    })
  }

  getCarDetailsByColorId(brandId: number) {
    this.carDetailsService.getCarsDetailByBrandId(brandId).subscribe(response => {
      this.carsDetailsList = response.data
      console.log(this.carsDetailsList)
    })
  }

  getColor() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  getBrand() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }



}
