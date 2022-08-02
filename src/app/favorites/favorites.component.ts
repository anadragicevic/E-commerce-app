import { Subscription } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  favorites$;

  constructor(private productService : ProductService) { 

     this.productService.getFavorites().subscribe(favorites=>this.favorites$=favorites)
  }

  ngOnInit(): void {
 
  }

}
