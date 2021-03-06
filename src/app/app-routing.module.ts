import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { CarBrandColorAddComponent } from './components/car-brand-color-add/car-brand-color-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { CreditCartComponent } from './components/credit-cart/credit-cart/credit-cart.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart/shopping-cart.component';

const routes: Routes = [

  {
    path: "adminlayout", component: AdminLayoutComponent, children: [
      { path: "carbrandcoloradd", component: CarBrandColorAddComponent }
      
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
      { path: "cars/shoppingcart", component: ShoppingCartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
