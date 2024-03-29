import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorServices/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  filterText="";
  colors: Color[] = [];
  currentColor : Color;
  constructor(private colorService : ColorService, ) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
    })
  }
  
  setCurrentColor(color : Color){
    this.currentColor = color;
  }

  getAllColorClas(){
    if (!this.currentColor) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getCurrentCategoryClass(color:Color){
    if (color == this.currentColor) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}
