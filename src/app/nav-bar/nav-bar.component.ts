import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
 
  constructor(public auth:AuthService, private shoppingCartService: ShoppingCartService, private route: Router) {
      
   }
  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    
  }

  logout(){ 
    
    this.auth.logout();
    
  }
}
