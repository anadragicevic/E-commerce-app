import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  p;
  id;
  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService:ShoppingCartService) { 
    this.id= this.route.snapshot.paramMap.get('id');
    this.productService.get(this.id).subscribe(p => {
      this.p = p;
      console.log(this.p)
    });
  }
  ngOnInit(): void {
  }

  addToChart(product: Product) {
    this.shoppingCartService.addToCart(product);
    Swal.fire({
      text: 'Proizvod je dodat u korpu.',
      icon: 'success',
      showConfirmButton: false,
      width: '25%',
      timer: 2500
    })
  }

}
