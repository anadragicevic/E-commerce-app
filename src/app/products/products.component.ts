import { ShoppingCart } from './../models/shopping-cart';
import { onAuthStateChanged } from 'firebase/auth';
import { AngularFireObject } from '@angular/fire/compat/database';
import { Product } from './../models/product';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { take, Subscription, Observable } from 'rxjs';;
import Swal from 'sweetalert2';
import { ShoppingCartService } from '../services/shopping-cart.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products$;
  categories$;
  category: string;
  filteredProducts$=[];
  product :Product;
  quantity;
  cart;
  subscription:Subscription;

  constructor(private route:ActivatedRoute, 
              private productService: ProductService, 
              private categoryService: CategoryService,
              private shoppingCartService:ShoppingCartService,
   ) {

    this.productService.getAll().pipe(switchMap(products=>{this.products$=products;
      return route.queryParamMap})).subscribe(params=>{
      this.category=params.get('category');
      this.filteredProducts$=(this.category)? this.products$.filter(p=>p.payload.val().category===this.category)
      : this.products$;
    });
    this.categoryService.getCategories().subscribe(categories=>this.categories$=categories)
    
   }


  async ngOnInit(){
    this.subscription =(await this.shoppingCartService.getCart()).subscribe(cart=>this.cart=cart);
   
     }

     ngOnDestroy() {
     this.subscription.unsubscribe();
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

  

}
  