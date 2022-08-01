import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = { name: '', telefon:'', address: '', city: '', brojKartice:'', month:'', year:'', sigurnosniBroj:'' };
  uderId: string;
  cart: ShoppingCart;
  cartSubscribtion: Subscription;
  userSubscribtion: Subscription;  
  kartice=false;
 

  constructor(private router: Router,
              private authService: AuthService, 
              private orderService: OrderService, 
              private shoppingCartService: ShoppingCartService)
               { 

               }

  async ngOnInit() {
    let cart$=await this.shoppingCartService.getCart();
    this.cartSubscribtion=cart$.subscribe(cart=>this.cart=cart);
    this.userSubscribtion=this.authService.user$.subscribe(user=>this.uderId=user.uid)
  }

  ngOnDestroy(): void {
   this.cartSubscribtion.unsubscribe();
   this.userSubscribtion.unsubscribe();
  }

  prikaziKartice(){
     this.kartice=!this.kartice;
  }

 async placeOrder() {
    let order={
      userId: this.uderId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i=>{
        return{
          product:{
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };
    let result= await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success' , result.key]);
  }


}
