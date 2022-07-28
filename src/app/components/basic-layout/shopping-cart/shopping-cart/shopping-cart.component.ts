import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems:CartItem[];
  cartItem:CartItem;
  fixedAmount:number;
  totalPrice = { amount:0 };

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
   this.orderList()
   this.onlyList()
  }

  orderList(){
   this.cartItems = this.cartService.list();
  }
  onlyList(){
    this.totalPrice = this.cartService.onlyList()
  }

  removeFromCart(carDetails:CarDetails){
    this.cartService.removeFromCart(carDetails)
  }

}
