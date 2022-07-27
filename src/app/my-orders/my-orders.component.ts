import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
      
      this.orders$ = authService.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
    }
    
    } 
  
   

