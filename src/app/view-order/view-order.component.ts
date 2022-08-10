import { take } from 'rxjs';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  delete() {
    Swal.fire({
      text: 'Da li ste sigurni da želite da ispraznite Vašu korpu?',
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
          text: 'Svi proizvodi iz korpe su obrisani.',
          icon: 'success', showConfirmButton: false, width: '25%', timer: 2000
        })
        this.orderService.cancelOrder(this.id);
        
      } else if (result.isDenied) {
      }
    })

    
  
  }

  ngOnInit(): void {
  }

}
