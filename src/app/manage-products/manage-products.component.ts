
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {

  products$;
  filterProducts: any[];
  subscription: Subscription;
  searchText: string='';

  onSearchTextEntered(searchValue: string){
      this.searchText=searchValue;
      console.log(this.searchText);
  }


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.products$ = products);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  // OnPageChange(event:PageEvent){
  //   console.log(event);
  //   const startIndex=event.pageIndex * event.pageSize;
  //   let endIndex=startIndex + event.pageSize;
  //   if(endIndex>this.products$?.length){
  //     endIndex=this.products$?.length;
  //   }
  //   this.products$.scope(event.pageSize);
  // }

}
