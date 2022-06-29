import { Injectable } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { CarDetailsComponent } from '../../car-details/car-details.component';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
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
}

