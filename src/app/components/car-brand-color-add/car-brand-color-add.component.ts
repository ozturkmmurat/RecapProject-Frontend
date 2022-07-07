import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from 'src/app/models/brand';
import { CarDetails } from 'src/app/models/carDetails';
import { Color } from 'src/app/models/color';
import { BrandService } from '../services/brandServices/brand.service';
import { CarDetailsServices } from '../services/carDetailsServices/car-details-services.service';
import { CarService } from '../services/carServices/car.service';
import { ColorService } from '../services/colorServices/color.service';

@Component({
  selector: 'app-car-brand-color-add',
  templateUrl: './car-brand-color-add.component.html',
  styleUrls: ['./car-brand-color-add.component.css']
})
export class CarBrandColorAddComponent implements OnInit {

  
  carsDetailsList : CarDetails[] = [];
  colorList : Color [] = [];
  brandList : Brand [] = [];
  constructor(private carDetailsService : CarDetailsServices, private colorService : ColorService, private brandService : BrandService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCarDetails();
    this.getAllBrands();
    this.getAllColors();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }

}
