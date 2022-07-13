import { ShoppingCart } from './../models/shopping-cart';
import { take, Subscription, map, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);

  }

  async removeFromCart(product: any) {
    let cardId = await this.getOrCreateCartId();
    let items$ = this.getItem(cardId, product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item => {
      items$.update({ product: product, quantity: (item['quantity'] || 0) - 1 })
    })
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {

    const cartId = localStorage.getItem('cartId');

    if (cartId)
      return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async updateItem(product: any, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        const quantity = (data ? (data.quantity || 0) : 0) + change; // Used || to avoid null reference error

        if (!quantity)
          item$.remove();


        else
          item$.update(JSON.parse(JSON.stringify({

            title: product.payload.val().title,
            imageUrl: product.payload.val().imageUrl,
            price: product.payload.val().price,
            quantity

          }))
          );
      });
  }
}
