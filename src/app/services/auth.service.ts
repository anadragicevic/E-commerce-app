import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider} from 'firebase/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  email;
  password;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$=afAuth.authState;
  }
  
  login() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      res => {
        Swal.fire({
          title: 'Uspešna registracija/prijava.',
          text: 'Spremni ste za online kupovinu naših proizvoda.',
          icon: 'success',
          showConfirmButton: false,
          width: '35%' ,
          timer: 4000
        })
        this.router.navigate(['/products']);
        localStorage.setItem('token', JSON.stringify(res.user));
      }, err => {
        alert(err.message);
      })

  }

   logout() {
    this.afAuth.signOut();
  }
}