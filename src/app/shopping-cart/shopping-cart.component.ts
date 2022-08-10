import { AngularFireObject } from '@angular/fire/compat/database';
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input('product') product: Product;
  cart$: any;


  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {

    Swal.fire({
      text: 'Da li ste sigurni da želite da ispraznite Vašu korpu?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: `Odustani`,
      confirmButtonColor: 'rgb(228, 152, 81)',
      denyButtonColor: '#000000',
      width: '30%'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Svi proizvodi iz korpe su obrisani.',
          icon: 'success', showConfirmButton: false, width: '25%', timer: 2000
        })
        this.shoppingCartService.clearCart();
        
      } else if (result.isDenied) {
      }
    })

  }


  removeFromCart(productId) {
   
    Swal.fire({
      text: 'Da li ste sigurni da želite da izbrišete ovaj proizvod iz  Vaše korpe?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: `Odustani`,
      confirmButtonColor: 'rgb(228, 152, 81)',
      denyButtonColor: '#000000',
      width: '30%'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Proizvod obrisan.',
          icon: 'success', showConfirmButton: false, width: '25%', timer: 2000
        })
        this.shoppingCartService.removeFromCart(productId);
        
      } else if (result.isDenied) {
      }
    })


    
  }

}
