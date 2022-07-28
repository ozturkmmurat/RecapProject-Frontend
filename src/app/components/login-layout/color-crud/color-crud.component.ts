import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorServices/color.service';

@Component({
  selector: 'app-color-crud',
  templateUrl: './color-crud.component.html',
  styleUrls: ['./color-crud.component.css']
})
export class ColorCrudComponent implements OnInit {

  colorList: Color[] = [];
  colorAddForm: FormGroup;
  updateColorForm: FormGroup;
  constructor(private colorService: ColorService, private modalService: NgbModal, private toastrService: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllColors();
    this.createColorAddForm()
    this.updatedColorForm()
  }

  openLg(content: any): void {
    this.modalService.open(content, { size: 'lg' });
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colorList = response.data
    })
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  updatedColorForm() {
    this.updateColorForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required]
    })
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı")
          this.getAllColors()
        }
      }, responseError => {
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
  deleteColor(color: Color) {
    this.colorService.delete(color)
      .pipe(
        tap(x => console.log("veri geldi" + x.message)),
        catchError((err: HttpErrorResponse) => {
          this.toastrService.error(err.error.Message, "İşlem başarısız.")
          return of();
        }))
      .subscribe(response => {
        this.toastrService.success(color.name + " rengi başarıyla silindi")
        this.getAllColors();
      })
  }



  updateColor() {
    let colorModel = Object.assign({}, this.updateColorForm.value)
    this.colorService.update(colorModel)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastrService.error(err.error.Message, " İşlem başarısız")
          return of();
        }))
      .subscribe(response => {
        this.toastrService.success("Bilgiler başarıyla güncellendi.")
        this.getAllColors();
      })
  }

  writeColor(color: Color) {
    this.updateColorForm.patchValue({
      id: color.id, name: color.name
    })
  }


}
