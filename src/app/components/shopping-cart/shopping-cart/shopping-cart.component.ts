import { Component, OnInit } from '@angular/core';
import { CarDetails } from 'src/app/models/carDetails';
import { CartItem } from 'src/app/models/cartItem';
import { CartServiceService } from '../../services/cartService/cart-service.service';

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

  constructor(private cartService : CartServiceService) { }

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



}
