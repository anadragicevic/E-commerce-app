import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart; // To get the cart object from the DB for the current user and pass it to each card as an input

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  ngOnInit(): void {
  }

}
