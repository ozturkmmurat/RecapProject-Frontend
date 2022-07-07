import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { NaviComponent } from './components/navi/navi.component';
import { FilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CreditCartComponent } from './components/credit-cart/credit-cart/credit-cart.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart/shopping-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarBrandColorAddComponent } from './components/car-brand-color-add/car-brand-color-add.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';


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
    CarBrandColorAddComponent,
    AdminLayoutComponent,
    BasicLayoutComponent,
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
