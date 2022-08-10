import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
  constructor(private auth:AuthService){}
  canActivate() : Observable<boolean>  {
    return this.auth.user$.pipe(
      map(user=> {
        if(user) return true;
        else return  Swal.fire({
          text: 'Nemate autorizaciju za pristup ovoj stranici!',
          icon: 'error',
          showConfirmButton: false,
          width: '25%',
          timer: 3000
        })
      })
    ) as Observable<boolean>;
  }
  
}
