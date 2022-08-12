import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';





@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = { title: '', price: '', category: '', imageUrl: '' , velicina: '', opis: ''};
  id;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categoryService.getCategories().subscribe(categories => this.categories$ = categories);

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => {
      this.product = p;
      console.log(this.product)
    });
  }


  save(product) {
    console.log(product);
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    Swal.fire({
      title: 'Success!',
      text: 'Uspešno ste dodali/izmenili proizvod.',
      icon: 'success',
      showConfirmButton: false,
      width: '25%',
      timer: 2500
    })
    this.router.navigate(['/manage-products']);
  }

  delete() {

    Swal.fire({
      text: 'Da li ste sigurni da želite da obrišete ovaj proizvod?',
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
          text: 'Proizvod obrisan!',
          icon: 'success', showConfirmButton: false, width: '25%', timer: 2000,

        })
        this.productService.deleteProduct(this.id),
          this.router.navigate(['/manage-products'])
      } else if (result.isDenied) {
      }
    })
  }
  
  ngOnInit(): void {
  }

}
