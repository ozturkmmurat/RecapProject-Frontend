import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { CarCrudComponent } from './components/login-layout/car-crud/car-crud.component';
import { CarDetailsComponent } from './components/basic-layout/car-details/car-details.component';
import { CarComponent } from './components/basic-layout/car/car.component';
import { CreditCartComponent } from './components/login-layout/credit-cart/credit-cart/credit-cart.component';
import { ShoppingCartComponent } from './components/basic-layout/shopping-cart/shopping-cart/shopping-cart.component';
import { BrandComponent } from './components/basic-layout/brand/brand.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { BrandCrudComponent } from './components/login-layout/brand-crud/brand-crud.component';
import { ColorCrudComponent } from './components/login-layout/color-crud/color-crud.component';

const routes: Routes = [

  
  {
    path: "loginLayout", component: LoginLayoutComponent, children: [
      {path: "carcrud",component:CarCrudComponent},
      {path:"brandCrud",component:BrandCrudComponent},
      {path:"colorCrud",component:ColorCrudComponent}
    ]
  },
  {
    path: "", component: BasicLayoutComponent, children: [
      {path:"",pathMatch:"full", component:CarComponent},
      {path:"cars",component:CarComponent},
      { path: "cars/brand/:brandId", component: CarComponent },
      { path: "cars/color/:colorId", component: CarComponent },
      { path: "cars/brand/:brandIdDetails/color/:colorIdDetails", component: CarComponent },
      { path: "cars/carsDetail/:carsDetailId", component: CarDetailsComponent },
      { path: "cars/shoppingcart/cars/creditCart", component: CreditCartComponent },
      { path: "cars/shoppingcart", component: ShoppingCartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
