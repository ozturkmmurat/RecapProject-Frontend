import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { __assign } from 'tslib';
import { BrandService } from '../services/brandServices/brand.service';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';
import { CarService } from '../services/carServices/car.service';
import { ColorService } from '../services/colorServices/color.service';
import { catchError, EMPTY, of } from 'rxjs';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-car-brand-color-add',
  templateUrl: './car-brand-color-add.component.html',
  styleUrls: ['./car-brand-color-add.component.css']
})
export class CarBrandColorAddComponent implements OnInit {

  
  carsDetailsList : CarDetails[] = [];
  car : Car[] = [];
  colorList : Color [] = [];
  brandList : Brand [] = [];
  brandAddForm : FormGroup;
  carAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder,private carDetailsService : CarDetailsServices, private colorService : ColorService, private brandService : BrandService,private modalService: NgbModal, private toastrService:ToastrService,
    private carService : CarService) { }

  ngOnInit(): void {
    this.getCarDetails();
    this.getAllBrands();
    this.getAllColors();
    this.createBrandAddForm();
    this.createCarAddForm();
  }


  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      name:["",Validators.required],
      brandId:[,Validators.required],
      colorId:[,Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  getCarDetails(){
    this.carDetailsService.getAllCarDetails().subscribe(response => {
      this.carsDetailsList = response.data;
    })
  }

  getAllColors(){
    this.colorService.getColors().subscribe(response => {
      this.colorList = response.data
    })
  }


  getAllBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brandList = response.data
    })
  }



  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }


  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
        this.getAllBrands()
      },(responseError)=>{
        console.log(responseError.error)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      }),catchError((error) => {console.log('Error',error); return EMPTY;})
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  addCar(){
      if(this.carAddForm.valid){
        let carModel = Object.assign({},this.carAddForm.value)
        this.carService.add(carModel).subscribe(response => {
          this.toastrService.success(response.message,"Başarılı")
          this.getCarDetails()
        },(responseError) =>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i<responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].errorMessage,"Doğrulama hatası")
            }
          }
        })
      }
      else{
        this.toastrService.error("Formunuz eksik","Dikkat")
      }
  }
  

}
