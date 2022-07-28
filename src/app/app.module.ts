import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/basic-layout/brand/brand.component';
import { ColorComponent } from './components/basic-layout/color/color.component';
import { CustomerComponent } from './components/basic-layout/customer/customer.component';
import { CarComponent } from './components/basic-layout/car/car.component';
import { RentalComponent } from './components/basic-layout/rental/rental.component';
import { CarDetailsComponent } from './components/basic-layout/car-details/car-details.component';
import { RentalDetailsComponent } from './components/basic-layout/rental-details/rental-details.component';
import { NaviComponent } from './components/navi/navi.component';
import { FilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CreditCartComponent } from './components/login-layout/credit-cart/credit-cart/credit-cart.component';
import { CartSummaryComponent } from './components/basic-layout/cart-summary/cart-summary.component';
import { ShoppingCartComponent } from './components/basic-layout/shopping-cart/shopping-cart/shopping-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { CarCrudComponent } from './components/login-layout/car-crud/car-crud.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { BrandCrudComponent } from './components/login-layout/brand-crud/brand-crud.component';
import { ColorCrudComponent } from './components/login-layout/color-crud/color-crud.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailsComponent,
    RentalDetailsComponent,
    NaviComponent,
    FilterPipePipe,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    CreditCartComponent,
    CartSummaryComponent,
    ShoppingCartComponent,
    BasicLayoutComponent,
    CarCrudComponent,
    LoginLayoutComponent,
    BrandCrudComponent,
    ColorCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
