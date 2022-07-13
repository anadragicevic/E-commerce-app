import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async storeOrder(order){
      let result= await this.db.list('/orders').push(order);
      this.shoppingCartService.clearCart();
      return result;
  }

  getOrders() { 
    return this.db.list('/orders').valueChanges();
  }

  viewOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  cancelOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).remove();
  }

   getOrdersByUser(userId: string) {
    return this.db.list('/orders', query => query.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
    .pipe( map(actions =>
      actions.map(a => ({ key: a.payload.key, ...a } ))
    )
  );
   
  }
}
