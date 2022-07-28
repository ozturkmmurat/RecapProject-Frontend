import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of,tap } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brandServices/brand.service';
import { CarDetailsService } from 'src/app/services/carDetailsService/car-details.service';
import { CarService } from 'src/app/services/carServices/car.service';
import { ColorService } from 'src/app/services/colorServices/color.service';

@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css']
})
export class CarCrudComponent implements OnInit {


  carsDetailsList: CarDetails[] = [];
  car: Car[] = [];
  onlyCar : Car;
  carAddForm: FormGroup;
  updateCarForm: FormGroup;
  colorList: Color[] = [];
  brandList: Brand[] = [];
  constructor(private formBuilder: FormBuilder, private carDetailsService: CarDetailsService,private modalService: NgbModal, private toastrService: ToastrService,
    private carService: CarService,private colorService: ColorService, private brandService: BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarDetails();
    this.createCarAddForm();
    this.updatedCarForm();
    this.getAllBrands();
    this.getAllColors();
  }
  getCarDetails() {
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carsDetailsList = response.data;
    })
  }


  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],

    })
    
  }

  updatedCarForm(){
    this.updateCarForm = this.formBuilder.group({
      id:new FormControl(''),
      name: new FormControl(''),
      brandId: new FormControl(''),
      colorId: new FormControl(''),
      modelYear: new FormControl(''),
      dailyPrice: new FormControl(''),
      description: new FormControl(''),
    })
  }

  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value)
      this.carService.add(carModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı")
          this.getCarDetails()
        }
      }, (responseError) => {
        if (responseError.status == 500) {
          this.toastrService.error(responseError.error.Message, "Doğrulama hatası")
        }
        else if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].errorMessage, "Doğrulama hatası")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz eksik", "Dikkat")
    }
  }

  updateCar(){
    let carModel = Object.assign({},this.updateCarForm.value)
    console.log(carModel)
    this.carService.update(carModel)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        this.toastrService.error(err.error.Message, " İşlem başarısız")
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success("Bilgiler başarıyla güncellendi.")
        this.getCarDetails();
      })
  }

  writeCarDetails(carDetails:CarDetails){
    this.updateCarForm.patchValue({
        id: carDetails.carId, brandId:carDetails.brandId, colorId: carDetails.colorId, name:carDetails.carName , dailyPrice: carDetails.dailyPrice, description:carDetails.description, modelYear: new Date(carDetails.modelYear)
    })
  }

  deleteCar(carDetails:CarDetails){
    this.onlyCar = {
       id:carDetails.carId,brandId:carDetails.brandId,colorId:carDetails.colorId,dailyPrice:carDetails.dailyPrice,description:carDetails.description,modelYear:carDetails.modelYear,name:carDetails.carName
    }
    console.log(this.onlyCar)
    this.carService.delete(this.onlyCar)
    .pipe(
      tap(x=>console.log("veri geldi " + x.message)),
      catchError((err:HttpErrorResponse) => {
        this.toastrService.error(err.error.Message,"İşlem başarısız.")
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success(" Araç başarıyla silindi")
        this.getCarDetails();
      })
  }


  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colorList = response.data
    })
  }


  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brandList = response.data
    })
  }

  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }
}
