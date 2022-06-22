import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from '../services/brandServices/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  filterText:"";
  brands: Brand[] = [];
  currentBrand: Brand;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(){
     this.brandService.getBrands().subscribe(response =>{
        this.brands = response.data;
     })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentCategoryClass(brand:Brand){
    if (brand == this.currentBrand) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if (!this.currentBrand) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}
