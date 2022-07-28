import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandServices/brand.service';

@Component({
  selector: 'app-brand-crud',
  templateUrl: './brand-crud.component.html',
  styleUrls: ['./brand-crud.component.css']
})
export class BrandCrudComponent implements OnInit {

  brandList: Brand[] = [];
  childToParentData:string;
  updateBrandForm:FormGroup
  brandAddForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAllBrands();
    this.createBrandAddForm();
    this.updatedCarForm();
  }

  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  updatedCarForm(){
    this.updateBrandForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
    })
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brandList = response.data
    })
  }

  deleteBrand(brand:Brand){
    this.brandService.delete(brand)
    .pipe(
      tap(x=>console.log("veri geldi " + x.message)),
      catchError((err:HttpErrorResponse)=>{
        this.toastrService.error(err.error.Message,"İşlem başarısız.")
        return of();
      }))
   .subscribe(response => {
    this.toastrService.success(brand.name + " rengi başarıyla silindi")
    this.getAllBrands()
   })
  }


  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel)
      .pipe(
        tap(x=>console.log("veri geldi " + x.message)),
        catchError((err:HttpErrorResponse)=>{
          if (err.status == 500) {
            this.toastrService.error(err.error.Message, "Doğrulama hatası")
          }
          else if (err.error.Errors.length > 0) {
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastrService.error(err.error.Errors[i].ErrorMessage, "Doğrulama hatası")
            }
          }
        return of();
      }))
      .subscribe(response => {
        if(response==null)
          return;
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllBrands()
        }
      }
    )
    }
    else {
      this.toastrService.error("Formunuz eksik", "Dikkat")
    }
  }

  updateBrand(){
    let brandModel = Object.assign({},this.updateBrandForm.value)
    console.log(brandModel)
    this.brandService.update(brandModel)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        this.toastrService.error(err.error.Message, " İşlem başarısız")
        return of();
      }))
      .subscribe(response => {
        this.toastrService.success("Bilgiler başarıyla güncellendi.")
        this.getAllBrands();
      })
  }
  writeBrand(brand:Brand){
    this.updateBrandForm.patchValue({
        id: brand.id, name:brand.name
    })
  }
  
}
