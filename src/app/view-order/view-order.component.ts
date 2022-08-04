import { take } from 'rxjs';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  order:any = [];
  id;
  constructor(private route:Router, private activatedRoute:ActivatedRoute, private orderService:OrderService) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id)
      this.orderService.viewOrder(this.id).pipe(take(1)).subscribe(p => this.order = p);

  }

  ngOnInit(): void {
  }

}
