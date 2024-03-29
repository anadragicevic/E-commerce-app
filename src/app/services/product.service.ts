import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  addToFavorites(product: any) {
    return this.db.list('/favorites').push(
      {
        title: product.payload.val().title,
        imageUrl: product.payload.val().imageUrl,
        price: product.payload.val().price,
        category: product.payload.val().category
      });
  }

  getFavorites() {
    return this.db.list('/favorites').snapshotChanges()
      .pipe(
        map(object => {
          console.log(object);
          return object;
        })
      );
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(object => {
          console.log(object);
          return object;
        })
      );
  }

  async clearFavorites() {

    this.db.object('/favorites').remove();
  }

  get(productId): any {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/favorites/' + productId).remove();
  }
  deleteProduct(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}


