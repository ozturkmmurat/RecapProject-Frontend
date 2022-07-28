import { Injectable } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { CarDetailsComponent } from 'src/app/components/basic-layout/car-details/car-details.component';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  totalPrice = { amount:0 };
  constructor() { }

  addToCart(carDetails: CarDetails) {
    let item = CartItems.find(c => c.product.carId === carDetails.carId)
    if (item) {
      item.quantity += 1
      let cartItem = new CartItem();
      cartItem.product = carDetails;
      CartItems.push(cartItem)
    } else {
      let cartItem = new CartItem();
      cartItem.product = carDetails;
      cartItem.quantity = 1;
      CartItems.push(cartItem)
    }
  }

  totalAmount(amount = { totalPrice:0 }) {
    this.totalPrice.amount += amount.totalPrice
  }

  list(): CartItem[] {
    return CartItems;
  }

  onlyList() {
    return this.totalPrice
  }

  removeFromCart(carDetails: CarDetails){
    let item:CartItem = CartItems.find(c=> c.product.carId === carDetails.carId);
    this.totalPrice.amount -= item.product.dailyPrice
    CartItems.splice(CartItems.indexOf(item),1)
    this.onlyList();
  }
}

