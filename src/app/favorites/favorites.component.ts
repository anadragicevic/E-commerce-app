import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  favorites$;

  constructor(private productService : ProductService, private shoppingCartService: ShoppingCartService) { 

     this.productService.getFavorites().subscribe(favorites=>this.favorites$=favorites)
  }

  ngOnInit(): void {
 
  }

  addToChart(product:Product){
    this.shoppingCartService.addToCart(product);
     Swal.fire({
      text: 'Proizvod je dodat u korpu.',
      icon: 'success',
      showConfirmButton: false,
      width: '25%' ,
      timer: 2500
    })
}

clearFavorites() {

  Swal.fire({
    text: 'Da li ste sigurni da želite da ispraznite korpu sa omiljenim proizvodima?',
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
        text: 'Svi omiljeni proizvodi su obrisani.',
        icon: 'success', showConfirmButton: false, width: '25%', timer: 2000
      })
      this.productService.clearFavorites();
      
    } else if (result.isDenied) {
    }
  })

}

}
